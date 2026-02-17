// src/services/assetService.ts
import pool from '../db';
import { Asset, Transaction } from '../types';

export const AssetService = {
    // 1. 获取所有资产
    async getAllAssets(): Promise<Asset[]> {
        try {
            const [rows] = await pool.query('SELECT * FROM assets');
            return rows as Asset[]; // 必须有这一行 return！
        } catch (error) {
            console.error('Database Error (Assets):', error);
            throw error;
        }
    },

    // 2. 获取所有交易记录
    async getAllTransactions(): Promise<Transaction[]> {
        try {
            const [rows] = await pool.query('SELECT * FROM transactions ORDER BY transaction_date DESC');
            return rows as Transaction[]; // 必须有这一行 return！
        } catch (error) {
            console.error('Database Error (Transactions):', error);
            throw error;
        }
    }
};