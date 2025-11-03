'use client';

import { useState } from 'react';
import { createArticle, uploadImage, CreateArticleData } from '@/lib/wordpress-api';

export default function ArticleForm() {
  const [formData, setFormData] = useState<CreateArticleData>({
    title: '',
    content: '',
    vertical: 'wellness',
    customExcerpt: '',
    readTime: 5,
    isPremium: false,
    authorBio: '',
  });

  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'readTime') {
      setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFeaturedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      let featuredImageUrl: string | undefined;

      // Upload image if provided
      if (featuredImage) {
        featuredImageUrl = await uploadImage(featuredImage);
      }

      // Create article
      const result = await createArticle({
        ...formData,
        featuredImageUrl,
      });

      setMessage({
        type: 'success',
        text: `Article created successfully! Post ID: ${result.post_id}`,
      });

      // Reset form
      setFormData({
        title: '',
        content: '',
        vertical: 'wellness',
        customExcerpt: '',
        readTime: 5,
        isPremium: false,
        authorBio: '',
      });
      setFeaturedImage(null);
      setImagePreview('');

    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to create article',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-8">Create New Article</h1>

      {message && (
        <div
          className={`p-4 rounded-lg ${
            message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-2">
          Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Vertical */}
      <div>
        <label htmlFor="vertical" className="block text-sm font-medium mb-2">
          Vertical *
        </label>
        <select
          id="vertical"
          name="vertical"
          value={formData.vertical}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="wellness">Wellness</option>
          <option value="lifestyle">Lifestyle</option>
          <option value="tech">Tech</option>
        </select>
      </div>

      {/* Custom Excerpt */}
      <div>
        <label htmlFor="customExcerpt" className="block text-sm font-medium mb-2">
          Custom Excerpt *
        </label>
        <textarea
          id="customExcerpt"
          name="customExcerpt"
          value={formData.customExcerpt}
          onChange={handleChange}
          required
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Content */}
      <div>
        <label htmlFor="content" className="block text-sm font-medium mb-2">
          Content *
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          rows={15}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
        />
      </div>

      {/* Featured Image */}
      <div>
        <label htmlFor="featuredImage" className="block text-sm font-medium mb-2">
          Featured Image
        </label>
        <input
          type="file"
          id="featuredImage"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
        {imagePreview && (
          <div className="mt-4">
            <img src={imagePreview} alt="Preview" className="max-w-md rounded-lg" />
          </div>
        )}
      </div>

      {/* Read Time */}
      <div>
        <label htmlFor="readTime" className="block text-sm font-medium mb-2">
          Read Time (minutes) *
        </label>
        <input
          type="number"
          id="readTime"
          name="readTime"
          value={formData.readTime}
          onChange={handleChange}
          required
          min="1"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Author Bio */}
      <div>
        <label htmlFor="authorBio" className="block text-sm font-medium mb-2">
          Author Bio
        </label>
        <textarea
          id="authorBio"
          name="authorBio"
          value={formData.authorBio}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Premium */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="isPremium"
          name="isPremium"
          checked={formData.isPremium}
          onChange={handleChange}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="isPremium" className="ml-2 text-sm font-medium">
          Premium Article
        </label>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Creating Article...' : 'Create Article'}
        </button>
      </div>
    </form>
  );
}
