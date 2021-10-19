# UseCart Composable

## Features
**UseCart** composable can be used to:

* load cart information.
* add, update and remove items in the cart.
* checking if product is already added to the cart.

## API
A **Cart** in odoo is a **SaleOrder** type.

```ts
type SaleOrder = {
    id: number;
    name: string;
    origin: string;
    clientOrderRef: string;
    state: string;
    dateOrder: Date;
    validityDate: Date;
    shippingMethod: ShippingMethod;
    orderLine: SaleOrderLine[];
    invoiceStatus: string;
    amountUntaxed: number;
    amountTax: number;
    amountTotal: number;
    currencyRate: string;
    partnerInvoice: Partner;
    partnerShipping: Partner;
}
```

Each **orderLine** represents a list of **N** product variant.

```ts
type SaleOrderLine = {
    id: number;
    name: string;
    product: Product;
    productUomQty: number;
    priceTotal: number;
}
```

## Example

```ts
import { useCart, cartGetters } from '@vue-storefront/odoo';
import { onSSR } from '@vue-storefront/core'

export default {
  setup () {
    const { cart, removeItem, updateItemQty, load } = useCart();

    onSSR(async () => {
      await loadCart();
    })

    return {
      removeItem,
      updateItemQty,
      products: computed(() => cartGetters.getItems(cart.value)),
      totals: computed(() => cartGetters.getTotals(cart.value)),
      totalItems: computed(() => cartGetters.getTotalItems(cart.value))
    }
  }
}
```