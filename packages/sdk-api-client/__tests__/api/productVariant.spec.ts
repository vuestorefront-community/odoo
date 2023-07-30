import { getProductVariant } from '../../src/api';
import { contextMock } from '../../__mocks__/context.mock';

const obj = { getProductVariant }

describe('[ODOO-API] getProductVariant', () => {

  it('calls endpoint with id 1', async () => {
    const response = await getProductVariant(contextMock, { combinationId: [33, 41], productTemplateId: 74 });

    expect(response.data.product.product?.id).toBe(74);
    expect(response.data.product.productTemplateId).toBe(46);
  });
  
  it('calls endpoint with id 2 and customQuery', async () => {
    const response = await getProductVariant(contextMock, { combinationId: [33, 41], productTemplateId: 74 }, { getProductVariant: 'customQueryProductVariant'});
    
    expect(response.data.product.product?.id).toBe(74);
    expect(response.data.product.productTemplateId).not.toBeDefined();
  });

  it('calls endpoint with parameters', async () => {
    const spy = jest.spyOn(obj, 'getProductVariant')

    await obj.getProductVariant(contextMock, { combinationId: [33, 41], productTemplateId: 74 });
    
    expect(spy).toBeCalledTimes(1)
    expect(spy).toBeCalledWith(contextMock, { combinationId: [33, 41], productTemplateId: 74})
  });

  

});
