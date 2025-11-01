// 単体テスト: TrainingRecord モデル
const TrainingRecord = require('../../src/models/trainingRecord');
const assert = require('assert');

describe('TrainingRecord', () => {
  it('should create instance with correct fields', () => {
    const record = new TrainingRecord({
      id: 'rec-1',
      trainingMenuId: 'uuid-1',
      trainingAt: '2025-11-01',
      count: 10,
      created_at: '2025-11-01T00:00:00Z'
    });
    assert.strictEqual(record.id, 'rec-1');
    assert.strictEqual(record.trainingMenuId, 'uuid-1');
    assert.strictEqual(record.trainingAt, '2025-11-01');
    assert.strictEqual(record.count, 10);
  });
});
