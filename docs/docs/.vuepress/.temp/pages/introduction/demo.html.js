import comp from "/home/netto/Projetos/odoo/docs/docs/.vuepress/.temp/pages/introduction/demo.html.vue"
const data = JSON.parse("{\"path\":\"/introduction/demo.html\",\"title\":\"Demonstration\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"VSF Community Projects explanation\",\"slug\":\"vsf-community-projects-explanation\",\"link\":\"#vsf-community-projects-explanation\",\"children\":[]}],\"git\":{\"updatedTime\":null,\"contributors\":[]},\"filePathRelative\":\"introduction/demo.md\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
