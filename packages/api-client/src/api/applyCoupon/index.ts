/* eslint-disable @typescript-eslint/no-unused-vars */
import gql from 'graphql-tag';
import { Context, CustomQuery } from '@vue-storefront/core';
import mutation from './applyCouponMutation';
import ApolloClient from 'apollo-client';
import { GraphQlApplyCouponParams, ApplyCouponResult } from '../../index';
import { FetchResult } from 'apollo-link/lib/types';

export default async function applyCoupon(
  context: Context,
  applyCouponParams: GraphQlApplyCouponParams,
  customQuery?: CustomQuery
): Promise<FetchResult<ApplyCouponResult>> {
  const apolloClient = context.client.apollo as ApolloClient<any>;

  const { applyCoupon } = context.extendQuery(
    customQuery, { applyCoupon: { mutation, variables: applyCouponParams } }
  );

  const response = await apolloClient.mutate({
    mutation: gql`${applyCoupon.mutation}`,
    variables: applyCoupon.variables
  });

  return response;
}
