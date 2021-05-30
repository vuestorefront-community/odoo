import facetGetters from '../../../src/getters/facetGetters';

test('category tree response any empty', () => {
  const categoryTree = facetGetters.getCategoryTree({ data: null, input: null });

  expect(categoryTree).toStrictEqual({});
});

test('categoryTree response with formatted categories', () => {
  const searchData = {
    data: {
      categories: [
        { id: 1, name: 'cat', slug: 'cat', items: [] }
      ]
    },
    input: null
  };
  const categoryTree = facetGetters.getCategoryTree(searchData);

  expect(categoryTree).toStrictEqual({
    items: [
      { isCurrent: false, items: [], label: 'cat', slug: 'cat' }
    ]
  });
});

test('products tree response any empty', () => {
  const products = facetGetters.getProducts({ data: null, input: null });

  expect(products).toStrictEqual({});
});

test('get correct pagination', () => {
  const searchData = {
    data: {
      products: [{}, {}, {}]
    },
    input: null
  }
  const pagination = facetGetters.getPagination(searchData)

  expect(pagination).toStrictEqual({
    currentPage: 1,
    totalPages: 1,
    totalItems: 3,
    itemsPerPage: 10,
    pageOptions: []
  });
});