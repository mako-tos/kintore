// ストレージアダプタのインターフェース
// read/write/scan API の雛形

class StorageAdapter {
  read(key) {
    // TODO: 実装
    throw new Error('Not implemented');
  }
  write(key, value) {
    // TODO: 実装
    throw new Error('Not implemented');
  }
  scan(query) {
    // TODO: 実装
    throw new Error('Not implemented');
  }
}

module.exports = StorageAdapter;
