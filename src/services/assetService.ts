// src/services/assetService.ts
import pool from '../db';
import { Asset, Transaction } from '../types';

export const AssetService = {
    async getAllAssets(): Promise<Asset[]> {
        try {
            const [rows] = await pool.query('SELECT * FROM assets');
            return rows as Asset[];
        } catch (error) {
            console.error('Database Error (Assets):', error);
            throw error;
        }
    },

    async getAllTransactions(): Promise<Transaction[]> {
        try {
            const [rows] = await pool.query('SELECT * FROM transactions ORDER BY transaction_date DESC');
            return rows as Transaction[];
        } catch (error) {
            console.error('Database Error (Transactions):', error);
            throw error;
        }
    }
};