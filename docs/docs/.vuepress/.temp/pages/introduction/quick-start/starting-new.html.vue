<template><div><h1 id="starting-new-project" tabindex="-1"><a class="header-anchor" href="#starting-new-project"><span>Starting new project</span></a></h1>
<p>We already explained how to test our integration in your local machine. In this point we're going to show how you can start your own new project using our integration. It's really simple to get start. Just follow the steps below.</p>
<h2 id="running-in-your-local-machine" tabindex="-1"><a class="header-anchor" href="#running-in-your-local-machine"><span>Running in your local machine</span></a></h2>
<ol>
<li>
<p>Type the command to get the project: <code v-pre>git clone https://github.com/vuestorefront-community/template-odoo.git</code></p>
</li>
<li>
<p>Copy .env.example to .env</p>
</li>
</ol>
<p>🚩 <em>Do not commit .env file for security reasons</em></p>
<ol start="3">
<li>Install the dependences: <code v-pre>yarn install</code></li>
</ol>
<p>🎯 <em>This script will get all categories and products previously entered into odoo database and generate Nuxt custom routes. It creates a Custom Routes folder with all routes retrieved from odoo</em></p>
<ol start="4">
<li>
<p>Build for production and launch server: <code v-pre>yarn build</code></p>
</li>
<li>
<p>Build local: <code v-pre>yarn build:local</code></p>
</li>
</ol>
<div class="custom-container tip"><p class="custom-container-title">Docker</p>
<p>You can use Docker instead. Type:
<code v-pre>docker-compose up --build -d</code></p>
<p>You might need to: Type:
<code v-pre>docker-compose restart odoo nginx</code></p>
</div>
<h2 id="after-installation" tabindex="-1"><a class="header-anchor" href="#after-installation"><span>After installation</span></a></h2>
<p>Now just open http://localhost:3000 for VSF and http://localhost:8069 for local Odoo (credentials admin/admin)</p>
</div></template>


