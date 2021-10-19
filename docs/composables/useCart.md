# UseCart Composable

## Features
**UseCart** composable can be used to:

* load cart information.
* add, update and remove items in the cart.
* checking if product is already added to the cart.

## API
A **Cart** in odoo is a **Order** type.

```ts
type Order = {
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
  stage: OrderStage;
  orderUrl: string;
  transactions: PaymentTransaction[];
}
```

Each **orderLine** represents a list of **N** product variant.

```ts
type OrderLine = {
  id: number;
  name?: string;
  product?: Product;
  quantity?: number;
  priceTotal?: number;
  priceUnit?: number;
  priceSubtotal?: number;
  priceTax?: number;
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