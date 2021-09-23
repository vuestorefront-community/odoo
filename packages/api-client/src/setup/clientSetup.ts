
import { createOddoLink } from './apolloClient';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Config, ClientInstance } from './config';
const onCreate = (settings: Config): { config: Config; client: ClientInstance } => {

  const config = (settings as any) as Config;

  // if (config.payment?.providers.length === 0) {
  //   console.warn(
  //     '%c [Config error]: Message: You must set payment providers on middleware config',
  //     'background: #222; color: #FFA07A'
  //   );
  // }

  const { apolloLink } = createOddoLink(config);

  const apolloClient = new ApolloClient({
    link: apolloLink,
    cache: new InMemoryCache(),
    ...settings
  });

  return {
    config,
    client: {
      apollo: apolloClient
    }
  };
};

export default onCreate;
