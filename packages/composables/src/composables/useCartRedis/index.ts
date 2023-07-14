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
  const { $odoo } = useVSFContext();
  // const sessionId = $odoo.config.app.$cookies.get('connect.sid');
  const cart: Ref<IRedisCart<ProductType>> = ref({ items: [] });

  const load = async () => {
    const { data } = await $odoo.api.redisLoadCart();
    cart.value = data;

  };

  const addItem = async (product: ProductType) => {
    await $odoo.api.redisAddItemToCart(product);
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
