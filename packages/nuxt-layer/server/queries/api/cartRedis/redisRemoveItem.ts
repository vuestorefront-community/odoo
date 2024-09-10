/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Context } from '@vue-storefront/core';
import { Logger } from 'winston';
import { populateCartRedis } from './helper';
import cartRemoveItem from '../cartRemoveItem';

export default async function redisRemoveItem(context: Context, orderId: number, odooOrderLineId?: number): Promise<any> {
  const logger : Logger = (process as any).winstonLog;

  if (!orderId) {
    logger.warn('Missing order id');
    return { data: context.req.session.cart };
  }

  const previousAddedItemIndex = context.req.session.cart.orderLines?.findIndex(item => item.id === orderId);

  if (previousAddedItemIndex !== -1) {
    context.req.session.cart.orderLines.splice(previousAddedItemIndex, 1);
    // Reorder ids
    context.req.session.cart.orderLines.forEach((element, index) => {
      element.id = index + 1;
    });

    populateCartRedis(context.req.session.cart);
    if (odooOrderLineId) {
      await cartRemoveItem(context, { lineId: odooOrderLineId });
    }

    return { data: context.req.session.cart };
  }

  logger.warn(`Order Item not found for id ${orderId}`);
  return { data: context.req.session.cart };
}
