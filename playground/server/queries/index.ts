import { DocumentNode } from '@apollo/client';
import ProductVariantQuery from './ProductVariantQuery';

enum QueryName {
    ProductVariantQuery = 'ProductVariantQuery'
  }

const Queries : Record<QueryName, DocumentNode> = {
    ProductVariantQuery
}

export {
    Queries,
    QueryName
}