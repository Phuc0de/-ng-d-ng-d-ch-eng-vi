require('dotenv').config();
const express = require('express');
const cors = require('cors');

const translateRouter = require('./routes/translate');
const lookupRouter = require('./routes/lookup');

const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }));

app.use('/api', translateRouter);
app.use('/api', lookupRouter);
// TODO: thêm router mới ở đây khi mở rộng (vd: history, export, v.v.)

const PORT = process.env.PORT || 4244;
app.listen(PORT, () => {
  console.log(`Translate API đang chạy tại http://localhost:${PORT}`);
  if (!process.env.GROQ_API_KEY) {
    console.log('⚠ Chưa set GROQ_API_KEY trong .env — các route AI sẽ lỗi.');
  }
});
