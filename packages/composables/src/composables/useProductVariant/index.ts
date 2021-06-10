/* eslint-disable @typescript-eslint/no-unused-vars */
/* istanbul ignore file */
import { ref, reactive } from '@vue/composition-api';
import { ssrRef } from '@nuxtjs/composition-api';

import { useVSFContext, sharedRef } from '@vue-storefront/core';
import { Context, ComputedProperty } from '@vue-storefront/core';

const useProductVariant = () => {
  const context: Context = useVSFContext();

  const errors = ssrRef([])
  const productVariants = ssrRef([])
  const realProduct = ssrRef([])
  const groupedVariants = ssrRef({})
  const elementNames = ssrRef({});


  const resetPasswordErrors = () => errors.value = []

  const searchVariants = async ({ id }) => {
    productVariants.value = []
    try {
      const response = await context.$odoo.api.getProductVariants({ id }, {})
      productVariants.value = response?.result?.attribute_values.length > 0 ? response?.result?.attribute_values : []

    } catch (error) {
      errors.value = error

    }
  }

  const searchRealProduct = async ({ productId, combinationIds }) => {
    if (combinationIds.length == 0) return

    const response = await context.$odoo.api.getProduct({ productId, combinationIds }, {})

    if (response.error) {
      errors.value = response?.error.data.arguments
      return
    }

    realProduct.value = response.result
  }

  const getGroupedVariants = (modelValue) => {
    let grouped = {};

    productVariants.value.forEach((element) => {
      if (!grouped[element.attribute_name]) {
        grouped[element.attribute_name] = {
          type: element.display_type,
          model: modelValue[element.attribute_name] || '',
          items: [],
        };
      }
      grouped[element.attribute_name].items.push({
        label: element.attribute_value_name,
        value: String(element.attribute_value_id),
      });
    });

    groupedVariants.value = reactive(grouped);
    elementNames.value = Object.keys(groupedVariants.value);
  }

  return { elementNames, getGroupedVariants, searchVariants, resetPasswordErrors, searchRealProduct, groupedVariants, productVariants, realProduct, errors }
}

export default useProductVariant;

