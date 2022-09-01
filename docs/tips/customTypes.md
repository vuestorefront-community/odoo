# Custom types
If the project need a custom type, try to extend the base type.

::: tip Odoo Convetion 
projectName + type - camelCase
:::

## Example 

```js
import { Product, Category } from '@vue-storefront/odoo-api';

// Project name = BlueBrothers

export interface BlueBrothersProduct extends Product {
    strangeLabel?: string,
    acessories?: Accessory[]
    ...
}

export interface BlueBrothersCategory extends Category {
    subCategory?: BlueBrothersCategory
    ...
}

```
