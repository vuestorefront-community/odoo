import { ApolloQueryResult } from '@apollo/client';
import { OdooIntegrationContext } from '..';
import { Product, Category, QueryProductArgs, QueryProductsArgs, QueryCategoryArgs, QueryCategoriesArgs, QueryProductVariantArgs, ProductVariant } from '../../gql/graphql';
import { CustomQuery } from '@vue-storefront/middleware';
/**
 * Definition of all API-client methods available in {@link https://docs.vuestorefront.io/v2/advanced/context.html#context-api | context}.
 */
export interface Endpoints {

  /**
   * Here you can find an example endpoint definition. Based on this example, you should define how your endpoint will look like.
   * This description will appear in the API extractor, so try to document all endpoints added here.
   */
  getProductTemplate(context: OdooIntegrationContext, variables: QueryProductArgs, customQuery?: CustomQuery<'getProductTemplate'>): Promise<ApolloQueryResult<{ product: Product }>>;
  getProductTemplateList(context: OdooIntegrationContext, variables?: QueryProductsArgs, customQuery?: CustomQuery<'getProductTemplateList'>): Promise<ApolloQueryResult<{ products: { products: Product[] } }>>;
  getProductVariant(context: OdooIntegrationContext, variables: QueryProductVariantArgs, customQuery?: CustomQuery<'getProductVariant'>): Promise<ApolloQueryResult<{ product: ProductVariant }>>;

  getCategory(context: OdooIntegrationContext, variables: QueryCategoryArgs, customQuery?: CustomQuery<'getCategory'>): Promise<ApolloQueryResult<{ category: Category }>>;
  getCategoryList(context: OdooIntegrationContext, variables?: QueryCategoriesArgs, customQuery?: CustomQuery<'getCategoryList'>): Promise<ApolloQueryResult<{ categories: { categories: Category[] } }>>;

}
