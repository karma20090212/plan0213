# 資産管理システム

個人の資産・収支を一元管理するWebアプリケーションです。

## 使用技術

| カテゴリ | 技術 |
|---|---|
| フロントエンド | Vue 3, Vite |
| バックエンド | Node.js, Express 5, TypeScript |
| データベース | MySQL 8.0 |
| インフラ | Docker, Docker Compose |
| API仕様 | Swagger UI |

## 機能

- 保有資産一覧の表示（銀行・現金・株式・暗号資産）
- 収支取引履歴の表示（入金・出金をカラーで区別）
- REST API（Swagger UIで仕様確認可能）

## 起動方法

### 必要な環境

- Docker / Docker Compose
- Node.js 18以上

### 手順

**1. リポジトリをクローン**
```bash
git clone https://github.com/karma20090212/plan0213.git
cd plan0213
```

**2. 環境変数の設定**
```bash
cp .env.example .env
```
`.env` を開き、各項目を設定してください。

```
DB_NAME=wealth_db
DB_ROOT_PASSWORD=任意のパスワード
DB_PORT=3306
DB_HOST=localhost
```

**3. データベースを起動**
```bash
docker-compose up -d
```

**4. バックエンドを起動**
```bash
ts-node src/server.ts
```

**5. フロントエンドを起動**
```bash
npm run dev
```

ブラウザで `http://localhost:5173` を開いてください。

### API仕様の確認

バックエンド起動後、`http://localhost:3000/api-docs` にアクセスするとSwagger UIで確認できます。

## プロジェクト構成

```
plan0213/
├── src/
│   ├── routes/        # APIルーティング
│   ├── services/      # ビジネスロジック
│   ├── types/         # TypeScript型定義
│   └── server.ts      # エントリーポイント
├── public/
│   └── src/
│       └── App.vue    # フロントエンド
├── docker-compose.yml
├── .env.example
└── README.md
```

## 環境変数

| 変数名 | 説明 | デフォルト値 |
|---|---|---|
| DB_NAME | データベース名 | wealth_db |
| DB_ROOT_PASSWORD | MySQLルートパスワード | - |
| DB_PORT | MySQLポート番号 | 3306 |
| DB_HOST | MySQLホスト名 | localhost |
| VITE_API_URL | バックエンドAPIのURL | http://localhost:3000 |
