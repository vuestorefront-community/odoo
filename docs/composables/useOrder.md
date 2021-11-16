# UseOrder Composable

## Features
**UseOrder** composable can be used to:

* Search orders.

## API

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
import { useUserOrder, orderGetters } from '@vue-storefront/odoo';
import { onSSR } from '@vue-storefront/core'

export default {
  setup () {
    const { orders, search } = useUserOrder();

    onSSR(async () => {
        await search();
    })

    return {
      orders: computed(() => (orders ? orders.value : [])),
      totalOrders: computed(() => orderGetters.getOrdersTotal(orders.value)))
    }
  }
}
```