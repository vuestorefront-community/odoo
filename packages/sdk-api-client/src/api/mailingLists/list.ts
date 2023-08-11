
import { MailingList, QueryMailingListsArgs } from '../../gql/graphql';
import { Endpoints, OdooIntegrationContext } from '../../types';
import { CustomQuery } from '@vue-storefront/middleware';
import query from './mailingListsQuery';

export const getMailingLists: Endpoints['getMailingLists'] = async (context: OdooIntegrationContext, params?: QueryMailingListsArgs, customQuery?: CustomQuery) => {

  const { getMailingLists } = context.extendQuery(
    customQuery, { getMailingLists: { query, variables: params } 
  })

  const response = await context.client.query<{ mailingLists: { mailingLists: MailingList[] } }>({
    variables: getMailingLists.variables,
    query: getMailingLists.query
  });

  return response;
};
