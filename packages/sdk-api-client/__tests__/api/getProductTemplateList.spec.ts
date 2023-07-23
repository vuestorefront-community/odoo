import { getProductTemplateList } from '../../src/api';
import { contextMock } from '../../__mocks__/context.mock';

const obj = { getProductTemplateList }

describe('[ODOO-API] getProductTemplateList', () => {

  it('calls endpoint with no parameters and receive 4 items', async () => {
    const response = await getProductTemplateList(contextMock, { });

    expect(response.data.products.products).toHaveLength(4);
    expect(response.data.products.products[0]).toHaveProperty('price');
  });
  
  it('calls endpoint with customQuery', async () => {
    const response = await getProductTemplateList(contextMock, { },  { getProductTemplateList: 'customQueryFullProductTemplateListWithoutPrice'});

    expect(response.data.products.products).toHaveLength(4);
    expect(response.data.products.products[0]).not.toHaveProperty('price');
  });

  it('calls endpoint with parameters', async () => {
    const spy = jest.spyOn(obj, 'getProductTemplateList')

    await obj.getProductTemplateList(contextMock, { currentPage: 1, filter: { categoryId: [3] }, pageSize: 12, search: '' });
    
    expect(spy).toBeCalledTimes(1)
    expect(spy).toBeCalledWith(contextMock, { currentPage: 1, filter: { categoryId: [3] }, pageSize: 12, search: '' })
  });

  

});
