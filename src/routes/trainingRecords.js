// GET /v1/training-records ルート雛形
const TrainingRecord = require('../models/trainingRecord');

function getTrainingRecords(req, res) {
  // TODO: TrainingRecord一覧取得ロジック
  // クエリ例: ?date=2025-11-01
  const { date } = req.query;
  // 仮データ
  const records = [
    new TrainingRecord({
      id: 'rec-1',
      trainingMenuId: 'uuid-1',
      trainingAt: date || '2025-11-01',
      count: 10,
      created_at: '2025-11-01T00:00:00Z'
    })
  ];
  res.json(records);
}

module.exports = { getTrainingRecords };
