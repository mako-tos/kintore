// GET /v1/training-menus ルート雛形
const TrainingMenu = require('../models/trainingMenu');

function getTrainingMenus(req, res) {
  // TODO: TrainingMenu一覧取得ロジック
  // 仮データ
  const menus = [
    new TrainingMenu({
      id: 'uuid-1',
      name: 'ベンチプレス',
      status: 0,
      created_at: '2025-11-01T00:00:00Z',
      updated_at: '2025-11-01T00:00:00Z'
    })
  ];
  res.json(menus);
}

module.exports = { getTrainingMenus };
