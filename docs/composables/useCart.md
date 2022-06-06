# UseCart Composable

### Base Methods, Interfaces, Properties  [VSF useCart](https://docs.vuestorefront.io/v2/reference/api/core.usecart.html)
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
  websiteOrderLine?: OrderLine[];
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

## Example 1

```ts
import { useCart, cartGetters } from '@vue-storefront/odoo';
import { onSSR } from '@vue-storefront/core'

export default {
  setup () {
    const { cart, removeItem, updateItemQty, load } = useCart();

    onSSR(async () => {
      await loadCart();
      await loadCart({ customQuery: { cartLoad: 'myAwesomeCustomQuery' } }) // With optional custom query

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

## Example 2 - update item qty

```ts
import { useCart, cartGetters } from '@vue-storefront/odoo';
import { OrderLine } from '@vue-storefront/odoo-api';
import { onSSR } from '@vue-storefront/core'

export default {
  props: {
    orderLine: {
      type: Object as PropType<OrderLine>,
      default: () => ({})
    }
  },
  setup (props) {
    const { updateItemQty } = useCart();

    const handleUpdateItem = async (orderLine, quantity) => {

      await updateItemQty({
         product: props.orderLine, 
         quantity: Number(quantity), 
         customQuery: { cartUpdateItemQty: 'customUpdateQtyQuery'} // With optional custom query
      }); 
    };

    
    ...
  }
}
```

## Example 3 - remove item

```ts
import { useCart, cartGetters } from '@vue-storefront/odoo';
import { OrderLine } from '@vue-storefront/odoo-api';
import { onSSR } from '@vue-storefront/core'

export default {
  props: {
    orderLine: {
      type: Object as PropType<OrderLine>,
      default: () => ({})
    }
  },
  setup (props) {
    const { removeItem, isInCart, cart } = useCart();

    const handleRemoveItem = async (orderLine: OrderLine) => {
      await removeItem({ 
        product: { id: orderLine.id }, 
        customQuery: { cartRemoveItem: 'customRemoveItemQuery'} }); // With optional custom query
      }
      ...
    }
}
```

## Example 4 - add item to cart

```ts
import { useCart, cartGetters } from '@vue-storefront/odoo';
import { OrderLine } from '@vue-storefront/odoo-api';
import { onSSR } from '@vue-storefront/core'

export default {
  props: {
    orderLine: {
      type: Object as PropType<OrderLine>,
      default: () => ({})
    }
  },
  setup (props) {
    const { addItem } = useCart();

    const handleAddItem = async (product, quantity) => {
      if (!productInStock.value) return; // custom rule, depends on the client needs

      await addItem({ 
        product, 
        quantity,
        customQuery: { cartAddItem: 'customAddItemQuery'} }); // With optional custom query 
      }); 
    };

    
    ...
  }
}
```