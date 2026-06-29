/**
 * HummingBeing Lead Capture — Google Apps Script
 *
 * HOW TO DEPLOY:
 * 1. Open Google Sheets → Extensions → Apps Script
 * 2. Paste this entire file
 * 3. Click Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copy the Web App URL
 * 5. Paste the URL into the GAS_URL variable in all 3 landing pages
 *
 * SHEET SETUP:
 * The sheet named "Leads" will be created automatically on first submission.
 * Columns: Timestamp | Name | Email | Phone | Event | Source
 *
 * EMAIL NOTIFICATIONS:
 * Change NOTIFY_EMAIL below to receive an email for each new lead.
 */

var NOTIFY_EMAIL = 'hello@technext.asia';
var SHEET_NAME   = 'Leads';

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    appendToSheet(data);
    sendNotification(data);
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('HummingBeing lead capture endpoint is live.')
    .setMimeType(ContentService.MimeType.TEXT);
}

function appendToSheet(data) {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['Timestamp', 'Name', 'Email', 'Phone', 'Event', 'Source']);
    sheet.getRange(1, 1, 1, 6).setFontWeight('bold');
  }

  sheet.appendRow([
    new Date(),
    data.name  || '',
    data.email || '',
    data.phone || '',
    data.event || '',
    data.source || ''
  ]);
}

function sendNotification(data) {
  var subject = 'New Enquiry' + (data.event ? ' — ' + data.event : '') + ' | HummingBeing';
  var body = [
    'New enquiry received from the HummingBeing website.',
    '',
    'Name:   ' + (data.name  || '—'),
    'Email:  ' + (data.email || '—'),
    'Phone:  ' + (data.phone || '—'),
    'Event:  ' + (data.event || '—'),
    'Source: ' + (data.source || '—'),
    '',
    'Submitted: ' + new Date().toLocaleString('en-SG', { timeZone: 'Asia/Singapore' }) + ' SGT'
  ].join('\n');

  MailApp.sendEmail(NOTIFY_EMAIL, subject, body);
}
