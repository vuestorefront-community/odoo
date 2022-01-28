/* eslint-disable @typescript-eslint/no-unused-vars */
import { Cart, ShippingMethod } from '@vue-storefront/odoo-api';

export const getShippingMethodId = (shippingMethod: ShippingMethod): string =>
  String(shippingMethod.id) || '';

export const getShippingMethodName = (shippingMethod: ShippingMethod): string =>
  shippingMethod.name || '';

export const getShippingMethodDescription = (
  shippingMethod: ShippingMethod
): string => '';

export const getShippingMethodPrice = (
  shippingMethod: ShippingMethod
): number => shippingMethod?.price || 0;

export const getFormattedPrice = (price: number): string => String(price);

const checkoutGetters = {
  getShippingMethodId,
  getShippingMethodName,
  getShippingMethodDescription,
  getFormattedPrice,
  getShippingMethodPrice
};

export default checkoutGetters;
