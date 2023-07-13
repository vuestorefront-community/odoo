/* eslint-disable @typescript-eslint/no-unused-vars */
import { Ref, ref, ssrRef } from '@nuxtjs/composition-api';
import { useVSFContext } from '@vue-storefront/core';
import { Context } from '@vue-storefront/core';

interface IRedisCart<ProductType> {
  items?: ProductType[];
}

interface IUseCartRedis<ProductType> {
  load: () => void;
  addItem: (product: ProductType) => void;
  removeItem: () => void;
  updateItemQty: () => void;
  isInCart: (product: ProductType) => boolean;
  cart: Ref<IRedisCart<ProductType>>
}

const useCartRedis = <ProductType>(): IUseCartRedis<ProductType> => {
  const context: Context = useVSFContext();
  const sessionId = context.$odoo.config.app.$cookies.get('connect.sid');
  const cart: Ref<IRedisCart<ProductType>> = ssrRef<IRedisCart<ProductType>>({}, sessionId);

  const load = async () => {
    const data = context.$odoo.api.cartLoadRedis();

  };

  const addItem = async (product: ProductType) => {
    const data = context.$odoo.api.cartAddItemRedis(product);
  };

  const removeItem = async () => {
  };

  const updateItemQty = async () => {
  };

  const clear = async () => {
  };

  const applyCoupon = async () => {

  };

  const removeCoupon = async () => {
  };

  const isInCart = (product: ProductType) => {

    return false;
  };

  return {
    load,
    addItem,
    removeItem,
    updateItemQty,
    isInCart,
    cart
  };
};

export default useCartRedis;
