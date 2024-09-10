/* eslint-disable @typescript-eslint/no-unused-vars */
import { Ref, computed, ref, ssrRef } from '@nuxtjs/composition-api';
import { useVSFContext, sharedRef } from '@vue-storefront/core';
import { IRedisCart } from '@vue-storefront/odoo-api';
import useCart from '../useCart';
interface IUseCartRedis<ProductType extends { id?: number }> {
  load: () => void;
  addItem: (product: ProductType) => void;
  removeItem: (orderId: number) => void;
  updateItemQty: (orderId: number, quantity?: number) => void;
  isInCart: (product: ProductType, quantity?: number) => boolean;
  syncCartRedisToOdoo: () => void;

  loading: Ref<boolean>;
  amountTotal: Ref<number>;
  totalItemsInCart: Ref<number>;
  totalItemsInCartWithQuantity: Ref<number>;
  cart: Ref<IRedisCart<ProductType>>
}

const useCartRedis = <ProductType extends { id?: number }>(customQueryLoadOdooCart?: string): IUseCartRedis<ProductType> => {
  const { $odoo } = useVSFContext();
  const { cart: odooCart, load: loadCartOdoo, setCart } = useCart();

  const cart: Ref<IRedisCart<ProductType>> = sharedRef({
    orderLines: [],
    totalItemsInCart: 0,
    totalItemsInCartWithQuantity: 0
  }, 'vsf-odoo-cart');

  const loading: Ref<boolean> = sharedRef(false, 'cart-loading');

  const load = async () => {
    loading.value = true;

    const { data } = await $odoo.api.redisLoadCart();
    cart.value = data as IRedisCart<ProductType>;

    loading.value = false;
  };

  const addItem = async (product: ProductType, quantity = 1) => {
    loading.value = true;

    const { data } = await $odoo.api.redisAddItemToCart(product, quantity);
    cart.value = data as IRedisCart<ProductType>;

    loading.value = false;
  };

  const updateItemQty = async (orderId: number, quantity = 1, productIdForOdooCartUpdate?: number) => {
    loading.value = true;
    let odooOrderLineId = null;

    console.log(productIdForOdooCartUpdate);

    if (productIdForOdooCartUpdate) {
      odooOrderLineId = odooCart.value.order?.orderLines?.find(orderLine => orderLine.product.id === productIdForOdooCartUpdate).id;
    }

    const { data } = await $odoo.api.redisUpdateItemQty(orderId, quantity, odooOrderLineId);

    if (productIdForOdooCartUpdate) {
      setCart(null);
      await loadCartOdoo({ customQuery: { cartLoad: customQueryLoadOdooCart}});
    }

    cart.value = data as IRedisCart<ProductType>;

    loading.value = false;
  };

  const removeItem = async (orderId: number, productIdForOdooCartUpdate?: number) => {
    loading.value = true;
    let odooOrderLineId = null;

    if (productIdForOdooCartUpdate) {
      odooOrderLineId = odooCart.value.order?.orderLines?.find(orderLine => orderLine.product.id === productIdForOdooCartUpdate).id;
    }

    const { data } = await $odoo.api.redisRemoveItem(orderId, odooOrderLineId);

    if (productIdForOdooCartUpdate) {
      setCart(null);
      await loadCartOdoo({ customQuery: { cartLoad: customQueryLoadOdooCart}});
    }

    cart.value = data as IRedisCart<ProductType>;

    loading.value = false;
  };

  const syncCartRedisToOdoo = async () => {
    await $odoo.api.redisSyncCartToOdoo();
  };

  const clear = async () => { };

  const applyCoupon = async () => { };

  const removeCoupon = async () => { };

  const isInCart = (product) => {
    return cart.value?.orderLines?.some(item => item.product.id === product.id);
  };

  const totalItemsInCart = computed(() => cart.value?.totalItemsInCart || 0);

  const totalItemsInCartWithQuantity = computed(() => cart.value?.totalItemsInCartWithQuantity || 0);

  const amountTotal = computed(() => cart.value?.amountTotal || 0);

  return {
    load,
    addItem,
    removeItem,
    updateItemQty,
    isInCart,
    syncCartRedisToOdoo,

    loading,
    amountTotal,
    totalItemsInCart,
    totalItemsInCartWithQuantity,
    cart
  };
};

export default useCartRedis;
