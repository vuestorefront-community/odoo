import { getProductTemplate } from '../../src/api';
import { contextMock } from '../../__mocks__/context.mock';

describe('[Integration ODOO API] getProductTemplateList', () => {

  it('calls endpoint with id 1', async () => {
    const response = await getProductTemplate(contextMock, { id: 1 });

    expect(response.data.product.id).toBe(1);
    expect(response.data.product).not.toContain('attributeValues');
  });
  
  it('calls endpoint with id 2 and customQuery', async () => {
    const response = await getProductTemplate(contextMock, { id: 2 }, { getProductTemplate: 'getFullProduct'});
    
    expect(response.data.product.id).toBe(2);
    expect(response.data.product.attributeValues).toHaveLength(3);
  });

  

});
