import type { TranslationItem } from '../../types';
import { TranslationCard } from './TranslationCard';

interface Props {
  items: TranslationItem[];
  onSelect: (id: string) => void;
}

export function TranslationList({ items, onSelect }: Props) {
  if (items.length === 0) return null;
  return (
    <div className="t-list">
      {items.map((item, i) => (
        <TranslationCard
          key={item.id}
          item={item}
          index={i}
          onClick={() => onSelect(item.id)}
        />
      ))}
    </div>
  );
}
