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
     const { sendResetPassword, errorPassword, resetPassword } = usePassword();

     const handleSendResetPassword = async (email) => {
       await sendResetPassword({ email })
     }

     // Usually token will be redirected from user email in query param
     // New password from input
     const handleResetPassword = async () => {
       await resetPassword({ password: newPassword, token })
     }

    return {
      handleSendResetPassword, 
      errorPassword, 
      resetPasswordErrors
    }
  }
}
```