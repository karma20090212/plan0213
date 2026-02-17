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
        // 💡 把 message 改成具体的 error 信息，刷新浏览器直接看提示
        res.status(500).json({ 
            success: false, 
            message: error.message || "未知错误",
            stack: error.stack // 调试用，上线后记得删掉
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