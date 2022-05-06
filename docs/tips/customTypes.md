# Custom types
If the project need a custom type, try to extend the base type.

### Odoo Convetion
- <span style="color:#4f56d6"> projectName + type</span>


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
