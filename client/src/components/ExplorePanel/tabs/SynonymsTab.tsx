import { useEffect, useState } from 'react';
import { lookup } from '../../../api/client';
import type { SynonymEntry } from '../../../types';

interface Props {
  text: string;
  context: string;
}

export function SynonymsTab({ text, context }: Props) {
  const [synonyms, setSynonyms] = useState<SynonymEntry[]>([]);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    lookup({ selectedText: text, sentenceContext: context, type: 'synonyms' })
      .then((res) => {
        setSynonyms(res.synonyms ?? []);
        setSummary(res.summary ?? '');
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [text, context]);

  if (loading) return <div className="tab-loading"><span className="tab-spinner" />Đang tìm từ đồng nghĩa…</div>;
  if (error) return <div className="tab-error">Không thể tải dữ liệu. Vui lòng thử lại.</div>;

  return (
    <div className="synonyms-tab">
      {summary && <p className="synonyms-tab__summary">{summary}</p>}

      <table className="synonyms-table">
        <thead>
          <tr>
            <th className="synonyms-table__th">Từ đồng nghĩa</th>
            <th className="synonyms-table__th">Sắc thái (tiếng Việt)</th>
            <th className="synonyms-table__th synonyms-table__th--center">Phù hợp ngữ cảnh</th>
          </tr>
        </thead>
        <tbody>
          {synonyms.map((s, i) => (
            <tr key={i} className={`synonyms-table__row${s.fitsContext ? ' synonyms-table__row--best' : ''}`}>
              <td className="synonyms-table__td synonyms-table__td--word">
                {s.word}
                {s.fitsContext && <span className="synonyms-table__badge">✓ Tốt nhất</span>}
              </td>
              <td className="synonyms-table__td">{s.shade}</td>
              <td className="synonyms-table__td synonyms-table__td--center">
                {s.fitsContext ? '✅' : '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
