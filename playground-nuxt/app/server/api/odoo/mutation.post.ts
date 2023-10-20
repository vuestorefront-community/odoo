import { Endpoints } from '@erpgap/odoo-sdk-api-client';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const api: Endpoints = event.context.apolloClient.api;

  return await api.mutation(body[0], body[1]);
});

