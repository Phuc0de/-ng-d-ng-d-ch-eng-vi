const { chatJSON } = require('./groqClient');
const { LOOKUP_PROMPTS } = require('../config/prompts');

// Mỗi "type" là 1 chiến lược tra cứu riêng — thêm type mới = thêm 1 entry ở đây
// + 1 prompt trong config/prompts.js (không cần đụng route hay phần còn lại)
const strategies = {
  meaning: ({ selectedText, sentenceContext }) =>
    chatJSON(LOOKUP_PROMPTS.meaning, JSON.stringify({ selectedText, sentenceContext })),
  grammar: ({ selectedText, sentenceContext }) =>
    chatJSON(LOOKUP_PROMPTS.grammar, JSON.stringify({ selectedText, sentenceContext })),
  dictionary: ({ selectedText, sentenceContext }) =>
    chatJSON(LOOKUP_PROMPTS.dictionary, JSON.stringify({ selectedText, sentenceContext })),
  synonyms: ({ selectedText, sentenceContext }) =>
    chatJSON(LOOKUP_PROMPTS.synonyms, JSON.stringify({ selectedText, sentenceContext })),
};

async function lookup({ selectedText, sentenceContext, type }) {
  const strategy = strategies[type];
  if (!strategy) throw new Error(`Loại tra cứu không hỗ trợ: ${type}`);
  const result = await strategy({ selectedText, sentenceContext });

  // synonyms trả structured JSON; các tab khác trả content string
  if (type === 'synonyms') {
    return { type, content: result.content || '', synonyms: result.synonyms || [], summary: result.summary || '' };
  }
  return { type, content: result.content || '' };
}

module.exports = { lookup };
