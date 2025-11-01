# 実装計画: サーバサイド機能

**Branch**: `1-server-backend` | **Date**: 2025-11-01 | **Spec**: ../spec.md

## サマリ
この計画は `specs/1-server-backend/spec.md` に基づき、TrainingMenu と TrainingRecord に関するサーバサイドの最小実装を定義します。主な成果物は以下です:

- HTTP API（内部クライアント向け、JSON入出力）
- バックグラウンドジョブ処理（長時間処理の非同期化）
- コントラクトテストと自動化された品質ゲート
- 可観測性（構造化ログ、メトリクス、相関ID）

目標: ステージング環境での機能検証とCIでのコントラクトテスト合格をもって本段階を完了とする。

## 技術コンテキスト

**プラットフォーム/言語**: Google Apps Script（仕様の FR-001 を踏襲）

**永続ストレージ**: Google Sheets

**テスト**: ユニットテスト、コントラクトテスト（HTTPリクエスト/レスポンス検証）、簡易統合テスト

**デプロイ**: GAS のスクリプトデプロイ

**観測/監視**: Cloud Logging

**認証**: 内部ネットワーク限定（ベストエフォート）: ネットワークアクセス制御、シークレットストアを利用したサービス間トークン

**プロジェクト種別**: 単一プロジェクト（GAS プロジェクト）

## Constitution Check

- テスト: 各公開エンドポイントはコントラクトテストで検証すること（必須）。
- インターフェース: API は JSON を基本とし、仕様書に記載されたフィールドを厳守すること。
- 可観測性: 主要パスで構造化ログと相関IDを出力すること。
- バージョン管理: 公開APIは `/v1/` を想定し、破壊的変更は MAJOR バージョンとする。

Any deviation must be documented in plan and approved by maintainer.

## API エンドポイント（初期版）

### TrainingMenu

- GET /v1/training-menus
  - 概要: 有効な TrainingMenu の一覧取得
  - クエリ: none
  - レスポンス: 200, JSON array of TrainingMenu

- POST /v1/training-menus
  - 概要: TrainingMenu の作成
  - ボディ: {"name": string}
  - レスポンス: 201, {"id": string, "name": string, "status": 0}

- PUT /v1/training-menus/{id}
  - 概要: TrainingMenu の更新（id はサーバ生成 UUID）
  - ボディ: {"name": string}
  - レスポンス: 200, updated resource

- DELETE /v1/training-menus/{id}
  - 概要: 論理削除（status を 1 に変更）
  - レスポンス: 204

### TrainingRecord

- GET /v1/training-records?date=YYYY-MM-DD
  - 概要: 指定日の TrainingRecord を返す（TrainingMenu と紐づけて返す）
  - レスポンス: 200, JSON array

- POST /v1/training-records/batch
  - 概要: TrainingRecord 配列を一括登録
  - ボディ: [{"trainingMenuId": string, "trainingAt": string, "count": number}, ...]
  - レスポンス: 202, {"jobId": string}

### Jobs

- GET /v1/jobs/{jobId}
  - 概要: バックグラウンドジョブの状態取得
  - レスポンス: 200, {"id": string, "status": "pending|running|completed|failed", "attempts": number}

## データモデル（要点）

### TrainingMenu
- id: string (UUIDv4, サーバ生成)
- name: string
- status: number (0=有効, 1=無効)
- created_at: string (ISO 8601)
- updated_at: string (ISO 8601)

### TrainingRecord
- id: string (UUIDv4, サーバ生成)
- trainingMenuId: string (TrainingMenu.id)
- trainingAt: string (ISO 8601)
- count: number (>=1)
- created_at: string

※ 削除は物理削除禁止。status=1 に設定して論理削除とする。

## テストマトリクス

- 単体テスト
  - 入力バリデーション、ビジネスルール（count >=1 等）、エラー条件
- コントラクトテスト（必須）
  - 各エンドポイントのリクエスト/レスポンス形状、HTTPステータス、エラー形式
- 統合テスト
  - バックグラウンドジョブの投入・完了・リトライシナリオ
  - データ永続化の整合性テスト
- CI: コントラクトテストは必須ゲート（失敗でマージ不可）

## 可観測性・運用

- 全リクエストに相関IDを付与し、ログに同IDを含める
- エラー時には構造化ログ（error.code, error.message, stack）を出力
- メトリクス: request_count, error_count, request_latency_ms を収集
- ジョブ監視: job_success_rate, job_retry_count

## 非機能目標

- レイテンシ: 代表的な読み取りリクエストの95%が 500ms 以下（ステージング測定）
- 可用性: 本イテレーションはベストエフォート（SLA未設定）

## セキュリティ

- 内部ネットワーク限定アクセス前提。サービス間トークンを検証するミドルウェアの設置を推奨。
- 秘密情報はプラットフォームのシークレットストアを利用する。

## 制約・リスク

- Google Apps Script 上での永続化選択肢により、スケールやクエリ性能が大きく変動する。実装前にストレージ選定が必要。
- 実運用で外部公開が必要になった場合は、OAuth2/OIDC の導入と API バージョニング計画が必要。

## プロジェクト構成（提案）

```
specs/1-server-backend/
├── spec.md
├── plan.md       # ← このファイル
├── research.md   # 必要なら作成
├── tasks.md      # 実装タスク（speckit.tasks で生成）
└── checklists/
    └── requirements.md
```

## 実装ステップ（短期）

1. ストレージ選定と小規模 PoC（選択肢: Google Sheets / Firestore）
2. API エンドポイントの骨組み実装（GET/POST/PUT/DELETE）
3. コントラクトテストの作成・CI 組み込み
4. バックグラウンドジョブの実装（キューとワーカー）
5. ロギング・メトリクスの組み込み
6. ステージング負荷試験で成功基準を検証

## 複雑性トラッキング

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| 外部DB導入 | パフォーマンスとスケールのため | Google Sheets は小規模で良いが長期運用で性能限界がある |

## チェックポイント

- Foundation: ストレージ選定と基本 API の実装完了
- Contract tests: すべての公開エンドポイントに対して合格
- Observability: ログ・メトリクスが収集され、アラートが設定されている


---

## 追記・注意点
- 本計画は仕様 `spec.md` に基づく草案です。技術的制約や運用要件に応じて柔軟に更新してください。

