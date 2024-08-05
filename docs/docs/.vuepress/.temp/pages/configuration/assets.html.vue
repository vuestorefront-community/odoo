<template><div><h1 id="assets" tabindex="-1"><a class="header-anchor" href="#assets"><span>Assets</span></a></h1>
<p>It has the external resources that templates may need, such as images, stylesheets and some JavaScripts.</p>
<p>The assets folder on build stagging / prod will be sent to CDN with some hash.</p>
<p>To nuxt compile the assets links with the rigth use require.</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre><code><span class="line"> <span class="token operator">:</span>placeholder<span class="token operator">=</span><span class="token string">"require('~/assets/images/product/product_placeholder.png')"</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="image-handle" tabindex="-1"><a class="header-anchor" href="#image-handle"><span>Image handle</span></a></h2>
<p>Always use the <strong>getImage</strong> method!</p>
<h3 id="why" tabindex="-1"><a class="header-anchor" href="#why"><span>Why ?</span></a></h3>
<ul>
<li>He is build to fetch from correct baseURL (CDN for production / odoo others)</li>
<li>He is already injected in vue</li>
</ul>
<h3 id="how" tabindex="-1"><a class="header-anchor" href="#how"><span>How ?</span></a></h3>
<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts" data-title="ts"><pre v-pre><code><span class="line">   <span class="token comment">// from template</span></span>
<span class="line">   <span class="token function">$image</span><span class="token punctuation">(</span>productGetters<span class="token punctuation">.</span><span class="token function">getCoverImage</span><span class="token punctuation">(</span>product<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">   <span class="token function">$image</span><span class="token punctuation">(</span> <span class="token operator">&lt;</span>image url<span class="token operator">></span> <span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">   <span class="token comment">// from setup</span></span>
<span class="line">   <span class="token punctuation">{</span> url<span class="token operator">:</span> root<span class="token punctuation">.</span><span class="token function">$image</span><span class="token punctuation">(</span>img<span class="token punctuation">.</span>small<span class="token punctuation">)</span> <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="example-1" tabindex="-1"><a class="header-anchor" href="#example-1"><span>Example 1</span></a></h3>
<div class="language-html line-numbers-mode" data-highlighter="prismjs" data-ext="html" data-title="html"><pre v-pre><code><span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>SfCollectedProduct</span></span>
<span class="line">    <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>product in products<span class="token punctuation">"</span></span></span>
<span class="line">    <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>wishlistGetters.getItemSku(product)<span class="token punctuation">"</span></span></span>
<span class="line">    <span class="token attr-name">:image</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>$image(wishlistGetters.getItemImage(product))<span class="token punctuation">"</span></span></span>
<span class="line">    <span class="token attr-name">:title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>wishlistGetters.getItemName(product)<span class="token punctuation">"</span></span></span>
<span class="line">  <span class="token punctuation">/></span></span></span>
<span class="line"></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="example-2" tabindex="-1"><a class="header-anchor" href="#example-2"><span>Example 2</span></a></h3>
<div class="language-html line-numbers-mode" data-highlighter="prismjs" data-ext="html" data-title="html"><pre v-pre><code><span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>SfImage</span></span>
<span class="line">    <span class="token attr-name">:src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>$image(icon.image)<span class="token punctuation">"</span></span></span>
<span class="line">    <span class="token attr-name">:alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>icon.name || 'icon-image'<span class="token punctuation">"</span></span></span>
<span class="line">    <span class="token attr-name">:width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>57<span class="token punctuation">"</span></span></span>
<span class="line">    <span class="token attr-name">:height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>25<span class="token punctuation">"</span></span></span>
<span class="line">  <span class="token punctuation">/></span></span></span>
<span class="line"></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


