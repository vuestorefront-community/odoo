// src/mocks/handlers.js
import { graphql } from 'msw'
import product from './data/productTemplate.json'
import productTemplateList from './data/productTemplateList.json'
import productVariant from './data/productVariant.json'
import category from './data/category.json'
import categoryList from './data/categoryList.json'
import country from './data/country.json'
import countryList from './data/countryList.json'
import customQueryCategoryWithoutChild from './data/customQueryCategoryWithoutChild.json'
import customQueryCategoryListWithChilds from './data/customQueryCategoryListWithChilds.json'
import customQueryFullProductTemplate from './data/customQueryFullProductTemplate.json'
import customQueryProductTemplateWithoutPrice from './data/customQueryProductTemplateWithoutPrice.json'
import customQueryProductVariant from './data/customQueryProductVariant.json'
import customQueryCountryListWithoutState from './data/customQueryCountryListWithoutState.json'
import mailingLists from './data/mailingLists.json'
import orders from './data/orders.json'

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
        products: { products : productTemplateList }
      }),
    )
  }),
  graphql.query('CustomQueryProductTemplateWithoutPrice', (req, res, ctx) => {
      return res(
       ctx.data({ 
        products: { products: customQueryProductTemplateWithoutPrice }
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
  graphql.query('CategoryList', (req, res, ctx) => {
      return res(
       ctx.data({ 
        categories: { categories: categoryList }
      }),
    )
  }),
  graphql.query('CustomQueryCategoryListWithoutChild', (req, res, ctx) => {
      return res(
       ctx.data({ 
        categories: { categories : customQueryCategoryListWithChilds }
      }),
    )
  }),
  graphql.query('ProductVariant', (req, res, ctx) => {
      return res(
       ctx.data({ 
        product: productVariant 
      }),
    )
  }),
  graphql.query('CustomQueryProductVariant', (req, res, ctx) => {
      return res(
       ctx.data({ 
        product: customQueryProductVariant 
      }),
    )
  }),

  graphql.query('Country', (req, res, ctx) => {
      return res(
      ctx.data({ 
        country: country
      }),
    )
  }),

  graphql.query('CountryList', (req, res, ctx) => {
    return res(
     ctx.data({ 
      countries: { countries: countryList }
    }),
  )
}),

graphql.query('CustomQueryCountryListWithoutState', (req, res, ctx) => {
  return res(
    ctx.data({ 
      countries: { countries : customQueryCountryListWithoutState }
    }),
  )
}),

graphql.query('MailingLists', (req, res, ctx) => {
  return res(
   ctx.data({ 
    mailingLists: { mailingLists: mailingLists }
  }),
)
}),

graphql.query('Orders', (req, res, ctx) => {
  return res(
  ctx.data({ 
    orders: { orders: orders }
  }),
)
}),
]