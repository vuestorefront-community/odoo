import { ApolloQueryResult } from '@apollo/client';
import { Product, QueryProductsArgs } from '@vue-storefront/integration-odoo-api';
import { client } from '../../client';

/**
 * Get a list of products template.
 * 
 * @remarks
 * In this section, we have been adding detailed information such as:
 * * what API middleware endpoint this method is calling,
 * * Public method ( any user can see)
 * * simply everything what helps with understanding how it works.
 * 
 * @param QueryProductsArgs
 * Just like our API methods, our SDK connector methods accept a single props parameter which carries relevant sub-properties. Therefore, there isn’t much to be described within that TSDoc section.
 * 
 * @returns
 * Human-friendly information what the SDK methods returns.
 * 
 * @example
 * A short code snippet showing how to use the method. Usually we have more than one @example. We should strive for adding as many examples as possible here, with multiple param configurations.
 */
export async function getProductTemplateList(props?: QueryProductsArgs) {
  const { data } = await client.post<ApolloQueryResult<{ products: { products: Product[] } }>>('getProductTemplateList', props);
  
  return data
}
