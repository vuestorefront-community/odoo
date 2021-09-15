import categoryGetters from '../../../../src/composables/getters/categoryGetters';
import { mockedCategories } from '../__mocks__/mockedCategories';
import { menCategoryTreeFormated } from '../__mocks__/menCategoryTreeFormated';
it('get category tree without childs', () => {
  const categoryTree = categoryGetters.getTree(mockedCategories[0]);

  expect(categoryTree).toStrictEqual({
    id: 1,
    isCurrent: false,
    items: [],
    label: 'Components',
    slug: 'components-1'
  });
});
it('get category tree with childs', () => {
  const menCategory = mockedCategories[11];

  const categoryTree = categoryGetters.getTree(menCategory);

  expect(categoryTree).toStrictEqual(menCategoryTreeFormated);
});
