<template><div><h1 id="ecosystem" tabindex="-1"><a class="header-anchor" href="#ecosystem"><span>Ecosystem</span></a></h1>
<p>Understand our projects and how they work together.</p>
<h2 id="projects" tabindex="-1"><a class="header-anchor" href="#projects"><span>Projects</span></a></h2>
<p>We have 3 main projects to keep everyting working.</p>
<ul>
<li>
<p><strong>VSF-ODOO</strong> is the project that keeps composable logic, the API connections to ODOO world and a git submodule pointer to template-odoo repository.</p>
</li>
<li>
<p><strong>VSF-TEMPLATE-ODOO</strong> is the project to start a new vsf-odoo project. It's our main theme.</p>
</li>
<li>
<p><strong>VSF-ODOO-DEMOS</strong> is the project that keeps some demonstrations and different themes.</p>
</li>
</ul>
<div align="center">
  <img :src="$withBase('/submodule.png')" alt="create_new_project" />
</div>
<p>When we start a new project from <strong>template odoo</strong>, the npm package with odoo composables and apis will be injected.</p>
<div align="center">
  <img :src="$withBase('/create_new_project.png')" alt="create_new_project" />
</div>
</div></template>


