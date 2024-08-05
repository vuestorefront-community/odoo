<template><div><h1 id="custom-queries" tabindex="-1"><a class="header-anchor" href="#custom-queries"><span>Custom queries</span></a></h1>
<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction"><span>Introduction</span></a></h2>
<p>Following the <a href="https://docs.vuestorefront.io/v2/composition/extending-graphql-queries.html" target="_blank" rel="noopener noreferrer">Extending GraphQL Queries</a>, we can override the base queries from odoo to our custom queries.</p>
<ol>
<li>Import the <code v-pre>custom-project-api/customQueries.js</code> file to <strong>middleware.config.js</strong></span></li>
</ol>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token comment">// middleware.config.js</span></span>
<span class="line"><span class="token keyword">const</span> customQueries <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./custom-project-api/customQueries.js'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">integrations</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">odoo</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token literal-property property">location</span><span class="token operator">:</span> <span class="token string">'@vue-storefront/odoo-api/server'</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">configuration</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        odooBaseUrl<span class="token punctuation">,</span></span>
<span class="line">        graphqlBaseUrl</span>
<span class="line">      <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">      customQueries</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>Custom queries file must follow</li>
</ol>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token comment">// custom-project-api/customQueries.js</span></span>
<span class="line">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function-variable function">customGetProduct</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span>variables<span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">    varialbes<span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">query</span><span class="token operator">:</span> gql<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string"></span>
<span class="line">      query { </span>
<span class="line">        product {</span>
<span class="line">          id</span>
<span class="line">          name</span>
<span class="line">        } </span>
<span class="line">      }</span>
<span class="line">    </span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span></span>
<span class="line">    variables</span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container danger"><p class="custom-container-title">Don't forget to reload the application</p>
<p>The application does not reload automatically after saving the changes in Server Middleware. Due to this, you have to restart the application manually. We are working on enabling Hot Reloading in future updates.</p>
</div>
</div></template>


