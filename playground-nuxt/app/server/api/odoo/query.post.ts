import { Endpoints } from '@erpgap/odoo-sdk-api-client';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const api: Endpoints = event.context.apolloClient.api;

  const data = await api.query(body?.[0], body?.[1]);

  if ((data.data as any)?.cookie) {
    appendResponseHeader(event, 'Set-cookie', (data.data as any)?.cookie);
  }

  return data;
});

