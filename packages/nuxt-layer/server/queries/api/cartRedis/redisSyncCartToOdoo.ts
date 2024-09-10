/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Context } from '@vue-storefront/core';
import cartAddMultipleItems from '../cartAddMultipleItems';
import cartUpdateItemQty from '../cartUpdateItemQty';
import cartRemoveMultipleItems from '../cartRemoveMultipleItems';
import cartLoad from '../cartLoad';
import { Logger } from 'winston';

export default async function redisSyncCartToOdoo(context: Context): Promise<any> {
  const logger : Logger = (process as any).winstonLog;
  const redisOrderLines = context.req.session.cart.orderLines;

  logger.info('Start sync redis cart to odoo');

  const { data } = await cartLoad(context);
  if (data.cart.order.orderLines?.length > 0) {
    logger.info('Find cart in odoo with items. Updating products:');

    const orderIdsToRemove = [];

    data.cart.order.orderLines.forEach(async (orderLine) => {
      const redisOrderLine = redisOrderLines.find((redisOrderLine: any) => redisOrderLine.product.id === orderLine.product.id);
      if (redisOrderLine && redisOrderLine.quantity !== orderLine.quantity) {
        await cartUpdateItemQty(context, { lineId: orderLine.id, quantity: redisOrderLine.quantity });
      }
      if (!redisOrderLine) {
        orderIdsToRemove.push(orderLine.id);
      }
    });

    await cartRemoveMultipleItems(context, {lineIds: orderIdsToRemove });

    // Add item in redis that are not in odoo cart
    redisOrderLines.forEach(async (redisOrderLine: any) => {
      const productAlreadyInOdooCart = data.cart.order.orderLines.some((orderLine: any) => redisOrderLine.product.id === orderLine.product.id);
      if (!productAlreadyInOdooCart) {
        await cartAddMultipleItems(context, { products: [{
          id: redisOrderLine.product.id,
          quantity: redisOrderLine.quantity
        }]});
      }
    });

    return await cartLoad(context);
  }

  logger.info('No cart found in odoo. Adding products:');
  const productsToAdd = redisOrderLines.map((orderLine: any) => ({
    id: orderLine.product.id,
    quantity: orderLine.quantity
  }));

  await cartAddMultipleItems(context, { products: productsToAdd});

  return await cartLoad(context);
}
