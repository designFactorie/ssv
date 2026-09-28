# SSV enquiry setup

The form posts to `/api/enquiry`; the Next.js server forwards validated data to a dedicated SSV Apps Script. Success appears only after a verified save acknowledgement. Deployment and real credentials are still required. Existing school scripts and tabs must not be replaced.

## 1. Prepare the SSV tab

Use the existing spreadsheet `12j_Rs6qbmOdJ_YgvaNf9gChZbgCbBUzm-mG-0EtNHTM`. Create a tab named exactly **SSV**, if it does not exist. Paste the following tab-separated line into A1 (each heading must occupy its own cell). Use straight apostrophes as shown.

```text
Date & Time	Institution	Parent's Name	Child's Name	Child's Age	Phone Number	Email	Interested Program	Message	Status	Notes
```

Columns A–K are the only columns written. Status and Notes start blank for staff. Institution is always `Sairam Sanskruthi Vidhyalaya`. Date & Time is an ISO-style text timestamp in Asia/Kolkata, sortable chronologically. Phone values and other inputs are stored as literal text, never formulas.

Each date cell also has a machine-readable **cell note** holding a receipt and timestamp. It is not another column and is separate from the staff Notes column. Preserve these date-cell notes and sort entire rows together: removing notes removes retry/cooldown tracking. Receipts are written atomically with the row. They are not proof of identity.

## 2. Create the standalone script

1. Sign in at https://script.google.com with an account that can edit the spreadsheet.
2. Create a **New project**, named **SSV Enquiry Integration**.
3. Replace its default Code.gs contents with the complete contents of `docs/enquiry-google-apps-script.gs` from this repository. Save.
4. In the editor, next to **Services**, click **+**. Select **Google Sheets API**, version **v4**, identifier **Sheets**, and click **Add**. This is required for the atomic row-and-note write. If using a manually assigned standard Google Cloud project, also enable Google Sheets API in that project's Cloud Console.
5. In **Project Settings → Script Properties**, add `ENQUIRY_SCRIPT_SECRET` with a long random value. Generate one locally with:

   ```powershell
   node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
   ```

   Keep this value private and use the same value on the website server. Do not paste it into source code or share it in chat.

## 3. Deploy the script

1. **Deploy → New deployment → Select type → Web app**.
2. **Execute as: Me** (the account with spreadsheet edit access).
3. **Who has access: Anyone**. If your Workspace policy disallows this option, ask the administrator; this integration requires server access without an interactive Google sign-in.
4. Authorize the script and deploy.
5. Copy the **Web app URL** ending in `/exec`, not the `/dev` test URL.

Do not make the spreadsheet public. Opening this POST-only web app in a browser does not test submission. Clicking Run on doPost in the editor provides no request event and returns validation failure.

When changing script code later: **Deploy → Manage deployments → Edit → Version: New version → Deploy**. Keep the deployment URL or update the site's environment if you create a new deployment.

## 4. Configure the website locally

Copy `.env.example` to `.env.local` in `C:\SSV` and replace the deployment URL and secret. If `.env.local` already exists, add/update only these entries instead of overwriting it:

```dotenv
ENQUIRY_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
ENQUIRY_SCRIPT_SECRET=YOUR_SCRIPT_PROPERTY_VALUE
```

Restart the dev server using `npm.cmd run dev`. Open http://localhost:3000/contact (or the port printed by Next.js). The server automatically checks that browser submissions come from the same origin as the request URL.

## 5. Configure production

The host must support Next.js server routes (for example a Next.js deployment on Vercel or `next start` on Node), not static-only file hosting. Set only `ENQUIRY_SCRIPT_URL` and `ENQUIRY_SCRIPT_SECRET` in the hosting dashboard and deploy the updated code. No origin environment variable is required for normal same-origin hosting. Remove any previously configured `ENQUIRY_ALLOWED_ORIGIN` so an old value does not override automatic detection. Test at https://www.sairamsanskruthividhyalaya.com/contact after deployment.

For a custom reverse proxy that exposes an internal URL to Next.js, the optional `ENQUIRY_ALLOWED_ORIGIN` override remains supported. Use it only if the public origin differs from the server request URL; set the exact public origin with no trailing slash. Incoming browser Origin headers are never used as the trusted expected origin.

Never prefix the secret with `NEXT_PUBLIC_`. The secret is added only by the server. No email or WhatsApp message is automatically sent by this integration; the separate contact links remain available.

## 6. Verify before launch

Terminal diagnostics (run from `C:\SSV`; credentials are read from `.env.local` and never printed):

```powershell
# Read-only Apps Script check; NOT_FOUND is expected for the new test receipt.
node scripts/check-enquiry.mjs
# Actually submit one labelled test enquiry, confirm its status, and retry the same receipt.
node scripts/check-enquiry.mjs --submit
# Test through the running local website; change the port to the one Next.js printed.
node scripts/check-enquiry.mjs --site=http://localhost:3002 --submit
# Read-only check of the deployed website endpoint.
node scripts/check-enquiry.mjs --site=https://www.sairamsanskruthividhyalaya.com
```

`--submit` can create a row labelled `SSV Integration Test - Please Ignore`. Separate test runs use new receipts and the same test phone, so wait a minute between successful runs. `SHEETS_SERVICE` means Google Sheets API must be added in the SSV Apps Script editor under **Services → +**, using identifier **Sheets**, followed by a new deployment version. An HTTP 404 from the website means the API route has not been deployed at that address.

- In the Apps Script editor, select `checkSetup` and click **Run**. The execution log should show `true` for `secretConfigured`, `sheetsServiceEnabled`, `sheetFound`, and `headersMatch`. This check does not add rows. If `sheetsServiceEnabled` is false, add Google Sheets API under Services before testing a submission.

- Submit a clearly marked test enquiry. Confirm one row in **SSV**, exactly A–K, and correct child and parent fields.
- Check optional email, program, and message can be blank. Age accepts years such as `3`, `3 years`, or `2.5`, above 0 and up to 12. Phone accepts ten digits or a formatted +91 number.
- Check successful submissions show confirmation and other school tabs are unchanged.
- Repeated retries of unchanged data reuse the receipt. A different request from the same phone is limited to one per minute. Staff can edit Status and Notes.
- Run `npm.cmd test`, `npm.cmd run lint`, and `npm.cmd run build` for local verification. Automated tests simulate Google; a live submission is still necessary after deployment.

If the site says online requests are unavailable, check the exact headings, tab name, deployment URL, and secret. If the page cannot submit because of an origin mismatch, check the reverse proxy configuration described above. If it cannot confirm a request, check the Apps Script **Executions** panel and that **Sheets** is enabled. Retry unchanged details to check the same receipt rather than entering a new request. No success is displayed for unconfirmed responses.

Origin checks and a per-phone cooldown reduce accidental or repeated submissions; they are not comprehensive bot protection. The script scans existing SSV date notes/phone cells for receipts and cooldowns, so this setup is intended for modest school-enquiry volume. Configure stronger abuse protection if traffic warrants it.

References: [Web app deployment](https://developers.google.com/apps-script/guides/web), [Advanced Sheets service](https://developers.google.com/apps-script/advanced/sheets), [Atomic batch requests](https://developers.google.com/workspace/sheets/api/guides/batch).
