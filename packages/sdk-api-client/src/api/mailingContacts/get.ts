
import {  MailingContact, QueryMailingContactsArgs} from '../../gql/graphql';
import { Endpoints, OdooIntegrationContext } from '../../types';
import { CustomQuery } from '@vue-storefront/middleware';
import query from './mailingContactsQuery';

export const getMailingContacts: Endpoints['getMailingContacts'] = async (context: OdooIntegrationContext, params?: QueryMailingContactsArgs, customQuery?: CustomQuery) => {

  const { getMailingContacts } = context.extendQuery(
    customQuery, { getMailingContacts: { query, variables: params } 
  })

  const response = await context.client.query<{ mailingContacts: { mailingContacts: MailingContact[] } }>({
    variables: getMailingContacts.variables,
    query: getMailingContacts.query
  });

  return response;
};
