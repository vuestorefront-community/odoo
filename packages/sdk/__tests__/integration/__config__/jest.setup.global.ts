import { createServer } from '@vue-storefront/middleware';

const middlewareConfig = {
  integrations: {
    boilerplate: {
      location: '@vue-storefront/integration-odoo-api/server',
      configuration: {},
    },
  }
};

export default async () => {
  const app = await createServer(middlewareConfig);
  const server = await runMiddleware(app);

  // eslint-disable-next-line
  (globalThis as any).__MIDDLEWARE__ = server;
};

async function runMiddleware (app: any) {
  return new Promise(resolve => {
    const server = app.listen(8181, async () => {
      resolve(server);
    });
  });
}
