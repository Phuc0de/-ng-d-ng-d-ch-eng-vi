import { useState, useEffect, useCallback, type RefObject } from 'react';

interface SelectionInfo {
  text: string;
  rect: DOMRect;
}

// Bắt sự kiện user tô đen (mouseup) trong 1 container, trả về text đã chọn + vị trí để đặt popup
export function useTextSelection(containerRef: RefObject<HTMLElement | null>) {
  const [selection, setSelection] = useState<SelectionInfo | null>(null);

  const handleMouseUp = useCallback(() => {
    const sel = window.getSelection();
    const text = sel?.toString().trim();
    if (!text || !containerRef.current?.contains(sel?.anchorNode ?? null)) {
      setSelection(null);
      return;
    }
    const range = sel!.getRangeAt(0);
    setSelection({ text, rect: range.getBoundingClientRect() });
  }, [containerRef]);

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseUp]);

  return selection;
}
