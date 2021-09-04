/* eslint-disable camelcase */

export enum SortEnum {
  ASC,
  DESC
}

export declare type Address = {
  city: string;
  countryId: number;
  deliveryMethodId: number;
  firstName: string;
  houseNumber: string;
  lastName: string;
  phone: string;
  stateId: number;
  street: string;
  zipCode: string;
};

export declare type ShippingInfo = Record<string, string>;

export type Attribute = {
  id: number;
  name: string;
  displayName: string;
  values: any;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  parent: Category[];
  childs: Category[];
};

export type CategoryFilterInput = {
  id: number;
  parent: boolean;
};

export type CategorySortInput = {
  id: SortEnum;
};

export type GraphQlGetCategoryParams = {
  filter: CategoryFilterInput;
  currentPage: number;
  pageSize: number;
  search: string;
  sort: CategorySortInput;
};

export type CategoryResult = {
  categories: [Category];
  totalCount: number;
};

export type Product = {
  id: number;
  description: string;
  categoriesRef: string[];
  defaultCode: string;
  name: string;
  slug: string;
  sku: string;
  image: string;
  price: number;
  listPrice: number;
  realProduct: any;
  firstVariantId: number;
  first_variant_id: number;
  attributes: Attribute[];
  productTemplate: Product;
  ecommerceCategories: Category[];
};

export declare type WishlistItem = {
  product: Product;
  productTemplate: Product;
  id: number;
  price: number;
};

export declare type Wishlist = WishlistItem[];

export type AgnosticUser = {
  email: string;
  name: string;
  password: string;
  is_admin: boolean;
  uid: number;
  username: string;
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
  name: string;
};
export type ShippingMethod = {
  id: number;
  name: string;
};
export type Country = {
  id: number;
  code: string;
  name: string;
};
export type Partner = {
  id: number;
  name: string;
  street: string;
  street2: string;
  city: string;
  state: State;
  zip: string;
  country: Country;
  email: string;
  phone: string;
  isCompany: boolean;
  contacts: [Partner];
};

export type ProductVariant = {
  attribute_name: string;
  attribute_display_type: string;
  attribute_value_id: number;
  attribute_value_name: string;
  attribute_value_html_color: any;
  attribute_value_price_extra: number;
};
export type SaleOrderLine = {
  id: number;
  name?: string;
  product?: Product;
  productUomQty?: number;
  priceTotal?: number;
};

export type Pagination = {
  limit?: number;
  offset?: number;
  sort?: string;
};

export type SaleOrder = {
  id: number;
  name: string;
  origin?: string;
  clientOrderRef?: string;
  state?: string;
  dateOrder?: Date;
  validityDate?: Date;
  shippingMethod?: ShippingMethod;
  websiteOrderLine?: SaleOrderLine[];
  invoiceStatus?: string;
  amountDelivery: number;
  amountTotal: number;
  currencyRate?: string;
  partnerInvoice?: Partner;
  partnerShipping?: Partner;
};
export type CategoryFilter = Record<string, unknown>;
export type LineItem = Record<string, unknown>;

export type DefaultGraphQlMutationResponse = {
  ok: boolean;
};

export type GraphQlSendResetPasswordParams = {
  email: string;
};

export type GraphQlGetProductVariants = {
  productId: string;
};

export type GraphQlCartRemoveItemParams = {
  productId: string;
};

export type GraphQlGetProductParams = {
  productId: string;
  combinationIds: string[];
};

export type GraphQlCartAddItemParams = {
  productId: string;
  quantity: number;
};

export type GraphQlGetPricinsShippingMethodParams = {
  shippingId: string;
};

export type GraphQlResetPasswordParams = {
  password: string;
  token: string;
};

export type GraphQlGetAllCountryStatesParams = {
  countryId: string;
  limit: number;
  offset: number;
};

export type GraphQlGetProductTemplateParams = {
  categorySlug?: string;
  rootCatSlug?: string;
  term?: string;
  page?: number;
  itemsPerPage?: number;
  sort?: string;
  filters?: Record<string, string[]>;
  metadata?: any;
  [x: string]: any;
};

export type GraphQlAllProductTemplatesParams = {
  id: number;
  name: string;
  limit: number;
  offset: number;
};
