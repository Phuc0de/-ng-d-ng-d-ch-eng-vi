import { useEffect, useState } from 'react';
import { lookup } from '../../../api/client';
import { MarkdownContent } from './MarkdownContent';

interface Props {
  text: string;
  context: string;
}

export function GrammarTab({ text, context }: Props) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    lookup({ selectedText: text, sentenceContext: context, type: 'grammar' })
      .then((res) => setContent(res.content))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [text, context]);

  if (loading) return <div className="tab-loading"><span className="tab-spinner" />Đang phân tích ngữ pháp…</div>;
  if (error) return <div className="tab-error">Không thể tải dữ liệu. Vui lòng thử lại.</div>;

  return <MarkdownContent raw={content} />;
}
