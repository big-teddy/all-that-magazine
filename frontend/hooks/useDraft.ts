'use client';

import { useEffect, useState, useCallback } from 'react';
import { DraftData, saveDraft } from '@/lib/wordpress-api';

const DRAFT_KEY = 'article_draft';
const AUTO_SAVE_INTERVAL = 30000; // 30 seconds

export function useDraft(initialData?: DraftData) {
  const [data, setData] = useState<DraftData>(
    initialData || {
      title: '',
      content: '',
      vertical: 'wellness',
      customExcerpt: '',
      readTime: 5,
      isPremium: false,
      authorBio: '',
    }
  );
  const [draftId, setDraftId] = useState<string | undefined>(initialData?.draftId);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Load draft from localStorage on mount
  useEffect(() => {
    if (!initialData) {
      const savedDraft = localStorage.getItem(DRAFT_KEY);
      if (savedDraft) {
        try {
          const parsed = JSON.parse(savedDraft);
          setData(parsed);
          setDraftId(parsed.draftId);
        } catch (err) {
          console.error('Failed to load draft from localStorage:', err);
        }
      }
    }
  }, [initialData]);

  // Save to localStorage whenever data changes
  useEffect(() => {
    const saveToLocalStorage = () => {
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify({ ...data, draftId }));
      } catch (err) {
        console.error('Failed to save draft to localStorage:', err);
      }
    };

    const timer = setTimeout(saveToLocalStorage, 1000); // Debounce
    return () => clearTimeout(timer);
  }, [data, draftId]);

  // Auto-save to server
  const saveToServer = useCallback(async () => {
    // Don't save if title is empty
    if (!data.title.trim()) {
      return;
    }

    setSaving(true);
    setSaveError(null);

    try {
      const response = await saveDraft({ ...data, draftId });
      setDraftId(response.draft_id);
      setLastSaved(new Date());
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Failed to save draft');
      console.error('Failed to save draft:', err);
    } finally {
      setSaving(false);
    }
  }, [data, draftId]);

  // Auto-save interval
  useEffect(() => {
    const interval = setInterval(() => {
      if (data.title.trim()) {
        saveToServer();
      }
    }, AUTO_SAVE_INTERVAL);

    return () => clearInterval(interval);
  }, [data.title, saveToServer]);

  // Manual save
  const save = useCallback(async () => {
    await saveToServer();
  }, [saveToServer]);

  // Clear draft
  const clearDraft = useCallback(() => {
    localStorage.removeItem(DRAFT_KEY);
    setData({
      title: '',
      content: '',
      vertical: 'wellness',
      customExcerpt: '',
      readTime: 5,
      isPremium: false,
      authorBio: '',
    });
    setDraftId(undefined);
    setLastSaved(null);
  }, []);

  return {
    data,
    setData,
    draftId,
    lastSaved,
    saving,
    saveError,
    save,
    clearDraft,
  };
}
