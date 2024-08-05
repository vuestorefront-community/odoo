<template><div><h1 id="enviroment-configuration" tabindex="-1"><a class="header-anchor" href="#enviroment-configuration"><span>Enviroment configuration</span></a></h1>
<p>In this session we show all env variables that are used by template_odoo and vsf_docker projects.</p>
<h2 id="env-file" tabindex="-1"><a class="header-anchor" href="#env-file"><span>.Env file</span></a></h2>
<p>dsf</p>
<h2 id="export-command" tabindex="-1"><a class="header-anchor" href="#export-command"><span>Export command</span></a></h2>
<p>aaa</p>
<h2 id="template-odoo" tabindex="-1"><a class="header-anchor" href="#template-odoo"><span>Template Odoo</span></a></h2>
<table>
<thead>
<tr>
<th style="text-align:center">Env</th>
<th style="text-align:center">Default</th>
<th style="text-align:center">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">ODOO_BASE_URL</td>
<td style="text-align:center">http://vsfdemo15.labs.odoogap.com/ # or https://localhost:8069 for local</td>
<td style="text-align:center">Base url should target the Odoo server</td>
</tr>
<tr>
<td style="text-align:center">VSF_SITE_URL</td>
<td style="text-align:center">http://localhost:3000/</td>
<td style="text-align:center">Front end base url should point to the frontend server</td>
</tr>
<tr>
<td style="text-align:center">ODOO_BACKEND_BASE_URL</td>
<td style="text-align:center">https://vsf.odoogap.com/</td>
<td style="text-align:center">Backend base url will point for a private address if required internal access don't need to pass it unless you need a private access to the endpints</td>
</tr>
<tr>
<td style="text-align:center">PUBLIC_PATH</td>
<td style="text-align:center">https://xyz.cloudfront.cdn.com</td>
<td style="text-align:center">Public path should be defined on production for CDN access</td>
</tr>
<tr>
<td style="text-align:center">VSF_NODE_ENV</td>
<td style="text-align:center">dev</td>
<td style="text-align:center">Node enviroment. Should be set to production on production. Default is dev</td>
</tr>
<tr>
<td style="text-align:center">VSF_NODE_LOCALE</td>
<td style="text-align:center">en-EN</td>
<td style="text-align:center">Node locale. Default is en-EN</td>
</tr>
<tr>
<td style="text-align:center">VSF_PORT</td>
<td style="text-align:center">3000</td>
<td style="text-align:center">Node port. Default is 3000</td>
</tr>
<tr>
<td style="text-align:center">VSF_HOST</td>
<td style="text-align:center">0.0.0.0</td>
<td style="text-align:center">Node host. Default is 0.0.0.0</td>
</tr>
<tr>
<td style="text-align:center">REDIS_ENABLED</td>
<td style="text-align:center">false</td>
<td style="text-align:center">Enable or disable redis cache. Default is false</td>
</tr>
<tr>
<td style="text-align:center">REDIS_HOST</td>
<td style="text-align:center">127.0.0.1</td>
<td style="text-align:center">Redis host. Default is localhost for dev</td>
</tr>
<tr>
<td style="text-align:center">REDIS_PORT</td>
<td style="text-align:center">6379</td>
<td style="text-align:center">Redis port. Default is 6379 in dev configuration</td>
</tr>
<tr>
<td style="text-align:center">REDIS_PASSWORD</td>
<td style="text-align:center">pass</td>
<td style="text-align:center">Redis password. Empty is default.</td>
</tr>
<tr>
<td style="text-align:center">REDIS_INVALIDATION_KEY</td>
<td style="text-align:center">123</td>
<td style="text-align:center">Used for invalidating cache</td>
</tr>
<tr>
<td style="text-align:center">GOOGLE_TAG_MANAGER_ID</td>
<td style="text-align:center">google_container_id</td>
<td style="text-align:center">This allows you to easily add tracking tags such as Google Analytics</td>
</tr>
</tbody>
</table>
<h2 id="vuestoryfront-docker" tabindex="-1"><a class="header-anchor" href="#vuestoryfront-docker"><span>Vuestoryfront Docker</span></a></h2>
<table>
<thead>
<tr>
<th style="text-align:center">Env</th>
<th style="text-align:center">Value</th>
<th style="text-align:center">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">VSF_NODE_ENV</td>
<td style="text-align:center">production</td>
<td style="text-align:center">Node enviroment.  Docker builds the project in production env</td>
</tr>
<tr>
<td style="text-align:center">NODE_LOCALE</td>
<td style="text-align:center">en-EN</td>
<td style="text-align:center">Node locale. Default is en-EN</td>
</tr>
<tr>
<td style="text-align:center">ODOO_BACKEND_BASE_URL</td>
<td style="text-align:center">http://odoo:8069/</td>
<td style="text-align:center">Odoo local server</td>
</tr>
<tr>
<td style="text-align:center">VSF_SITE_URL</td>
<td style="text-align:center">http://localhost:3000/com</td>
<td style="text-align:center">Public path should be defined on production for CDN access</td>
</tr>
<tr>
<td style="text-align:center">REDIS_INVALIDATION_KEY</td>
<td style="text-align:center">123</td>
<td style="text-align:center">Used for invalidating cache</td>
</tr>
<tr>
<td style="text-align:center">REDIS_ENABLED</td>
<td style="text-align:center">true</td>
<td style="text-align:center">Enable or disable redis cache. Default is true</td>
</tr>
<tr>
<td style="text-align:center">REDIS_HOST</td>
<td style="text-align:center">redis</td>
<td style="text-align:center">Redis host. Default is redis for dev</td>
</tr>
<tr>
<td style="text-align:center">REDIS_PORT</td>
<td style="text-align:center">6379</td>
<td style="text-align:center">Redis port. Default is 6379 in dev configuration</td>
</tr>
<tr>
<td style="text-align:center">ODOO_VERSION</td>
<td style="text-align:center">&quot;16.0&quot;</td>
<td style="text-align:center">Redis password. Empty is default.</td>
</tr>
<tr>
<td style="text-align:center">ODOO_POSTGRES_HOST</td>
<td style="text-align:center">db</td>
<td style="text-align:center">The database host</td>
</tr>
<tr>
<td style="text-align:center">ODOO_POSTGRES_DB</td>
<td style="text-align:center">v16_odoo</td>
<td style="text-align:center">Database name</td>
</tr>
<tr>
<td style="text-align:center">ODOO_POSTGRES_USER</td>
<td style="text-align:center">odoo</td>
<td style="text-align:center">Db user</td>
</tr>
<tr>
<td style="text-align:center">ODOO_POSTGRES_PORT</td>
<td style="text-align:center">5432</td>
<td style="text-align:center">DB port</td>
</tr>
<tr>
<td style="text-align:center">ODOO_POSTGRES_PASSWORD</td>
<td style="text-align:center">odoo</td>
<td style="text-align:center">Db password</td>
</tr>
</tbody>
</table>
<p>::: info
You can choose to use the .env file or the enviroment variables directly useing <strong>export</strong> command.
:::</p>
</div></template>


