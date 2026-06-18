// backend/src/types/index.ts

export type AssetType = 'Cash' | 'Bank' | 'Stock' | 'Crypto' | 'Other';

export interface Asset {
    id: number;
    user_id: number;
    name: string;
    type: AssetType;
    balance: number;
    currency: string;
    updated_at?: Date;
}

export interface Transaction {
    id: number;
    asset_id: number;
    amount: number;
    category: string;
    note: string;
    transaction_date: string;
    created_at?: Date;
}