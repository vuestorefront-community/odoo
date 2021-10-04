import { CustomQuery } from '@vue-storefront/core';
import { FetchResult } from 'apollo-link';
import { Address, BillingUpdateAddressResult, CartAddItemResult, CartLoadResult, CartRemoveItemResult, CategoryResult, DefaultGraphQlMutationResponse, GraphQlAddAddressParams, GraphQlCartAddItemParams, GraphQlCartRemoveItemParams, GraphQlCartUpdateItemQtyParams, GraphQlGetCategoryParams, GraphQlGetCountryParams, GraphQlGetProductParams, GraphQlGetProductTemplateParams, GraphQlGetProductVariantParams, GraphQlLoginParams, GraphQlMakePaymentParams, GraphQlResetPasswordParams, GraphQlSendResetPasswordParams, GraphQlUpdateAccountParams, GraphQlUpdateAddressParams, GraphQlWishlistAddItemParams, GraphQlWishlistRemoveItemParams, LoadUserResult, LoginResult, Partner, ProductResult, ProductVariantResult, RegisterResult, SingleProductResult, Wishlist, ShippingAddAddresResponse, ShippingUpdateAddressResponse } from './types';

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

  cartLoad(customQuery?: CustomQuery): Promise<FetchResult<CartLoadResult>>;
  cartAddItem(params: GraphQlCartAddItemParams, customQuery?: CustomQuery): Promise<FetchResult<CartAddItemResult>>;
  cartRemoveItem(params: GraphQlCartRemoveItemParams, customQuery?: CustomQuery): Promise<FetchResult<CartRemoveItemResult>>;
  cartUpdateItemQty(params: GraphQlCartUpdateItemQtyParams, customQuery?: CustomQuery): Promise<FetchResult>;

  wishlistLoad (params: Record<string, string>, customQuery?: CustomQuery): Promise<FetchResult<Wishlist>>;
  wishlistAddItem (params: GraphQlWishlistAddItemParams, customQuery?: CustomQuery): Promise<FetchResult>;
  wishlistRemoveItem (params: GraphQlWishlistRemoveItemParams, customQuery?: CustomQuery): Promise<FetchResult>;

  getCountries(params: Record<string, string>, customQuery?: CustomQuery): Promise<FetchResult>;
  getCountryStates(params: GraphQlGetCountryParams, customQuery?: CustomQuery): Promise<FetchResult>;

  shippingAddAdress(shippingAdress: GraphQlAddAddressParams, customQuery?: CustomQuery): Promise<FetchResult<ShippingAddAddresResponse>>;
  shippingUpdateAddress(shippingAdress: GraphQlUpdateAddressParams, customQuery?: CustomQuery): Promise<FetchResult<ShippingUpdateAddressResponse>>;
  shippingGetDeliveryMethods(params: Record<string, string>, customQuery?: CustomQuery): Promise<FetchResult<CategoryResult>>;

  billingAddAddress(shippingAdress: Address, customQuery?: CustomQuery): Promise<FetchResult<DefaultGraphQlMutationResponse>>;
  billingUpdateAddress(shippingAdress: GraphQlUpdateAddressParams, customQuery?: CustomQuery): Promise<FetchResult<BillingUpdateAddressResult>>;

  paymentLoadProviders(customQuery?: CustomQuery): Promise<FetchResult>;
  paymentMakeExternal(params: GraphQlMakePaymentParams, customQuery?: CustomQuery): Promise<FetchResult>;
  paymentConfirmation(customQuery?: CustomQuery): Promise<FetchResult>;
}
