import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { createHash, randomUUID } from 'node:crypto';
import { normalizeEnquiry, enquiryHash, getReceipt, submitEnquiry, PROGRAMS } from '../src/lib/enquiry.mjs';
import { createEnquiryEndpoint } from '../src/lib/enquiry-server.mjs';

const fields = { parentName: '=Parent', childName: 'Child', childAge: '3 years', phone: '9980481450', email: '', program: '', message: '=Hello' };
const headers = ['Date & Time', 'Institution', "Parent's Name", "Child's Name", "Child's Age", 'Phone Number', 'Email', 'Interested Program', 'Message', 'Status', 'Notes'];
const env = { ENQUIRY_SCRIPT_URL: 'https://script.google.com/macros/s/test/exec', ENQUIRY_SCRIPT_SECRET: 'test-secret' };
const saved = { ok: true, code: 'SAVED', protocol: 1, institution: 'SSV' };
const submission = async (changes = {}) => {
  const data = { ...fields, ...changes };
  return { ...data, receipt: `${randomUUID()}:${await enquiryHash(data)}`, action: 'submit' };
};
const request = data => new Request('https://school.example/api/enquiry', {
  method: 'POST', headers: { Origin: 'https://school.example', 'Content-Type': 'application/json' }, body: JSON.stringify(data),
});

function harness({ sheetsService = true } = {}) {
  const rows = [headers.map(stringValue => ({ userEnteredValue: { stringValue } }))];
  let locked = false, loseAck = false, missing = false;
  const sheet = {
    getMaxColumns: () => 11, getLastRow: () => rows.length, getSheetId: () => 42,
    getRange: (row, col, count, width) => ({
      getDisplayValues: () => rows.slice(row - 1, row - 1 + count).map(r => r.slice(col - 1, col - 1 + width).map(c => c.userEnteredValue.stringValue)),
      getNotes: () => rows.slice(row - 1, row - 1 + count).map(r => [r[col - 1].note || '']),
    }),
  };
  const sandbox = {
    console: { error() {}, log() {} },
    ContentService: { MimeType: { JSON: 'json' }, createTextOutput: text => ({ setMimeType: () => JSON.parse(text) }) },
    PropertiesService: { getScriptProperties: () => ({ getProperty: () => 'test-secret' }) },
    SpreadsheetApp: { openById: id => {
      assert.equal(id, '12j_Rs6qbmOdJ_YgvaNf9gChZbgCbBUzm-mG-0EtNHTM');
      return { getSheetByName: tab => { assert.equal(tab, 'SSV'); return missing ? null : sheet; } };
    } },
    LockService: { getScriptLock: () => ({ waitLock: () => { assert.equal(locked, false); locked = true; }, hasLock: () => locked, releaseLock: () => { locked = false; } }) },
    Utilities: { Charset: { UTF_8: 'utf8' }, DigestAlgorithm: { SHA_256: 'sha256' },
      computeDigest: (_, value) => createHash('sha256').update(value).digest(), base64EncodeWebSafe: bytes => bytes.toString('base64url'),
      formatDate: (_, tz, format) => { assert.equal(tz, 'Asia/Kolkata'); assert.equal(format, 'yyyy-MM-dd HH:mm:ss'); return '2026-09-28 12:00:00'; } },
    Sheets: { Spreadsheets: { batchUpdate: (body, id) => {
      assert.equal(locked, true); assert.equal(id, '12j_Rs6qbmOdJ_YgvaNf9gChZbgCbBUzm-mG-0EtNHTM');
      const append = body.requests[0].appendCells;
      assert.equal(append.sheetId, 42); assert.equal(append.fields, 'userEnteredValue,note');
      assert.ok(append.rows[0].values[0].note, 'receipt must be in the same write as the enquiry');
      rows.push(append.rows[0].values);
      if (loseAck) { loseAck = false; throw new Error('lost response'); }
    } } },
  };
  if (!sheetsService) delete sandbox.Sheets;
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(new URL('../docs/enquiry-google-apps-script.gs', import.meta.url), 'utf8'), sandbox);
  return { rows, checkSetup: () => sandbox.checkSetup(), loseAck: () => { loseAck = true; }, missing: () => { missing = true; },
    send: data => sandbox.doPost({ postData: { contents: JSON.stringify({ secret: 'test-secret', institution: 'SSV', ...data }) } }),
    locked: () => locked };
}

test('missing Sheets service is diagnosed without writing and status still works', async () => {
  const script = harness({ sheetsService: false }), data = await submission();
  assert.equal(script.send(data).code, 'SHEETS_SERVICE');
  assert.equal(script.send({ action: 'status', receipt: data.receipt }).code, 'NOT_FOUND');
  assert.equal(script.checkSetup().sheetsServiceEnabled, false);
  assert.equal(script.rows.length, 1);
  assert.equal(script.locked(), false);
  const response = await createEnquiryEndpoint({ env, fetchImpl: async () => Response.json({ ...saved, ok: false, code: 'SHEETS_SERVICE' }) })(request(data));
  assert.equal(response.status, 503);
  assert.equal((await response.json()).code, 'CONFIG');
});

test('validates school fields consistently, keeps optional fields and normalizes +91', async () => {
  assert.equal(normalizeEnquiry({ ...fields, phone: '+91 99804 81450' }).phone, fields.phone);
  for (const change of [{ parentName: ' ' }, { childName: '' }, { childAge: '0' }, { childAge: '13' }, { childAge: 'three' },
    { phone: '123' }, { phone: '+1 9980481450' }, { email: 'bad' }, { program: 'BCA' }, { message: 4 }, { message: 'a'.repeat(3001) }]) {
    assert.equal(normalizeEnquiry({ ...fields, ...change }), null);
    assert.equal(harness().send(await submission(change)).code, 'VALIDATION');
  }
  for (const program of ['', ...PROGRAMS]) assert.equal(harness().send(await submission({ program, childAge: '2.5' })).code, 'SAVED');
  assert.equal(harness().send(await submission({ message: 'अ'.repeat(3000) })).code, 'SAVED');
});

test('atomic write uses exactly eleven columns, literal values and blank staff columns', async () => {
  const script = harness(), data = await submission();
  assert.deepEqual(script.send(data), saved);
  assert.deepEqual(Array.from(script.rows[1], cell => cell.userEnteredValue.stringValue), [
    '2026-09-28 12:00:00', 'Sairam Sanskruthi Vidhyalaya', '=Parent', 'Child', '3 years', '9980481450', '', '', '=Hello', '', '',
  ]);
  assert.equal(JSON.parse(script.rows[1][0].note).ssvReceipt, data.receipt);
  assert.equal(script.locked(), false);
});

test('status is read-only, retries deduplicate, and phone cooldown is persistent', async () => {
  const script = harness(), data = await submission();
  assert.equal(script.send({ action: 'status', receipt: data.receipt }).code, 'NOT_FOUND');
  assert.equal(script.rows.length, 1);
  assert.equal(script.send(data).code, 'SAVED');
  assert.equal(script.send(data).code, 'SAVED');
  assert.equal(script.send({ action: 'status', receipt: data.receipt }).code, 'SAVED');
  assert.equal(script.send(await submission()).code, 'RATE_LIMIT');
  assert.equal(script.rows.length, 2);
  const note = JSON.parse(script.rows[1][0].note); note.createdAt -= 61000;
  script.rows[1][0].note = JSON.stringify(note);
  assert.equal(script.send(await submission()).code, 'SAVED');
});

test('script rejects wrong secret, institution, headings, missing tab and altered data', async () => {
  const script = harness(), data = await submission();
  assert.equal(script.send({ ...data, secret: 'wrong' }).code, 'AUTH');
  assert.equal(script.send({ ...data, institution: 'NDRK FGC' }).code, 'INSTITUTION');
  assert.equal(script.send({ ...data, childName: 'Changed' }).code, 'INVALID_RECEIPT');
  script.rows[0][2].userEnteredValue.stringValue = 'Name';
  assert.equal(script.send(data).code, 'HEADERS');
  assert.equal(script.rows.length, 1); assert.equal(script.locked(), false);
  script.missing(); assert.equal(script.send(data).code, 'SHEET');
});

test('browser recovers lost acknowledgement through status with no duplicate row', async () => {
  const script = harness(), data = await submission(), actions = [];
  const endpoint = createEnquiryEndpoint({ env, fetchImpl: async (_, options) => Response.json(script.send(JSON.parse(options.body))) });
  const browserFetch = async (_, options) => { const data = JSON.parse(options.body); actions.push(data.action); return endpoint(request(data)); };
  script.loseAck();
  assert.deepEqual(await submitEnquiry(fields, data.receipt, browserFetch), { ok: true, code: 'SAVED' });
  assert.deepEqual(actions, ['submit', 'status']); assert.equal(script.rows.length, 2);
  assert.equal((await submitEnquiry(fields, data.receipt, browserFetch)).ok, true);
  assert.equal(script.rows.length, 2);
});

test('endpoint uses server credentials, checks acknowledgements and never caches', async () => {
  const endpoint = createEnquiryEndpoint({ env, fetchImpl: async (_, options) => {
    const data = JSON.parse(options.body);
    assert.equal(data.secret, 'test-secret'); assert.equal(data.institution, 'SSV');
    return Response.json(saved);
  } });
  const response = await endpoint(request({ ...await submission(), secret: 'client', institution: 'wrong' }));
  assert.equal(response.status, 200); assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.deepEqual(await response.json(), { ok: true, code: 'SAVED' });
  for (const fetchImpl of [async () => new Response('<html>Login</html>'), async () => { throw Error(); },
    async () => Response.json({ ...saved, institution: 'NDRK FGC' }), async () => Response.json({ ...saved, protocol: 2 }),
    async () => Response.json(saved, { status: 500 }), async () => Response.json({ ...saved, ok: false })]) {
    const response = await createEnquiryEndpoint({ env, fetchImpl })(request(await submission()));
    assert.equal(response.status, 502); assert.equal((await response.json()).ok, false);
  }
});

test('endpoint blocks invalid requests before Google and requires script credentials', async () => {
  const fetchImpl = async () => assert.fail('must not reach Google');
  const endpoint = createEnquiryEndpoint({ env, fetchImpl });
  assert.equal((await endpoint(request(await submission({ phone: '123' })))).status, 400);
  assert.equal((await endpoint(request({ ...await submission(), message: 'changed' }))).status, 400);
  assert.equal((await endpoint(request({ ...await submission(), padding: 'x'.repeat(24000) }))).status, 413);
  assert.equal((await endpoint(new Request('https://school.example/api/enquiry'))).status, 405);
  for (const origin of ['', 'https://other.example']) {
    const req = request(await submission()); req.headers.set('origin', origin);
    assert.equal((await endpoint(req)).status, 403);
  }
  assert.equal((await createEnquiryEndpoint({ env: { NODE_ENV: 'production' }, fetchImpl })(request(await submission()))).status, 503);
  assert.equal((await createEnquiryEndpoint({ env: { ...env, ENQUIRY_SCRIPT_URL: 'https://evil.example' }, fetchImpl })(request(await submission()))).status, 503);
});

test('production and localhost infer their origin without an environment setting', async () => {
  const endpoint = createEnquiryEndpoint({ env: { ...env, NODE_ENV: 'production' }, fetchImpl: async () => Response.json(saved) });
  for (const origin of ['https://www.sairamsanskruthividhyalaya.com', 'http://localhost:3000', 'http://localhost:3001']) {
    const makeRequest = suppliedOrigin => new Request(`${origin}/api/enquiry`, {
      method: 'POST', headers: { Origin: suppliedOrigin, 'Content-Type': 'application/json' }, body: JSON.stringify(data),
    });
    const data = await submission();
    assert.equal((await endpoint(makeRequest(origin))).status, 200);
    assert.equal((await endpoint(makeRequest('https://other.example'))).status, 403);
    assert.equal((await endpoint(makeRequest(''))).status, 403);
  }
});

test('optional origin override supports an internal proxy URL', async () => {
  const endpoint = createEnquiryEndpoint({ env: { ...env, ENQUIRY_ALLOWED_ORIGIN: 'https://www.sairamsanskruthividhyalaya.com' }, fetchImpl: async () => Response.json(saved) });
  const data = await submission();
  const makeRequest = origin => new Request('http://internal:3000/api/enquiry', {
    method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json' }, body: JSON.stringify(data),
  });
  assert.equal((await endpoint(makeRequest('https://www.sairamsanskruthividhyalaya.com'))).status, 200);
  assert.equal((await endpoint(makeRequest('http://internal:3000'))).status, 403);
});

test('receipt reuse stores no personal details and changed data gets a new receipt', async () => {
  const map = new Map();
  globalThis.sessionStorage = { getItem: key => map.get(key), setItem: (key, value) => map.set(key, value) };
  try {
    const receipt = await getReceipt(fields);
    assert.equal(await getReceipt(fields), receipt);
    assert.notEqual(await getReceipt({ ...fields, childName: 'Other' }), receipt);
    assert(![...map.values()].some(value => value.includes(fields.phone)));
  } finally { delete globalThis.sessionStorage; }
});

test('timeouts are bounded and unconfirmed status never becomes success', async () => {
  const never = () => new Promise(() => {}), data = await submission();
  assert.equal((await createEnquiryEndpoint({ env, fetchImpl: never, timeoutMs: 10 })(request(data))).status, 502);
  assert.equal((await submitEnquiry(fields, data.receipt, never, 10)).ok, false);
  assert.equal((await submitEnquiry(fields, data.receipt, async () => Response.json({ ok: false, code: 'NOT_FOUND' }))).ok, false);
});
