// src/mocks/handlers.js
import { graphql } from 'msw'
import product from './data/productTemplate.json'
import customQueryFullProductTemplate from './data/customQueryFullProductTemplate.json'
import customQueryProductTemplateWithoutPrice from './data/customQueryProductTemplateWithoutPrice.json'
import productTemplateList from './data/productTemplateList.json'

import category from './data/category.json'
import customQueryCategoryWithoutChild from './data/customQueryCategoryWithoutChild.json'

export const handlers = [

  // PRODUCTS
  graphql.query('TemplateProduct', (req, res, ctx) => {
    return res(
      ctx.data({
        product: product,
      }),
    )
  }),
  graphql.query('CustomQueryFullProductTemplate', (req, res, ctx) => {
    return res(
      ctx.data({
        product: customQueryFullProductTemplate,
      }),
    )
  }),
  graphql.query('TemplateProductList', (req, res, ctx) => {
    return res(
      ctx.data({
        products: productTemplateList
      }),
    )
  }),
  graphql.query('CustomQueryProductTemplateWithoutPrice', (req, res, ctx) => {
      return res(
       ctx.data({ 
        products: customQueryProductTemplateWithoutPrice
      }),
    )
  }),

  // CATEGORIES
  graphql.query('Category', (req, res, ctx) => {
      return res(
       ctx.data({ 
        category: category
      }),
    )
  }),
  graphql.query('CustomQueryCategoryWithoutChild', (req, res, ctx) => {
      return res(
       ctx.data({ 
        category: customQueryCategoryWithoutChild
      }),
    )
  }),
]