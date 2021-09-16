import facetGetters from '../../../../src/composables/getters/facetGetters';
import { emptySearchData, searchData } from '../__mocks__/searchData';

it('get attributes grouped for empty attributes', () => {
  const methodId = facetGetters.getGrouped(emptySearchData);

  expect(methodId).toStrictEqual([]);
});
it('get attributes grouped for empty attributes', () => {
  const methodId = facetGetters.getGrouped(searchData);

  expect(methodId).toStrictEqual([]);
});
