import { getProductTemplate } from '../../src/api';
import { contextMock } from '../../__mocks__/context.mock';

const obj = { getProductTemplate }

describe('[ODOO-API] getProductTemplate', () => {

  it('calls endpoint with id 1', async () => {
    const response = await getProductTemplate(contextMock, { id: 1 });

    expect(response.data.product.id).toBe(1);
    expect(response.data.product).not.toContain('attributeValues');
  });
  
  it('calls endpoint with id 2 and customQuery', async () => {
    const response = await getProductTemplate(contextMock, { id: 2 }, { getProductTemplate: 'customQueryFullProductTemplate'});
    
    expect(response.data.product.id).toBe(2);
    expect(response.data.product.attributeValues).toHaveLength(3);
  });

  it('calls endpoint with parameters', async () => {
    const spy = jest.spyOn(obj, 'getProductTemplate')

    await obj.getProductTemplate(contextMock, { id: 2, barcode: '##', slug: '/product' });
    
    expect(spy).toBeCalledTimes(1)
    expect(spy).toBeCalledWith(contextMock, { id: 2, barcode: '##', slug: '/product' })
  });

  

});
