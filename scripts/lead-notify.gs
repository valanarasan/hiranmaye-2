/**
 * Hiranmaye Digital — lead notifier.
 *
 * Receives a contact-form submission, appends it to a sheet and emails the
 * studio a formatted notification with reply-to set to the enquirer, so the
 * whole exchange can start from the phone.
 *
 * Deploy: Extensions -> Apps Script from the target Sheet, paste this in,
 * then Deploy -> New deployment -> Web app, Execute as "Me",
 * Who has access "Anyone". Copy the /exec URL into VITE_LEAD_ENDPOINT.
 * See docs/lead-notifications.md for the full walkthrough.
 */

/** Tab the leads are written to. Created automatically if missing. */
var SHEET_NAME = 'Leads';

/** Everyone who should hear about a new enquiry. */
var NOTIFY = ['hiranmayemarketing@gmail.com'];

/**
 * Must match VITE_LEAD_TOKEN in the site build. Leave both empty to skip the
 * check. This is a spam speed bump, not a secret — the site ships it in the
 * bundle. Rotating it is a two-line change on both sides.
 */
var SHARED_TOKEN = '';

/** Column order. Changing this changes the sheet layout on the next write. */
var COLUMNS = [
  { key: 'receivedAt', label: 'Received' },
  { key: 'name', label: 'Name' },
  { key: 'company', label: 'Company' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'challenge', label: 'Challenge' },
  { key: 'message', label: 'Message' },
  { key: 'source', label: 'Source' },
  { key: 'pagePath', label: 'Page' },
  { key: 'referrer', label: 'Referrer' },
];

function doPost(e) {
  try {
    var payload = parseBody(e);

    if (SHARED_TOKEN && payload.token !== SHARED_TOKEN) {
      return json({ ok: false, error: 'Rejected.' });
    }

    var lead = normalise(payload);

    if (!lead.name || !lead.email) {
      return json({ ok: false, error: 'Name and email are required.' });
    }

    // The sheet is the system of record, so it is written first. If the email
    // quota is exhausted the lead still survives.
    appendRow(lead);
    notify(lead);

    return json({ ok: true });
  } catch (error) {
    console.error(error);
    return json({ ok: false, error: 'Server error.' });
  }
}

/** A browser hitting the URL directly gets a health check, not a stack trace. */
function doGet() {
  return json({ ok: true, service: 'hiranmaye-lead-notify' });
}

function parseBody(e) {
  if (!e || !e.postData || !e.postData.contents) return {};
  return JSON.parse(e.postData.contents);
}

function normalise(payload) {
  var lead = { receivedAt: new Date() };

  for (var i = 0; i < COLUMNS.length; i++) {
    var key = COLUMNS[i].key;
    if (key === 'receivedAt') continue;
    lead[key] = String(payload[key] == null ? '' : payload[key]).slice(0, 4000).trim();
  }

  return lead;
}

function getSheet() {
  var book = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = book.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = book.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    var headers = COLUMNS.map(function (column) {
      return column.label;
    });
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function appendRow(lead) {
  var sheet = getSheet();
  sheet.appendRow(
    COLUMNS.map(function (column) {
      return lead[column.key];
    }),
  );
}

function notify(lead) {
  var subject = 'New enquiry — ' + lead.name + (lead.company ? ' (' + lead.company + ')' : '');

  var lines = [
    lead.name + ' got in touch through the website.',
    '',
    'Email: ' + lead.email,
    'Phone: ' + (lead.phone || 'not given'),
    'Company: ' + (lead.company || 'not given'),
    'Challenge: ' + (lead.challenge || 'not selected'),
    '',
    'What they said:',
    lead.message,
    '',
    '---',
    'Page: ' + (lead.pagePath || '/'),
    'Referrer: ' + (lead.referrer || 'direct'),
    'Logged in the Leads sheet.',
  ];

  MailApp.sendEmail({
    to: NOTIFY.join(','),
    subject: subject,
    body: lines.join('\n'),
    htmlBody: htmlBody(lead),
    // Replying in Gmail goes straight to the enquirer.
    replyTo: lead.email,
    name: 'Hiranmaye Digital website',
  });
}

function htmlBody(lead) {
  var rows = [
    ['Email', '<a href="mailto:' + escapeHtml(lead.email) + '">' + escapeHtml(lead.email) + '</a>'],
    ['Phone', lead.phone ? '<a href="tel:' + escapeHtml(lead.phone) + '">' + escapeHtml(lead.phone) + '</a>' : 'not given'],
    ['Company', escapeHtml(lead.company) || 'not given'],
    ['Challenge', escapeHtml(lead.challenge) || 'not selected'],
    ['Page', escapeHtml(lead.pagePath) || '/'],
    ['Referrer', escapeHtml(lead.referrer) || 'direct'],
  ];

  var table = rows
    .map(function (row) {
      return (
        '<tr>' +
        '<td style="padding:6px 16px 6px 0;color:#63718a;font-size:13px;white-space:nowrap">' +
        row[0] +
        '</td>' +
        '<td style="padding:6px 0;color:#101f36;font-size:14px">' +
        row[1] +
        '</td>' +
        '</tr>'
      );
    })
    .join('');

  return (
    '<div style="font-family:-apple-system,Segoe UI,Helvetica,sans-serif;max-width:560px">' +
    '<p style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#cf9a28;margin:0 0 4px">New enquiry</p>' +
    '<h2 style="font-size:22px;margin:0 0 16px;color:#101f36">' +
    escapeHtml(lead.name) +
    '</h2>' +
    '<table style="border-collapse:collapse;margin-bottom:20px">' +
    table +
    '</table>' +
    '<div style="padding:16px;background:#f6f7fa;border-left:2px solid #cf9a28">' +
    '<p style="margin:0;color:#101f36;font-size:14px;line-height:1.6;white-space:pre-wrap">' +
    escapeHtml(lead.message) +
    '</p>' +
    '</div>' +
    '<p style="margin:20px 0 0;color:#94a0b4;font-size:12px">Reply to this email to answer them directly. Also logged in the Leads sheet.</p>' +
    '</div>'
  );
}

function escapeHtml(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function json(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
