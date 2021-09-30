/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* istanbul ignore file */

import { UserOrderGetters } from '@vue-storefront/core';
import { Order, OrderItem } from '../types';

export const getDate = (order: any): string => order?.date || '123';

export const getId = (order: any): string =>
  order?.id || Math.floor(Math.random() * 100);

export const getStatus = (order: any): string => order?.status || 'Failed';

export const getPrice = (order: any): number | null => order?.price || 0;

export const getItems = (order: any): any[] => order?.items || [];

export const getItemSku = (item: any): string => item?.sku || 0;

export const getItemName = (item: any): string => item?.name || 0;

export const getItemQty = (item: any): number => item?.qty || 0;

export const getItemPrice = (item: any): number => item?.price?.current || 0;

export const getFormattedPrice = (price: number) => String(price);

export const getOrdersTotal = (orders: any) => orders.total;

const orderGetters: UserOrderGetters<Order, OrderItem> = {
  getDate,
  getId,
  getStatus,
  getPrice,
  getItems,
  getItemSku,
  getItemName,
  getItemQty,
  getItemPrice,
  getFormattedPrice,
  getOrdersTotal
};

export default orderGetters;
