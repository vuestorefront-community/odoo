
import { createOddoLink } from './apolloClient';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Config, ClientInstance } from './config';
import { Logger } from 'winston';
import Redis from 'redis-tag-cache';
import IoRedis from 'ioredis';

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
  let redisTagClient = null;
  let wareHouseRedisClient = null;

  if (settings.redisClient) {
    const options = {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD || null,
      db: process.env.REDIS_DATABASE || 0
    };

    const optionsDatabase2 = {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD || null,
      db: Number(process.env.REDIS_WAREHOUSE_DATABASE) || 2
    };

    if ((process as any).superRedis) {
      redisTagClient = (process as any).superRedis;
      wareHouseRedisClient = (process as any).wareHouseRedis;
    } else {
      (process as any).superRedis = new Redis({ redis: options });
      (process as any).wareHouseRedis = new IoRedis(optionsDatabase2);

      redisTagClient = (process as any).superRedis;
      wareHouseRedisClient = (process as any).wareHouseRedis;
    }

  }

  return {
    config,
    client: {
      wareHouseRedisClient,
      redisTagClient,
      apollo: apolloClient
    }
  };
};

export default onCreate;
