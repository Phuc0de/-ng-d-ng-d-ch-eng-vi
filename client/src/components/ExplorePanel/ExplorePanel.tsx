import { useState } from 'react';
import { GrammarTab } from './tabs/GrammarTab';
import { DictionaryTab } from './tabs/DictionaryTab';
import { SynonymsTab } from './tabs/SynonymsTab';

interface Props {
  selectedText: string;
  sentenceContext: string;
  onClose: () => void;
}

type TabKey = 'grammar' | 'dictionary' | 'synonyms';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'grammar', label: 'Ngữ pháp' },
  { key: 'dictionary', label: 'Từ điển' },
  { key: 'synonyms', label: 'Đồng nghĩa' },
];

export function ExplorePanel({ selectedText, sentenceContext, onClose }: Props) {
  const [tab, setTab] = useState<TabKey>('grammar');

  return (
    <aside className="explore-panel">
      {/* Header */}
      <div className="explore-panel__header">
        <div className="explore-panel__title-block">
          <span className="explore-panel__label">Tìm hiểu thêm về</span>
          <strong className="explore-panel__word">"{selectedText}"</strong>
        </div>
        <button onClick={onClose} className="explore-panel__close" aria-label="Đóng">
          ✕
        </button>
      </div>

      {/* Tabs */}
      <div className="explore-panel__tabs">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`explore-panel__tab${tab === t.key ? ' explore-panel__tab--active' : ''}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="explore-panel__content">
        {tab === 'grammar' && <GrammarTab text={selectedText} context={sentenceContext} />}
        {tab === 'dictionary' && <DictionaryTab text={selectedText} context={sentenceContext} />}
        {tab === 'synonyms' && <SynonymsTab text={selectedText} context={sentenceContext} />}
      </div>
    </aside>
  );
}
