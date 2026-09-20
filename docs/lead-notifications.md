# Lead notifications

The contact form posts to a Google Apps Script web app. The script appends the
enquiry to a Google Sheet and emails the studio. No third-party service, no
monthly submission cap, and every lead is logged whether or not the email
arrives.

    ContactForm ──▶ LeadTransport ──▶ Apps Script ──┬──▶ Leads sheet
                    (interface)        (/exec)      └──▶ email to the studio

## Why this shape

The sheet is the system of record. Email is a notification on top of it, so a
missed or filtered email is still a lead the studio can find. The form depends
on the `LeadTransport` interface in `src/services/leads/types.ts`, so swapping
Apps Script for a serverless function later is one new file and one line in
`src/services/leads/index.ts` — nothing in the form changes.

## Setup — about fifteen minutes, once

Do all of this while signed in as **hiranmayemarketing@gmail.com**, so the
sheet and the script belong to the business rather than to a developer.

1. **Create the sheet.** New Google Sheet, name it `Hiranmaye — Website Leads`.
   Leave it empty; the script creates the `Leads` tab and its header row on the
   first submission.

2. **Open the script editor.** In that sheet: **Extensions → Apps Script**.
   Delete the placeholder `myFunction`, paste in all of
   `scripts/lead-notify.gs`, and rename the project to `Lead notifier`.

3. **Set the recipients.** At the top of the script, `NOTIFY` is the list of
   addresses that get the email. Add more in the array to notify several
   people:

   ```js
   var NOTIFY = ['hiranmayemarketing@gmail.com', 'someone@hiranmayedigital.com'];
   ```

4. **Optional — set a token.** Put any random string in `SHARED_TOKEN` and the
   same string in `VITE_LEAD_TOKEN`. It stops drive-by scripts that find the
   endpoint URL, which is public by nature. It is not a secret: the site ships
   it in the bundle. Leave both empty to skip.

5. **Deploy.** **Deploy → New deployment → gear icon → Web app**, then:

   - Description: `v1`
   - Execute as: **Me**
   - Who has access: **Anyone**

   "Anyone" is required — the browser posts without a Google session. The
   script only ever writes to the sheet and sends mail, so the exposure is
   bounded by what it does, not by who can call it.

6. **Authorise it.** Google will warn that the app is unverified because it is
   a personal script. **Advanced → Go to Lead notifier (unsafe) → Allow.** It
   asks for permission to manage the spreadsheet and send email as the account,
   which is exactly what it does.

7. **Copy the URL.** The deployment shows a **Web app URL** ending in `/exec`.
   Put it in `.env.local` at the project root:

   ```
   VITE_LEAD_ENDPOINT=https://script.google.com/macros/s/AKfy…/exec
   VITE_LEAD_TOKEN=
   ```

8. **Set it in the host too.** `.env.local` is git-ignored and only affects
   local builds. Add the same two variables in the hosting dashboard
   (Vercel/Netlify → Environment Variables) and redeploy, or the live form will
   fail.

## Verifying

Open the deployment URL in a browser. A healthy script answers:

```json
{"ok":true,"service":"hiranmaye-lead-notify"}
```

Then submit the real form once. Within a few seconds there should be a row in
the sheet and an email in the inbox. If the row appears but the email does not,
check spam — the first one from a new script often lands there, and marking it
"not spam" once fixes it for good.

## Redeploying after a script change

Editing the script is not enough; a web app serves the deployed snapshot.
**Deploy → Manage deployments → pencil icon → Version: New version → Deploy.**
Use the same deployment rather than creating a new one — a new deployment gets
a new URL, which then has to be updated everywhere.

## Limits worth knowing

| | Consumer Gmail | Google Workspace |
|---|---|---|
| Emails per day | 100 | 1,500 |
| Sheet rows | ~10 million cells per spreadsheet | same |

Submissions themselves are unlimited — only the notification email is capped,
and the sheet row is written first regardless. At 100 enquiries in a day the
studio has better problems than this script.

## Development

With no `VITE_LEAD_ENDPOINT` set, the form logs the payload to the console and
shows the success state, so the whole flow can be exercised without a backend.
A **production** build with no endpoint configured fails the submission
deliberately and shows the visitor the email fallback — a contact form that
silently swallows enquiries is worse than one that admits it is broken.

## Spam handling

Two filters, both invisible to visitors, both in `useContactForm`:

- a decoy `company_website` field positioned off-screen — bots fill it, people
  never see it
- a three-second floor on time-to-submit

A submission tripping either is shown the success screen and sent nowhere, so
the bot has nothing to learn from. If spam ever gets through, the next step is
Cloudflare Turnstile rather than a captcha.
