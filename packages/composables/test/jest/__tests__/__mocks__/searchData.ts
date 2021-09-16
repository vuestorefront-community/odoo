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
    attributes: [
      {
        id: 2,
        name: 'Color',
        displayType: 'color',
        values: [
          {
            id: 3,
            name: 'White',
            htmlColor: '#FFFFFF',
            search: '2-3',
            attributeId: 2
          },
          {
            id: 4,
            name: 'Black',
            htmlColor: '#000000',
            search: '2-4',
            attributeId: 2
          },
          {
            id: 51,
            name: 'Blue',
            htmlColor: '#1E90FF',
            search: '2-51',
            attributeId: 2
          }
        ]
      },
      {
        id: 4,
        name: 'Size',
        displayType: 'select',
        values: [
          {
            id: 8,
            name: 'One Size',
            htmlColor: null,
            search: '4-8',
            attributeId: 4
          },
          {
            id: 9,
            name: '5',
            htmlColor: null,
            search: '4-9',
            attributeId: 4
          },
          {
            id: 10,
            name: '6',
            htmlColor: null,
            search: '4-10',
            attributeId: 4
          },
          {
            id: 11,
            name: '7',
            htmlColor: null,
            search: '4-11',
            attributeId: 4
          },
          {
            id: 12,
            name: '8',
            htmlColor: null,
            search: '4-12',
            attributeId: 4
          },
          {
            id: 13,
            name: '9',
            htmlColor: null,
            search: '4-13',
            attributeId: 4
          },
          {
            id: 14,
            name: '10',
            htmlColor: null,
            search: '4-14',
            attributeId: 4
          },
          {
            id: 15,
            name: '11',
            htmlColor: null,
            search: '4-15',
            attributeId: 4
          },
          {
            id: 16,
            name: '12',
            htmlColor: null,
            search: '4-16',
            attributeId: 4
          },
          {
            id: 17,
            name: '13',
            htmlColor: null,
            search: '4-17',
            attributeId: 4
          },
          {
            id: 18,
            name: '34',
            htmlColor: null,
            search: '4-18',
            attributeId: 4
          },
          {
            id: 19,
            name: '35',
            htmlColor: null,
            search: '4-19',
            attributeId: 4
          },
          {
            id: 20,
            name: '36',
            htmlColor: null,
            search: '4-20',
            attributeId: 4
          },
          {
            id: 21,
            name: '37',
            htmlColor: null,
            search: '4-21',
            attributeId: 4
          },
          {
            id: 22,
            name: '38',
            htmlColor: null,
            search: '4-22',
            attributeId: 4
          },
          {
            id: 23,
            name: '39',
            htmlColor: null,
            search: '4-23',
            attributeId: 4
          },
          {
            id: 24,
            name: '40',
            htmlColor: null,
            search: '4-24',
            attributeId: 4
          },
          {
            id: 25,
            name: '41',
            htmlColor: null,
            search: '4-25',
            attributeId: 4
          },
          {
            id: 26,
            name: '42',
            htmlColor: null,
            search: '4-26',
            attributeId: 4
          },
          {
            id: 27,
            name: '43',
            htmlColor: null,
            search: '4-27',
            attributeId: 4
          },
          {
            id: 28,
            name: '44',
            htmlColor: null,
            search: '4-28',
            attributeId: 4
          },
          {
            id: 29,
            name: '45',
            htmlColor: null,
            search: '4-29',
            attributeId: 4
          },
          {
            id: 30,
            name: '46',
            htmlColor: null,
            search: '4-30',
            attributeId: 4
          },
          {
            id: 31,
            name: '47',
            htmlColor: null,
            search: '4-31',
            attributeId: 4
          },
          {
            id: 32,
            name: '48',
            htmlColor: null,
            search: '4-32',
            attributeId: 4
          },
          {
            id: 33,
            name: '49',
            htmlColor: null,
            search: '4-33',
            attributeId: 4
          },
          {
            id: 34,
            name: '50',
            htmlColor: null,
            search: '4-34',
            attributeId: 4
          },
          {
            id: 35,
            name: '51',
            htmlColor: null,
            search: '4-35',
            attributeId: 4
          },
          {
            id: 36,
            name: '52',
            htmlColor: null,
            search: '4-36',
            attributeId: 4
          }
        ]
      },
      {
        id: 5,
        name: 'Material',
        displayType: 'radio',
        values: [
          {
            id: 37,
            name: 'Cotton',
            htmlColor: null,
            search: '5-37',
            attributeId: 5
          }
        ]
      }
    ],
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
