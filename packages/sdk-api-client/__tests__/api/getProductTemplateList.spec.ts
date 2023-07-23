import { getProductTemplateList } from '../../src/api';
import { contextMock } from '../../__mocks__/context.mock';

const obj = { getProductTemplateList }

describe('[ODOO-API] getProductTemplateList', () => {

  it('calls endpoint with no parameters and receive 4 items', async () => {
    const response = await getProductTemplateList(contextMock, { });

    expect(response.data.products).toHaveLength(4);
    expect(response.data.products[0]).toHaveProperty('price');
  });
  
  it('calls endpoint with customQuery', async () => {
    const response = await getProductTemplateList(contextMock, { },  { getProductTemplateList: 'customQueryFullProductTemplateListWithoutPrice'});

    expect(response.data.products).toHaveLength(4);
    expect(response.data.products[0]).not.toHaveProperty('price');
  });

  // it('calls endpoint with parameters', async () => {
  //   const spy = jest.spyOn(obj, 'getProductTemplate')

  //   await obj.getProductTemplateList(contextMock, { id: 2, barcode: '##', slug: '/product' });
    
  //   expect(spy).toBeCalledTimes(1)
  //   expect(spy).toBeCalledWith(contextMock, { id: 2, barcode: '##', slug: '/product' })
  // });

  

});
