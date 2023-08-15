import { getMailingContacts } from '../../src/api';
import { contextMock } from '../../__mocks__/context.mock';
import { OrderStage } from '../../src';

const obj = { getMailingContacts }

describe('[ODOO-API] getMailingContacts', () => {

  it('calls endpoint', async () => {
    const response = await getMailingContacts(contextMock, {  });

    expect(response.data.mailingContacts.mailingContacts).toHaveLength(1);
    expect(response.data.mailingContacts.mailingContacts[0]).toBeDefined()
  });
  
   it('calls endpoint with parameters', async () => {
     const spy = jest.spyOn(obj, 'getMailingContacts')
     
     await obj.getMailingContacts(contextMock, { currentPage: 1, filter: { id: 1 }, pageSize: 12 });
    
     expect(spy).toBeCalledTimes(1)
     expect(spy).toBeCalledWith(contextMock, { currentPage: 1, filter: {  id: 1 }, pageSize: 12 })
   });

  
});
