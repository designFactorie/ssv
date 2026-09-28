import { normalizeEnquiry, enquiryHash, RECEIPT_PATTERN, withDeadline } from './enquiry.mjs';

const reply = (code, status = 200) => Response.json({ ok: code === 'SAVED', code }, {
  status, headers: { 'Cache-Control': 'no-store' },
});

export function createEnquiryEndpoint({ env = process.env, fetchImpl = fetch, timeoutMs = 18000 } = {}) {
  return async function post(request) {
    if (request.method !== 'POST') return reply('METHOD', 405);
    // Same-origin requests work locally and in production without extra configuration.
    // An optional override supports proxies whose internal request URL differs from the public URL.
    const origin = env.ENQUIRY_ALLOWED_ORIGIN || new URL(request.url).origin;
    if (request.headers.get('origin') !== origin) return reply('ORIGIN', 403);
    if (request.headers.get('content-type')?.split(';')[0].trim() !== 'application/json') return reply('VALIDATION', 415);
    let data;
    try {
      // Bound bytes while reading, including chunked requests without Content-Length.
      const reader = request.body?.getReader();
      if (!reader) return reply('VALIDATION', 400);
      let body = '', size = 0;
      const decoder = new TextDecoder();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          size += value.byteLength;
          if (size > 24000) { void reader.cancel(); return reply('SIZE', 413); }
          body += decoder.decode(value, { stream: true });
        }
      } finally { reader.releaseLock(); }
      data = JSON.parse(body + decoder.decode());
    } catch { return reply('VALIDATION', 400); }
    if (!data || typeof data !== 'object' || Array.isArray(data) ||
        typeof data.receipt !== 'string' || !RECEIPT_PATTERN.test(data.receipt) ||
        !['submit', 'status'].includes(data.action)) return reply('VALIDATION', 400);
    const fields = data.action === 'submit' ? normalizeEnquiry(data) : {};
    if (!fields || (data.action === 'submit' && data.receipt.split(':')[1] !== await enquiryHash(fields))) return reply('VALIDATION', 400);
    if (!/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(env.ENQUIRY_SCRIPT_URL || '') ||
        !env.ENQUIRY_SCRIPT_SECRET) return reply('CONFIG', 503);
    try {
      const result = await withDeadline(async signal => {
        const response = await fetchImpl(env.ENQUIRY_SCRIPT_URL, {
          method: 'POST', redirect: 'follow', cache: 'no-store', signal,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...fields, action: data.action, receipt: data.receipt,
            institution: 'SSV', secret: env.ENQUIRY_SCRIPT_SECRET }),
        });
        if (!response.ok) throw new Error('Upstream');
        return response.json();
      }, timeoutMs);
      if (result?.protocol !== 1 || result?.institution !== 'SSV') return reply('UNKNOWN', 502);
      if (result.ok === true && result.code === 'SAVED') return reply('SAVED');
      if (result.ok !== false) return reply('UNKNOWN', 502);
      if (result.code === 'NOT_FOUND' && data.action === 'status') return reply('NOT_FOUND');
      if (result.code === 'RATE_LIMIT') return reply('RATE_LIMIT', 429);
      if (result.code === 'SHEETS_SERVICE') return reply('CONFIG', 503);
      if (['AUTH', 'INSTITUTION', 'SHEET', 'HEADERS'].includes(result.code)) return reply('CONFIG', 503);
      if (['VALIDATION', 'INVALID_RECEIPT', 'ACTION'].includes(result.code)) return reply('VALIDATION', 400);
      return reply('UNKNOWN', 502);
    } catch { return reply('UNKNOWN', 502); }
  };
}
