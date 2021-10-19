# UseCountrySearch Composable


## Features
**UseCart** composable can be used to:

* search countries.
* search country states.

## API
A **Country** in odoo.

```ts
type Country = {
  id: number;
  code?: string;
  name?: string;
  states?: State[];
}
```

A **State** in odoo.
```ts
type State = {
  id: number
  name: string
}
```

## Example

```ts
import { useCategory } from '@vue-storefront/odoo';
import { onSSR } from '@vue-storefront/core'

export default {
  setup () {
  const { search, searchCountryStates, countries, countryStates } = useCountrySearch();

    onSSR(async () => {
      await search({});
    });

     watch(
      () => form.value.country,
      async () => {
        await searchCountryStates(form.value.country);
      }
    );

    return {
      countries,
      countryStates
    }
  }
}
```