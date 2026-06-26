// Đọc env trong hàm để đảm bảo dotenv đã load trước khi dùng

// Wrapper gọi Groq chat completion — dùng chung cho translateService + lookupService
// Yêu cầu model trả JSON thuần, parse sẵn ở đây.
async function chatJSON(systemPrompt, userContent) {
  const GROQ_API_KEY = process.env.GROQ_API_KEY || '';
  const GROQ_MODEL = process.env.GROQ_MODEL || 'llama3-70b-8192';
  if (!GROQ_API_KEY) throw new Error('Chưa cấu hình GROQ_API_KEY trong .env');

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      temperature: 0.2,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userContent },
      ],
    }),
  });

  if (!res.ok) {
    throw new Error(`Groq API lỗi ${res.status}: ${await res.text()}`);
  }

  const data = await res.json();
  const text = data.choices?.[0]?.message?.content || '';
  const clean = text.replace(/```json|```/g, '').trim();
  return JSON.parse(clean);
}

module.exports = { chatJSON };
