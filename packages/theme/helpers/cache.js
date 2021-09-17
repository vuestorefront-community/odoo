import Redis from 'redis-tag-cache';

export default function RedisCache({ redis, isDev }) {
  const client = new Redis({
    defaultTimeout: redis.defaultTimeout,
    redis: redis
  });

  return {
    async invoke({ route, render, getTags }) {
      const key = `page:${route}`;
      if (isDev) {
        const content = await render();
        return content;
      }

      const cachedResponse = await client.get(key);

      if (cachedResponse) {
        return cachedResponse;
      }

      const content = await render();
      const tags = getTags();

      if (!tags.length) {
        return content;
      }

      client.set(key, content, tags);

      return content;
    },

    invalidate({ tags }) {
      const clearAll = tags.includes('*');

      if (!clearAll) {
        return client.invalidate(...tags);
      }

      return new Promise((resolve, reject) => {
        const stream = client.redis.scanStream({ match: 'tags:*' });

        const tags = [];

        stream.on('data', (rawTags) => tags.push(...rawTags));
        stream.on('end', async () => {
          if (tags.length) {
            await client.invalidate(...tags);
          }
          resolve();
        });
        stream.on('error', reject);
      });
    }
  };
}
