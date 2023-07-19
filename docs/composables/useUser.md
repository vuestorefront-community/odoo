# UseUser Composable
**UseUser** composable can be used to:

- Load current user
- LogOut current user 
- LogIn current user
- Register an user

## API

```ts
type AgnosticUser = {
  email: string
  name: string
  password: string,
  is_admin: boolean
  uid: number
  username: string
}

```


## Example
```ts
import { useUser } from '@vue-storefront/odoo';
import { onSSR } from '@vue-storefront/core'

export default {
  setup () {
    const { register, login, loading, logout, error: errorUser, user } = useUser();

    onSSR(async () => {
      await search({ id });
    });

    return {
      error,
      login,
      register,
      user,
      logout
    }
  }
}
```