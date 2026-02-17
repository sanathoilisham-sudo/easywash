/**
 * Google Apps Script — EasyWash 999 Subscription Form → Google Sheets
 *
 * SETUP INSTRUCTIONS:
 * ==================
 * 1. Go to https://sheets.google.com and create a new Google Sheet
 * 2. Name it "EasyWash 999 Subscriptions"
 * 3. In Row 1, add these headers: Timestamp | Name | Phone | Address | Status
 * 4. Go to Extensions → Apps Script
 * 5. Delete any existing code and paste this entire script
 * 6. Click Deploy → New Deployment
 * 7. Select type: "Web app"
 * 8. Set "Execute as": Me
 * 9. Set "Who has access": Anyone
 * 10. Click Deploy and copy the Web App URL
 * 11. Replace 'YOUR_GOOGLE_SCRIPT_URL_HERE' in index.html with the URL
 *
 * That's it! Form submissions will now appear in your Google Sheet.
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.phone || '',
      data.address || '',
      'New'  // Status column — you can update this manually
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput('EasyWash 999 Subscription endpoint is active.')
    .setMimeType(ContentService.MimeType.TEXT);
}
