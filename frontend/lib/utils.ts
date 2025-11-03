export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function getVerticalColor(slug: string): string {
  const colors: Record<string, string> = {
    wellness: 'text-wellness border-wellness',
    lifestyle: 'text-lifestyle border-lifestyle',
    tech: 'text-tech border-tech',
  };
  return colors[slug] || 'text-brand-black border-brand-black';
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}
