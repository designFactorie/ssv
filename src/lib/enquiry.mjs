export const PROGRAMS = ['Play Group (2-3 years)', 'Nursery (3-4 years)', 'LKG (4-5 years)', 'UKG (5-6 years)', 'Day Care (2-12 years)'];
export const FIELDS = ['parentName', 'childName', 'childAge', 'phone', 'email', 'program', 'message'];
export const RECEIPT_PATTERN = /^[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}:[A-Za-z0-9_-]{43}$/;

/** @param {unknown} input */
export function normalizeEnquiry(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null;
  const data = /** @type {Record<string, unknown>} */ (input);
  if (FIELDS.some(key => typeof data[key] !== 'string')) return null;
  const values = Object.fromEntries(FIELDS.map(key => [key, /** @type {string} */ (data[key]).trim()]));
  const { parentName, childName, childAge, email, program, message } = values;
  let phone = values.phone.replace(/[\s()-]/g, '');
  if (phone.startsWith('+91')) phone = phone.slice(3);
  if (!parentName || parentName.length > 120 || !childName || childName.length > 120 ||
      !/^(?:\d{1,2}(?:\.\d)?)(?:\s*(?:years?|yrs?))?$/i.test(childAge) ||
      parseFloat(childAge) <= 0 || parseFloat(childAge) > 12 || !/^\d{10}$/.test(phone) ||
      email.length > 254 || (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) ||
      (program && !PROGRAMS.includes(program)) || message.length > 3000) return null;
  return { parentName, childName, childAge, phone, email, program, message };
}

/** @param {Record<string, string>} data */
export const fingerprint = data => JSON.stringify(FIELDS.map(key => data[key]));

/** @param {Record<string, string>} data */
export async function enquiryHash(data) {
  const bytes = new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(fingerprint(data))));
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/** Stores only a receipt, never the form's personal details. @param {Record<string, string>} data */
export async function getReceipt(data) {
  const hash = await enquiryHash(data);
  let old;
  try { old = sessionStorage.getItem('ssv-enquiry-receipt'); } catch { /* Storage may be disabled. */ }
  if (old && RECEIPT_PATTERN.test(old) && old.split(':')[1] === hash) return old;
  const receipt = `${crypto.randomUUID()}:${hash}`;
  try { sessionStorage.setItem('ssv-enquiry-receipt', receipt); } catch { /* Caller keeps an in-memory copy. */ }
  return receipt;
}

/** @template T @param {(signal: AbortSignal) => Promise<T>} task @param {number} ms */
export async function withDeadline(task, ms) {
  const controller = new AbortController();
  let timer;
  try {
    return await Promise.race([task(controller.signal), new Promise((_, reject) => {
      timer = setTimeout(() => { controller.abort(); reject(new Error('Timeout')); }, ms);
    })]);
  } finally { clearTimeout(timer); }
}

/** @param {Record<string, string>} data @param {string} receipt */
export async function submitEnquiry(data, receipt, fetchImpl = fetch, timeoutMs = 25000) {
  const send = async (action) => {
    try {
      return await withDeadline(async signal => {
        const response = await fetchImpl('/api/enquiry', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, signal,
          body: JSON.stringify(action === 'submit' ? { ...data, receipt, action } : { receipt, action }),
        });
        const result = await response.json();
        if (response.ok && result.ok === true && result.code === 'SAVED') return { ok: true, code: 'SAVED' };
        return { ok: false, code: result.ok === false && typeof result.code === 'string' ? result.code : 'UNKNOWN' };
      }, timeoutMs);
    } catch { return { ok: false, code: 'UNKNOWN' }; }
  };
  const result = await send('submit');
  if (result.code !== 'UNKNOWN') return result;
  const status = await send('status');
  return status.ok ? status : { ok: false, code: 'UNKNOWN' };
}
