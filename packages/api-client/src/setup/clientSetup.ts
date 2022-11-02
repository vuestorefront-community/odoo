
import { createOddoLink } from './apolloClient';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Config, ClientInstance } from './config';
import { Logger } from 'winston';
const onCreate = (settings: Config): { config: Config; client: ClientInstance } => {
  const logger : Logger = (process as any).winstonLog;

  if (!logger) {
    console.error('YOU MUST INSTALL AND CONFIGURE NUXT WINSTON MODULE FROM https://github.com/aaronransley/nuxt-winston-log');
    throw new Error('YOU MUST INSTALL AND CONFIGURE NUXT WINSTON MODULE FROM https://github.com/aaronransley/nuxt-winston-log');
  }

  const config = (settings as any) as Config;

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
