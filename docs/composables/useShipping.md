# UseShipping Composable
**UseShipping** composable can be used to:

- Search available shipping methods
- Load the shipping method and shipping address choosed for **current cart**
- Save the shippingAddress ( update if has an id in params / add if doesn't have id)

## API
The **UseShipping** VSF Core Interface
```ts
  error: ComputedProperty<UseShippingErrors>;
  loading: ComputedProperty<boolean>;
  shipping: ComputedProperty<Address>;
  load(params: {
        customQuery?: CustomQuery;
    }): Promise<void>;
  save: (params: {
        params: GraphQlUpdateAddressParams;
        shippingDetails: Address;
        customQuery?: CustomQuery;
  }) => Promise<void>;

```

### Types
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

type GraphQlUpdateAddressParams = {
  id: number;
  name: string
  street: string
  street2?: string
  zip: string
  city: string
  stateId: number
  countryId: number
  phone: string
  email?: string
};

interface UseShippingErrors {
    load: Error;
    save: Error;
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