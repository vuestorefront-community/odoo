/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Context } from '@vue-storefront/core';
import { Logger } from 'winston';

export default async function redisRemoveItem(context: Context, orderId: number): Promise<any> {
  const logger : Logger = (process as any).winstonLog;

  if (!orderId) {
    logger.warn('Missing order id');
    return { data: context.req.session.cart };
  }

  const previousAddedItemIndex = context.req.session.cart.orderLines?.findIndex(item => item.id === orderId);

  if (previousAddedItemIndex) {
    context.req.session.cart.orderLines.splice(previousAddedItemIndex, 1);
    // Reorder ids
    context.req.session.cart.orderLines.forEach((element, index) => {
      element.id = index + 1;
    });

    context.req.session.cart.totalItemsInCart = context.req.session.cart.orderLines.length;
    context.req.session.cart.totalItemsInCartWithQuantity = context.req.session.cart.orderLines.reduce((acc, item) => acc + item.quantity, 0);
    return { data: context.req.session.cart };
  }

  logger.warn(`Order Item not found for id ${orderId}`);
  return { data: context.req.session.cart };
}
