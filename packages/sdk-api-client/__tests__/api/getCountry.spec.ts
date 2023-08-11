import { getCountry } from '../../src/api';
import { contextMock } from '../../__mocks__/context.mock';

const obj = { getCountry }

describe('[ODOO-API] getCountry', () => {

  it('calls endpoint with id 2 and check if states is defined', async () => {
    const response = await getCountry(contextMock, { id: 2 });
    
    expect(response.data.country.id).toBe(2);
    expect(response.data.country.name).toBe("United Arab Emirates");
    expect(response.data.country.states).toBeDefined()

  });

}); 
