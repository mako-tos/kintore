<!--
SYNC IMPACT REPORT

Version change: template → 0.1.0
Modified principles: (defined from template placeholders)
  - PRINCIPLE_1_NAME -> Library-First
  - PRINCIPLE_2_NAME -> CLI & Text I/O
  - PRINCIPLE_3_NAME -> Test-First (NON-NEGOTIABLE)
  - PRINCIPLE_4_NAME -> Integration & Contract Testing
  - PRINCIPLE_5_NAME -> Observability, Versioning & Simplicity
Added sections:
	- Additional Constraints
	- Development Workflow
Removed sections: none (template placeholders filled)
Templates requiring updates:
	- .specify/templates/plan-template.md ✅ updated
	- .specify/templates/spec-template.md ✅ updated
	- .specify/templates/tasks-template.md ⚠ pending (no changes made)
Follow-up TODOs:
	- None left in this file. All bracketed tokens replaced.


## 統治 (Governance)

Amendments: Proposals to change the constitution MUST be submitted as a PR that
includes (1) the proposed text change, (2) a rationale, and (3) a migration or
compliance plan for affected artifacts. Amendments require approval from at
least one maintainer and one code-owner (or two maintainers if code-owner is
not available).

Compliance reviews: Every major release or cross-cutting change MUST include a
conformance check against this constitution; plans and specs referenced in the
feature flow MUST declare any deviations and include a written justification.

-->

# Constitution (プロジェクト憲法)

このドキュメントは、本プロジェクトにおける開発、コミュニケーション、およびアーキテクチャの普遍的な指針を定める。
Spec KitによるAIエージェントのすべての行動は、この憲法に準拠しなければならない。

## 1. コア原則 (Core Principles)

### 1.1 目的の明確化
作成するすべての機能は、「**筋トレのトレーニング内容を管理する**」という中核的な目的に貢献しなければならない。

### 1.2 技術スタックの指針
以下の技術スタックを原則として採用する。
- **フロントエンド:**  `TypeScript`、 `React` を使用する。
- **スタイル:** `Pure.css` を使用する。`ウェブフォント` は使用しない。
- **バックエンド:** `TypeScript` を使用する。
- **プラットフォーム:** `Google Apps Script`を採用し、運用コストを最小化する。
- **データストア:** `Google SpreadSheet`に保存する
- **フレームワーク:** `Node.js 22+` と `clasp` を使用して `Google Apps Script` へのデプロイを行う

### 1.3 品質基準
- **テスト駆動:** すべてのビジネスロジック（トレーニング結果の保存、当日のトレーニング内容記録、トレーニングメニューの読み込み）には、単体テストを伴うこと。

## 2. 開発ガバナンス (Development Governance)

### 2.1 コミュニケーション
- すべての仕様記述、計画、タスク、コード内のコメント、変更履歴は**日本語**で行う。変数名、定数名、関数名については、**英語**を使用する。

### 2.2 ドキュメント
- AIエージェントは、実装中に発生した技術的な不明点や調査結果を`research.md`に必ず記録すること。
- 開発者向けの`README.md`には、デプロイ手順を明確に記載すること。
- プログラム更新時に変更履歴要約を`SPEC.md`の`機能ID`ごとに追記すること

### 2.3 倫理と法的遵守
- `Google Apps Script`の利用規約および関連する法律を厳守すること。特にデータプライバシーに配慮すること。

### 2.4 ログ管理
- 実行ログを`スプレッドシート`に記録すること。
- 関数実行時のログ内容は`日時`, `関数名`, `開始 or 終了` を記録すること
- 関数実行時のログは `ScriptProperties` で表示・非表示を変更できるようにすること
- エラー発生時のログ内容は`日時`, `エラースタックトレース`, `エラーメッセージ` を記録すること


## 3. 付加制約 (Additional Constraint)

- セキュリティ: 秘密は決してコミットしないこと。必ず`.gitignore`でコミットされないよう管理すること。

- 独自データタイプ: 必ず`TypeScript`の`interface`を作成すること

- パフォーマンス: 処理速度のために最適化をする場合は、計測可能なデータをもとに実施すること。明確な数値改善がない場合は修正を破棄すること

- 依存関係: よくメンテナンスされた、安定バージョンを使用すること。外部ライブラィを使用する場合は `research.md` にリスクを追記すること

## 4. 開発ワークフロー (Development Workflow)

- コードレビュー: `main`ブランチへのすべての変更は、プルリクエストに変更履歴のとテストカバレッジを記録すること

- 品質管理: 必ずCIテストを行うこと。テストに失敗した場合はマージしないこと

## 5. 統治 (Governance)

バージョンポリシー:
- MAJOR: 後方互換性を破棄する場合や機能削除を伴う場合
- MINOR: 新機能や`Constitution`に追加がある場合
- PATCH: バグ修正・文言修正の場合

**Version**: 0.1.0 | **Ratified**: 2025-10-26 | **Last Amended**: 2025-10-26
