import { ApolloQueryResult } from '@apollo/client';
import { OdooIntegrationContext } from '..';
import { Product, Category, QueryProductArgs, QueryProductsArgs, QueryCategoryArgs, QueryCategoriesArgs } from '../../gql/graphql';
import { CustomQuery } from '@vue-storefront/middleware';
/**
 * Definition of all API-client methods available in {@link https://docs.vuestorefront.io/v2/advanced/context.html#context-api | context}.
 */
export interface Endpoints {

  /**
   * Here you can find an example endpoint definition. Based on this example, you should define how your endpoint will look like.
   * This description will appear in the API extractor, so try to document all endpoints added here.
   */
  getProductTemplate(context: OdooIntegrationContext, variables: QueryProductArgs, customQuery?: CustomQuery): Promise<ApolloQueryResult<{ product: Product }>>;
  getProductTemplateList(context: OdooIntegrationContext, variables?: QueryProductsArgs, customQuery?: CustomQuery): Promise<ApolloQueryResult<{ products: { products: Product[] } }>>;

  getCategory(context: OdooIntegrationContext, variables?: QueryCategoryArgs, customQuery?: CustomQuery): Promise<ApolloQueryResult<{ category: Category }>>;
  getCategoryList(context: OdooIntegrationContext, variables?: QueryCategoriesArgs, customQuery?: CustomQuery): Promise<ApolloQueryResult<{ categories: { categories: Category[] } }>>;

}
