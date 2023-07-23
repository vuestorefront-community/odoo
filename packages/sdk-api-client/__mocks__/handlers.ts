// src/mocks/handlers.js
import { graphql } from 'msw'
import product from './data/productTemplate.json'
import customQueryFullProductTemplate from './data/customQueryFullProductTemplate.json'
import customQueryProductTemplateWithoutPrice from './data/customQueryProductTemplateWithoutPrice.json'
import productTemplateList from './data/productTemplateList.json'
export const handlers = [
  graphql.query('TemplateProduct', (req, res, ctx) => {
    return res(
      ctx.data({
        product: product,
      }),
    )
  }),
  graphql.query('customQueryFullProductTemplate', (req, res, ctx) => {
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
  graphql.query('customQueryProductTemplateWithoutPrice', (req, res, ctx) => {
      return res(
       ctx.data({ 
        products: customQueryProductTemplateWithoutPrice
      }),
    )
  }),
]