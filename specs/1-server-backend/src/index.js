// エントリポイント（雛形）

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ message: 'GAS placeholder' }))
}

function doPost(e) {
  return ContentService.createTextOutput(JSON.stringify({ message: 'GAS placeholder' }))
}
