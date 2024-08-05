<template><div><h1 id="vue-storefront-2" tabindex="-1"><a class="header-anchor" href="#vue-storefront-2"><span>Vue Storefront 2</span></a></h1>
<h2 id="build-setup" tabindex="-1"><a class="header-anchor" href="#build-setup"><span>Build Setup</span></a></h2>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre v-pre><code><span class="line"><span class="token comment"># install dependencies</span></span>
<span class="line">$ <span class="token function">yarn</span> <span class="token function">install</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># serve with hot reload at localhost:3000</span></span>
<span class="line">$ <span class="token function">yarn</span> dev</span>
<span class="line"></span>
<span class="line"><span class="token comment"># build for production and launch server</span></span>
<span class="line">$ <span class="token function">yarn</span> build</span>
<span class="line">$ <span class="token function">yarn</span> start</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>For detailed explanation on how things work, check out the <a href="https://docs.vuestorefront.io/v2/" target="_blank" rel="noopener noreferrer">documentation</a>.</p>
<h2 id="special-directories" tabindex="-1"><a class="header-anchor" href="#special-directories"><span>Special Directories</span></a></h2>
<p>You can create the following extra directories, some of which have special behaviors. Only <code v-pre>pages</code> is required; you can delete them if you don't want to use their functionality.</p>
<h3 id="assets" tabindex="-1"><a class="header-anchor" href="#assets"><span><code v-pre>assets</code></span></a></h3>
<p>The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.</p>
<h3 id="components" tabindex="-1"><a class="header-anchor" href="#components"><span><code v-pre>components</code></span></a></h3>
<p>The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.</p>
<h3 id="layouts" tabindex="-1"><a class="header-anchor" href="#layouts"><span><code v-pre>layouts</code></span></a></h3>
<p>Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.</p>
<h3 id="pages" tabindex="-1"><a class="header-anchor" href="#pages"><span><code v-pre>pages</code></span></a></h3>
<p>This directory contains your application views and routes. Nuxt will read all the <code v-pre>*.vue</code> files inside this directory and setup Vue Router automatically.</p>
<h3 id="plugins" tabindex="-1"><a class="header-anchor" href="#plugins"><span><code v-pre>plugins</code></span></a></h3>
<p>The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use <code v-pre>Vue.use()</code>, you should create a file in <code v-pre>plugins/</code> and add its path to plugins in <code v-pre>nuxt.config.js</code>.</p>
<h3 id="static" tabindex="-1"><a class="header-anchor" href="#static"><span><code v-pre>static</code></span></a></h3>
<p>This directory contains your static files. Each file inside this directory is mapped to <code v-pre>/</code>.</p>
<p>Example: <code v-pre>/static/robots.txt</code> is mapped as <code v-pre>/robots.txt</code>.</p>
<h3 id="store" tabindex="-1"><a class="header-anchor" href="#store"><span><code v-pre>store</code></span></a></h3>
<p>This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.</p>
</div></template>


