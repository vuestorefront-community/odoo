![Vue Storefront](https://git.odoogap.com/internal/vuestorefront-api/-/blob/leonardo_2/docs/odoo_readme.png)

# odoo for Vue Storefront Next


> **Disclaimer:** This project is still in beta phase.


This repository is a monorepo containing three projects:

* **api-client** - communicates with a backend;
* **composables** - exposes composable functions used to retrieve data using `api-client` and to map them to universal data formats using `getters`;
* **theme** - `nuxt` project that glues everything together. It extends our core theme and uses `composables` to retrieve data.

## How to start?

1. git clone 

2. Install all required dependencies:

```sh
yarn install
```

3. (optional) Then you can verify if everything works properly by building all three projects:

```sh
yarn build
```

4. If everything built properly, you can start creating your new integration with:

```sh
yarn dev
```
