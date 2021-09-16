import facetGetters from '../../../../src/composables/getters/facetGetters';
import { emptySearchData, searchData } from '../__mocks__/searchData';
import { attributesFormatedForCategory } from '../__mocks__/productAttributesFormated';
import { womenCategoryTree } from '../__mocks__/buildedCategorytree';
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

  expect(categoryTree).toEqual({
    items: [],
    label: '',
    isCurrent: false
  });
});
it('get category tree ', () => {
  const categoryTree = facetGetters.getCategoryTree(searchData);

  expect(categoryTree).toEqual(womenCategoryTree);
});
