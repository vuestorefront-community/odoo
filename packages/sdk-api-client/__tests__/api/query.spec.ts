import { query } from '../../src/api';
import { contextMock } from '../../__mocks__/context.mock';
import FullProduct from '../../__mocks__/customQueries/customQueryFullProductTemplateListWithoutPrice'
import customQueryCountryListWithoutState from '../../__mocks__/customQueries/customQueryCountryListWithoutState'

describe('[ODOO-API] query', () => {

  it('throw exception because query name is not given', async () => {
    try {
      await query(contextMock, { queryName: '' });
    }catch(e) {
      expect(e).toBe('Developer Error: queryName is required')
    }
  });

  it('throw exception because queries are not configured in middleware', async () => {
    try {
      await query(contextMock, { queryName: 'GetProduct' });
    }catch(e) {
      expect(e).toBe('Developer Error: queries must be configured (MiddlewareConfig.queries)')
    }
  });

  it('throw exception because queries are not configured in middleware', async () => {
    contextMock.config.queries = {
      GetProduct: FullProduct
    }

    try {
      await query(contextMock, { queryName: 'GetVariant' });
    }catch(e) {
      expect(e).toBe('Developer Error: query GetVariant is not configured in middleware')
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
