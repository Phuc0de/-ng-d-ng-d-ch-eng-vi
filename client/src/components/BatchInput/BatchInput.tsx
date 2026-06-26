import { useState } from 'react';

interface Props {
  onSubmit: (texts: string[]) => void;
  isLoading?: boolean;
}

export function BatchInput({ onSubmit, isLoading }: Props) {
  const [raw, setRaw] = useState('');
  const charCount = raw.length;
  const paragraphCount = raw.split(/\n\s*\n/).map(t => t.trim()).filter(Boolean).length;

  function handleSubmit() {
    const texts = raw
      .split(/\n\s*\n/)
      .map((t) => t.trim())
      .filter(Boolean);
    if (texts.length) onSubmit(texts);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') handleSubmit();
  }

  return (
    <div className="batch-input">
      <div className="batch-input__editor">
        <textarea
          className="batch-input__textarea"
          placeholder="Dán văn bản tiếng Việt vào đây...&#10;&#10;Mỗi đoạn cách nhau bằng 1 dòng trống để dịch riêng biệt."
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          spellCheck={false}
        />
        <div className="batch-input__footer">
          <span className="batch-input__stats">
            {charCount > 0
              ? `${charCount} ký tự · ${paragraphCount} đoạn`
              : 'Ctrl+Enter để dịch nhanh'}
          </span>
          <button
            className="batch-input__btn"
            onClick={handleSubmit}
            disabled={isLoading || raw.trim().length === 0}
          >
            {isLoading ? (
              <>
                <span className="batch-input__spinner" />
                Đang dịch…
              </>
            ) : (
              <>
                Dịch tất cả
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
