# UseShipping Composable
**UseShipping** composable can be used to:

- Search available shipping methods
- load the shipping method and shipping address choosed for current cart

## API
An **Address** (Partner) in odoo
```ts
type Address = {
  id?: number;
  name: string;
  street: string;
  street2?: string;
  city: string;
  state: State;
  zip: string;
  country: Country;
  email?: string;
  phone: string;
  isCompany?: boolean;
  isDefault?: boolean;
  contacts?: Partner[];
  password?: string;
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