![Vue Storefront](https://git.odoogap.com/internal/vuestorefront-api/-/blob/leonardo_2/docs/odoo_readme.png)

# Vue Storefront 2 integration with Odoo
This project is a Odoo integration with [Vue Storefront 2](https://github.com/vuestorefront/vue-storefront/).


## How to start?

```sh
1. git clone https://git.odoogap.com/internal/vuestorefront-api
2. yarn install
3. yarn build # (optional) Verify if everything works properly by building all three projects
4. yarn dev
```

## Directory structure

* **api-client** - communicates with a backend;
* **composables** - exposes composable functions used to retrieve data using `api-client` and to map them to universal data formats using `getters`;
* **theme** - `nuxt` project that glues everything together. It extends our core theme and uses `composables` to retrieve data.

## Resources

- [Vue Storefront Documentation](https://docs.vuestorefront.io/v2/)
- [Odoo integration Documentation] doing...

