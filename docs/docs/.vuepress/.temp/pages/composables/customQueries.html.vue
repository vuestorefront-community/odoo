<template><div><h1 id="custom-queries" tabindex="-1"><a class="header-anchor" href="#custom-queries"><span>Custom Queries</span></a></h1>
<h2 id="features" tabindex="-1"><a class="header-anchor" href="#features"><span>Features</span></a></h2>
<p>From <a href="https://docs.vuestorefront.io/v2/advanced/extending-graphql-queries.html" target="_blank" rel="noopener noreferrer">VSF2 docs</a>,
we can use custom query on existing APIS.
Most of the apis use 'customQuery' index.</p>
<h3 id="use-cart" tabindex="-1"><a class="header-anchor" href="#use-cart"><span>Use Cart</span></a></h3>
<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts" data-title="ts"><pre v-pre><code><span class="line">  <span class="token keyword">const</span> <span class="token punctuation">{</span> load<span class="token operator">:</span> loadCart<span class="token punctuation">,</span> cart <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">useCart</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">await</span> <span class="token function">loadCart</span><span class="token punctuation">(</span><span class="token punctuation">{</span> customQuery<span class="token operator">:</span> <span class="token punctuation">{</span> cartLoad<span class="token operator">:</span> <span class="token string">'customCartLoad'</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="use-category" tabindex="-1"><a class="header-anchor" href="#use-category"><span>Use Category</span></a></h3>
<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts" data-title="ts"><pre v-pre><code><span class="line">  <span class="token keyword">const</span> <span class="token punctuation">{</span> categories<span class="token punctuation">,</span> search<span class="token operator">:</span> searchCategories <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">useCategory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">await</span> <span class="token function">loadCart</span><span class="token punctuation">(</span><span class="token punctuation">{</span> pageSize<span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span> customQuery<span class="token operator">:</span> <span class="token punctuation">{</span> getCategory<span class="token operator">:</span> <span class="token string">'customGetCategory'</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="use-countrysearch" tabindex="-1"><a class="header-anchor" href="#use-countrysearch"><span>Use CountrySearch</span></a></h3>
<h3 id="use-facet" tabindex="-1"><a class="header-anchor" href="#use-facet"><span>Use Facet</span></a></h3>
<ul>
<li>getProductTemplatesList</li>
</ul>
<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts" data-title="ts"><pre v-pre><code><span class="line"> <span class="token keyword">await</span> <span class="token function">search</span><span class="token punctuation">(</span><span class="token punctuation">{</span> </span>
<span class="line">   <span class="token operator">...</span>uiHelper<span class="token punctuation">.</span><span class="token function">getFacetsFromURL</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">   customQueryProducts<span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      getProductTemplatesList<span class="token operator">:</span> <span class="token string">'customProductTempalteListCategory'</span><span class="token punctuation">,</span></span>
<span class="line">   <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">   customQueryCategories<span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      getCategory<span class="token operator">:</span> <span class="token string">'customCategoryQuery'</span><span class="token punctuation">,</span></span>
<span class="line">   <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="use-password" tabindex="-1"><a class="header-anchor" href="#use-password"><span>Use Password</span></a></h3>
<h3 id="use-product" tabindex="-1"><a class="header-anchor" href="#use-product"><span>Use Product</span></a></h3>
<ul>
<li>getProductTemplate</li>
</ul>
<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts" data-title="ts"><pre v-pre><code><span class="line"> <span class="token keyword">await</span> <span class="token function">search</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">   id<span class="token punctuation">,</span></span>
<span class="line">   customQuery<span class="token operator">:</span> <span class="token punctuation">{</span> getProductTemplate<span class="token operator">:</span> <span class="token string">'customProductTemplateQuery'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line"> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="use-productvariant" tabindex="-1"><a class="header-anchor" href="#use-productvariant"><span>Use ProductVariant</span></a></h3>
<h3 id="use-shipping" tabindex="-1"><a class="header-anchor" href="#use-shipping"><span>Use Shipping</span></a></h3>
<h3 id="use-user" tabindex="-1"><a class="header-anchor" href="#use-user"><span>Use User</span></a></h3>
<ul>
<li>signUpUser</li>
</ul>
<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts" data-title="ts"><pre v-pre><code><span class="line">  <span class="token keyword">await</span> <span class="token function">register</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">    user<span class="token operator">:</span> form<span class="token punctuation">.</span>value<span class="token punctuation">,</span></span>
<span class="line">    customQuery<span class="token operator">:</span> <span class="token punctuation">{</span> signUpUser<span class="token operator">:</span> <span class="token string">'customSignUpUserMutation'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="use-user-billing" tabindex="-1"><a class="header-anchor" href="#use-user-billing"><span>Use User Billing</span></a></h3>
<h3 id="use-wishlist" tabindex="-1"><a class="header-anchor" href="#use-wishlist"><span>Use Wishlist</span></a></h3>
<h3 id="use-order" tabindex="-1"><a class="header-anchor" href="#use-order"><span>Use Order</span></a></h3>
<ul>
<li>ordersGet</li>
</ul>
<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts" data-title="ts"><pre v-pre><code><span class="line">  <span class="token keyword">await</span> <span class="token function">search</span><span class="token punctuation">(</span><span class="token punctuation">{</span> customQuery<span class="token operator">:</span> <span class="token punctuation">{</span> ordersGet<span class="token operator">:</span> <span class="token string">'customOrdersGetQuery'</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></div></template>


