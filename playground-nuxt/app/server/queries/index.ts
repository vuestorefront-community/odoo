import { DocumentNode } from '@apollo/client';
import ProductVariantQuery from './ProductVariantQuery';
import LoadUserQuery from './LoadUserQuery';
import GetCategories from './GetCategories';
import GetProductTemplateList from './GetProductTemplateList';

enum QueryName {
    ProductVariantQuery = 'ProductVariantQuery',
    LoadUserQuery = 'LoadUserQuery',
    GetCategories = 'GetCategories',
    GetProductTemplateList = 'GetProductTemplateList'
  }

const Queries : Record<QueryName, DocumentNode> = {
  ProductVariantQuery,
  LoadUserQuery,
  GetCategories,
  GetProductTemplateList
};

export {
  Queries,
  QueryName
};
