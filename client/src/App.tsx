import { useState } from 'react';
import { useTranslateStore } from './store/useTranslateStore';
import { BatchInput } from './components/BatchInput/BatchInput';
import { TranslationList } from './components/TranslationList/TranslationList';
import { TranslationDetail } from './components/TranslationDetail/TranslationDetail';
import { translateBatch } from './api/client';

function App() {
  const { items, addItems, clearItems, activeItemId, openItem, closeItem } = useTranslateStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(texts: string[]) {
    setIsLoading(true);
    setError(null);
    try {
      const result = await translateBatch(texts);
      addItems(result);
    } catch (err) {
      setError('Không thể kết nối đến máy chủ. Vui lòng thử lại.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  const activeItem = items.find((i) => i.id === activeItemId);

  return (
    <div className="app-shell">
      {/* Header */}
      <header className="app-header">
        <div className="app-header__inner">
          <div className="app-header__brand">
            <div className="app-header__logo">VI</div>
            <div>
              <h1 className="app-header__title">Dịch thuật VI → EN</h1>
              <p className="app-header__sub">Dịch ngữ cảnh · AI đọc hiểu toàn đoạn</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="app-main">
        <div className="app-main__inner">
          {/* Input section */}
          <section className="app-section">
            <div className="app-section__label">Nhập văn bản</div>
            <BatchInput onSubmit={handleSubmit} isLoading={isLoading} />
            {error && <div className="app-error">{error}</div>}
          </section>

          {/* Results */}
          {items.length > 0 && (
            <section className="app-section">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div className="app-section__label" style={{ marginBottom: 0 }}>
                  Lịch sử và kết quả dịch
                  <span className="app-section__count">{items.length} đoạn</span>
                </div>
                <button onClick={clearItems} className="clear-history-btn">
                  Xóa lịch sử
                </button>
              </div>
              <TranslationList items={items} onSelect={openItem} />
            </section>
          )}
        </div>
      </main>

      {activeItem && <TranslationDetail item={activeItem} onClose={closeItem} />}
    </div>
  );
}

export default App;
