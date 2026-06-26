interface Props {
  selection: { text: string; rect: DOMRect };
  onExploreMore: () => void;
}

export function SelectionPopup({ selection, onExploreMore }: Props) {
  // getBoundingClientRect() trả tọa độ viewport → dùng position:fixed là đúng
  const top = selection.rect.bottom + 8;
  const left = Math.min(selection.rect.left, window.innerWidth - 220); // tránh tràn màn hình

  return (
    <div
      className="selection-popup"
      style={{ position: 'fixed', top, left, zIndex: 9999 }}
    >
      <p className="selection-popup__word">「{selection.text}」</p>
      <button onClick={onExploreMore} className="selection-popup__btn">
        Tìm hiểu thêm →
      </button>
    </div>
  );
}
