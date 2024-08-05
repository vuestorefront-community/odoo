<template><div><h1 id="integration-test" tabindex="-1"><a class="header-anchor" href="#integration-test"><span>Integration test</span></a></h1>
<p><em>In this section you will find everything you need to build our entire environment to do a deeper test on VSF + ODOO and make sure if our integration is what you has been looking for. We hope it is 😇</em></p>
<h2 id="before-you-start" tabindex="-1"><a class="header-anchor" href="#before-you-start"><span>Before you start</span></a></h2>
<p>Pre-requisites: Docker, Node.js (&gt;=14.19.0), npm or similar and Git.</p>
<p>Last odoo <strong>version</strong> released: Clone the repo from (https://github.com/odoogap/vuestorefront-docker)</p>
<p>Its really convenient to test all the ecosystem Vuestorefront - Odoo Integration working in your local machine. We have prepared a docker-compose file that will help you to get started in a few minutes.</p>
<h2 id="installation" tabindex="-1"><a class="header-anchor" href="#installation"><span>Installation</span></a></h2>
<p>First of all we should understand what's inside the docker-compose file. We have 4 services:
<em>🎯 You can go deeper <RouteLink to="/configuration/docker-compose.html#links">Configuration &gt; docker-compose</RouteLink> .</em></p>
<ul>
<li>
<p><strong>Redis</strong>: Redis is an open source (BSD licensed), in-memory data structure store, used as a database, cache and message broker. It's used by VSF to store the cache.</p>
</li>
<li>
<p><strong>db</strong>: PostgreSQL database used by Odoo.</p>
</li>
<li>
<p><strong>odoo</strong>: Odoo service. This is our backend service that you could use to manage your products, orders, etc.</p>
</li>
<li>
<p><strong>vsf</strong>: Here is our front end integrated to Vue Storefront.</p>
</li>
</ul>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token function">docker-compose</span> up <span class="token parameter variable">--build</span> <span class="token parameter variable">-d</span></span>
<span class="line"><span class="token comment"># You might want to check what happens under the hood</span></span>
<span class="line"><span class="token function">docker-compose</span> logs <span class="token parameter variable">-f</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>🎯 <em>If you use Docker Desktop on Windows, some .sh files are executed during instalation, so we recommend you to read</em> <a href="https://docs.docker.com/docker-for-windows/wsl/" target="_blank" rel="noopener noreferrer">Docker Desktop Documentation</a> .</p>
<h2 id="after-installation" tabindex="-1"><a class="header-anchor" href="#after-installation"><span>After installation</span></a></h2>
<p>Now just open http://localhost:3000 for VSF and http://localhost:8069 for local Odoo (credentials admin/admin)</p>
<div class="custom-container warning"><p class="custom-container-title">WARNING</p>
<p>You might not see the top categories (MEN/WOMEN) until the Odoo server is initialized (database init takes time to install all modules)</p>
</div>
<h2 id="tips" tabindex="-1"><a class="header-anchor" href="#tips"><span>Tips</span></a></h2>
<p><strong>How to stop the services?</strong></p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token function">docker-compose</span> stop</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><strong>How to clear Odoo database?</strong></p>
<p>Running this command below it will stop all docker services and clears the Odoo local database.</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token function">docker-compose</span> down <span class="token parameter variable">-v</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><strong>Handle caching with Redis</strong></p>
<p>The <code v-pre>REDIS_ENABLED=true</code> into .env file ensure that Redis is enabled to be used. It is used to cache all odoo datas that has been accessed by the browser. Running this command below it will clear the Redis database.</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> redis redis-cli</span>
<span class="line"><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> flushall</span>
<span class="line">OK</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="video-tutorial" tabindex="-1"><a class="header-anchor" href="#video-tutorial"><span>Video tutorial</span></a></h1>
<p>Now you can watch and follow the steps in this video tutorial. Take your time 👍</p>
<iframe width="560" height="315" src="https://www.youtube.com/embed/fN5EoFZnU8Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div></template>


