// 単体テスト: TrainingMenu モデル
const TrainingMenu = require('../../src/models/trainingMenu');
const assert = require('assert');

describe('TrainingMenu', () => {
  it('should create instance with correct fields', () => {
    const menu = new TrainingMenu({
      id: 'uuid-1',
      name: 'ベンチプレス',
      status: 0,
      created_at: '2025-11-01T00:00:00Z',
      updated_at: '2025-11-01T00:00:00Z'
    });
    assert.strictEqual(menu.id, 'uuid-1');
    assert.strictEqual(menu.name, 'ベンチプレス');
    assert.strictEqual(menu.status, 0);
  });
});
