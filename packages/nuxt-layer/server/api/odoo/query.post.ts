import { Endpoints } from '@erpgap/odoo-sdk-api-client';
import { getCached } from '~/server/utils/getCached';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const api: Endpoints = event.context.apolloClient.api;

  // const data = await getCached(event, body);
  const response = await api.query(body?.[0], body?.[1]);

  if ((response.data as any)?.cookie) {
    appendResponseHeader(event, 'Set-cookie', (response.data as any)?.cookie);
  }

  if (response.errors) {
    throw createError(response.errors[0].message);
  }

  return response.data;
});

