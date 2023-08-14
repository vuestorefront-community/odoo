import { ApolloQueryResult } from '@apollo/client';
import { MailingContact, QueryMailingContactsArgs } from '@erpgap/odoo-sdk-api-client';
import { client } from '../../client';
import { CustomQuery } from '@vue-storefront/middleware';

/**
 * Get a list of mailingContacts.
 * 
 * @param {QueryMailingContactsArgs} params
 * @returns { mailingContacts: {mailingContacts: MailingContact[] }}
 * @example
 * ```ts
 *  await sdk.odoo.getMailingContacts({ email: 'admin@yourcompany.example.com'})
 * 
 *  await sdk.odoo.getMailingContacts({ email: 'admin@yourcompany.example.com'}, {getMailingContacts: 'custom'})
 * ```
 */
export async function getMailingContacts(params?: QueryMailingContactsArgs, customQuery?: CustomQuery<'getMailingContacts'>) {
  const { data } = await client.post<ApolloQueryResult<{ mailingContacts: MailingContact[] }>>('getMailingContacts', [params, customQuery]);
  
  return data
}
