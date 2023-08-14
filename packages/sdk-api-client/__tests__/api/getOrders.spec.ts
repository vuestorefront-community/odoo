import { getOrders } from '../../src/api';
import { contextMock } from '../../__mocks__/context.mock';
import { OrderStage } from '../../src';

const obj = { getOrders }

describe('[ODOO-API] getOrders', () => {

  it('calls endpoint', async () => {
    const response = await getOrders(contextMock, {  });

    expect(response.data.orders.orders).toHaveLength(3);
    expect(response.data.orders.orders[0]).toBeDefined()
  });
  
   it('calls endpoint with parameters', async () => {
     const spy = jest.spyOn(obj, 'getOrders')
     console.log('asdsdsads')

     await obj.getOrders(contextMock, { currentPage: 1, filter: { stages: [OrderStage.SalesOrder] }, pageSize: 12 });
    
     expect(spy).toBeCalledTimes(1)
     expect(spy).toBeCalledWith(contextMock, { currentPage: 1, filter: { stages: [OrderStage.SalesOrder] }, pageSize: 12 })
   });

  
});
