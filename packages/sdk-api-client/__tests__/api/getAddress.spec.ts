import { getAddress } from '../../src/api';
import { contextMock } from '../../__mocks__/context.mock';
import { AddressEnum } from '../../src';

const obj = { getAddress }

describe('[ODOO-API] getAddress', () => {

  it('calls endpoint with addressType billing and name home', async () => {
    const response = await getAddress(contextMock, { addressType: [AddressEnum.Billing] });

    expect(response.data.addresses.addresses).toHaveLength(1);
    expect(response.data.addresses.addresses[0].name).toBe("home");   

  });   

});
