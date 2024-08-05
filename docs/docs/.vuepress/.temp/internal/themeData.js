export const themeData = JSON.parse("{\"nav\":[{\"text\":\"Vue Storefront\",\"link\":\"https://vuestorefront.io/\"},{\"text\":\"Core Documentation\",\"link\":\"https://docs.vuestorefront.io/v2/\"}],\"sidebar\":[{\"text\":\"Introduction\",\"collapsable\":false,\"children\":[{\"text\":\"Odoo\",\"link\":\"/\",\"children\":[{\"text\":\"Demonstration\",\"link\":\"introduction/demo\"},{\"text\":\"New Project\",\"link\":\"/introduction/quick-start/starting-new\"},{\"text\":\"Integration Test\",\"link\":\"/introduction/quick-start/testing-local\"}]},{\"text\":\"Configuration\",\"collapsible\":false,\"children\":[{\"text\":\"Assets\",\"link\":\"/configuration/assets\"},{\"text\":\"Docker Compose\",\"link\":\"/configuration/docker-compose\"},{\"text\":\"Ecosystem\",\"link\":\"/configuration/eco\"},{\"text\":\"Enviroment\",\"link\":\"/configuration/envs\"},{\"text\":\"Middleware\",\"link\":\"/configuration/middleware\"},{\"text\":\"Routes\",\"link\":\"/configuration/routes\"}]},{\"text\":\"Guides\",\"collapsable\":true,\"children\":[{\"text\":\"Custom Apis\",\"link\":\"/guides/customApis\"},{\"text\":\"Custom queries\",\"link\":\"/guides/customQueries\"},{\"text\":\"Payment\",\"link\":\"/guides/payment\"}]}]}],\"locales\":{\"/\":{\"selectLanguageName\":\"English\"}},\"colorMode\":\"auto\",\"colorModeSwitch\":true,\"navbar\":[],\"logo\":null,\"repo\":null,\"selectLanguageText\":\"Languages\",\"selectLanguageAriaLabel\":\"Select language\",\"sidebarDepth\":2,\"editLink\":true,\"editLinkText\":\"Edit this page\",\"lastUpdated\":true,\"lastUpdatedText\":\"Last Updated\",\"contributors\":true,\"contributorsText\":\"Contributors\",\"notFound\":[\"There's nothing here.\",\"How did we get here?\",\"That's a Four-Oh-Four.\",\"Looks like we've got some broken links.\"],\"backToHome\":\"Take me home\",\"openInNewWindow\":\"open in new window\",\"toggleColorMode\":\"toggle color mode\",\"toggleSidebar\":\"toggle sidebar\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
