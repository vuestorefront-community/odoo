<template><div><h1 id="payment" tabindex="-1"><a class="header-anchor" href="#payment"><span>Payment</span></a></h1>
<p>Each payment type must be wrapped in abstract observer.
The abstract observer is responsable to validate some payment parameters and have
some lifecycle hooks for the payment</p>
<div class="language-html line-numbers-mode" data-highlighter="prismjs" data-ext="html" data-title="html"><pre v-pre><code><span class="line"> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>abstract-payment-observer</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>selectedProvider.name<span class="token punctuation">"</span></span><span class="token punctuation">></span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>component</span></span>
<span class="line">      <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>py-8<span class="token punctuation">"</span></span></span>
<span class="line">      <span class="token attr-name">@isPaymentReady</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>isPaymentReady = arguments[0]<span class="token punctuation">"</span></span></span>
<span class="line">      <span class="token attr-name">@providerPaymentHandler</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>providerPaymentHandler = arguments[0]<span class="token punctuation">"</span></span></span>
<span class="line">      <span class="token attr-name">:provider</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>selectedProvider<span class="token punctuation">"</span></span></span>
<span class="line">      <span class="token attr-name">:is</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>getComponentProviderByName(selectedProvider.name)<span class="token punctuation">"</span></span></span>
<span class="line">    <span class="token punctuation">/></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>abstract-payment-observer</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="adyen-external" tabindex="-1"><a class="header-anchor" href="#adyen-external"><span>Adyen external</span></a></h2>
<p>Oddo will create a dinamic form. We build this form and on click, he send to external adyen new tab. Our <strong>AdyenExternalPaymentProvider</strong> handle all this logic using the user session.</p>
</div></template>


