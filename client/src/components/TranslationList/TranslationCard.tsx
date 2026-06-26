import type { TranslationItem } from '../../types';

interface Props {
  item: TranslationItem;
  onClick: () => void;
  index: number;
}

export function TranslationCard({ item, onClick, index }: Props) {
  const isDone = item.status === 'done';
  const isError = item.status === 'error';

  return (
    <button onClick={onClick} className={`t-card${isError ? ' t-card--error' : ''}`}>
      <div className="t-card__index">{index + 1}</div>
      <div className="t-card__body">
        <p className="t-card__original">{item.original}</p>
        <p className={`t-card__translation${!isDone ? ' t-card__translation--empty' : ''}`}>
          {isDone ? item.translation : isError ? 'Lỗi dịch đoạn này' : '…'}
        </p>
      </div>
      <div className="t-card__arrow">→</div>
    </button>
  );
}
