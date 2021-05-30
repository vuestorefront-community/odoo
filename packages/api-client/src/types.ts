export declare type Wishlist = {
  items: [Product]
};
export type AgnosticUser = {
  email: string
  name: string
  password: string,
  is_admin: boolean
  uid: number
  username: string
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
  listPrice: number
  attributes: Attribute[]
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
  orderLine: SaleOrderLine[]
  invoiceStatus: string
  amountUntaxed: number
  amountTax: number
  amountTotal: number
  currencyRate: string
}
export type CategoryFilter = Record<string, unknown>
export type ShippingMethod = Record<string, unknown>
export type LineItem = Record<string, unknown>
