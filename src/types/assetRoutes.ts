import express, { Request, Response } from 'express';
import pool from '../db';

import { Asset, Transaction } from '../types';

const router = express.Router();

// 1. 获取所有资产 (資産一覧取得)
router.get('/', async (req: Request, res: Response) => {
    try {
        const [rows] = await pool.query('SELECT * FROM assets');
        res.json({ success: true, data: rows as Asset[] });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Database Error' });
    }
});

// 2. 获取所有交易流水 (取引履歴取得)
router.get('/transactions', async (req: Request, res: Response) => {
    try {
        const [rows] = await pool.query('SELECT * FROM transactions ORDER BY transaction_date DESC');
        res.json({ success: true, data: rows as Transaction[] });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Database Error' });
    }
});

export default router;