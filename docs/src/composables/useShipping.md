# UseShipping Composable
**UseShipping** composable can be used to:

- Search available shipping methods
- load the shipping method and shipping address choosed for current cart

## API
An **Address** in odoo
```ts
type Address = {
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

```

## Example

```ts
import { useShipping } from '@vue-storefront/odoo';
import { onSSR } from '@vue-storefront/core'

export default {
  setup () {
    const { shippingAddress, load: loadShipping } = useShipping();

    onMounted(async () => {
      await loadShipping();
      if (shippingAddress) {
        form.value = shippingAddress.value;
      }
      formRef.value.validate({ silent: true });
    });


    return {
      shippingAddress, 
      productVariants 
    }
  }
}
```