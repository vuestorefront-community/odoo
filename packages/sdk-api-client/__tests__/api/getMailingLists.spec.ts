import { getMailingLists } from '../../src/api';
import { contextMock } from '../../__mocks__/context.mock';

const obj = { getMailingLists }

describe('[ODOO-API] getMailingLists', () => {

  it('calls endpoint', async () => {
    const response = await getMailingLists(contextMock, {  });
    
    expect(response.data.mailingLists.mailingLists).toHaveLength(2);
    expect(response.data.mailingLists.mailingLists[0]).toBeDefined()
  });
  
  // it('calls endpoint with parameters', async () => {
  //   const spy = jest.spyOn(obj, 'getMailingLists')

  //   await obj.getMailingLists(contextMock, { currentPage: 1, filter: { id: 2 }, pageSize: 12, search: '' });
    
  //   expect(spy).toBeCalledTimes(1)
  //   expect(spy).toBeCalledWith(contextMock, { currentPage: 1, filter: { id: 2 }, pageSize: 12, search: '' })
  // });

  
});
