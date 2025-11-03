import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BookmarkStore {
  bookmarks: string[];
  addBookmark: (slug: string) => void;
  removeBookmark: (slug: string) => void;
  isBookmarked: (slug: string) => boolean;
  clearBookmarks: () => void;
}

export const useBookmarkStore = create<BookmarkStore>()(
  persist(
    (set, get) => ({
      bookmarks: [],

      addBookmark: (slug: string) => {
        const { bookmarks } = get();
        if (!bookmarks.includes(slug)) {
          set({ bookmarks: [...bookmarks, slug] });
        }
      },

      removeBookmark: (slug: string) => {
        set((state) => ({
          bookmarks: state.bookmarks.filter((s) => s !== slug),
        }));
      },

      isBookmarked: (slug: string) => {
        return get().bookmarks.includes(slug);
      },

      clearBookmarks: () => {
        set({ bookmarks: [] });
      },
    }),
    {
      name: 'all-that-bookmarks',
    }
  )
);
