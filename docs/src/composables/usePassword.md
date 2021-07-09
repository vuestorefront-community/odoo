# UsePassword Composable
**UsePassword** composable can be used to:

- Send an email to reset password 
- Reset the user password


## Example

```ts
import { usePassword } from '@vue-storefront/odoo';
import { onSSR } from '@vue-storefront/core'

export default {
  setup () {
     const { sendResetPassword, errorPassword, resetPasswordErrors } = usePassword();

    return {
      sendResetPassword, 
      errorPassword, 
      resetPasswordErrors
    }
  }
}
```