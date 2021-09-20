import { User} from '@vue-storefront/odoo-api/src/types';

export const mockedUser: User = {
  password: '123',
  id: 1,
  name: 'C3po',
  street: 'Pearson',
  street2: 'P',
  city: 'Haywood',
  country: { id: 1 },
  state: {id: 2},
  zip: 'S00290',
  email: 'john@gmail.com',
  phone: '555122311',
  isCompany: false
};
