import { NextRequest } from 'next/server';
import { fetchGraphQL } from '@/lib/wordpress';

const SEARCH_QUERY = `
  query SearchArticles($search: String!, $vertical: String) {
    articles(
      where: {
        search: $search,
        taxQuery: {
          relation: AND,
          taxArray: [{
            taxonomy: VERTICAL,
            field: SLUG,
            terms: [$vertical]
          }]
        }
      }
      first: 20
    ) {
      edges {
        node {
          id
          title
          slug
          excerpt
          date
          verticals {
            nodes {
              name
              slug
            }
          }
          articleFields {
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            customExcerpt
            readTime
            isPremium
          }
        }
      }
    }
  }
`;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  const vertical = searchParams.get('vertical');

  if (!query) {
    return Response.json({ error: 'Query parameter required' }, { status: 400 });
  }

  try {
    const data = await fetchGraphQL(SEARCH_QUERY, {
      search: query,
      vertical: vertical || undefined,
    });

    return Response.json(data);
  } catch (error) {
    console.error('Search error:', error);
    return Response.json({ error: 'Search failed' }, { status: 500 });
  }
}
