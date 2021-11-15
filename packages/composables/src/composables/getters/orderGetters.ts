/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* istanbul ignore file */

import { UserOrderGetters } from '@vue-storefront/core';
import { Order, OrderLine } from '@vue-storefront/odoo-api';

export const getDate = (order: Order): string => order?.dateOrder?.toString() || '-';

export const getId = (order: Order): string => order?.id.toString();

export const getStatus = (order: Order): string => order?.stage.toString() || 'Failed';

export const getPrice = (order: Order): number | null => order?.amountTotal || 0;

export const getItems = (order: Order): OrderLine[] => order?.orderLines || [];

export const getItemSku = (item: Order): string => item?.name || '';

export const getItemName = (item: Order): string => item?.name || '';

export const getItemQty = (item: Order): number => item?.orderLines?.length || 0;

export const getItemPrice = (item: Order): number => 0;

export const getFormattedPrice = (price: number) => String(price);

export const getOrdersTotal = (orders: any) => 0;

const orderGetters: UserOrderGetters<Order, OrderLine> = {
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
