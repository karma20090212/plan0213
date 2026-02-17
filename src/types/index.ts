// backend/src/types/index.ts

// 1. 定义资产类型的范围
export type AssetType = 'Cash' | 'Bank' | 'Stock' | 'Crypto' | 'Other';

// 2. 资产接口定义 (与数据库 assets 表对应)
export interface Asset {
    id: number;
    user_id: number;
    name: string;
    type: AssetType;
    balance: number;
    currency: string;
    updated_at?: Date;
}

// 3. 交易流水接口定义 (与数据库 transactions 表对应)
export interface Transaction {
    id: number;
    asset_id: number;
    amount: number;
    category: string;
    note: string;
    transaction_date: string; // 数据库 DATE 类型在 JS 中通常作为字符串处理
    created_at?: Date;
}