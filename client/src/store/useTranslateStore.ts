import { create } from 'zustand';
import type { TranslationItem } from '../types';

interface TranslateState {
  items: TranslationItem[];
  activeItemId: string | null;
  setItems: (items: TranslationItem[]) => void;
  addItems: (items: TranslationItem[]) => void;
  clearItems: () => void;
  openItem: (id: string) => void;
  closeItem: () => void;
}

let initialItems: TranslationItem[] = [];
try {
  const saved = localStorage.getItem('translate_history');
  if (saved) {
    initialItems = JSON.parse(saved);
  }
} catch (e) {
  console.error('Failed to parse translation history', e);
}

export const useTranslateStore = create<TranslateState>((set) => ({
  items: initialItems,
  activeItemId: null,
  setItems: (items) => {
    try {
      localStorage.setItem('translate_history', JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
    set({ items });
  },
  addItems: (newItems) => set((state) => {
    const updated = [...newItems, ...state.items];
    try {
      localStorage.setItem('translate_history', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    return { items: updated };
  }),
  clearItems: () => {
    try {
      localStorage.removeItem('translate_history');
    } catch (e) {
      console.error(e);
    }
    set({ items: [], activeItemId: null });
  },
  openItem: (id) => set({ activeItemId: id }),
  closeItem: () => set({ activeItemId: null }),
}));
