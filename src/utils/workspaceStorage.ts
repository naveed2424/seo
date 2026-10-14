export interface SavedItem {
  id: string;
  type: 'keyword' | 'tool' | 'prompt' | 'article-draft';
  title: string;
  category?: string;
  content: string;
  timestamp: number;
  metadata?: Record<string, any>;
}

const STORAGE_KEY = 'rankpulse_workspace_items';
const SEARCH_HISTORY_KEY = 'rankpulse_recent_searches';

export const workspaceStorage = {
  getItems: (): SavedItem[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveItem: (item: Omit<SavedItem, 'timestamp'>): SavedItem => {
    const existing = workspaceStorage.getItems();
    const newItem: SavedItem = {
      ...item,
      timestamp: Date.now(),
    };
    // If item with same ID or content exists, update it, otherwise prepend
    const filtered = existing.filter((i) => i.id !== item.id);
    const updated = [newItem, ...filtered];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
    return newItem;
  },

  removeItem: (id: string): void => {
    const existing = workspaceStorage.getItems();
    const filtered = existing.filter((i) => i.id !== id);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    } catch (e) {
      console.warn('LocalStorage remove failed:', e);
    }
  },

  isSaved: (id: string): boolean => {
    const items = workspaceStorage.getItems();
    return items.some((i) => i.id === id);
  },

  // Recent searches for universal search bar
  getRecentSearches: (): string[] => {
    try {
      const data = localStorage.getItem(SEARCH_HISTORY_KEY);
      return data ? JSON.parse(data) : ['AI tools for small business', 'keyword explorer', 'digital products', 'youtube growth'];
    } catch {
      return ['AI tools for small business', 'keyword explorer', 'digital products'];
    }
  },

  addRecentSearch: (query: string): void => {
    if (!query.trim()) return;
    const existing = workspaceStorage.getRecentSearches();
    const filtered = existing.filter((q) => q.toLowerCase() !== query.toLowerCase());
    const updated = [query.trim(), ...filtered].slice(0, 8);
    try {
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save search query:', e);
    }
  },

  exportToCSV: (items: SavedItem[]): void => {
    const headers = ['Type', 'Title', 'Category', 'Saved At', 'Content Preview'];
    const rows = items.map((item) => [
      `"${item.type}"`,
      `"${item.title.replace(/"/g, '""')}"`,
      `"${(item.category || '').replace(/"/g, '""')}"`,
      `"${new Date(item.timestamp).toISOString()}"`,
      `"${item.content.slice(0, 150).replace(/"/g, '""').replace(/\n/g, ' ')}"`,
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `rankpulse-workspace-export-${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  },

  exportToJSON: (items: SavedItem[]): void => {
    const jsonStr = JSON.stringify(items, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `rankpulse-workspace-export-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  },
};
