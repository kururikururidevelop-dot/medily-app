# Question/Answer CRUD処理調査報告書（完全版）

## 概要
`Question` および `Answer` リソースに対するCRUD処理の実装詳細を報告します。
データモデルの項目レベルでの定義、およびユースケース（公開/非公開）やバックグラウンド処理（Functions）を含めた網羅的な解説となります。

---

## 1. Question (質問) データモデル

Firestore `questions` コレクションのデータ構造定義です。

| 項目名 | 型 | 説明 |
| :--- | :--- | :--- |
| `id` | string | ドキュメントID |
| `userId` | string | 投稿者のUID |
| `title` | string | 質問タイトル |
| `description` | string | 質問詳細（旧 `content`） |
| `content` | string | `description` のコピー（後方互換用） |
| `region` | string | 都道府県など |
| `category` | string | 診療科・カテゴリ |
| `tags` | string[] | タグ配列 |
| `status` | string | `'open'`(募集中) / `'answered'`(回答あり) / `'closed'`(解決済) 等 |
| `answerCount` | number | 回答数（カウンター） |
| `parentQuestionId` | string? | 追加質問の場合の親ID |
| `createdAt` | Timestamp | 作成日時 |
| `updatedAt` | Timestamp | 更新日時 |

---

## 2. Question (質問) のCRUD操作詳細

### 【Create】 質問投稿
- **エンドポイント**: `POST /api/questions`
- **処理**: `lib/services/questionService.ts` > `createQuestion`
- **項目ごとの処理**:
    - `userId`: リクエストボディから設定（認証UIDと照合）。
    - `title`, `description`, `region`, `category`: リクエストボディからそのまま保存。
    - `content`: `description` の値をコピーして保存。
    - `tags`: 指定があれば保存、なければ `[]`。
    - `status`: 固定値 `'open'` で初期化。
    - `answerCount`: 固定値 `0` で初期化。
    - `createdAt`, `updatedAt`: サーバー側の現在時刻 (`Timestamp.now()`)。
    - `parentQuestionId`: 追加質問の場合のみ保存。

### 【Read】 質問一覧取得（ユースケース別）

#### A. 質問一覧（公開） `PublicQuestionsClient`
- **ユースケース**: 未ログインユーザー向けの「質問一覧」ページ
- **エンドポイント**: `GET /api/questions?public=true&status=open`
- **ロジック**: `questionService.getQuestions`
    - `publicOnly: true` オプションにより、公開設定（`public: true`）かつステータスが `open` のものをフィルタリングして取得します。
    - 認証不要。

#### B. 質問一覧（HOME/個人用） `HomeClient`
- **ユースケース**: ログインユーザーの「ホーム」画面（自分の質問タブ、回答した質問タブ）
- **エンドポイント**: `GET /api/questions?userId={uid}` または `?answeredBy={uid}`
- **ロジック**: `questionService.getQuestions`
    - `userId` オプションにより、特定のユーザーの質問のみを取得します。
    - **認証必須**であり、トークン検証が行われます。
    - `answeredBy` の場合は、全質問のサブコレクションを走査する重いクエリ（「回答した質問」検索）が実行されます。

#### C. 質問詳細 `QuestionDetail`
- **エンドポイント**: `GET /api/questions/[id]`
- **ロジック**: ルートハンドラ独自実装
    - 単一ドキュメント取得に加え、`answers` サブコレクションを取得して結合して返却します。

### 【Update】 更新処理の全容（システム自動更新）

ユーザーが直接呼び出す「更新API」は存在しませんが、以下の3つのパスでシステムによる自動更新が行われます。

#### ① APIによるサイドエフェクト (回答投稿時)
- **トリガー**: `POST /api/questions/[id]/answers` 実行時
- **更新内容**:
    - `answerCount`: **Increment (+1)**
    - `updatedAt`: 現在時刻

#### ② Cloud Functions: 通知処理 (`onAnswerCreated`)
- **トリガー**: `questions/{id}/answers/{aid}` 作成時
- **更新内容**:
    - `status`: `'answered'` に変更（クローズ済みでない場合）
    - `answerCount`: **Increment (+1)** (※ API側と重複して二重カウントされるバグあり)

#### ③ Cloud Functions: マッチング処理 (`runMatchingForQuestion`)
- **トリガー**: 質問作成時 (`onQuestionCreated`)
- **更新内容**:
    - `status`: `'waiting_for_answer'`（マッチング成功時） または `'matching_failed'`（失敗時）
    - `lastMatchedAt`: マッチング実行時刻
    - （サブコレクション）`notified_users`: 通知済みユーザー履歴を追加

#### ④ Cloud Functions: LINE Webhook (`lineWebhook`)
- **現状の実装**:
    - 受信ログ (`logger.info`) は出力されますが、**Firestoreのデータ更新を行うロジックは実装されていません**。

---

## 3. Answer (回答) データモデル

| 項目名 | 型 | 説明 |
| :--- | :--- | :--- |
| `id` | string | ドキュメントID |
| `userId` | string | 回答者のUID |
| `content` | string | 回答本文 |
| `createdAt` | Timestamp | 作成日時 |
| `updatedAt` | Timestamp | 更新日時 |
| `(parentQuestionId)` | - | 親パスに含まれるためフィールドとしては保持しない |

---

## 4. Answer (回答) のCRUD操作詳細

### 【Create】 回答投稿
- **エンドポイント**: `POST /api/questions/[id]/answers`
- **処理**: ルートハンドラ内で直接実装（Service未経由）
- **項目ごとの処理**:
    - `userId`: 認証UIDを設定。
    - `content`: リクエストボディから保存。
    - `createdAt`, `updatedAt`: 現在時刻。
- **サイドエフェクト**:
    - 上記Update①のトリガーとなります。

### 【Read】 回答一覧取得
- **エンドポイント**: `GET /api/questions/[id]/answers`
- **処理**: ルートハンドラ内で直接実装
- **項目ごとの処理**:
    - サブコレクション内の全ドキュメントを `createdAt` 昇順で取得して返却。

---

## まとめ：現状の課題
1. **二重カウント問題（解決済み）**: 以前は API と Cloud Functions の両方で更新していましたが、現在は Cloud Functions (`onAnswerCreated`) のみに統一され、API側のインクリメント処理は削除されました。
2. **Webhookの実装**: LINEからの受信によるデータ更新（フォロー状態の反映など）は未実装である。
