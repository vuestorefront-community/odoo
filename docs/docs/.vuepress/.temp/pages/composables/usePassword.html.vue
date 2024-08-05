<template><div><h1 id="usepassword-composable" tabindex="-1"><a class="header-anchor" href="#usepassword-composable"><span>UsePassword Composable</span></a></h1>
<p><strong>UsePassword</strong> composable can be used to:</p>
<ul>
<li>Send an email to reset password</li>
<li>Reset the user password</li>
</ul>
<h2 id="example" tabindex="-1"><a class="header-anchor" href="#example"><span>Example</span></a></h2>
<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts" data-title="ts"><pre v-pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> usePassword <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@vue-storefront/odoo'</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> onSSR <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@vue-storefront/core'</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">setup</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">     <span class="token keyword">const</span> <span class="token punctuation">{</span> sendResetPassword<span class="token punctuation">,</span> errorPassword<span class="token punctuation">,</span> resetPassword <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">usePassword</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">     <span class="token keyword">const</span> <span class="token function-variable function">handleSendResetPassword</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span>email<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">       <span class="token keyword">await</span> <span class="token function">sendResetPassword</span><span class="token punctuation">(</span><span class="token punctuation">{</span> email <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line">     <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">     <span class="token comment">// Usually token will be redirected from user email in query param</span></span>
<span class="line">     <span class="token comment">// New password from input</span></span>
<span class="line">     <span class="token keyword">const</span> <span class="token function-variable function">handleResetPassword</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">       <span class="token keyword">await</span> <span class="token function">resetPassword</span><span class="token punctuation">(</span><span class="token punctuation">{</span> password<span class="token operator">:</span> newPassword<span class="token punctuation">,</span> token <span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line">     <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">return</span> <span class="token punctuation">{</span></span>
<span class="line">      handleSendResetPassword<span class="token punctuation">,</span> </span>
<span class="line">      errorPassword<span class="token punctuation">,</span> </span>
<span class="line">      resetPasswordErrors</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


