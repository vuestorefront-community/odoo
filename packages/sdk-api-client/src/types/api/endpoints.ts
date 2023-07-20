import { ApolloQueryResult } from '@apollo/client';
import { BoilerplateIntegrationContext } from '..';
import { Product, QueryProductArgs, QueryProductsArgs } from '../../gql/graphql';
/**
 * Definition of all API-client methods available in {@link https://docs.vuestorefront.io/v2/advanced/context.html#context-api | context}.
 */
export interface Endpoints {

  /**
   * Here you can find an example endpoint definition. Based on this example, you should define how your endpoint will look like.
   * This description will appear in the API extractor, so try to document all endpoints added here.
   */
  getProductTemplate(context: BoilerplateIntegrationContext, variables: QueryProductArgs): Promise<ApolloQueryResult<{ product: Product }>>;
  getProductTemplateList(context: BoilerplateIntegrationContext, variables?: QueryProductsArgs): Promise<ApolloQueryResult<{ products: { products: Product[] } }>>;

}
