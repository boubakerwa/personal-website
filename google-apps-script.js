// This code goes in Google Apps Script
function doPost(e) {
  // Get the spreadsheet and the active sheet
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();
  
  // Parse the incoming data
  const data = JSON.parse(e.postData.contents);
  
  // Format timestamp to local date/time
  const timestamp = new Date(data.timestamp);
  
  // Prepare row data
  const rowData = [
    timestamp,
    data.email,
    data.formType,
    data.ebookTitle || 'N/A'  // Use N/A if no ebook title
  ];
  
  // Append the data to the sheet
  sheet.appendRow(rowData);
  
  // Return success response
  return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Optional: Add headers when setting up the sheet
function setupSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();
  
  // Add headers
  sheet.getRange('A1:D1').setValues([['Timestamp', 'Email', 'Form Type', 'Ebook Title']]);
  
  // Format timestamp column
  sheet.getRange('A:A').setNumberFormat('yyyy-mm-dd hh:mm:ss');
  
  // Freeze header row
  sheet.setFrozenRows(1);
  
  // Auto-resize columns
  sheet.autoResizeColumns(1, 4);
}
