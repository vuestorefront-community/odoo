
export declare type Address = {
  city: string
  countryId: number
  deliveryMethodId: number
  firstName: string
  houseNumber: string
  lastName: string
  phone: string
  stateId: number
  street: string
  zipCode: string
}

export declare type ShippingInfo = {

}

export declare type WishlistItem = {
  product: Product
  id: number
  price: number
}

export declare type Wishlist = WishlistItem[];

export type AgnosticUser = {
  email: string
  name: string
  password: string,
  is_admin: boolean
  uid: number
  username: string
}

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

export type Attribute = {
  id: number
  name: string
  displayName: string
}
export type State = {
  id: number
  name: string
}
export type ShippingMethod = {
  id: number
  name: string
}
export type Country = {
  id: number
  code: string
  name: string
}
export type Partner = {
  id: number
  name: string
  street: string
  street2: string
  city: string
  state: State
  zip: string
  country: Country
  email: string
  phone: string
  isCompany: boolean
  contacts: [Partner]
}
export type Product = {
  id: number
  description: string
  categoriesRef: string[]
  defaultCode: string
  name: string
  slug: string
  sku: string
  image: string
  price: number
  listPrice: number
  realProduct: any
  firstVariantId: number
  attributes: Attribute[]
}
export type ProductVariant = {
  attribute_name: string
  attribute_display_type: string
  attribute_value_id: number
  attribute_value_name: string
  attribute_value_html_color: any
  attribute_value_price_extra: number
}
export type SaleOrderLine = {
  id: number
  name: string
  product: Product
  productUomQty: number
  priceTotal: number
}
export type Category = {
  id: number
  name: string
  label: string
  slug: string
  items: Category[]
}
export type Pagination = {
  limit?: number
  offset?: number
  sort?: string
}

export type SaleOrder = {
  id: number
  name: string
  origin: string
  clientOrderRef: string
  state: string
  dateOrder: Date
  validityDate: Date
  shippingMethod: ShippingMethod
  orderLine: SaleOrderLine[]
  invoiceStatus: string
  amountUntaxed: number
  amountTax: number
  amountTotal: number
  currencyRate: string
  partnerInvoice: Partner
  partnerShipping: Partner
}
export type CategoryFilter = Record<string, unknown>
export type LineItem = Record<string, unknown>
