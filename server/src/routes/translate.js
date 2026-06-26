const express = require('express');
const router = express.Router();
const { translateBatch } = require('../services/translateService');

// POST /api/translate-batch
// body: { texts: string[] }
// trả về: TranslationItem[] — { id, original, translation, contextNote, status }
router.post('/translate-batch', async (req, res) => {
  const { texts } = req.body || {};
  if (!Array.isArray(texts) || texts.length === 0) {
    return res.status(400).json({ error: 'Thiếu texts (mảng đoạn văn cần dịch)' });
  }
  try {
    const items = await translateBatch(texts);
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
