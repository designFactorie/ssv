// Defaults to a read-only status check. --submit sends one clearly labelled test enquiry.
import nextEnv from '@next/env';
import { randomUUID } from 'node:crypto';
import { enquiryHash } from '../src/lib/enquiry.mjs';

nextEnv.loadEnvConfig(process.cwd());
const args = process.argv.slice(2);
const site = args.find(arg => arg.startsWith('--site='))?.slice(7);
const submit = args.includes('--submit');
if (args.some(arg => arg !== '--submit' && !arg.startsWith('--site='))) {
  console.error('Usage: node scripts/check-enquiry.mjs [--site=http://localhost:3002] [--submit]');
  process.exit(1);
}
const scriptUrl = process.env.ENQUIRY_SCRIPT_URL;
if (!site && (!/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(scriptUrl || '') || !process.env.ENQUIRY_SCRIPT_SECRET)) {
  console.error('CONFIG: set a valid ENQUIRY_SCRIPT_URL and ENQUIRY_SCRIPT_SECRET in .env.local.');
  process.exit(1);
}
const origin = site ? new URL(site).origin : null;
const url = origin ? `${origin}/api/enquiry` : scriptUrl;
const fields = { parentName: 'SSV Integration Test - Please Ignore', childName: 'Test Child', childAge: '3',
  phone: '0000000000', email: '', program: 'Nursery (3-4 years)',
  message: 'Automated integration test requested by site owner. Not a real enquiry. Please ignore.' };
const receipt = `${randomUUID()}:${await enquiryHash(fields)}`;
const explanations = {
  SAVED: 'The script confirms this test enquiry is saved.',
  NOT_FOUND: 'No row exists for this test receipt. Expected for a read-only check before submission.',
  SHEETS_SERVICE: 'Google Sheets API is missing in Apps Script Services. Add it with identifier Sheets and deploy a new version.',
  HEADERS: 'The SSV tab headings do not exactly match the script.',
  SHEET: 'The SSV tab was not found.',
  AUTH: 'The website secret does not match the Apps Script property, or the property is missing.',
  INSTITUTION: 'This deployment belongs to a different institution.',
  CONFIG: 'Website configuration failed. Run this command without --site to get the direct Apps Script reason.',
  ORIGIN: 'The website rejected this request origin.',
  RATE_LIMIT: 'The test phone was used within the last minute. Wait 60 seconds before another test.',
  UNKNOWN: 'Save status is uncertain. Check the status result and Apps Script Executions.',
};
async function send(action) {
  const data = { ...(action === 'submit' ? fields : {}), action, receipt };
  if (!site) { data.institution = 'SSV'; data.secret = process.env.ENQUIRY_SCRIPT_SECRET; }
  try {
    const response = await fetch(url, { method: 'POST', signal: AbortSignal.timeout(35000),
      headers: { 'Content-Type': 'application/json', ...(origin ? { Origin: origin } : {}) }, body: JSON.stringify(data) });
    let result;
    try { result = await response.json(); } catch {
      console.log(`${action}: HTTP ${response.status}, non-JSON response. ${response.status === 404 ? 'The enquiry endpoint is not deployed at this address.' : 'Check the deployment URL and web app access permissions.'}`);
      return false;
    }
    // Never print arbitrary upstream response bodies, credentials, or deployment URLs.
    const code = Object.hasOwn(explanations, result?.code) ? result.code : 'UNRECOGNIZED';
    const confirmed = result?.ok === true && code === 'SAVED' && (site || (result.protocol === 1 && result.institution === 'SSV'));
    console.log(`${action}: HTTP ${response.status}, ${code}. ${explanations[code] || 'Unexpected response.'}`);
    return Boolean(response.ok && (confirmed || (!submit && code === 'NOT_FOUND')));
  } catch (error) {
    console.log(`${action}: request failed (${error.name}${error.cause?.code ? `, ${error.cause.code}` : ''}).`);
    return false;
  }
}
console.log(site ? `Checking website endpoint at ${origin}` : 'Checking configured Apps Script (credentials are not printed).');
if (submit) {
  const saved = await send('submit');
  const confirmed = await send('status');
  if (saved && confirmed) {
    console.log('Checking that retrying the same receipt does not create another enquiry.');
    process.exitCode = await send('submit') ? 0 : 1;
  } else { process.exitCode = confirmed ? 0 : 1; }
} else { process.exitCode = await send('status') ? 0 : 1; }
