// ログ/トレース初期化ライブラリ
// 構造化ログ・相関ID・メトリクスの雛形

class Observability {
  static log(message, meta = {}) {
    // TODO: 構造化ログ出力
    console.log(JSON.stringify({ message, ...meta }));
  }
  static trace(id, info = {}) {
    // TODO: トレース出力
    console.log(JSON.stringify({ traceId: id, ...info }));
  }
  static metric(name, value) {
    // TODO: メトリクス出力
    console.log(JSON.stringify({ metric: name, value }));
  }
}

module.exports = Observability;
