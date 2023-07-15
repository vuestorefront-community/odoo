/* eslint-disable @typescript-eslint/no-unused-vars */
import { Ref, computed, ref, ssrRef } from '@nuxtjs/composition-api';
import { useVSFContext, sharedRef } from '@vue-storefront/core';
import { IRedisCart } from '@vue-storefront/odoo-api';
interface IUseCartRedis<ProductType extends { id?: number }> {
  load: () => void;
  addItem: (product: ProductType) => void;
  removeItem: (orderId: number) => void;
  updateItemQty: (orderId: number, quantity?: number) => void;
  isInCart: (product: ProductType, quantity?: number) => boolean;
  createCart: () => void;

  totalItemsInCart?: Ref<number>;
  totalItemsInCartWithQuantity?: Ref<number>;
  cart: Ref<IRedisCart<ProductType>>
}

const useCartRedis = <ProductType extends { id?: number }>(): IUseCartRedis<ProductType> => {
  const { $odoo } = useVSFContext();
  const sessionId = $odoo.config.app.$cookies?.get('connect.sid');
  const cart: Ref<IRedisCart<ProductType>> = sharedRef({
    orderLines: [],
    totalItemsInCart: 0,
    totalItemsInCartWithQuantity: 0
  }, sessionId);

  const load = async () => {
    const { data } = await $odoo.api.redisLoadCart();
    cart.value = data as IRedisCart<ProductType>;
  };

  const addItem = async (product: ProductType, quantity = 1) => {
    const { data } = await $odoo.api.redisAddItemToCart(product, quantity);
    cart.value = data as IRedisCart<ProductType>;
  };

  const updateItemQty = async (orderId: number, quantity = 1) => {
    const { data } = await $odoo.api.redisUpdateItemQty(orderId, quantity);
    cart.value = data as IRedisCart<ProductType>;
  };

  const removeItem = async (orderId: number) => {
    const { data } = await $odoo.api.redisRemoveItem(orderId);
    cart.value = data as IRedisCart<ProductType>;
  };

  const createCart = async () => {
    await $odoo.api.redisCreateCart();
  };

  const clear = async () => { };

  const applyCoupon = async () => { };

  const removeCoupon = async () => { };

  const isInCart = (product) => {
    return cart.value?.orderLines?.some(item => item.product.id === product.id);
  };

  const totalItemsInCart = computed(() => cart.value?.totalItemsInCart || 0);

  const totalItemsInCartWithQuantity = computed(() => cart.value?.totalItemsInCartWithQuantity || 0);

  return {
    load,
    addItem,
    removeItem,
    updateItemQty,
    isInCart,
    createCart,

    totalItemsInCart,
    totalItemsInCartWithQuantity,
    cart
  };
};

export default useCartRedis;
