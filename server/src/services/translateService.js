const crypto = require('crypto');
const { chatJSON } = require('./groqClient');
const { TRANSLATE_SYSTEM_PROMPT, TRANSLATE_EN_VI_SYSTEM_PROMPT } = require('../config/prompts');

// Chọn prompt theo chiều dịch
const PROMPTS = {
  'vi-en': TRANSLATE_SYSTEM_PROMPT,
  'en-vi': TRANSLATE_EN_VI_SYSTEM_PROMPT,
};

// Dịch nhiều đoạn trong 1 lần gọi AI — để model thấy toàn bộ ngữ cảnh giữa các đoạn
// (quan trọng khi các đoạn liên quan tới nhau, ví dụ đoạn hội thoại hoặc 1 bài viết bị chia nhỏ)
// TODO: nếu input quá dài (vượt context window), cần chia batch nhỏ hơn ở đây
async function translateBatch(texts, direction = 'vi-en') {
  const systemPrompt = PROMPTS[direction];
  if (!systemPrompt) throw new Error(`Chiều dịch không hỗ trợ: ${direction}`);

  const payload = texts.map((text, idx) => ({ id: idx, text }));

  const result = await chatJSON(systemPrompt, JSON.stringify(payload));

  return texts.map((text, idx) => {
    const match = result.translations?.find((t) => t.id === idx);
    return {
      id: crypto.randomUUID(),
      original: text,
      translation: match?.translation || '',
      contextNote: match?.contextNote || '',
      status: match ? 'done' : 'error',
      direction,
    };
  });
}

module.exports = { translateBatch };
