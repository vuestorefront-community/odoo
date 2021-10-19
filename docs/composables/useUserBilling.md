# UseUserBilling Composable
**UseUserBilling** composable can be used to:

- Add billing address to current cart

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
import { useBilling } from '@vue-storefront/odoo';
import { onSSR } from '@vue-storefront/core'

export default {
  setup () {
    const { addAddress } = useUserBilling();


    return {
        addAddress
    }
  }
}
```