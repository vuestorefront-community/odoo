import { AddressFilterInput, AddAddressInput } from '../../gql/graphql';
import { Endpoints, OdooIntegrationContext } from '../../types';
import { CustomQuery } from '@vue-storefront/middleware';

import query from './addressQuery';

export const getAddress: Endpoints['getAddress'] = async (context: OdooIntegrationContext, params: AddressFilterInput, customQuery?: CustomQuery) => {
  
  const { getAddress } = context.extendQuery(
    customQuery, { getAddress: { query, variables: params } }
  );

  const response = await context.client.query<{ addresses: { addresses: AddAddressInput[] } }>({
    variables: getAddress.variables,
    query: getAddress.query
  });


  return response;
};
