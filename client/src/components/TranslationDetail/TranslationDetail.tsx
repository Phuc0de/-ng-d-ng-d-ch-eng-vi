import { useRef, useState } from 'react';
import type { TranslationItem } from '../../types';
import { useTextSelection } from '../../hooks/useTextSelection';
import { SelectionPopup } from './SelectionPopup';
import { ExplorePanel } from '../ExplorePanel/ExplorePanel';

interface Props {
  item: TranslationItem;
  onClose: () => void;
}

export function TranslationDetail({ item, onClose }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const selection = useTextSelection(containerRef);
  const [exploreText, setExploreText] = useState<string | null>(null);

  function handleExploreMore() {
    if (selection?.text) {
      setExploreText(selection.text);
    }
  }

  return (
    <div className="detail-overlay">
      <div className="detail-modal">
        <button
          onClick={onClose}
          className="detail-modal__close"
          aria-label="Đóng"
        >
          ×
        </button>

        <p className="detail-modal__eyebrow">
          Bản dịch tiếng Anh
        </p>

        <div
          ref={containerRef}
          className="detail-modal__text"
        >
          {item.translation}
        </div>

        {item.contextNote && (
          <div className="detail-modal__note">
            <strong>Ghi chú ngữ cảnh:</strong> {item.contextNote}
          </div>
        )}

        <p className="detail-modal__hint">
          💡 Tô đen một từ hoặc cụm từ để tìm hiểu thêm
        </p>
      </div>

      {/* Popup render ngoài modal box để tránh clip/overflow */}
      {selection && !exploreText && (
        <SelectionPopup
          selection={selection}
          onExploreMore={handleExploreMore}
        />
      )}

      {exploreText && (
        <ExplorePanel
          selectedText={exploreText}
          sentenceContext={item.translation}
          onClose={() => setExploreText(null)}
        />
      )}
    </div>
  );
}
