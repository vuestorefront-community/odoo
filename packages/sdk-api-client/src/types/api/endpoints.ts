import { ApolloQueryResult, FetchResult } from '@apollo/client';
import { OdooIntegrationContext } from '..';
import { Product, Category, QueryProductArgs, QueryCountriesArgs, QueryProductsArgs, QueryCategoryArgs, QueryCategoriesArgs, QueryProductVariantArgs, ProductVariant, Countries,
  MutationCartAddItemArgs,
  Order,
  CartData,
  Country,
  QueryCountryArgs,
 } from '../../gql/graphql';
import { CustomQuery } from '@vue-storefront/middleware';
/**
 * Definition of all API-client methods available in {@link https://docs.vuestorefront.io/v2/advanced/context.html#context-api | context}.
 */
export interface Endpoints {

  /**
   * Here you can find an example endpoint definition. Based on this example, you should define how your endpoint will look like.
   * This description will appear in the API extractor, so try to document all endpoints added here.
   */
  getProductTemplate(context: OdooIntegrationContext, params: QueryProductArgs, customQuery?: CustomQuery<'getProductTemplate'>): Promise<ApolloQueryResult<{ product: Product }>>;
  getProductTemplateList(context: OdooIntegrationContext, params?: QueryProductsArgs, customQuery?: CustomQuery<'getProductTemplateList'>): Promise<ApolloQueryResult<{ products: { products: Product[] } }>>;
  getProductVariant(context: OdooIntegrationContext, params: QueryProductVariantArgs, customQuery?: CustomQuery<'getProductVariant'>): Promise<ApolloQueryResult<{ product: ProductVariant }>>;

  getCategory(context: OdooIntegrationContext, params: QueryCategoryArgs, customQuery?: CustomQuery<'getCategory'>): Promise<ApolloQueryResult<{ category: Category }>>;
  getCategoryList(context: OdooIntegrationContext, params?: QueryCategoriesArgs, customQuery?: CustomQuery<'getCategoryList'>): Promise<ApolloQueryResult<{ categories: { categories: Category[] } }>>;
  
  cartAdd(context: OdooIntegrationContext, params: MutationCartAddItemArgs, customQuery?: CustomQuery<'cartAdd'>): Promise<FetchResult<{ cartAddItem: { order: Order } }>>;
  cartLoad(context: OdooIntegrationContext, customQuery?: CustomQuery<'cartLoad'>): Promise<ApolloQueryResult<{ cart: CartData }>>;

  getCountry(context: OdooIntegrationContext, params?: QueryCountryArgs, customQuery?: CustomQuery<'getCountry'>): Promise<ApolloQueryResult<{ country:  Country  }>>;
  getCountryList(context: OdooIntegrationContext, params?: QueryCountriesArgs, customQuery?: CustomQuery<'getCountryList'>): Promise<ApolloQueryResult<{ countries: { countries: Country[] } }>>;
  
}
