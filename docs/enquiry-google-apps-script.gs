// Create a NEW standalone SSV project. Enable Services > Google Sheets API (Sheets).
// Set ENQUIRY_SCRIPT_SECRET in Project Settings > Script Properties.
const SHEET_ID = '12j_Rs6qbmOdJ_YgvaNf9gChZbgCbBUzm-mG-0EtNHTM';
const TAB = 'SSV';
const INSTITUTION = 'SSV';
const LABEL = 'Sairam Sanskruthi Vidhyalaya';
const HEADERS = ['Date & Time', 'Institution', "Parent's Name", "Child's Name", "Child's Age", 'Phone Number', 'Email', 'Interested Program', 'Message', 'Status', 'Notes'];
const FIELDS = ['parentName', 'childName', 'childAge', 'phone', 'email', 'program', 'message'];
const PROGRAMS = ['Play Group (2-3 years)', 'Nursery (3-4 years)', 'LKG (4-5 years)', 'UKG (5-6 years)', 'Day Care (2-12 years)'];
const RECEIPT_PATTERN = /^[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}:[A-Za-z0-9_-]{43}$/;

function doPost(e) {
  const reply = code => ContentService.createTextOutput(JSON.stringify({
    ok: code === 'SAVED', code, protocol: 1, institution: INSTITUTION
  })).setMimeType(ContentService.MimeType.JSON);
  let lock;
  let stage = 'VALIDATE';
  try {
    if (!e || !e.postData || typeof e.postData.contents !== 'string' || e.postData.contents.length > 24000) return reply('VALIDATION');
    const data = JSON.parse(e.postData.contents);
    if (!data || typeof data !== 'object' || Array.isArray(data)) return reply('VALIDATION');
    const secret = PropertiesService.getScriptProperties().getProperty('ENQUIRY_SCRIPT_SECRET');
    if (!secret || data.secret !== secret) return reply('AUTH');
    if (data.institution !== INSTITUTION) return reply('INSTITUTION');
    if (typeof data.receipt !== 'string' || !RECEIPT_PATTERN.test(data.receipt)) return reply('INVALID_RECEIPT');
    if (!['submit', 'status'].includes(data.action)) return reply('ACTION');
    if (data.action === 'submit') {
      if (FIELDS.some(key => typeof data[key] !== 'string' || data[key] !== data[key].trim()) ||
          !data.parentName || data.parentName.length > 120 || !data.childName || data.childName.length > 120 ||
          !/^(?:\d{1,2}(?:\.\d)?)(?:\s*(?:years?|yrs?))?$/i.test(data.childAge) ||
          parseFloat(data.childAge) <= 0 || parseFloat(data.childAge) > 12 || !/^\d{10}$/.test(data.phone) ||
          data.email.length > 254 || (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) ||
          (data.program && !PROGRAMS.includes(data.program)) || data.message.length > 3000) return reply('VALIDATION');
      const digest = Utilities.base64EncodeWebSafe(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,
        JSON.stringify(FIELDS.map(key => data[key])), Utilities.Charset.UTF_8)).replace(/=+$/, '');
      if (data.receipt.split(':')[1] !== digest) return reply('INVALID_RECEIPT');
    }
    // Both status and submission use the same lock, so status waits for ongoing writes.
    stage = 'READ_SHEET';
    lock = LockService.getScriptLock();
    lock.waitLock(10000);
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(TAB);
    if (!sheet) return reply('SHEET');
    if (sheet.getMaxColumns() < HEADERS.length) return reply('HEADERS');
    const headings = sheet.getRange(1, 1, 1, HEADERS.length).getDisplayValues()[0];
    if (!HEADERS.every((heading, i) => headings[i] === heading)) return reply('HEADERS');
    const count = sheet.getLastRow() - 1;
    const notes = count > 0 ? sheet.getRange(2, 1, count, 1).getNotes().map(row => {
      try { return JSON.parse(row[0]); } catch (_) { return null; }
    }) : [];
    if (notes.some(note => note && note.ssvReceipt === data.receipt)) return reply('SAVED');
    if (data.action === 'status') return reply('NOT_FOUND');
    if (typeof Sheets === 'undefined' || !Sheets.Spreadsheets) return reply('SHEETS_SERVICE');
    const now = Date.now();
    const phones = count > 0 ? sheet.getRange(2, 6, count, 1).getDisplayValues() : [];
    if (notes.some((note, i) => note && phones[i][0] === data.phone && now - note.createdAt < 60000)) return reply('RATE_LIMIT');
    const row = [Utilities.formatDate(new Date(now), 'Asia/Kolkata', 'yyyy-MM-dd HH:mm:ss'), LABEL,
      data.parentName, data.childName, data.childAge, data.phone, data.email, data.program, data.message, '', ''];
    // stringValue prevents formula execution and preserves phone formatting.
    const values = row.map(value => ({ userEnteredValue: { stringValue: value } }));
    // Save the receipt WITH the row atomically, without adding a visible column.
    values[0].note = JSON.stringify({ ssvReceipt: data.receipt, createdAt: now });
    stage = 'WRITE';
    Sheets.Spreadsheets.batchUpdate({ requests: [{ appendCells: {
      sheetId: sheet.getSheetId(), rows: [{ values }], fields: 'userEnteredValue,note'
    } }] }, SHEET_ID);
    return reply('SAVED');
  } catch (error) {
    // Log the stage and error type only; never log submission details or the secret.
    console.error('SSV enquiry failure: ' + stage + ' (' + (error && error.name || 'Error') + ')');
    // The row may already exist if Google's acknowledgement was lost.
    return reply('UNKNOWN');
  } finally {
    if (lock && lock.hasLock()) lock.releaseLock();
  }
}

// Run this from the editor to check setup without adding any enquiry rows.
function checkSetup() {
  const result = { secretConfigured: false, sheetsServiceEnabled: false, sheetFound: false, headersMatch: false };
  result.secretConfigured = Boolean(PropertiesService.getScriptProperties().getProperty('ENQUIRY_SCRIPT_SECRET'));
  result.sheetsServiceEnabled = typeof Sheets !== 'undefined' && Boolean(Sheets.Spreadsheets);
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(TAB);
  result.sheetFound = Boolean(sheet);
  if (sheet && sheet.getMaxColumns() >= HEADERS.length) {
    const headings = sheet.getRange(1, 1, 1, HEADERS.length).getDisplayValues()[0];
    result.headersMatch = HEADERS.every((heading, i) => headings[i] === heading);
  }
  console.log(JSON.stringify(result));
  return result;
}
