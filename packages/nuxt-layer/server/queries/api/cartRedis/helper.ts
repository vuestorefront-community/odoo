import { IRedisCart } from '../../types/';

export const populateCartRedis = (cartRedis: IRedisCart<any>) : void => {
  cartRedis.totalItemsInCart = cartRedis.orderLines.length;
  cartRedis.totalItemsInCartWithQuantity = cartRedis.orderLines.reduce((acc, item) => acc + item.quantity, 0);
  cartRedis.amountTotal = cartRedis.orderLines.reduce((acc, item) => acc + (item.product?.combinationInfo?.price * item.quantity), 0);
};
