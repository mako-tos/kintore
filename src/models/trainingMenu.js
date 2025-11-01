// TrainingMenu モデル
// id: UUIDv4, name, status, created_at, updated_at

class TrainingMenu {
  constructor({ id, name, status = 0, created_at, updated_at }) {
    this.id = id; // UUIDv4
    this.name = name;
    this.status = status; // 0: 有効, 1: 削除
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}

module.exports = TrainingMenu;
