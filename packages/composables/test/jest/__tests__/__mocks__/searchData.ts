/* eslint-disable camelcase */
import { SearchData } from '../../../../src/composables/types';
import { mockedCategories } from './/mockedCategories';
export const emptySearchData: SearchData = {
  data: {
    facets: {},
    totalProducts: 1,
    perPageOptions: 1,
    itemsPerPage: 1,
    attributes: [],
    categories: [],
    products: []
  },
  input: {}
};

export const searchData: SearchData = {
  data: {
    facets: {},
    totalProducts: 129,
    perPageOptions: 1,
    itemsPerPage: 1,
    attributes: [{id: 9, name: '5', displayType: 'select', htmlColor: null, search: '4-9', attribute: {id: 4, name: 'Size'}}, {id: 10, name: '6', displayType: 'select', htmlColor: null, search: '4-10', attribute: {id: 4, name: 'Size'}}, {id: 11, name: '7', displayType: 'select', htmlColor: null, search: '4-11', attribute: {id: 4, name: 'Size'}}, {id: 12, name: '8', displayType: 'select', htmlColor: null, search: '4-12', attribute: {id: 4, name: 'Size'}}, {id: 13, name: '9', displayType: 'select', htmlColor: null, search: '4-13', attribute: {id: 4, name: 'Size'}}, {id: 14, name: '10', displayType: 'select', htmlColor: null, search: '4-14', attribute: {id: 4, name: 'Size'}}, {id: 17, name: '13', displayType: 'select', htmlColor: null, search: '4-17', attribute: {id: 4, name: 'Size'}}, {id: 18, name: '34', displayType: 'select', htmlColor: null, search: '4-18', attribute: {id: 4, name: 'Size'}}, {id: 19, name: '35', displayType: 'select', htmlColor: null, search: '4-19', attribute: {id: 4, name: 'Size'}}, {id: 20, name: '36', displayType: 'select', htmlColor: null, search: '4-20', attribute: {id: 4, name: 'Size'}}, {id: 21, name: '37', displayType: 'select', htmlColor: null, search: '4-21', attribute: {id: 4, name: 'Size'}}, {id: 22, name: '38', displayType: 'select', htmlColor: null, search: '4-22', attribute: {id: 4, name: 'Size'}}, {id: 24, name: '40', displayType: 'select', htmlColor: null, search: '4-24', attribute: {id: 4, name: 'Size'}}, {id: 25, name: '41', displayType: 'select', htmlColor: null, search: '4-25', attribute: {id: 4, name: 'Size'}}, {id: 26, name: '42', displayType: 'select', htmlColor: null, search: '4-26', attribute: {id: 4, name: 'Size'}}, {id: 27, name: '43', displayType: 'select', htmlColor: null, search: '4-27', attribute: {id: 4, name: 'Size'}}, {id: 29, name: '45', displayType: 'select', htmlColor: null, search: '4-29', attribute: {id: 4, name: 'Size'}}, {id: 30, name: '46', displayType: 'select', htmlColor: null, search: '4-30', attribute: {id: 4, name: 'Size'}}, {id: 31, name: '47', displayType: 'select', htmlColor: null, search: '4-31', attribute: {id: 4, name: 'Size'}}, {id: 32, name: '48', displayType: 'select', htmlColor: null, search: '4-32', attribute: {id: 4, name: 'Size'}}, {id: 33, name: '49', displayType: 'select', htmlColor: null, search: '4-33', attribute: {id: 4, name: 'Size'}}, {id: 34, name: '50', displayType: 'select', htmlColor: null, search: '4-34', attribute: {id: 4, name: 'Size'}}, {id: 35, name: '51', displayType: 'select', htmlColor: null, search: '4-35', attribute: {id: 4, name: 'Size'}}, {id: 36, name: '52', displayType: 'select', htmlColor: null, search: '4-36', attribute: {id: 4, name: 'Size'}}, {id: 37, name: 'Cotton', displayType: 'radio', htmlColor: null, search: '5-37', attribute: {id: 5, name: 'Material'}}, {id: 38, name: 'Leather', displayType: 'radio', htmlColor: null, search: '5-38', attribute: {id: 5, name: 'Material'}}, {id: 40, name: 'Black', displayType: 'color', htmlColor: '#000000', search: '6-40', attribute: {id: 6, name: 'Color'}}, {id: 41, name: 'Grey', displayType: 'color', htmlColor: '#bfbfbf', search: '6-41', attribute: {id: 6, name: 'Color'}}, {id: 43, name: 'Red', displayType: 'color', htmlColor: '#f40000', search: '6-43', attribute: {id: 6, name: 'Color'}}, {id: 45, name: 'Blue', displayType: 'color', htmlColor: '#0c7af7', search: '6-45', attribute: {id: 6, name: 'Color'}}, {id: 46, name: 'Green', displayType: 'color', htmlColor: '#14c00b', search: '6-46', attribute: {id: 6, name: 'Color'}}, {id: 47, name: 'Brown', displayType: 'color', htmlColor: '#964B00', search: '6-47', attribute: {id: 6, name: 'Color'}}, {id: 49, name: 'Beige', displayType: 'color', htmlColor: '#faecdc', search: '6-49', attribute: {id: 6, name: 'Color'}}],
    categories: [mockedCategories[10]],
    products: []
  },
  input: {
    params: {
      slug_1: 'women-11',
      slug_2: 'women-clothing-jackets-18',
      slug_3: '18',
      slug_4: '__vue_devtool_undefined__',
      slug_5: '__vue_devtool_undefined__'
    },
    sort: 'name desc',
    pageSize: 5,
    currentRootCategory: {
      id: 11,
      name: 'Women',
      slug: 'women-11',
      childs: [
        {
          id: 13,
          name: 'Clothing',
          slug: 'women-clothing-13',
          childs: [
            {
              id: 17,
              name: 'All',
              slug: 'women-clothing-all-17',
              __typename: 'Category'
            },
            {
              id: 18,
              name: 'Jackets',
              slug: 'women-clothing-jackets-18',
              __typename: 'Category'
            },
            {
              id: 19,
              name: 'Blazer',
              slug: 'women-clothing-blazer-19',
              __typename: 'Category'
            },
            {
              id: 20,
              name: 'Tops',
              slug: 'women-clothing-tops-20',
              __typename: 'Category'
            },
            {
              id: 21,
              name: 'Shirts',
              slug: 'women-clothing-shirts-21',
              __typename: 'Category'
            },
            {
              id: 22,
              name: 'T-shirts',
              slug: 'women-clothing-t-shirts-22',
              __typename: 'Category'
            },
            {
              id: 23,
              name: 'Jeans',
              slug: 'women-clothing-jeans-23',
              __typename: 'Category'
            },
            {
              id: 24,
              name: 'Trouser',
              slug: 'women-clothing-trouser-24',
              __typename: 'Category'
            },
            {
              id: 25,
              name: 'Skirts',
              slug: 'women-clothing-skirts-25',
              __typename: 'Category'
            },
            {
              id: 26,
              name: 'Dresses',
              slug: 'women-clothing-dresses-26',
              __typename: 'Category'
            },
            {
              id: 27,
              name: 'Swimwear',
              slug: 'women-clothing-swimwear-27',
              __typename: 'Category'
            }
          ],
          __typename: 'Category'
        },
        {
          id: 14,
          name: 'Shoes',
          slug: 'women-shoes-14',
          childs: [
            {
              id: 28,
              name: 'All',
              slug: 'women-shoes-all-28',
              __typename: 'Category'
            },
            {
              id: 29,
              name: 'Sneakers',
              slug: 'women-shoes-sneakers-29',
              __typename: 'Category'
            },
            {
              id: 30,
              name: 'Boots',
              slug: 'women-shoes-boots-30',
              __typename: 'Category'
            },
            {
              id: 31,
              name: 'Ankle boots',
              slug: 'women-shoes-ankle-boots-31',
              __typename: 'Category'
            },
            {
              id: 32,
              name: 'Pumps',
              slug: 'women-shoes-pumps-32',
              __typename: 'Category'
            },
            {
              id: 33,
              name: 'Ballerinas',
              slug: 'women-shoes-ballerinas-33',
              __typename: 'Category'
            },
            {
              id: 34,
              name: 'Lace-up shoes',
              slug: 'women-shoes-lace-up-shoes-34',
              __typename: 'Category'
            },
            {
              id: 35,
              name: 'Loafers',
              slug: 'women-shoes-loafers-35',
              __typename: 'Category'
            },
            {
              id: 36,
              name: 'Sandals',
              slug: 'women-shoes-sandals-36',
              __typename: 'Category'
            },
            {
              id: 37,
              name: 'Winterboots',
              slug: 'women-shoes-winterboots-37',
              __typename: 'Category'
            }
          ],
          __typename: 'Category'
        },
        {
          id: 15,
          name: 'bags',
          slug: 'women-bags-15',
          childs: [
            {
              id: 38,
              name: 'All',
              slug: 'women-bags-all-38',
              __typename: 'Category'
            },
            {
              id: 39,
              name: 'Clutches',
              slug: 'women-bags-clutches-39',
              __typename: 'Category'
            },
            {
              id: 40,
              name: 'Shoulder Bags',
              slug: 'women-bags-shoulder-bags-40',
              __typename: 'Category'
            },
            {
              id: 41,
              name: 'Shopper',
              slug: 'women-bags-shopper-41',
              __typename: 'Category'
            },
            {
              id: 42,
              name: 'Handbag',
              slug: 'women-bags-handbag-42',
              __typename: 'Category'
            },
            {
              id: 43,
              name: 'Wallets',
              slug: 'women-bags-wallets-43',
              __typename: 'Category'
            },
            {
              id: 44,
              name: 'Bucketbag/packbag',
              slug: 'women-bags-bucketbag-packbag-44',
              __typename: 'Category'
            }
          ],
          __typename: 'Category'
        },
        {
          id: 16,
          name: 'Looks',
          slug: 'women-looks-16',
          childs: [
            {
              id: 45,
              name: 'All',
              slug: 'women-looks-all-45',
              __typename: 'Category'
            }
          ],
          __typename: 'Category'
        }
      ],
      __typename: 'Category'
    }
  }
};
