import { createServer } from '@vue-storefront/middleware';
import consola from 'consola';
import config from '../middleware.config';

(async () => {
  const app = await createServer({ integrations: config.integrations });
  const host = process.argv[2] ?? '0.0.0.0';
  const port = Number(process.argv[3]) || 8181;

  app.listen(port, host, () => {
    consola.success(`API server listening on http://${host}:${port}`);
  });
})();