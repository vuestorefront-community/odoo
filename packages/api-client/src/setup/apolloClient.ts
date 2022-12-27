/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable quote-props */
/* eslint-disable camelcase */
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { Config } from './config';
import { onError } from 'apollo-link-error';
import fetch from 'isomorphic-fetch';
import logBuilder from './logBuilder';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createOddoLink = (settings: Config): any => {

  const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
    if (graphQLErrors) {
      graphQLErrors.map((error) => logBuilder({label: '[GRAPHQL ERROR]', ...error, operation }));
    }

    if (networkError) {
      logBuilder({ label: '[NETWORK ERROR]', message: networkError });
    }
  });

  const afterwareLink = new ApolloLink((operation, forward) => {
    return forward(operation).map((response) => {
      const context = operation.getContext();
      const authHeader = context.response.headers.get('set-cookie');

      if (response.data) {
        response.data.cookie = authHeader;
      }

      return response;
    });
  });

  const httpLink = createHttpLink({
    uri: settings.graphqlBaseUrl,
    credentials: 'include',
    fetch,
    headers: {
      Cookie: settings.auth,
      'resquest-host': settings['resquest-host'],
      'REAL-IP': settings['client-ip']

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
