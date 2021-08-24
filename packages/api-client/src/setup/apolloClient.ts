/* eslint-disable camelcase */
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { Config } from './config';
import { onError } from 'apollo-link-error';
import fetch from 'isomorphic-fetch';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createOddoLink = (settings: Config): any => {

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.warn(
          `%c [GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`, 'background: #222; color: #FFA07A'
        )
      );

    if (networkError) console.warn(`[Network error]: ${networkError}`);
  });

  const afterwareLink = new ApolloLink((operation, forward) => {
    return forward(operation).map((response) => {
      const context = operation.getContext();
      const authHeader = context.response.headers.get('set-cookie');

      response.data.cookie = authHeader;

      return response;
    });
  });

  const httpLink = createHttpLink({
    uri: settings.graphqlBaseUrl,
    credentials: 'include',
    fetch,
    headers: {
      Cookie: settings.auth
    }
  });

  const apolloLink = ApolloLink.from([
    errorLink,
    afterwareLink.concat(httpLink)
  ]);

  return {
    apolloLink
  };
};

export { createOddoLink };

