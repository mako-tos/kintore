---
description: "Task list for feature implementation (日本語)"
---

# タスク: サーバサイド機能

**Input**: `specs/1-server-backend/spec.md`
**Prerequisites**: `specs/1-server-backend/plan.md` (必須)

## フォーマット: `[ID] [P?] [Story] Description`

- **[P]**: 並列実行可能（別ファイル、依存関係なし）
- **[Story]**: どのユーザーストーリーに対応するか（例: [US1]）

---

## Phase 1: Setup (プロジェクト初期化)

- [ ] T001 プロジェクト構造を作成（`specs/1-server-backend/`, `src/`, `tests/`, `src/models/`, `src/routes/`, `src/lib/`, `src/workers/`, `docs/`）
- [ ] T002 GAS/実行環境の初期化ファイルを作成（`src/` にプロジェクトエントリ、`appsscript.json` の雛形）
- [ ] T003 CI ワークフローを追加（` .github/workflows/ci.yml`）
- [ ] T004 リンター/フォーマッタ設定を追加（`.eslintrc` または `.editorconfig` をリポジトリルートに作成）
- [ ] T005 ドキュメント初期化: `specs/1-server-backend/README.md` （計画サマリと実行手順）

---

## Phase 2: Foundational (基盤/ブロッキング前提)

- [ ] T006 Setup: ストレージ選定 PoC ドキュメント作成（`specs/1-server-backend/research.md`）
- [ ] T007 [P] ストレージアダプタのインターフェース作成（`src/adapters/storage.js` - read/write/scan API）
- [ ] T008 認証ミドルウェア雛形作成（`src/middleware/auth.js` - 内部トークン検証）
- [ ] T009 シークレット管理手順を文書化（`docs/security.md`）
- [ ] T010 [P] ログ/トレース初期化ライブラリ実装（`src/lib/observability.js`）
- [ ] T011 ジョブキューとワーカーのプロトタイプ作成（`src/lib/queue.js`, `src/workers/worker.js`）
- [ ] T012 テスト用のテストランナー/セットアップを追加（`tests/setupTests.js`）

---

## Phase 3: ユーザーストーリー実装（優先度順）

### Phase 3.1: User Story 1 - 初期表示データ読み込み (P1)

**Goal**: TrainingMenu / 当日の TrainingRecord を取得して表示できる API を提供する
**Independent Test**: コントラクトテストで GET /v1/training-menus と GET /v1/training-records?date= を検証

- [ ] T013 [US1] モデル: `src/models/trainingMenu.js` を作成（id: UUIDv4, name, status, created_at, updated_at）
- [ ] T014 [US1] モデル: `src/models/trainingRecord.js` を作成（id, trainingMenuId, trainingAt, count, created_at）
- [ ] T015 [US1] ルート: GET /v1/training-menus を実装 (`src/routes/trainingMenus.js`)
- [ ] T016 [US1] ルート: GET /v1/training-records を実装 (`src/routes/trainingRecords.js`)
- [ ] T017 [US1] [P] コントラクトテスト作成: `tests/contract/test_training_display.js`（GET エンドポイントのスキーマ検証）
- [ ] T018 [US1] 単体テスト: `tests/unit/test_models_trainingMenu.js` と `tests/unit/test_models_trainingRecord.js`
- [ ] T019 [US1] API ドキュメント更新: `docs/api.md` にエンドポイント記載

### Phase 3.2: User Story 2 - TrainingMenu 追加 (P2)

**Goal**: TrainingMenu の追加 API を実装
**Independent Test**: POST /v1/training-menus のコントラクトテスト

- [ ] T020 [US2] ルート: POST /v1/training-menus を実装 (`src/routes/trainingMenus.js`)
- [ ] T021 [US2] バリデーション: リクエスト検証ロジックを `src/lib/validation.js` に追加
- [ ] T022 [US2] コントラクトテスト: `tests/contract/test_create_trainingMenu.js`
- [ ] T023 [US2] 単体テスト: `tests/unit/test_create_trainingMenu_validation.js`

### Phase 3.3: User Story 3 - TrainingMenu 更新 (P3)

**Goal**: TrainingMenu の更新 API を実装
**Independent Test**: PUT /v1/training-menus/{id} のコントラクトテスト

- [ ] T024 [US3] ルート: PUT /v1/training-menus/{id} を実装 (`src/routes/trainingMenus.js`)
- [ ] T025 [US3] 単体テスト: `tests/unit/test_update_trainingMenu.js`
- [ ] T026 [US3] コントラクトテスト: `tests/contract/test_update_trainingMenu.js`

### Phase 3.4: User Story 4 - TrainingMenu 削除 (P4)

**Goal**: 論理削除（status=1）を実装
**Independent Test**: DELETE /v1/training-menus/{id} のコントラクトテスト

- [ ] T027 [US4] ルート: DELETE /v1/training-menus/{id} を実装（論理削除） (`src/routes/trainingMenus.js`)
- [ ] T028 [US4] 単体テスト: `tests/unit/test_delete_trainingMenu.js`
- [ ] T029 [US4] コントラクトテスト: `tests/contract/test_delete_trainingMenu.js`

### Phase 3.5: User Story 5 - TrainingRecord 配列登録 (P5)

**Goal**: TrainingRecord の一括登録を受け付け、非同期ジョブで処理する
**Independent Test**: POST /v1/training-records/batch がジョブを受け付け、ジョブ完了でデータが永続化される

- [ ] T030 [US5] ルート: POST /v1/training-records/batch を実装（`src/routes/trainingRecords.js`）
- [ ] T031 [US5] ジョブ投入: `src/lib/queue.js` を利用してジョブを作成
- [ ] T032 [US5] ワーカー: `src/workers/worker.js` にバッチ処理ロジック実装
- [ ] T033 [US5] 統合テスト: `tests/integration/test_batch_trainingRecords.js`（ジョブ投入→完了確認）
- [ ] T034 [US5] コントラクトテスト: `tests/contract/test_batch_trainingRecords.js`

### Phase 3.6: User Story 6 - 可観測性 (P6)

**Goal**: 構造化ログ、相関ID、メトリクスを埋め込む

- [ ] T035 [US6] ミドルウェア: リクエストに相関IDを付与 (`src/middleware/correlation.js`)
- [ ] T036 [US6] ロギング: `src/lib/observability.js` を組み込み、主要パスでログ出力
- [ ] T037 [US6] メトリクス: 簡易メトリクスのエクスポータ実装（`src/lib/metrics.js`）
- [ ] T038 [US6] スモークテスト: `tests/smoke/test_observability.js`

---

## Phase N: Polish & クロスカッティング

- [ ] T039 ドキュメント: `docs/quickstart.md` を追加（ローカルでの実行手順）
- [ ] T040 リファクタ: コード整理とテストカバレッジ向上
- [ ] T041 パフォーマンス試験: 負荷テストスクリプト作成 (`tests/perf/load_test.js`)
- [ ] T042 セキュリティチェック: `docs/security_checklist.md` を作成
- [ ] T043 リリース: CHANGELOG と release notes を作成（`docs/CHANGELOG.md`）

---

## 依存関係 & 実行順序

- Foundational (T006..T012) は必須で完了すること（ストレージ/認証/観測が整うまでユーザーストーリー着手は限定的）
- 推奨順序: Setup → Foundational → US1 → US2 → US3 → US4 → US5 → US6 → Polish

## 並列実行の機会

- ストレージアダプタ (T007) とロギング実装 (T010) は並列可能
- 各ユーザーストーリー内の単体テスト作成と実装（モデルとサービス）は並列実行可能（例: T013 と T014 は同時に進められる）

## 実装戦略

- MVP優先: まず `User Story 1` を完成させ、コントラクトテストをCIに組み込んで安定させる
- インクリメンタル: 各ストーリーは独立してテスト可能にし、小さくデプロイ可能にする

---

## タスク数サマリ

- 合計タスク数: 43
- User Story ごとのタスク数:
  - US1: 7
  - US2: 4
  - US3: 3
  - US4: 3
  - US5: 5
  - US6: 4
  - Setup/Foundational/Polish: 17


## 次のアクション

- このタスクリストをレビューして、優先順位や担当分配を調整してください。
- 希望があれば私が `T001`〜`T005` の初期ファイル作成（ディレクトリ作成、CI雛形、README）を実行します。

