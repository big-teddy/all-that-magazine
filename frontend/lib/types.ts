export interface Article {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  date: string;
  author: {
    node: {
      name: string;
      avatar: {
        url: string;
      };
    };
  };
  verticals: {
    nodes: Vertical[];
  };
  articleFields: {
    featuredImage: {
      sourceUrl: string;
      altText: string;
      mediaDetails: {
        width: number;
        height: number;
      };
    };
    customExcerpt: string;
    readTime: number;
    isPremium: boolean;
    authorBio: string;
  };
}

export interface Vertical {
  id: string;
  name: string;
  slug: string;
  description: string;
  count: number;
  verticalColor?: string;
}

export interface ArticleEdge {
  node: Article;
}

export interface ArticlesResponse {
  articles: {
    edges: ArticleEdge[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
  };
}

export interface SingleArticleResponse {
  articleBy: Article;
}

export interface VerticalsResponse {
  verticals: {
    nodes: Vertical[];
  };
}

export type VerticalSlug = 'wellness' | 'lifestyle' | 'tech';
