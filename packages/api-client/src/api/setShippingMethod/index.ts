/* eslint-disable @typescript-eslint/no-unused-vars */
import gql from 'graphql-tag';
import { Context, CustomQuery } from '@vue-storefront/core';
import mutation from './setShippingMethodMutation';
import ApolloClient from 'apollo-client';
import { GraphQlSetShippingMethodParams, GraphQlSetShippingMethodResponse } from '../../index';
import { FetchResult } from 'apollo-link/lib/types';

export default async function setShippingMethod(
  context: Context,
  params: GraphQlSetShippingMethodParams,
  customQuery?: CustomQuery
): Promise<FetchResult<GraphQlSetShippingMethodResponse>> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const { setShippingMethod } = context.extendQuery(
    customQuery, { setShippingMethod: { mutation, variables: params } }
  );

  const response = await apolloClient.mutate({
    mutation: gql`${setShippingMethod.mutation}`,
    variables: setShippingMethod.variables,
    errorPolicy: 'all'
  });

  return response;
}
