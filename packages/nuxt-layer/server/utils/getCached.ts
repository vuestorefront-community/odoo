import { Endpoints } from '@erpgap/odoo-sdk-api-client';
import { H3Event } from 'h3';

export const getCached = cachedFunction(async (event: H3Event, body: any) => {
  const api: Endpoints = event.context.apolloClient.api;

  return await api.query(body?.[0], body?.[1]);

}, { swr: true, maxAge: 300 });

