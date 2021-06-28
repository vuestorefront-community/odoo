import Redis from 'redis-tag-cache';

export default function RedisCache (options) {
  const client = new Redis({
    defaultTimeout: 86400,
    redis: options.redis
  });

  return {
    async invoke ({ route, render, getTags }) {
      const key = `page:${route}`;
      const cachedResponse = await client.get(key);

      if (cachedResponse) {
        return cachedResponse;
      }

      const content = await render();
      const tags = getTags();

      if (!tags.length) {
        return content;
      }

      client.set(
        key,
        content,
        tags
      );

      return content;
    },

    invalidate ({ tags }) {
      const clearAll = tags.includes('*');

      if (!clearAll) {
        return client.invalidate(...tags);
      }

      return new Promise((resolve, reject) => {
        const prefix = `${options.redis.keyPrefix || ''}tags:`;
        const stream = client.redis.scanStream({ match: `${prefix}*` });

        const tags = [];

        stream.on('data', rawTags => tags.push(...rawTags.map(tag => tag.replace(prefix, ''))));
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
