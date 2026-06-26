export interface TranslationItem {
  id: string;
  original: string;          // đoạn tiếng Việt gốc
  translation: string;       // bản dịch tiếng Anh
  contextNote?: string;      // AI ghi chú bối cảnh/sắc thái
  status: 'pending' | 'done' | 'error';
}

export type LookupType = 'meaning' | 'grammar' | 'dictionary' | 'synonyms';

export interface LookupQuery {
  selectedText: string;      // đoạn user tô đen
  sentenceContext: string;   // câu/đoạn chứa nó để AI hiểu ngữ cảnh
  type: LookupType;
}

export interface SynonymEntry {
  word: string;        // từ đồng nghĩa
  shade: string;       // sắc thái (tiếng Việt)
  fitsContext: boolean; // có phù hợp ngữ cảnh không
}

export interface LookupResult {
  type: LookupType;
  content: string;
  // chỉ có khi type === 'synonyms'
  synonyms?: SynonymEntry[];
  summary?: string;
}
