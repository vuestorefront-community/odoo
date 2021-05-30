
import { createOddoLink } from './apolloClient';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import axios from 'axios';
import { Config, ClientInstance } from './config';

const onSetup = (settings: Config): { config: Config; client: ClientInstance } => {

  const config = (settings as any) as Config;

  const { apolloLink } = createOddoLink(config);

  const apolloClient = new ApolloClient({
    link: apolloLink,
    cache: new InMemoryCache(),
    ...settings
  });

  const axiosClient = axios.create({
    withCredentials: true,
    baseURL: settings.odooBaseUrl
  });

  return {
    config,
    client: {
      apollo: apolloClient,
      axios: axiosClient
    }
  };
};

export default onSetup;
