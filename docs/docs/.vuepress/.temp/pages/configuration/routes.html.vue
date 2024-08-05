<template><div><h1 id="routes" tabindex="-1"><a class="header-anchor" href="#routes"><span>Routes</span></a></h1>
<p>Automaticaly the connector will create the routes for the products and categories.
All the routes will be created on the <strong>customRoutes</strong> folder. Odoo back end provides a slug for the products and categories, so the front end can use that to create the routes.</p>
<p>The commands <code v-pre>update:routes</code> and <code v-pre>update:redirects</code> will be used to create three files inside customRoutes folder. The first one creates <strong>products.json</strong> and <strong>categories.json</strong>. The second one creates <strong>redirects.json</strong>.
These are optional scripts to be loaded manually, because the connector will create the routes automatically while build when you type <code v-pre>yarn dev</code>.</p>
<p>The connector will take the <strong>website_slug</strong> calculated field for the product data and will add that to a customRoutes/products.json file that should be included on the build. This mechanism is also used for categories slug and redirects. For this purpose you will find the commands: &quot;update:routes&quot; and &quot;update:redirects&quot;.</p>
<div class="custom-container warning"><p class="custom-container-title">WARNING</p>
<p>You must use <strong>--dontGenerateRoutes</strong> flag on build if you want to skip the customRoutes generation.</p>
</div>
</div></template>


