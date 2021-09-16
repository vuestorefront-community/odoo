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
    totalProducts: 1,
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
    sort: 'name desc'
  }
};
