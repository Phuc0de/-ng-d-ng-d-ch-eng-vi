import type { TranslationItem, LookupQuery, LookupResult } from '../types';

const BASE = '/api';

// TODO: thêm xử lý lỗi/loading state chi tiết hơn khi nối UI thật
export async function translateBatch(texts: string[]): Promise<TranslationItem[]> {
  const res = await fetch(`${BASE}/translate-batch`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ texts }),
  });
  if (!res.ok) throw new Error('Dịch thất bại');
  return res.json();
}

export async function lookup(query: LookupQuery): Promise<LookupResult> {
  const res = await fetch(`${BASE}/lookup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(query),
  });
  if (!res.ok) throw new Error('Tra cứu thất bại');
  return res.json();
}
