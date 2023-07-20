# Ecosystem

Understand our projects and how they work together.

## Projects
We have 3 main projects to keep everyting working.
* **VSF-ODOO** is the project that keeps composable logic, the API connections to ODOO world and a git submodule pointer to template-odoo repository.

* **VSF-TEMPLATE-ODOO** is the project to start a new vsf-odoo project. It's our main theme.

* **VSF-ODOO-DEMOS** is the project that keeps some demonstrations and different themes.


<div align="center">
  <img :src="$withBase('/submodule.png')" alt="create_new_project" />
</div>



When we start a new project from **template odoo**, the npm package with odoo composables and apis will be injected. 

<div align="center">
  <img :src="$withBase('/create_new_project.png')" alt="create_new_project" />
</div>



 