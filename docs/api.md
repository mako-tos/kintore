# API ドキュメント

## GET /v1/training-menus
- TrainingMenu 一覧を取得
- レスポンス例:
```json
[
  {
    "id": "uuid-1",
    "name": "ベンチプレス",
    "status": 0,
    "created_at": "2025-11-01T00:00:00Z",
    "updated_at": "2025-11-01T00:00:00Z"
  }
]
```

## GET /v1/training-records?date=
- 指定日の TrainingRecord 一覧を取得
- レスポンス例:
```json
[
  {
    "id": "rec-1",
    "trainingMenuId": "uuid-1",
    "trainingAt": "2025-11-01",
    "count": 10,
    "created_at": "2025-11-01T00:00:00Z"
  }
]
```
