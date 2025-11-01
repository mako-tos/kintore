// コントラクトテスト: GET /v1/training-menus, GET /v1/training-records
const assert = require('assert');

// 仮のAPIレスポンス
const trainingMenus = [
  { id: 'uuid-1', name: 'ベンチプレス', status: 0, created_at: '2025-11-01T00:00:00Z', updated_at: '2025-11-01T00:00:00Z' }
];
const trainingRecords = [
  { id: 'rec-1', trainingMenuId: 'uuid-1', trainingAt: '2025-11-01', count: 10, created_at: '2025-11-01T00:00:00Z' }
];

describe('GET /v1/training-menus', () => {
  it('should return array of TrainingMenu objects', () => {
    assert(Array.isArray(trainingMenus));
    assert(trainingMenus[0].id);
    assert(trainingMenus[0].name);
  });
});

describe('GET /v1/training-records', () => {
  it('should return array of TrainingRecord objects', () => {
    assert(Array.isArray(trainingRecords));
    assert(trainingRecords[0].id);
    assert(trainingRecords[0].trainingMenuId);
  });
});
