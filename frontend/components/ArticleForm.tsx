'use client';

import { useState } from 'react';
import { createArticle, uploadImage, CreateArticleData, publishDraft } from '@/lib/wordpress-api';
import RichTextEditor from '@/components/editor/RichTextEditor';
import ImageUploader from '@/components/editor/ImageUploader';
import ArticlePreview from '@/components/editor/ArticlePreview';
import { useDraft } from '@/hooks/useDraft';

type ViewMode = 'edit' | 'split' | 'preview';

export default function ArticleForm() {
  const { data, setData, draftId, lastSaved, saving, saveError, save, clearDraft } = useDraft();

  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleChange = (field: keyof CreateArticleData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUploaded = (url: string) => {
    handleChange('featuredImageUrl', url);
  };

  const handleSaveDraft = async () => {
    try {
      await save();
      setMessage({
        type: 'success',
        text: '임시저장이 완료되었습니다.',
      });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : '임시저장에 실패했습니다.',
      });
    }
  };

  const handlePublish = async () => {
    setIsSubmitting(true);
    setMessage(null);

    try {
      let result;

      if (draftId) {
        // Publish existing draft
        result = await publishDraft(draftId);
      } else {
        // Create new article
        result = await createArticle(data);
      }

      setMessage({
        type: 'success',
        text: `글이 성공적으로 발행되었습니다! (ID: ${result.post_id})`,
      });

      // Clear draft and reset form
      clearDraft();

      // Scroll to top to see success message
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : '발행에 실패했습니다.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatLastSaved = () => {
    if (!lastSaved) return null;
    const now = new Date();
    const diff = Math.floor((now.getTime() - lastSaved.getTime()) / 1000);

    if (diff < 60) return '방금 전';
    if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
    return lastSaved.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Title */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">새 글 작성</h1>
              <div className="flex items-center gap-3 mt-1">
                {saving && (
                  <span className="text-sm text-blue-600">저장 중...</span>
                )}
                {lastSaved && !saving && (
                  <span className="text-sm text-gray-500">
                    마지막 저장: {formatLastSaved()}
                  </span>
                )}
                {saveError && (
                  <span className="text-sm text-red-600">{saveError}</span>
                )}
              </div>
            </div>

            {/* Center: View Mode Toggle */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button
                type="button"
                onClick={() => setViewMode('edit')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'edit'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                ✍️ 작성
              </button>
              <button
                type="button"
                onClick={() => setViewMode('split')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'split'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                ⚡ 분할
              </button>
              <button
                type="button"
                onClick={() => setViewMode('preview')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'preview'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                👁️ 미리보기
              </button>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleSaveDraft}
                disabled={saving || !data.title.trim()}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                💾 임시저장
              </button>
              <button
                type="button"
                onClick={handlePublish}
                disabled={isSubmitting || !data.title.trim() || !data.content.trim()}
                className="px-6 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? '발행 중...' : '🚀 발행하기'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Message Banner */}
      {message && (
        <div className="max-w-[1800px] mx-auto px-6 pt-4">
          <div
            className={`p-4 rounded-lg ${
              message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {message.text}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="max-w-[1800px] mx-auto">
        {viewMode === 'edit' && (
          <div className="px-6 py-8">
            <div className="max-w-4xl mx-auto space-y-6">
              <EditorForm data={data} onChange={handleChange} onImageUploaded={handleImageUploaded} />
            </div>
          </div>
        )}

        {viewMode === 'split' && (
          <div className="grid grid-cols-2 gap-6 px-6 py-8 h-[calc(100vh-180px)]">
            <div className="overflow-y-auto pr-4">
              <EditorForm data={data} onChange={handleChange} onImageUploaded={handleImageUploaded} />
            </div>
            <div className="overflow-y-auto border-l border-gray-200 pl-4 sticky top-0">
              <ArticlePreview data={data} />
            </div>
          </div>
        )}

        {viewMode === 'preview' && (
          <div className="h-[calc(100vh-180px)] overflow-y-auto">
            <ArticlePreview data={data} />
          </div>
        )}
      </div>
    </div>
  );
}

interface EditorFormProps {
  data: CreateArticleData & { featuredImageUrl?: string };
  onChange: (field: keyof CreateArticleData, value: any) => void;
  onImageUploaded: (url: string) => void;
}

function EditorForm({ data, onChange, onImageUploaded }: EditorFormProps) {
  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <input
          type="text"
          placeholder="제목을 입력하세요..."
          value={data.title}
          onChange={(e) => onChange('title', e.target.value)}
          className="w-full text-4xl font-bold border-none outline-none focus:ring-0 placeholder-gray-300 bg-transparent"
        />
      </div>

      {/* Metadata Row */}
      <div className="grid grid-cols-3 gap-4">
        {/* Vertical */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            카테고리 *
          </label>
          <select
            value={data.vertical}
            onChange={(e) => onChange('vertical', e.target.value as 'wellness' | 'lifestyle' | 'tech')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="wellness">Wellness</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="tech">Tech</option>
          </select>
        </div>

        {/* Read Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            읽기 시간 (분) *
          </label>
          <input
            type="number"
            value={data.readTime}
            onChange={(e) => onChange('readTime', parseInt(e.target.value) || 0)}
            min="1"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Premium */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            옵션
          </label>
          <div className="flex items-center h-[42px]">
            <input
              type="checkbox"
              id="isPremium"
              checked={data.isPremium}
              onChange={(e) => onChange('isPremium', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="isPremium" className="ml-2 text-sm font-medium text-gray-700">
              프리미엄 글
            </label>
          </div>
        </div>
      </div>

      {/* Custom Excerpt */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          요약 *
        </label>
        <textarea
          placeholder="글의 요약을 입력하세요..."
          value={data.customExcerpt}
          onChange={(e) => onChange('customExcerpt', e.target.value)}
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>

      {/* Featured Image */}
      <ImageUploader
        onImageUploaded={onImageUploaded}
        currentImageUrl={data.featuredImageUrl}
      />

      {/* Content Editor */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          본문 *
        </label>
        <RichTextEditor
          content={data.content}
          onChange={(html) => onChange('content', html)}
          placeholder="이곳에 글을 작성하세요. 툴바를 사용하여 서식을 지정할 수 있습니다..."
        />
      </div>

      {/* Author Bio */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          저자 소개
        </label>
        <textarea
          placeholder="저자에 대한 간단한 소개를 입력하세요..."
          value={data.authorBio}
          onChange={(e) => onChange('authorBio', e.target.value)}
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>
    </div>
  );
}
