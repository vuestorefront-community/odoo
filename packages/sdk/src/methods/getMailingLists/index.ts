import { ApolloQueryResult } from '@apollo/client';
import { MailingList, QueryMailingListsArgs } from '@erpgap/odoo-sdk-api-client';
import { client } from '../../client';
import { CustomQuery } from '@vue-storefront/middleware';
/**
 * Get a list of mailings.
 * 
 * @param {QueryMailingListsArgs} params
 * @returns { mailingLists: { mailingLists: MailingList[]  } }
 * @example
 * ```ts
 *  await sdk.odoo.getMailingLists({ pageSize: 12, filter: { id: 1 } }))
 * 
 *  await sdk.odoo.getMailingLists({ pageSize: 12, filter: { id: 1 } }, { getMailingLists: 'customQueryName' }}))
 * ```
 */
export async function getMailingLists(params?: QueryMailingListsArgs, customQuery?: CustomQuery<'getMailingLists'>) {
  const { data } = await client.post<ApolloQueryResult<{ mailingLists: { mailingLists: MailingList[] } }>>('getMailingLists', [params, customQuery]);
  
  return data
}
