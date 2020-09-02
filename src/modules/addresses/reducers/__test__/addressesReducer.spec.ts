import addressesReducer from '../addressesReducer';
import { loadCompanies, companyLoaded } from '../../../companies/actions';
import { addresses } from '../../../../test-data';

describe('addresses/reducer', () => {
  it('should return the same state', () => {
    const state = {};
    const newSate = addressesReducer(state, loadCompanies());
    expect(newSate).toStrictEqual(state);
  });

  it('should add company address to the state', () => {
    const companyAddress = addresses[0];
    const state = {
      [companyAddress.id]: {
        ...companyAddress,
      },
    };
    const action = companyLoaded(companyAddress, []);
    const newSate = addressesReducer(state, action);
    expect(newSate).toStrictEqual(state);
  });

  it('should return the prev state if there is no address', () => {
    const state = {};
    const action = companyLoaded(null, []);
    const newSate = addressesReducer(state, action);
    expect(newSate).toStrictEqual(state);
  });
});
