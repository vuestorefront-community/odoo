// src/mocks/handlers.js
import { graphql } from 'msw'
import product from './data/productTemplate.json'
import fullProductTemplateCustomQuery from './data/fullProductTemplateCustomQuery.json'
export const handlers = [
  graphql.query('Product', (req, res, ctx) => {

    return res(
        ctx.data({
          product: product,
        }),
      )
    }),
  graphql.query('FullProduct', (req, res, ctx) => {
    return res(
        ctx.data({
          product: fullProductTemplateCustomQuery,
        }),
      )
    }),
]