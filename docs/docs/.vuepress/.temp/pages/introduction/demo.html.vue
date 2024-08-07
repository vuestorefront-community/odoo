<template><div><h1 id="demonstration" tabindex="-1"><a class="header-anchor" href="#demonstration"><span>Demonstration</span></a></h1>
<p>This documentation is about Odoo integration with Alokai. This integration has been developed and maintained by ERPGAP / PromptEQUATION ❤️</p>
<p>Before anything, you should take a look in our live demo: https://Alokaisdk.labs.odoogap.com/ <em>it's a dev server so could be down sometimes</em> 🤷‍♂️</p>
<div class="custom-container warning"><p class="custom-container-title">WARNING</p>
<p>We need to make clear that this hole documentation is about <strong>Alokai + Odoo - Front End</strong>, not about Odoo Back End. So, take a look in following explanations to better understand how it works.</p>
</div>
<h2 id="alokai-community-projects-explanation" tabindex="-1"><a class="header-anchor" href="#alokai-community-projects-explanation"><span>Alokai Community Projects explanation</span></a></h2>
<p>We are Alokai partners, so we make part of Alokai open source community. We keep 3 main projects available in Github Alokai Community (https://github.com/vuestorefront-community) to keep everyting working:</p>
<ul>
<li>
<p><strong>Alokai-ODOO</strong>: Here is where our developer team works to make everything working with the best performance and user experience as possible. It keeps composable logic, the API connections to ODOO world and a git submodule pointer to template-odoo repository.</p>
</li>
<li>
<p><strong>Alokai-TEMPLATE-ODOO</strong>: This is the project to start a new Alokai-odoo project. It's our main theme. So, if you want to start your own project, you'll need this repository to get start.</p>
</li>
<li>
<p><strong>Alokai-ODOO-DEMOS</strong>: This is the project that keeps some demonstrations and different themes.</p>
</li>
</ul>
<div align="center">
  <img :src="$withBase('/submodule.png')" alt="create_new_project" />
</div>
<p>When we start a new project from <strong>Alokai_TEMPLATE_ODOO</strong>, the npm package with odoo composables and apis will be injected.</p>
<div align="center">
  <img :src="$withBase('/create_new_project.png')" alt="create_new_project" />
</div>
<!-- # Features

::: info
Already pre configured feaures!
Just need your API and if need, your customizations
:::

```card
title: Google Tag Manager
logo: "../../gtm.svg"
link: https://marketingplatform.google.com/about/tag-manager/
color: rgba(253, 230, 138, 0.15)
```

```card
title: Google Analytics

logo: "../../ga.svg"
link: https://analytics.google.com/analytics/web/provision/#/provision
color: rgba(253, 230, 138, 0.15)
```

```card
title: Sitemap
logo: "../../sm.svg"
link: https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview?hl=pt-br#:~:text=A%20sitemap%20is%20a%20file,crawl%20your%20site%20more%20efficiently
color: rgba(253, 230, 138, 0.15)
```

```card
title: Redis Page Cache

logo: "../../redapi.svg"
link: https://redis.com/ebook/part-1-getting-started/chapter-2-anatomy-of-a-redis-web-application/2-3-web-page-caching/

color: rgba(253, 230, 138, 0.15)
```

```card
title: Redis Api Cache

logo: "../../red.svg"
link: https://redis.io/docs/manual/client-side-caching/
color: rgba(253, 230, 138, 0.15)
```

```card
title: PWA Ready

logo: "../../pwa.svg"
link: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps
color: rgba(253, 230, 138, 0.15)
``` -->
</div></template>


