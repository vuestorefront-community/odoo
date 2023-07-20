
import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink } from '@apollo/client';
import { MiddlewareConfig } from '../index';

import fetch from 'cross-fetch';

const buildClient = (settings: MiddlewareConfig) => {

  // const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  //   if (graphQLErrors) {
  //     graphQLErrors.map((error) => logBuilder({label: '[GRAPHQL ERROR]', ...error, operation }));
  //   }

  //   if (networkError) {
  //     logBuilder({ label: '[NETWORK ERROR]', message: networkError });
  //   }
  // });


  const httpLink = createHttpLink({
    uri: settings.odooGraphqlUrl,
    credentials: 'include',
    fetch,
    fetchOptions: settings.fetchOptions,
    // headers: {
    //   Cookie: settings.auth,
    //   'resquest-host': settings['resquest-host'],
    //   'REAL-IP': settings['real-ip']

    // }
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
    //errorLink,
    afterwareLink.concat(httpLink)
  ]);

  return new ApolloClient({
    link: apolloLink,
    cache: new InMemoryCache(),
  });
};

export default buildClient;
