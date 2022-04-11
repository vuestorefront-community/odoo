import { CustomQuery } from '@vue-storefront/core';
import { FetchResult } from 'apollo-link';
import {
  BillingUpdateAddressResult, CartAddItemResult, CartLoadResult, CartRemoveItemResult, CategoryResult, DefaultGraphQlMutationResponse,
  GraphQlAddAddressParams, GraphQlCartAddItemParams, GraphQlCartRemoveItemParams, GraphQlCartUpdateItemQtyParams, GraphQlGetCategoryParams,
  GraphQlGetCountryParams, GraphQlGetProductParams, GraphQlGetProductTemplateParams, GraphQlGetProductVariantParams, GraphQlLoginParams,
  GraphQlMakePaymentParams, GraphQlResetPasswordParams, GraphQlSendResetPasswordParams, GraphQlUpdateAccountParams, GraphQlUpdateAddressParams,
  GraphQlWishlistAddItemParams, GraphQlWishlistRemoveItemParams, LoadUserResult, LoginResult, Partner, ProductResult, ProductVariantResult,
  RegisterResult, ShippingAddAddresResponse, ShippingUpdateAddressResponse, SingleProductResult, WishlistLoadResponse, WishlistAddItemResponse,
  WishlistRemoveItemResponse, ShippingGetDeliveryMethodsResult, PaymentMakeExternalResult, CountryStatesResult, CountriesResult,
  PaymentLoadProvidersResult, BillingGetAddressResult, GraphQlDeleteAddressParams, ShippingGetAddresessResult, BillingAddAddresResponse,
  OrdersResponse, GraphQlOrdersParams, GraphQlAddMultipleProductsParams, cartAddMultipleItemsResult, GraphQlRemoveMultipleProductsParams,
  cartRemoveMultipleItemsResult, ApplyCouponResult, GraphQlSetDefaultAddressParams, SetDefaultAddressResponse
} from './types';

export interface OdooApiMethods {
  getCategory(params: GraphQlGetCategoryParams, customQuery?: CustomQuery): Promise<FetchResult<CategoryResult>>;
  getProductTemplatesList(params: GraphQlGetProductParams, customQuery?: CustomQuery): Promise<FetchResult<ProductResult>>;
  getProductTemplate(params: GraphQlGetProductTemplateParams, customQuery?: CustomQuery): Promise<FetchResult<SingleProductResult>>;
  getRealProduct(params: GraphQlGetProductVariantParams, customQuery?: CustomQuery): Promise<FetchResult<ProductVariantResult>>;

  updateAccount(params: GraphQlUpdateAccountParams, customQuery?: CustomQuery): Promise<FetchResult>;
  signUpUser(params: Partner, customQuery?: CustomQuery): Promise<FetchResult<RegisterResult>>;
  logInUser(params: GraphQlLoginParams, customQuery?: CustomQuery): Promise<FetchResult<LoginResult>>;
  logOutUser(customQuery?: CustomQuery): Promise<FetchResult<Partner>>;
  loadUser(customQuery?: CustomQuery): Promise<FetchResult<LoadUserResult>>;
  sendResetPassword(params: GraphQlSendResetPasswordParams, customQuery?: CustomQuery): Promise<FetchResult<DefaultGraphQlMutationResponse>>;
  changePassword(params: GraphQlResetPasswordParams, customQuery?: CustomQuery): Promise<FetchResult<DefaultGraphQlMutationResponse>>;

  cartAddMultipleItems(params: GraphQlAddMultipleProductsParams, customQuery?: CustomQuery): Promise<FetchResult<cartAddMultipleItemsResult>>;
  cartRemoveMultipleItems(params: GraphQlRemoveMultipleProductsParams, customQuery?: CustomQuery): Promise<FetchResult<cartRemoveMultipleItemsResult>>;

  cartLoad(customQuery?: CustomQuery): Promise<FetchResult<CartLoadResult>>;
  cartAddItem(params: GraphQlCartAddItemParams, customQuery?: CustomQuery): Promise<FetchResult<CartAddItemResult>>;
  cartRemoveItem(params: GraphQlCartRemoveItemParams, customQuery?: CustomQuery): Promise<FetchResult<CartRemoveItemResult>>;
  cartUpdateItemQty(params: GraphQlCartUpdateItemQtyParams, customQuery?: CustomQuery): Promise<FetchResult>;

  wishlistLoad (customQuery?: CustomQuery): Promise<FetchResult<WishlistLoadResponse>>;
  wishlistAddItem (params: GraphQlWishlistAddItemParams, customQuery?: CustomQuery): Promise<FetchResult<WishlistAddItemResponse>>;
  wishlistRemoveItem (params: GraphQlWishlistRemoveItemParams, customQuery?: CustomQuery): Promise<FetchResult<WishlistRemoveItemResponse>>;

  getCountries(customQuery?: CustomQuery): Promise<FetchResult<CountriesResult>>;
  getCountryStates(params: GraphQlGetCountryParams, customQuery?: CustomQuery): Promise<FetchResult<CountryStatesResult>>;

  setDefaultAddress(shippingAdress: GraphQlSetDefaultAddressParams, customQuery?: CustomQuery): Promise<FetchResult<SetDefaultAddressResponse>>;
  shippingAddAdress(shippingAdress: GraphQlAddAddressParams, customQuery?: CustomQuery): Promise<FetchResult<ShippingAddAddresResponse>>;
  shippingUpdateAddress(shippingAdress: GraphQlUpdateAddressParams, customQuery?: CustomQuery): Promise<FetchResult<ShippingUpdateAddressResponse>>;
  shippingGetDeliveryMethods(customQuery?: CustomQuery): Promise<FetchResult<ShippingGetDeliveryMethodsResult>>;
  shippingGetAddress(customQuery?: CustomQuery): Promise<FetchResult<ShippingGetAddresessResult>>;

  billingAddAddress(shippingAdress: GraphQlAddAddressParams, customQuery?: CustomQuery): Promise<FetchResult<BillingAddAddresResponse>>;
  billingUpdateAddress(shippingAdress: GraphQlUpdateAddressParams, customQuery?: CustomQuery): Promise<FetchResult<BillingUpdateAddressResult>>;
  billingGetAddress(customQuery?: CustomQuery): Promise<FetchResult<BillingGetAddressResult>>;

  deleteAddress(params: GraphQlDeleteAddressParams, customQuery?: CustomQuery): Promise<FetchResult<void>>;

  paymentLoadProviders(customQuery?: CustomQuery): Promise<FetchResult<PaymentLoadProvidersResult>>;
  paymentMakeExternal(params: GraphQlMakePaymentParams, customQuery?: CustomQuery): Promise<FetchResult<PaymentMakeExternalResult>>;
  paymentConfirmation(customQuery?: CustomQuery): Promise<FetchResult>;

  subscribeNewsLetter(customQuery?: CustomQuery): Promise<FetchResult>;

  applyCoupon(customQuery?: CustomQuery): Promise<FetchResult<ApplyCouponResult>>;

  ordersGet(params: GraphQlOrdersParams, customQuery?: CustomQuery): Promise<FetchResult<OrdersResponse>>;
}
