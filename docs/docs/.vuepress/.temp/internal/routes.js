export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"/home/netto/Projetos/odoo/docs/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":"What is Odoo?"} }],
  ["/get-started.html", { loader: () => import(/* webpackChunkName: "get-started.html" */"/home/netto/Projetos/odoo/docs/docs/.vuepress/.temp/pages/get-started.html.js"), meta: {"title":"Get Started"} }],
  ["/configuration/assets.html", { loader: () => import(/* webpackChunkName: "configuration_assets.html" */"/home/netto/Projetos/odoo/docs/docs/.vuepress/.temp/pages/configuration/assets.html.js"), meta: {"title":"Assets"} }],
  ["/configuration/docker-compose.html", { loader: () => import(/* webpackChunkName: "configuration_docker-compose.html" */"/home/netto/Projetos/odoo/docs/docs/.vuepress/.temp/pages/configuration/docker-compose.html.js"), meta: {"title":"Docker Compose"} }],
  ["/configuration/eco.html", { loader: () => import(/* webpackChunkName: "configuration_eco.html" */"/home/netto/Projetos/odoo/docs/docs/.vuepress/.temp/pages/configuration/eco.html.js"), meta: {"title":"Ecosystem"} }],
  ["/configuration/envs.html", { loader: () => import(/* webpackChunkName: "configuration_envs.html" */"/home/netto/Projetos/odoo/docs/docs/.vuepress/.temp/pages/configuration/envs.html.js"), meta: {"title":"Enviroment configuration"} }],
  ["/configuration/middleware.html", { loader: () => import(/* webpackChunkName: "configuration_middleware.html" */"/home/netto/Projetos/odoo/docs/docs/.vuepress/.temp/pages/configuration/middleware.html.js"), meta: {"title":"Middleware"} }],
  ["/configuration/routes.html", { loader: () => import(/* webpackChunkName: "configuration_routes.html" */"/home/netto/Projetos/odoo/docs/docs/.vuepress/.temp/pages/configuration/routes.html.js"), meta: {"title":"Routes"} }],
  ["/composables/customQueries.html", { loader: () => import(/* webpackChunkName: "composables_customQueries.html" */"/home/netto/Projetos/odoo/docs/docs/.vuepress/.temp/pages/composables/customQueries.html.js"), meta: {"title":"Custom Queries"} }],
  ["/composables/useCart.html", { loader: () => import(/* webpackChunkName: "composables_useCart.html" */"/home/netto/Projetos/odoo/docs/docs/.vuepress/.temp/pages/composables/useCart.html.js"), meta: {"title":"UseCart Composable"} }],
  ["/composables/useCategory.html", { loader: () => import(/* webpackChunkName: "composables_useCategory.html" */"/home/netto/Projetos/odoo/docs/docs/.vuepress/.temp/pages/composables/useCategory.html.js"), meta: {"title":"UseCategory Composable"} }],
  ["/composables/useCountrySearch.html", { loader: () => import(/* webpackChunkName: "composables_useCountrySearch.html" */"/home/netto/Projetos/odoo/docs/docs/.vuepress/.temp/pages/composables/useCountrySearch.html.js"), meta: {"title":"UseCountrySearch Composable"} }],
  ["/composables/useFacet.html", { loader: () => import(/* webpackChunkName: "composables_useFacet.html" */"/home/netto/Projetos/odoo/docs/docs/.vuepress/.temp/pages/composables/useFacet.html.js"), meta: {"title":"UseFacet Composable"} }],
  ["/composables/useOrder.html", { loader: () => import(/* webpackChunkName: "composables_useOrder.html" */"/home/netto/Projetos/odoo/docs/docs/.vuepress/.temp/pages/composables/useOrder.html.js"), meta: {"title":"UseOrder Composable"} }],
  ["/composables/usePassword.html", { loader: () => import(/* webpackChunkName: "composables_usePassword.html" */"/home/netto/Projetos/odoo/docs/docs/.vuepress/.temp/pages/composables/usePassword.html.js"), meta: {"title":"UsePassword Composable"} }],
  ["/composables/useProduct.html", { loader: () => import(/* webpackChunkName: "composables_useProduct.html" */"/home/netto/Projetos/odoo/docs/docs/.vuepress/.temp/pages/composables/useProduct.html.js"), meta: {"title":"UseProduct Composable"} }],
  ["/composables/useProductVariant.html", { loader: () => import(/* webpackChunkName: "composables_useProductVariant.html" */"/home/netto/Projetos/odoo/docs/docs/.vuepress/.temp/pages/composables/useProductVariant.html.js"), meta: {"title":"UseProductVariant Composable"} }],
  ["/composables/useShipping.html", { loader: () => import(/* webpackChunkName: "composables_useShipping.html" */"/home/netto/Projetos/odoo/docs/docs/.vuepress/.temp/pages/composables/useShipping.html.js"), meta: {"title":"UseShipping Composable"} }],
  ["/composables/useShippingProvider.html", { loader: () => import(/* webpackChunkName: "composables_useShippingProvider.html" */"/home/netto/Projetos/odoo/docs/docs/.vuepress/.temp/pages/composables/useShippingProvider.html.js"), meta: {"title":"UseShippingProvider Composable"} }],
  ["/composables/useUser.html", { loader: () => import(/* webpackChunkName: "composables_useUser.html" */"/home/netto/Projetos/odoo/docs/docs/.vuepress/.temp/pages/composables/useUser.html.js"), meta: {"title":"UseUser Composable"} }],
  ["/composables/useUserBilling.html", { loader: () => import(/* webpackChunkName: "composables_useUserBilling.html" */"/home/netto/Projetos/odoo/docs/docs/.vuepress/.temp/pages/composables/useUserBilling.html.js"), meta: {"title":"UseUserBilling Composable"} }],
  ["/composables/useWishlist.html", { loader: () => import(/* webpackChunkName: "composables_useWishlist.html" */"/home/netto/Projetos/odoo/docs/docs/.vuepress/.temp/pages/composables/useWishlist.html.js"), meta: {"title":"UseWishlist Composable"} }],
  ["/introduction/demo.html", { loader: () => import(/* webpackChunkName: "introduction_demo.html" */"/home/netto/Projetos/odoo/docs/docs/.vuepress/.temp/pages/introduction/demo.html.js"), meta: {"title":"Demonstration"} }],
  ["/guides/customApis.html", { loader: () => import(/* webpackChunkName: "guides_customApis.html" */"/home/netto/Projetos/odoo/docs/docs/.vuepress/.temp/pages/guides/customApis.html.js"), meta: {"title":"Custom API client"} }],
  ["/guides/customQueries.html", { loader: () => import(/* webpackChunkName: "guides_customQueries.html" */"/home/netto/Projetos/odoo/docs/docs/.vuepress/.temp/pages/guides/customQueries.html.js"), meta: {"title":"Custom queries"} }],
  ["/guides/payment.html", { loader: () => import(/* webpackChunkName: "guides_payment.html" */"/home/netto/Projetos/odoo/docs/docs/.vuepress/.temp/pages/guides/payment.html.js"), meta: {"title":"Payment"} }],
  ["/reference/apiList.html", { loader: () => import(/* webpackChunkName: "reference_apiList.html" */"/home/netto/Projetos/odoo/docs/docs/.vuepress/.temp/pages/reference/apiList.html.js"), meta: {"title":"API"} }],
  ["/reference/featureList.html", { loader: () => import(/* webpackChunkName: "reference_featureList.html" */"/home/netto/Projetos/odoo/docs/docs/.vuepress/.temp/pages/reference/featureList.html.js"), meta: {"title":"Feature List"} }],
  ["/tips/customTypes.html", { loader: () => import(/* webpackChunkName: "tips_customTypes.html" */"/home/netto/Projetos/odoo/docs/docs/.vuepress/.temp/pages/tips/customTypes.html.js"), meta: {"title":"Custom types"} }],
  ["/tips/i18n.html", { loader: () => import(/* webpackChunkName: "tips_i18n.html" */"/home/netto/Projetos/odoo/docs/docs/.vuepress/.temp/pages/tips/i18n.html.js"), meta: {"title":"i18n"} }],
  ["/introduction/quick-start/starting-new.html", { loader: () => import(/* webpackChunkName: "introduction_quick-start_starting-new.html" */"/home/netto/Projetos/odoo/docs/docs/.vuepress/.temp/pages/introduction/quick-start/starting-new.html.js"), meta: {"title":"Starting new project"} }],
  ["/introduction/quick-start/testing-local.html", { loader: () => import(/* webpackChunkName: "introduction_quick-start_testing-local.html" */"/home/netto/Projetos/odoo/docs/docs/.vuepress/.temp/pages/introduction/quick-start/testing-local.html.js"), meta: {"title":"Integration test"} }],
  ["/packages/api-client/", { loader: () => import(/* webpackChunkName: "packages_api-client_index.html" */"/home/netto/Projetos/odoo/docs/docs/.vuepress/.temp/pages/packages/api-client/index.html.js"), meta: {"title":""} }],
  ["/packages/composables/", { loader: () => import(/* webpackChunkName: "packages_composables_index.html" */"/home/netto/Projetos/odoo/docs/docs/.vuepress/.temp/pages/packages/composables/index.html.js"), meta: {"title":""} }],
  ["/packages/theme/", { loader: () => import(/* webpackChunkName: "packages_theme_index.html" */"/home/netto/Projetos/odoo/docs/docs/.vuepress/.temp/pages/packages/theme/index.html.js"), meta: {"title":"Vue Storefront 2"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"/home/netto/Projetos/odoo/docs/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
]);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateRoutes) {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
  }
  if (__VUE_HMR_RUNTIME__.updateRedirects) {
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ routes, redirects }) => {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  })
}
