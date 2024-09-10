import { _AsyncData } from 'nuxt/dist/app/composables/asyncData';
import { H3Error } from 'h3';
import { Partner, ProductVariant } from '~/graphql';

export type SalesPersonResponse = _AsyncData<
  {
    productVariant: ProductVariant
  },
  H3Error
>;

export type LoginMutationResponse = {
    login: {
        partner: Partner
    }
}
