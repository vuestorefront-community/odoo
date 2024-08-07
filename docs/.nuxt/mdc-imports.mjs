import Highlight from '/home/netto/Projetos/odoo/docs/node_modules/sf-docs-base/node_modules/@nuxtjs/mdc/dist/runtime/highlighter/rehype.mjs'

export const remarkPlugins = {
}

export const rehypePlugins = {
  'highlight': { instance: Highlight, options: {} },
}

export const highlight = {"theme":"one-dark-pro"}