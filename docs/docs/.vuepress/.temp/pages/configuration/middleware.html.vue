<template><div><h1 id="middleware" tabindex="-1"><a class="header-anchor" href="#middleware"><span>Middleware</span></a></h1>
<h2 id="graphql" tabindex="-1"><a class="header-anchor" href="#graphql"><span>GraphQl</span></a></h2>
<p>As a nuxt application, all requests to backend are made from Nuxt using a middleware layer.</p>
<p>Odoo use GraphQL in back end. So, we need to use a middleware to convert the graphql to rest api. For more detailed explanation visit <a href="%22https://graphql.org/%22">Graphql documentation</a>.</p>
<p>The <code v-pre>middleware.config.js</code> is responsable to make this bridge between Nuxt and GraphQl.</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token comment">// packages/theme/middleware.config.js</span></span>
<span class="line"><span class="token keyword">const</span> odooBaseUrl <span class="token operator">=</span></span>
<span class="line">  process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">BACKEND_BASE_URL</span> <span class="token operator">||</span></span>
<span class="line">  process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">BASE_URL</span> <span class="token operator">||</span></span>
<span class="line">  <span class="token string">"https://vsfdemo.labs.odoogap.com/"</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> graphqlBaseUrl <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>odooBaseUrl<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">graphql/vsf</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">integrations</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">odoo</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token literal-property property">location</span><span class="token operator">:</span> <span class="token string">"@vue-storefront/odoo-api/server"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">configuration</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        odooBaseUrl<span class="token punctuation">,</span></span>
<span class="line">        graphqlBaseUrl<span class="token punctuation">,</span></span>
<span class="line">      <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="logging-requests" tabindex="-1"><a class="header-anchor" href="#logging-requests"><span>Logging requests</span></a></h2>
<p>To make our development easier, we created useing Nuxt context, a way to show each request made from Nuxt to Graphql. Its automatic in dev mode, not for production. You'll see in your terminal all the logged requests.</p>
<div align="center">
  <img :src="$withBase('/requestLogger.png')" alt="request_logger" />
</div>
</div></template>


