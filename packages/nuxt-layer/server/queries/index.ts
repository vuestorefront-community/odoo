import { DocumentNode } from '@apollo/client';
import ProductVariantQuery from './ProductVariantQuery';
import LoadUserQuery from './LoadUserQuery';

enum QueryName {
    ProductVariantQuery = 'ProductVariantQuery',
    LoadUserQuery = 'LoadUserQuery'
  }

const Queries : Record<QueryName, DocumentNode> = {
  ProductVariantQuery,
  LoadUserQuery
};

export {
  Queries,
  QueryName
};
