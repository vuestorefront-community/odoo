import { getCountryList } from '../../src/api';
import { contextMock } from '../../__mocks__/context.mock';

const obj = { getCountryList }

describe('[ODOO-API] getCountryList', () => {

  it('calls endpoint', async () => {
    const response = await getCountryList(contextMock, {  });

    expect(response.data.countries.countries).toHaveLength(5);
    expect(response.data.countries.countries[0].states).toBeDefined()
  });
  
  it('calls endpoint with parameters', async () => {
    const spy = jest.spyOn(obj, 'getCountryList')

    await obj.getCountryList(contextMock, { currentPage: 1, filter: { id: 3 }, pageSize: 12, search: '' });
    
    expect(spy).toBeCalledTimes(1)
    expect(spy).toBeCalledWith(contextMock, { currentPage: 1, filter: { id: 3 }, pageSize: 12, search: '' })
  });

  
});
