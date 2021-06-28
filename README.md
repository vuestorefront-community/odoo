![Vue Storefront](docs/odoo_readme.png)

## Vue Storefront 2 integration with Odoo (beta)

This project is a Odoo integration with [Vue Storefront 2](https://github.com/vuestorefront/vue-storefront/).
This integration is being developed and maintained by [ODOOGAP / PROMPTEQUATION](https://www.odoogap.com/) ❤️

Check our [demo](https://vsf.labs.odoogap.com/) server (it's a dev server so could be down sometimes)


## How to start?


```sh
1. git clone https://github.com/vuestorefront/odoo.git
2. yarn install
3. yarn build # (optional) Verify if everything works properly by building all three projects
4. yarn dev
5. If you want to use your own Odoo server you will need to add the folder odoo-addons to your server
```

Want to contribute? Ping us on `odoo` channel on [our Discord](https://discord.vuestorefront.io) or email us at info (at) odoogap.com!


## Directory structure

* **odoo-addons** - modules you need for Odoo;
* **packages/api-client** - communicates with a backend;
* **packages/composables** - exposes composable functions used to retrieve data using `api-client` and to map them to universal data formats using `getters`;
* **packages/theme** - `nuxt` project that glues everything together. It extends our core theme and uses `composables` to retrieve data.

## Resources

- [Vue Storefront Documentation](https://docs.vuestorefront.io/v2/)
- [Odoo integration Documentation](https://github.com/vuestorefront/odoo)


## Credits

### Authors:

- ODOOGAP / PROMPTEQUATION

### Dependency Odoo Modules

- [OCA - Odoo Community Association - Base REST](https://github.com/OCA/rest-framework)
