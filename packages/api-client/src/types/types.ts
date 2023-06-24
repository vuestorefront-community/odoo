/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */

export enum ButtonType {
  Primary = 'Primary',
  Secondary = 'Secondary',
  Tertiary = 'Tertiary',
  Danger = 'Danger',
}

export enum ButtonShape {
  Round = 'Round',
  Rectangle = 'Rectangle',
}

export enum ButtonSize {
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
  Max = 'Max',
}
export enum ButtonColor {
  Green = 'Green',
  Black = 'Black',
  Grey = 'Grey',
}

export enum SortEnum {
  ASC,
  DESC
}
export enum FilterVisibility {
  Visible = 'Visible',
  Hidden = 'Hidden'
}

export enum AddressType {
  Shipping = 'Shipping',
  Billing = 'Billing'
}

export enum OrderStage {
  Quotation = 'Quotation',
  QuotationSent = 'QuotationSent',
  SalesOrder = 'SalesOrder',
  Locked = 'Locked',
  Cancelled = 'Cancelled'
}

export declare type Currency = {
  id: number;
  name?: string;
  symbol?: string;
};

export declare type Address = Partner;

export declare type DeliveryMethod = {
  id: number
  name: string
  price: number
}

export declare type PaymentIcon = {
  id: number;
  name: string;
  image: string;
};

export declare type ShippingInfo = Record<string, string>;

export declare type PaymentProvider = {
  id: number;
  name: string;
  provider: string;
  component: string;
  paymentIcons?: PaymentIcon[];
};

export declare type PaymentMethod = {
  name: string;
};

export type AttributeValue = {
  id: number;
  name: string;
  displayType: string;
  htmlColor?: string;
  search: string;
  priceExtra?: number;
  attribute?: Attribute,
};

export type Attribute = {
  id: number;
  name?: string;
  displayType?: string;
  filterVisibility?: FilterVisibility
  values?: AttributeValue[]
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  parent?: Category;
  childs?: Category[];
  products?: Product[];
};

export type CategoryFilterInput = {
  id: number;
  parent: boolean;
};

export type OrderSortInput = {
  id: SortEnum
  dateOrder: SortEnum
  name: SortEnum
  state: SortEnum
};

export type ProductFilterInput = {
  categoryId?: number[];
  attributeValueId?: number[];
  attribValues?: string[];
  minPrice?: number;
  maxPrice?: number;
};

export type CategorySortInput = {
  id: SortEnum;
};

export type PaymentForm = {
  form: string
}

export type ProductSortInput = {
  id?: SortEnum;
  price?: SortEnum;
};

export type GraphQlGetCategoryParams = {
  slug: string;
  id: number;
};

export type GraphQlGetCategoriesParams = {
  filter: CategoryFilterInput;
  currentPage?: number;
  pageSize?: number;
  search?: string;
  sort?: CategorySortInput;
};

export type CartRemoveItemResult = {
  cartRemoveItem: Cart
};

export type ApplyCoupon = {
  error: boolean
}

export type ApplyCouponResult = {
  applyCoupon: ApplyCoupon
};

export type BillingGetAddressResult = {
  addresses: Partner[]
};

export type GraphQlDeleteAddressParams = {
  id: number;
};

export type PaymentLoadProvidersResult = {
  paymentAcquirers: PaymentProvider[]
};

export type DeleteAddressResult = {
  deleteAddress: {
    result: boolean;
  }
};

export type CountryStatesResult = {
  country: Country
};

export type Countries = {
  countries: Country[];
}

export type CountriesResult = {
  countries: Countries
};

export type PaymentMakeExternalResult = {
  makePayment: PaymentForm
};

export type UpdatePasswordResult = {
  updatePassword: {
    id: number;
    name: string;
    email: string;
    partner: Partner;
  }
};

export type addMultipleMailingsResult = {
  userAddMultipleMailing: MailingContact
};

export type adyenPaymentMethodsResult = {
  adyenPaymentMethods: {
    adyenPaymentMethods: any;
  }
};

export type adyenPaymentDetailsResult = {
  adyenPaymentDetails: {
    adyenPaymentDetails: any;
  }
};

export type adyenOpenTransactionResult = {
  adyenTransaction: {
    transaction: any;
  }
};

export type adyenMakeDirectPaymentResult = {
  adyenPayments: {
    adyenPayments: any;
  }
};

export type adyenAcquirerInfoResult = {
  adyenAcquirerInfo: {
    adyenAcquirerInfo: any
  }
};

export type Orders = {
  orders: Order[];
}

export type OrdersResponse = {
  orders: Orders
};

export type ShippingUpdateAddressResponse = {
  updateAddress: Partner
};

export type SetDefaultAddressResponse = {
  selectAddress: Partner
};

export type WishlistLoadResponse = {
  wishlistItems: Wishlist
};

export type WishlistAddItemResponse = {
  wishlistAddItem: Wishlist
};

export type WishlistRemoveItemResponse = {
  wishlistRemoveItem: Wishlist
};

export type ShippingAddAddresResponse = {
  addAddress: Partner
};

export type BillingAddAddresResponse = {
  addAddress: Partner
};

export type CartUpdateItemQtyResponse = {
  cartUpdateItem: Cart
};

export type ProductResult = {
  products: Products
};

export type CartAddItemResult = {
  cartAddItem: Cart
};

export type cartAddMultipleItemsResult = {
  cartAddMultipleItems: Cart
};

export type cartRemoveMultipleItemsResult = {
  cartRemoveMultipleItems: Cart
};

export type CartLoadResult = {
  cart: Cart
};

export type LoadUserResult = {
  partner: Partner
};

export type LoginResult = {
  login: LoadUserResult
};

export type RegisterResult = {
  register: Partner
};

export type BillingUpdateAddressResult = {
  updateAddress: Partner
};

export type UpdateAccountResult = {
  updateMyAccount: Partner
};

export type ProductVariantResult = {
  productVariant: ProductVariant
};

export type MailingListsResult = {
  mailingLists: {
    mailingLists: MailingItem[]
  }
};

export type MailingContactsResult = {
  mailingContacts: {
    mailingContacts: MailingItem[]
  }
};

export type SingleProductResult = {
  product: Product
};

export type Products = {
  products: Product[];
  totalCount: number;
  minPrice: number;
  maxPrice: number;
  attributeValues: AttributeValue[];
}

export type Categories = {
  categories: Category[];
  totalCount: number;
}

export type CategoryResult = {
  category: Category;
};

export type CategoriesResult = {
  categories: Categories;
};

export type ShippingGetDeliveryMethodsResult = {
  deliveryMethods: DeliveryMethod[];
};

export type ShippingGetAddresessResult = {
  addresses: Partner[];
};

export type ProductImage = {
  id: number;
  name: string;
  image: string;
  video: string;
};

export interface CombinationInfo {
  product_id?: number;
  product_template_id?: number;
  display_name?: string;
  display_image?: true;
  price?: number;
  list_price?: number;
  has_discounted_price?: boolean;
  reduced_price?: boolean;
  discount?: number;
  discount_perc?: number;
  grade_name?: string;
  grade_description?: string;
  slug?: string;
  stock_qty?: number;
}

export type Product = {
  id: number;
  description?: string;
  name?: string;
  displayName?: string;
  slug?: string;
  isInStock?: boolean;
  imageFilename?: string;
  combinationInfo?: CombinationInfo;
  qty?: number;
  sku?: string;
  image?: string;
  variantImage?: string;
  smallImage?: string;
  mediaGallery?: ProductImage[];
  price?: number;
  jsonLd?: any;
  weight?: number;
  priceAfterDiscount?: number;
  hasDiscountedPrice?: number;
  listPrice?: number;
  realProduct?: ProductVariant;
  firstVariant?: Product;
  currency?: Currency;
  isInWishlist?: boolean;
  alternativeProducts?: Product[];
  productVariants?: Product[]
  accessoryProducts?: Product[];
  attributeValues?: AttributeValue[];
  productTemplate?: Product;
  categories?: Category[];
  seoTitle?: string;
  seoDescription?: string;
  imageWebp?: string;
};

export declare type WishlistItem = {
  product: Product;
  variant: Product;
  id: number;
};

export declare type MailingItem = {
  id: number;
  name: string;
};

export declare type MailingContactSubscription = {
  id: number;
  mailingList: MailingItem[]
  optOut: boolean
}

export declare type MailingContact = {
  id: number;
  name: string;
  email: string;
  companyName: string;
  subscriptionList: MailingContactSubscription[]
};

export declare type Wishlist = {
  wishlistItems?: WishlistItem[];
};

export interface AgnosticFacet {
  type: string;
  id?: string;
  label: string;
  value: any;
  attrName?: string;
  count?: number;
  selected?: boolean;
  metadata?: any;
}

export type State = {
  id: number;
  name?: string;
};
export type ShippingMethod = {
  id?: number;
  name?: string;
  price?: number;
};
export type Country = {
  id: number;
  code?: string;
  name?: string;
  states?: State[];
};

export type AgnosticUser = {
  password: string;
  email: string;
  name: string;
  is_admin: boolean;
  uid: number;
  username: string;
  street?: string;
  street2?: string;
  city?: string;
  state?: State;
  zip?: string;
  country?: Country;
  phone?: string;
};

export type Partner = {
  id?: number;
  name?: string;
  street?: string;
  street2?: string;
  city?: string;
  state?: State;
  zip?: string;
  country?: Country;
  email?: string;
  phone?: string;
  isCompany?: boolean;
  isDefault?: boolean;
  contacts?: Partner[];
  password?: string;
};

export type ProductVariant = {
  product: Product;
  productTemplateId: number;
  displayName: string;
  displayImage: boolean;
  price: number;
  listPrice: string;
  hasDiscountedPrice: boolean;
  isCombinationPossible: boolean;
  variantAttributeValues: AttributeValue[];
};

export type OrderLine = {
  id: number;
  name?: string;
  product?: Product;
  quantity?: number;
  priceTotal?: number;
  priceUnit?: number;
  priceSubtotal?: number;
  priceTax?: number;
};

export type Payment = {
  id: number;
  name: string;
  provider: string;
  amount: number;
  paymentReference: string;
};

export type PaymentTransaction = {
  id: number;
  payment: Payment;
  paymentToken: string;
  amount: number;
  acquirer: string;
};
export type Order = {
  id: number;
  name: string;
  partner?: Partner;
  partnerShipping?: Partner;
  partnerInvoice?: Partner;
  dateOrder?: Date;
  amountUntaxed: number;
  amountTax: number;
  amountTotal: number;
  amountDelivery: number;
  currency: Currency;
  orderLines?: OrderLine[];
  websiteOrderLine?: OrderLine[];
  stage: OrderStage;
  orderUrl: string;
  transactions: PaymentTransaction[];
  shippingMethod: ShippingMethod;
};

export type Cart = {
  order: Order;
};

export type Pagination = {
  limit?: number;
  offset?: number;
  sort?: string;
};

export type CategoryFilter = Record<string, unknown>;
export type LineItem = Record<string, unknown>;
export declare type Store = Record<string, any>

export type DefaultGraphQlMutationResponse = {
  ok: boolean;
};

export type GraphQlSendResetPasswordParams = {
  email: string;
};

export type GraphQlGetProductVariants = {
  productId: number;
};

export type GraphQlCartRemoveItemParams = {
  lineId: number;
};

export type GraphQlWishlistAddItemParams = {
  productId: number;
};

export type GraphQlGetProductTemplateParams = {
  id: number;
  slug: string;
  cacheKey: string;
};

export type GraphQlWishlistRemoveItemParams = {
  wishId: number;
};

export type GraphQlGetProductVariantParams = {
  productTemplateId: number;
  combinationId: string[];
};

export type GraphqlMailingListsParams = {
  filter?: any;
  currentPage: number;
  pageSize: number;
  search?: string;
  sort: any;
};

export type GraphqlMailingContactsParams = {
  filter?: any;
  currentPage: number;
  pageSize: number;
  search?: string;
  sort: any;
};

export type GraphQlCartAddItemParams = {
  productId: number;
  quantity: number;
};

export type GraphQlAddAddressParams = {
  name?: string
  street?: string
  street2?: string
  zip?: string
  city?: string
  stateId?: number
  countryId?: number
  phone?: string
  email?: string
};

export type GraphQlSetDefaultAddressParams = {
  id?: number;
  type?: AddressType;
};

export type GraphQlSetShippingMethodParams = {
  shippingMethodId: number;
}

export type GraphQlSetShippingMethodResponse = {
  setShippingMethod: Cart
}

export type GraphQlUpdateAddressParams = {
  id?: number;
  name?: string
  street?: string
  street2?: string
  zip?: string
  city?: string
  stateId?: number
  countryId?: number
  phone?: string
  email?: string
};

export type GraphQlApplyCouponParams = {
  promo: string
}

export type GraphQlCartUpdateItemQtyParams = {
  lineId: number;
  quantity: number;
};

export type GraphQlGetPricinsShippingMethodParams = {
  shippingId: string;
};

export type GraphQlResetPasswordParams = {
  newPassword: string;
  token: string;
};

export type CountryFiltersInput = {
  id: number;
};

export type GraphQlMakePaymentParams = {
  paymentAcquireId: number;
};

export type GraphQlUpdatePasswordParams = {
  currentPassword: string;
  newPassword: string;
};

export type GraphqlMailingInput = {
  mailinglistId: number;
  optout: boolean
};

export type GraphQlAddMultipleMailings = {
  mailings: GraphqlMailingInput[];
};

export type GraphQlAdyenPaymentMethods = {
  acquirerId: number;
};

export type GraphQlAdyenPaymentDetails = {
  acquirerId: number;
  reference: string;
  details: any;
};

export type GraphQlAdyenOpenTransaction = {
  acquirerId: number;
};

export type GraphQlAdyenMakeDirectPayment = {
  acquirerId: number,
  reference: string,
  token: string,
  browserInfo: any,
  paymentMethod: any
};

export type GraphQlAdyenAcquirerInfo = {
  acquirerId: number;
};

export type GraphQlOrdersParams = {
  currentPage: number;
  pageSize: number;
  sort: OrderSortInput
  [x: string]: any;
};

export type GraphQlGetCountryParams = {
  id: number;
};

export type GraphQlLoginParams = {
  email: string;
  password: string;
};

export type GraphQlUpdateAccountParams = {
  id: number;
  name?: string;
  email?: string;
};

export type GraphQlGetProductParams = {
  filter?: ProductFilterInput;
  currentPage: number;
  pageSize: number;
  search?: string;
  sort: ProductSortInput;
};

export type GraphQlAddMultipleProductsParams = {
  products: GraphQlProductParam[];
}

export type GraphQlRemoveMultipleProductsParams = {
  lineIds: number[];
}

export type GraphQlProductParam = {
  id: number;
  quantity: number;
};

export type ParamsFromUrlFilterInput = {
  categoryId?: number;
  attributeValueId: number[];
  minPrice: string;
  maxPrice: string;
};

export type ParamsFromUrl = {
  filter: ParamsFromUrlFilterInput;
  currentPage: number;
  pageSize: number;
  search: string;
  categorySlug?: string;
  sort: ProductSortInput;
  customQueryProducts: any;
  customQueryCategories: any;
};

export interface AgnosticFacetSearchParams {
    categorySlug?: string;
    categoryParams?: any;
    productParams?: any;
    rootCatSlug?: string;
    term?: string;
    page?: number;
    itemsPerPage?: number;
    sort?: string | string[];
    filters?: Record<string, string[]>;
    metadata?: any;
    fetchCategory?: boolean;
    [x: string]: any;
}
export interface SearchResultParams<S> {
    data?: S;
    input: AgnosticFacetSearchParams;
}

