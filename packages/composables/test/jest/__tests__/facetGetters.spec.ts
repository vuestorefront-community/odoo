import facetGetters from '../../../src/composables/getters/facetGetters';

test('category tree response any empty', () => {
  const categoryTree = facetGetters.getCategoryTree({ data: null, input: null });

  expect(categoryTree).toStrictEqual([]);
});

test('products tree response any empty', () => {
  const products = facetGetters.getProducts({ data: null, input: null });

  expect(products).toStrictEqual({});
});

test('get correct pagination with custom ppg and two pages', () => {
  const searchData = {
    data: {
      products: new Array(30),
      totalProducts: 30
    },
    input: {
      ppg: 15
    }
  };
  const pagination = facetGetters.getPagination(searchData);

  expect(pagination).toStrictEqual({
    currentPage: 1,
    totalPages: 2,
    totalItems: 30,
    itemsPerPage: 15,
    pageOptions: [5, 10, 15, 20]
  });
});

test('get correct pagination with no ppg ', () => {
  const searchData = {
    data: {
      products: new Array(30),
      totalProducts: 31
    },
    input: {
    }
  };
  const pagination = facetGetters.getPagination(searchData);

  expect(pagination).toStrictEqual({
    currentPage: 1,
    totalPages: 4,
    totalItems: 31,
    itemsPerPage: 10,
    pageOptions: [5, 10, 15, 20]
  });
});
