<<<<<<< HEAD
# -ng-d-ng-d-ch-eng-vi
ứng dụng này có thể dịch từ tiếng việt sang tiếng anh, sát nghĩa và bối cảnh của câu tiếng việt
=======
# Translate VI-EN App

Dịch nhiều đoạn văn Việt → Anh cùng lúc, AI đọc ngữ cảnh để dịch sát nghĩa.
Click vào 1 bản dịch để xem riêng, tô đen 1 đoạn trong bản dịch để xem nghĩa tiếng Việt,
bấm "Tìm hiểu thêm" để mở panel tra ngữ pháp / từ điển / từ đồng nghĩa.

## Cấu trúc

```
translate-app/
├── server/                      # Backend — Express, proxy gọi Groq AI
│   ├── .env.example
│   ├── package.json
│   └── src/
│       ├── index.js             # entry point, mount router
│       ├── routes/
│       │   ├── translate.js     # POST /api/translate-batch
│       │   └── lookup.js        # POST /api/lookup
│       ├── services/
│       │   ├── groqClient.js        # gọi Groq API, parse JSON
│       │   ├── translateService.js  # logic dịch batch
│       │   └── lookupService.js     # logic tra cứu — mỗi "type" 1 strategy, dễ thêm
│       └── config/
│           └── prompts.js       # prompt tách riêng, dễ tinh chỉnh độ chính xác
│
└── client/                      # Frontend — React + TypeScript + Zustand + Tailwind (Vite)
    └── src/
        ├── types/index.ts               # TranslationItem, LookupQuery, LookupResult
        ├── store/useTranslateStore.ts   # Zustand store: danh sách bản dịch, item đang mở
        ├── api/client.ts                # gọi backend (translateBatch, lookup)
        ├── hooks/useTextSelection.ts    # bắt event tô đen text
        ├── components/
        │   ├── BatchInput/              # nhập nhiều đoạn, nút "Dịch tất cả"
        │   ├── TranslationList/         # danh sách kết quả (rút gọn), click để mở
        │   ├── TranslationDetail/       # modal hiện bản dịch + bắt selection
        │   │   └── SelectionPopup.tsx   # popup nghĩa khi tô đen + nút "Tìm hiểu thêm"
        │   └── ExplorePanel/            # panel mở rộng: tab Ngữ pháp / Từ điển / Đồng nghĩa
        │       └── tabs/                # mỗi tab 1 file riêng — thêm tab mới không đụng code cũ
        └── App.tsx
```

## Vì sao chia vậy (để mở rộng dễ)

- **`lookupService.js`**: mỗi loại tra cứu (`meaning`, `grammar`, `dictionary`, `synonyms`) là 1 "strategy" độc lập.
  Thêm loại mới (vd: `examples`, `pronunciation`) = thêm 1 entry trong `strategies` + 1 prompt trong `prompts.js`,
  không đụng route hay phần còn lại.
- **`ExplorePanel/tabs/`**: mỗi tab là 1 component riêng, render độc lập. Thêm tab mới = thêm 1 file + 1 dòng trong `TABS`.
- **`prompts.js`**: tách hết prompt ra 1 chỗ, để tinh chỉnh độ chính xác dịch/tra cứu mà không phải đọc lại logic code.
- **Zustand store**: tách state ra khỏi component, sau này thêm tính năng (lưu lịch sử, export, v.v.) chỉ cần thêm field/action vào store.

## Trạng thái hiện tại

Mới có **skeleton + luồng nối đầy đủ FE↔BE**, các prompt trong `prompts.js` còn là `TODO` placeholder
và `chatJSON` sẽ lỗi nếu chưa set `GROQ_API_KEY`. Bước tiếp theo: viết prompt thật cho dịch + 4 loại tra cứu.

## Chạy thử (sau khi viết xong logic)

```bash
# Terminal 1 — backend
cd server
npm install
cp .env.example .env   # điền GROQ_API_KEY
npm start              # http://localhost:4243

# Terminal 2 — frontend
cd client
npm install
npm run dev             # http://localhost:5173, /api/* tự proxy sang backend
```
>>>>>>> 41d2d74 (ver1)
