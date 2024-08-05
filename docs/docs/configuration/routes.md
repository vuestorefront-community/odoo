# Routes

Automaticaly the connector will create the routes for the products and categories.
All the routes will be created on the **customRoutes** folder. Odoo back end provides a slug for the products and categories, so the front end can use that to create the routes.

The commands ```update:routes``` and ```update:redirects``` will be used to create three files inside customRoutes folder. The first one creates **products.json** and **categories.json**. The second one creates **redirects.json**.
These are optional scripts to be loaded manually, because the connector will create the routes automatically while build when you type ```yarn dev```.

The connector will take the **website_slug** calculated field for the product data and will add that to a customRoutes/products.json file that should be included on the build. This mechanism is also used for categories slug and redirects. For this purpose you will find the commands: "update:routes" and "update:redirects".

::: warning
You must use **--dontGenerateRoutes** flag on build if you want to skip the customRoutes generation.
:::