/* eslint-disable @typescript-eslint/no-unused-vars */
/* istanbul ignore file */

import {
  useVSFContext,
  vsfRef,
  Context,
  sharedRef
} from '@vue-storefront/core';
import { GraphQlGetProductVariantParams } from '@vue-storefront/odoo-api/src/types';

const useProductVariant = (queryParams: Record<string, string>): any => {
  const context: Context = useVSFContext();

  const errors = vsfRef([], 'errors');
  const productVariants = vsfRef([], 'productVariants');
  const realProduct = sharedRef(
    null,
    Object?.values(queryParams)?.join('-') || 'realProduct'
  );
  const elementNames = vsfRef({}, 'elementNames');

  const resetPasswordErrors = () => (errors.value = []);

  const searchRealProduct = async ({ productTemplateId, combinationIds }) => {
    const params: GraphQlGetProductVariantParams = {
      combinationId: combinationIds.map((id) => parseInt(id)),
      productTemplateId
    };

    if (combinationIds.length === 0) return;

    const { productVariant } = await context.$odoo.api.getRealProduct(params);

    realProduct.value = productVariant;
  };

  return {
    elementNames,
    resetPasswordErrors,
    searchRealProduct,
    productVariants,
    realProduct,
    errors
  };
};

export default useProductVariant;
