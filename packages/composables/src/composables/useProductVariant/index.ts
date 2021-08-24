/* eslint-disable @typescript-eslint/no-unused-vars */
/* istanbul ignore file */

import { useVSFContext, vsfRef } from '@vue-storefront/core';
import { Context } from '@vue-storefront/core';

const useProductVariant = (): any => {
  const context: Context = useVSFContext();

  const errors = vsfRef([], 'errors');
  const productVariants = vsfRef([], 'productVariants');
  const realProduct = vsfRef(null, 'realProduct');
  const elementNames = vsfRef({}, 'elementNames');

  const resetPasswordErrors = () => (errors.value = []);

  const searchVariants = async ({ productId }) => {
    try {
      const response = await context.$odoo.api.getProductVariants(
        { productId },
        {}
      );
      productVariants.value = response;
    } catch (error) {
      errors.value = error;
    }
  };

  const searchRealProduct = async ({ productId, combinationIds }) => {
    if (combinationIds.length === 0) return;

    const response = await context.$odoo.api.getProduct(
      { productId, combinationIds },
      {}
    );

    if (response.error) {
      errors.value = response?.error.data.arguments;
      return;
    }

    realProduct.value = response;
  };

  return {
    elementNames,
    searchVariants,
    resetPasswordErrors,
    searchRealProduct,
    productVariants,
    realProduct,
    errors
  };
};

export default useProductVariant;
