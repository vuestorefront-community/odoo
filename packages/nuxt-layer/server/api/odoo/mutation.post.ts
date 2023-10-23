import { Endpoints } from '@erpgap/odoo-sdk-api-client';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const api: Endpoints = event.context.apolloClient.api;

  const response = await api.mutation(body?.[0], body?.[1]);

  if ((response.data as any)?.cookie) {
    appendResponseHeader(event, 'Set-cookie', (response.data as any)?.cookie);
  }

  if (response.errors) {
    throw createError({ statusCode: 400, data: response.errors });
  }

  return response.data;
});

