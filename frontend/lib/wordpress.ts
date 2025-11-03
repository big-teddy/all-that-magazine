import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.WORDPRESS_GRAPHQL_ENDPOINT || '';

if (!endpoint) {
  throw new Error('WORDPRESS_GRAPHQL_ENDPOINT environment variable is not set');
}

export const client = new GraphQLClient(endpoint, {
  headers: {},
});

export async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, any>
): Promise<T> {
  try {
    const data = await client.request<T>(query, variables);
    return data;
  } catch (error) {
    console.error('GraphQL Error:', error);
    throw error;
  }
}
