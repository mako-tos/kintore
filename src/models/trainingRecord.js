// TrainingRecord モデル
// id, trainingMenuId, trainingAt, count, created_at

class TrainingRecord {
  constructor({ id, trainingMenuId, trainingAt, count, created_at }) {
    this.id = id;
    this.trainingMenuId = trainingMenuId;
    this.trainingAt = trainingAt; // 日付 or Date型
    this.count = count; // 回数
    this.created_at = created_at;
  }
}

module.exports = TrainingRecord;
