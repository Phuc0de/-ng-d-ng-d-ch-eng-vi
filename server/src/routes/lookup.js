const express = require('express');
const router = express.Router();
const { lookup } = require('../services/lookupService');

// POST /api/lookup
// body: { selectedText, sentenceContext, type: 'meaning'|'grammar'|'dictionary'|'synonyms' }
router.post('/lookup', async (req, res) => {
  const { selectedText, sentenceContext, type } = req.body || {};
  if (!selectedText || !type) {
    return res.status(400).json({ error: 'Thiếu selectedText hoặc type' });
  }
  try {
    const result = await lookup({ selectedText, sentenceContext: sentenceContext || '', type });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
