import { getCategory } from '../../src/api';
import { contextMock } from '../../__mocks__/context.mock';

const obj = { getCategory }

describe('[ODOO-API] getCategory', () => {

  it('calls endpoint with id 1', async () => {
    const response = await getCategory(contextMock, { id: 1 });

    expect(response.data.category.id).toBe(1);
    expect(response.data.category.name).toBe("Desks");
    expect(response.data.category.childs).toBeDefined()

  });
  
  it('calls endpoint with id 2 and customQuery', async () => {
    const response = await getCategory(contextMock, { id: 2 }, { getCategory: 'customQueryCategoryWithoutChild'});
    
    expect(response.data.category).not.toContain('childs');
    expect(response.data.category.childs).not.toBeDefined();
  });

  // it('calls endpoint with parameters', async () => {
  //   const spy = jest.spyOn(obj, 'getProductTemplate')

  //   await obj.getCategory(contextMock, { id: 2, barcode: '##', slug: '/product' });
    
  //   expect(spy).toBeCalledTimes(1)
  //   expect(spy).toBeCalledWith(contextMock, { id: 2, barcode: '##', slug: '/product' })
  // });

  

});
