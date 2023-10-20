
import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink } from '@apollo/client';
import { onError } from "@apollo/client/link/error";
import { MiddlewareConfig } from '../index';
import consola from 'consola';

import fetch from 'cross-fetch';

const buildClient = (settings: MiddlewareConfig) => {

  const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
    if (graphQLErrors) {
      graphQLErrors.map((error) => consola.error({label: '[GRAPHQL ERROR]', ...error, operation }));
    }

    if (networkError) {
      consola.error({ label: '[NETWORK ERROR]', message: networkError });
    }
  });


  const httpLink = createHttpLink({
    uri: settings.odooGraphqlUrl,
    credentials: 'include',
    fetch,
    fetchOptions: settings.fetchOptions,
    headers: {
      Cookie: settings.sessionAuth,
      'resquest-host': settings.requestHost,
      'REAL-IP': settings.realIp
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

  const apolloLink = ApolloLink.from([
    errorLink,
    afterwareLink.concat(httpLink)
  ]);

  return new ApolloClient({
    link: apolloLink,
    cache: new InMemoryCache(),
    ssrMode: true,
    credentials: 'include',
    defaultOptions: {
      query: {
        errorPolicy: "all",
        fetchPolicy: "no-cache",
      },
      mutate: {
        errorPolicy: "all",
      }
    }
  });
};

export default buildClient;
