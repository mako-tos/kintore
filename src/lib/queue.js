// ジョブキューのプロトタイプ

class JobQueue {
  constructor() {
    this.jobs = [];
  }
  enqueue(job) {
    // TODO: ジョブ追加
    this.jobs.push(job);
  }
  process() {
    // TODO: ジョブ処理
    while (this.jobs.length > 0) {
      const job = this.jobs.shift();
      // ジョブ処理ロジック
    }
  }
}

module.exports = JobQueue;
