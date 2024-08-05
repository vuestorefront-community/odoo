<template><div><h1 id="custom-api-client" tabindex="-1"><a class="header-anchor" href="#custom-api-client"><span>Custom API client</span></a></h1>
<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction"><span>Introduction</span></a></h2>
<p>Following the <a href="https://docs.vuestorefront.io/v2/integrate/extending-integrations.html#registering-an-extension" target="_blank" rel="noopener noreferrer">Registering an extension</a>, to create new apis client (doesn't exist in odoo ) we must register a new extension.</p>
<ol>
<li>Import <code v-pre>custom-api/api</code> file to <strong>middleware.config.js</strong></span></li>
</ol>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token comment">// middleware.config.js</span></span>
<span class="line"><span class="token keyword">const</span> apis <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./custom-api/api'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">integrations</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">odoo</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token literal-property property">location</span><span class="token operator">:</span> <span class="token string">'@vue-storefront/odoo-api/server'</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token literal-property property">configuration</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        odooBaseUrl<span class="token punctuation">,</span></span>
<span class="line">        graphqlBaseUrl<span class="token punctuation">,</span></span>
<span class="line">        <span class="token operator">...</span></span>
<span class="line">      <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token function-variable function">extensions</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">extensions</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">[</span></span>
<span class="line">        <span class="token operator">...</span>extensions<span class="token punctuation">,</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">          <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'custom-apis-extension'</span><span class="token punctuation">,</span></span>
<span class="line">          <span class="token literal-property property">extendApiMethods</span><span class="token operator">:</span> apis</span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">]</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>Create your <code v-pre>index.js</code> file to organize your api modules</span></li>
</ol>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token comment">// custom-api/api/index.js</span></span>
<span class="line"><span class="token keyword">const</span> createTelegramNotification <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./createTelegramNotification'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> importCartFromOther <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./importCartFromOther'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">  createTelegramNotification<span class="token punctuation">,</span></span>
<span class="line">  importCartFromOther</span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3">
<li>Create each of your api module</li>
</ol>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"><span class="token comment">// custom-api/api/createTelegramNotification.js</span></span>
<span class="line"><span class="token keyword">const</span> gql <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'graphql-tag'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> <span class="token function-variable function">createTelegramNotification</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter">context<span class="token punctuation">,</span> params</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">const</span> apolloClient <span class="token operator">=</span> context<span class="token punctuation">.</span>client<span class="token punctuation">.</span>apollo<span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">const</span> response <span class="token operator">=</span> <span class="token keyword">await</span> apolloClient<span class="token punctuation">.</span><span class="token function">mutate</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">variables</span><span class="token operator">:</span> params<span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">mutation</span><span class="token operator">:</span> gql<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string"></span>
<span class="line">      mutation ($email: String!) {</span>
<span class="line">        createTelegramNotification(email: $email) {</span>
<span class="line">            status</span>
<span class="line">            ...</span>
<span class="line">        }</span>
<span class="line">      }</span><span class="token template-punctuation string">`</span></span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">return</span> response<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> createTelegramNotification<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


