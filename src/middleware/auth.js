// 認証ミドルウェア雛形
// 内部トークン検証

function authMiddleware(req, res, next) {
  // TODO: トークン検証ロジック
  // req.headers['x-internal-token'] など
  next();
}

module.exports = authMiddleware;
