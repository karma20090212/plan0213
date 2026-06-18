// backend/src/routes/assetRoutes.ts
import express from 'express';
import { AssetService } from '../services/assetService';

const router = express.Router();

// GET /api/assets
router.get('/', async (req, res) => {
    try {
        const data = await AssetService.getAllAssets();
        res.json({ success: true, data });
    } catch (error: any) {
        res.status(500).json({ 
            success: false, 
            message: "サーバーエラーが発生しました"
        });
    }
});

// GET /api/assets/transactions
router.get('/transactions', async (req, res) => {
    try {
        const data = await AssetService.getAllTransactions();
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

export default router;