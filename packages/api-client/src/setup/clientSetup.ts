
import { createOddoLink } from './apolloClient';
import ApolloClient from 'apollo-client';
import axios from 'axios';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Config, ClientInstance } from './config';
const onCreate = (settings: Config): { config: Config; client: ClientInstance } => {

  const config = (settings as any) as Config;

  const { apolloLink } = createOddoLink(config);

  const apolloClient = new ApolloClient({
    link: apolloLink,
    cache: new InMemoryCache(),
    ...settings
  });

  const axiosClient = axios.create({
    withCredentials: true,
    baseURL: settings.odooBaseUrl,
    headers: {
      Cookie: settings['auth']
    }
  });
  // axiosClient.interceptors.request.use((config) => {
  //   /** In dev, intercepts request and logs it into console for dev */
  //   console.info("✉️ ", config)
  //   return config;
  // }, (error) => {
  //   console.error("✉️ ", error);
  //   return Promise.reject(error);
  // });

  return {
    config,
    client: {
      apollo: apolloClient,
      axios: axiosClient
    }
  };
};

export default onCreate;
