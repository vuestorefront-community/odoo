import { mutation } from '../../src/api';
import { contextMock } from '../../__mocks__/context.mock';
import FullProduct from '../../__mocks__/customQueries/customQueryFullProductTemplateListWithoutPrice'

describe('[ODOO-API] mutation', () => {

  it('throw exception because mutation object is not given', async () => {
    try {
      await mutation(contextMock, null as any);
    }catch(e) {
      expect(e).toBe('Developer Error: mutationName is required')
    }
  });

  it('throw exception because mutation name is not given', async () => {
    try {
      await mutation(contextMock, { mutationName: '' });
    }catch(e) {
      expect(e).toBe('Developer Error: mutationName is required')
    }
  });

  it('throw exception because mutations are not configured in middleware', async () => {
    try {
      await mutation(contextMock, { mutationName: 'LoginMutation' });
    }catch(e) {
      expect(e).toBe('Developer Error: mutations must be configured (MiddlewareConfig.queries)')
    }
  });

  it('throw exception because mutations are not configured in middleware', async () => {
    contextMock.config.queries = {
      GetProduct: FullProduct
    }

    try {
      await mutation(contextMock, { mutationName: 'LogoutMutation' });
    }catch(e) {
      expect(e).toBe('Developer Error: mutation LogoutMutation is not configured in middleware')
    }
  });

  // it('works', async () => {
  //   contextMock.config.queries = {
  //     GetProduct: FullProduct,
  //     GetVariant: customQueryCountryListWithoutState
  //   }

  //   const response = await query(contextMock, { queryName: 'GetVariant' });

  //   expect(response).toEqual({})
  // });

});
