export const GET_ALL_ARTICLES = `
  query GetAllArticles($first: Int = 10, $after: String) {
    articles(first: $first, after: $after, where: { orderby: { field: DATE, order: DESC } }) {
      edges {
        node {
          id
          databaseId
          title
          slug
          excerpt
          date
          author {
            node {
              name
              avatar {
                url
              }
            }
          }
          verticals {
            nodes {
              id
              name
              slug
            }
          }
          articleFields {
            featuredImage {
              node {
                sourceUrl
                altText
                mediaDetails {
                  width
                  height
                }
              }
            }
            customExcerpt
            readTime
            isPremium
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_ARTICLES_BY_VERTICAL = `
  query GetArticlesByVertical($vertical: ID!, $first: Int = 10) {
    vertical(id: $vertical, idType: SLUG) {
      articles(first: $first) {
        edges {
          node {
            id
            databaseId
            title
            slug
            excerpt
            date
            verticals {
              nodes {
                id
                name
                slug
              }
            }
            articleFields {
              featuredImage {
                node {
                  sourceUrl
                  altText
                  mediaDetails {
                    width
                    height
                  }
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
  }
`;

export const GET_ARTICLE_BY_SLUG = `
  query GetArticleBySlug($slug: ID!) {
    articleBy(slug: $slug) {
      id
      databaseId
      title
      slug
      content
      excerpt
      date
      author {
        node {
          name
          avatar {
            url
          }
        }
      }
      verticals {
        nodes {
          id
          name
          slug
        }
      }
      articleFields {
        featuredImage {
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
        customExcerpt
        readTime
        isPremium
        authorBio
      }
    }
  }
`;

export const GET_RELATED_ARTICLES = `
  query GetRelatedArticles($vertical: String!, $excludeId: Int!, $first: Int = 3) {
    articles(
      first: $first
      where: {
        taxQuery: {
          taxArray: [{
            taxonomy: VERTICAL
            terms: [$vertical]
            field: SLUG
          }]
        }
        notIn: [$excludeId]
        orderby: { field: DATE, order: DESC }
      }
    ) {
      edges {
        node {
          id
          title
          slug
          verticals {
            nodes {
              name
              slug
            }
          }
          articleFields {
            featuredImage {
              sourceUrl
              altText
            }
            customExcerpt
            readTime
          }
        }
      }
    }
  }
`;

export const GET_ALL_VERTICALS = `
  query GetAllVerticals {
    verticals {
      nodes {
        id
        name
        slug
        description
        count
      }
    }
  }
`;
