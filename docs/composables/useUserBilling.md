# UseUserBilling Composable
**UseUserBilling** composable can be used to:

- Add billing address to current cart

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