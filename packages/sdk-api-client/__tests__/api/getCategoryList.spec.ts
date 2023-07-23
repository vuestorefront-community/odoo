import { getCategoryList } from '../../src/api';
import { contextMock } from '../../__mocks__/context.mock';

const obj = { getCategoryList }

describe('[ODOO-API] getCategoryList', () => {

  it('calls endpoint', async () => {
    const response = await getCategoryList(contextMock, {  });

    expect(response.data.categories.categories).toHaveLength(10);
    expect(response.data.categories.categories[0].childs).not.toBeDefined()
  });
  
  it('calls endpoint with customQuery', async () => {
    const response = await getCategoryList(contextMock, { }, { getCategoryList: 'customQueryCategoryListWithoutChild'});
    
    expect(response.data.categories.categories[0].childs).toBeDefined()
  });

  it('calls endpoint with parameters', async () => {
    const spy = jest.spyOn(obj, 'getCategoryList')

    await obj.getCategoryList(contextMock, { currentPage: 1, filter: { id: [3] }, pageSize: 12, search: '' });
    
    expect(spy).toBeCalledTimes(1)
    expect(spy).toBeCalledWith(contextMock, { currentPage: 1, filter: { id: [3] }, pageSize: 12, search: '' })
  });

  

});
