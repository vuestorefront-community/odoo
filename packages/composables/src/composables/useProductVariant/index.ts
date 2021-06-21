/* eslint-disable @typescript-eslint/no-unused-vars */
/* istanbul ignore file */
import { ssrRef } from '@nuxtjs/composition-api';

import { useVSFContext, sharedRef } from '@vue-storefront/core';
import { Context, ComputedProperty } from '@vue-storefront/core';

const useProductVariant = () => {
  const context: Context = useVSFContext();

  const errors = ssrRef([]);
  const productVariants = ssrRef([]);
  const realProduct = ssrRef(null);
  const elementNames = ssrRef({});

  const resetPasswordErrors = () => errors.value = [];

  const searchVariants = async ({ productId }) => {

    try {
      const response = await context.$odoo.api.getProductVariants({ productId }, {});
      productVariants.value = response;

    } catch (error) {
      errors.value = error;

    }
  };

  const searchRealProduct = async ({ productId, combinationIds }) => {
    if (combinationIds.length === 0) return;

    const response = await context.$odoo.api.getProduct({ productId, combinationIds }, {});

    if (response.error) {
      errors.value = response?.error.data.arguments;
      return;
    }

    realProduct.value = response;
  };

  return { elementNames, searchVariants, resetPasswordErrors, searchRealProduct, productVariants, realProduct, errors };
};

export default useProductVariant;

