/* eslint-disable @typescript-eslint/no-unused-vars */
import { Ref, computed } from '@vue/composition-api';
import { ComposableFunctionArgs, configureFactoryParams, Context, FactoryParams, Logger, sharedRef} from '@vue-storefront/core';
import { Composable, ComputedProperty, PlatformApi } from '@vue-storefront/core/lib/src/types';

export interface UseMultipleProductErrors {
  addMultipleProductsToCart: Error;
  removeMultipleProductsFromCart: Error;
}

export interface UseMultipleProduct<ADD_MULTIPLE_PRODUCTS_PARAMS, REMOVE_MULTIPLE_PRODUCTS_PARAMS, API extends PlatformApi = any> extends Composable<API> {
    error: ComputedProperty<UseMultipleProductErrors>;
    loading: ComputedProperty<boolean>;
    addMultipleProductsToCart: (params: ComposableFunctionArgs<ADD_MULTIPLE_PRODUCTS_PARAMS>) => Promise<void>;
    removeMultipleProductsFromCart: (params: ComposableFunctionArgs<REMOVE_MULTIPLE_PRODUCTS_PARAMS>) => Promise<void>;
  }

export interface UseMultipleProductFactoryParams<PRODUCT, ADD_MULTIPLE_PRODUCTS_PARAMS, REMOVE_MULTIPLE_PRODUCTS_PARAMS, CART, API extends PlatformApi = any> extends FactoryParams<API> {
  addMultipleProductsToCart: (context: Context, params: ComposableFunctionArgs<ADD_MULTIPLE_PRODUCTS_PARAMS>) => Promise<CART>;
  removeMultipleProductsFromCart: (context: Context, params: ComposableFunctionArgs<REMOVE_MULTIPLE_PRODUCTS_PARAMS>) => Promise<CART>;
}

export const useMultipleProductFactory = <PRODUCT, ADD_MULTIPLE_PRODUCTS_PARAMS, REMOVE_MULTIPLE_PRODUCTS_PARAMS, API extends PlatformApi = any>(
  factoryParams: UseMultipleProductFactoryParams<PRODUCT, ADD_MULTIPLE_PRODUCTS_PARAMS, REMOVE_MULTIPLE_PRODUCTS_PARAMS, API>
) => function UseMultipleProduct(): UseMultipleProduct<ADD_MULTIPLE_PRODUCTS_PARAMS, REMOVE_MULTIPLE_PRODUCTS_PARAMS, API> {
    const errorsFactory = (): UseMultipleProductErrors => ({
      addMultipleProductsToCart: null,
      removeMultipleProductsFromCart: null
    });

    const loading: Ref<boolean> = sharedRef(false, 'useMultipleProduct-loading');
    const _factoryParams = configureFactoryParams(factoryParams);
    const error: Ref<UseMultipleProductErrors> = sharedRef(errorsFactory(), 'useMultipleProduct-error');

    const resetErrorValue = () => {
      error.value = errorsFactory();
    };

    const addMultipleProductsToCart = async (params: ComposableFunctionArgs<ADD_MULTIPLE_PRODUCTS_PARAMS>) => {
      Logger.debug('useMultipleProduct.addMultipleProductsToCart', params);
      resetErrorValue();

      try {
        loading.value = true;
        error.value.addMultipleProductsToCart = null;

        return await _factoryParams.addMultipleProductsToCart(params);
      } catch (err) {
        error.value.addMultipleProductsToCart = err;
        Logger.error('useMultipleProduct/addMultipleProductsToCart', err);
      } finally {
        loading.value = false;
      }
    };

    const removeMultipleProductsFromCart = async (params: ComposableFunctionArgs<REMOVE_MULTIPLE_PRODUCTS_PARAMS>) => {
      Logger.debug('useMultipleProduct.removeMultipleProductsToCart', params);
      resetErrorValue();

      try {
        loading.value = true;
        error.value.removeMultipleProductsFromCart = null;

        return await _factoryParams.removeMultipleProductsFromCart(params);
      } catch (err) {
        error.value.removeMultipleProductsFromCart = err;
        Logger.error('useMultipleProduct/removeMultipleProductsToCart', err);
      } finally {
        loading.value = false;
      }
    };

    return {
      error: computed(() => error.value),
      loading: computed(() => loading.value),
      addMultipleProductsToCart,
      removeMultipleProductsFromCart
    };
  };
