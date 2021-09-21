/* eslint-disable camelcase */
import useCategory from '../../../src/composables/useCategory';
import { mockedCategories } from './__mocks__/mockedCategories';
const { categorySearch } = useCategory('') as any;

const context = {
  $odoo: {
    api: {
      getCategory: jest.fn(() => ({
        categories: { categories: mockedCategories }
      }))
    }
  }
};

jest.mock('@vue-storefront/core', () => ({
  useCategoryFactory: (params) => () => params
}));

describe('useCategory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('search categories', async () => {
    const categories = await categorySearch(context, {});

    expect(categories).toStrictEqual(mockedCategories);
  });
});
