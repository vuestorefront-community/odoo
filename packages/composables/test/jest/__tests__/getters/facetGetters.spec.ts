import facetGetters from '../../../../src/composables/getters/facetGetters';
import { emptySearchData, searchData } from '../__mocks__/searchData';
import { attributesFormatedForCategory } from '../__mocks__/productAttributesFormated';
import { mockedProducts } from '../__mocks__/mockedProducts';
it('get grouped facet with empty attributes', () => {
  const grouped = facetGetters.getGrouped(emptySearchData);

  expect(grouped).toStrictEqual([]);
});
it('get grouped facet with attributes', () => {
  const grouped = facetGetters.getGrouped(searchData);

  expect(grouped).toEqual(attributesFormatedForCategory);
});

it('get sort options', () => {
  const sort = facetGetters.getSortOptions(searchData);

  expect(sort.options).toHaveLength(4);
  expect(sort.selected).toBe('name desc');
});

it('get category tree with empty categories ', () => {
  const categoryTree = facetGetters.getCategoryTree(emptySearchData);

  expect(categoryTree).toEqual({id: 11, isCurrent: false, items: [], label: 'Women', slug: 'women-11'});
});
it('get category tree ', () => {
  const categoryTree = facetGetters.getCategoryTree(searchData);

  expect(categoryTree).toEqual({id: 11, isCurrent: false, items: [], label: 'Women', slug: 'women-11'});
});

it('get empty products', () => {
  const products = facetGetters.getProducts(emptySearchData);

  expect(products).toEqual([]);
});
it('get products', () => {
  const products = facetGetters.getProducts(searchData);

  expect(products).toEqual(searchData.data.products);
});
it('get default pagination', () => {
  const pagination = facetGetters.getPagination(emptySearchData);

  expect(pagination.totalPages).toEqual(1);
  expect(pagination.totalItems).toEqual(1);
  expect(pagination.itemsPerPage).toEqual(12);
});
it('get custom pagination', () => {
  const pagination = facetGetters.getPagination(searchData);

  expect(pagination.totalPages).toEqual(26);
  expect(pagination.totalItems).toEqual(129);
  expect(pagination.itemsPerPage).toEqual(5);
});

it('get breacrumb for product page', () => {
  const breacrumb : any = facetGetters.getBreadcrumbsByProduct(mockedProducts[0]);

  expect(breacrumb).toHaveLength(2);
  expect(breacrumb[1].text).toBe('Women');
});
it('get breacrumb for category page', () => {
  const breacrumb = facetGetters.getBreadcrumbs(searchData);

  expect(breacrumb).toHaveLength(3);
  expect(breacrumb[2].text).toBe('jackets');
});
