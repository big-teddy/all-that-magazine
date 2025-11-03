/**
 * WordPress REST API Client
 */

export interface CreateArticleData {
  title: string;
  content: string;
  vertical: 'wellness' | 'lifestyle' | 'tech';
  customExcerpt: string;
  readTime: number;
  isPremium: boolean;
  authorBio?: string;
  featuredImageUrl?: string;
}

export interface CreateArticleResponse {
  success: boolean;
  post_id: number;
  slug: string;
  message: string;
}

const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL || 'https://allthatmagazine.com/wp-json';
const WP_USERNAME = process.env.NEXT_PUBLIC_WP_USERNAME || '';
const WP_APP_PASSWORD = process.env.NEXT_PUBLIC_WP_APP_PASSWORD || '';

export async function createArticle(data: CreateArticleData): Promise<CreateArticleResponse> {
  const credentials = Buffer.from(`${WP_USERNAME}:${WP_APP_PASSWORD}`).toString('base64');

  const response = await fetch(`${WP_API_URL}/atm/v1/create-article`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${credentials}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create article');
  }

  return response.json();
}

export async function uploadImage(file: File): Promise<string> {
  const credentials = Buffer.from(`${WP_USERNAME}:${WP_APP_PASSWORD}`).toString('base64');

  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${WP_API_URL}/wp/v2/media`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload image');
  }

  const data = await response.json();
  return data.source_url;
}
