import { companiesLoaded, loadCompanies } from '../../actions';
import companiesReducer from '../companyReducer';
import { companies, companiesIndexed } from '../../../../test-data';

describe('companies/reducer', () => {
  it('should return the new state with new companies', () => {
    const prevState = {};
    const expectedState = companiesIndexed;
    const newSate = companiesReducer(prevState, companiesLoaded(companies, []));
    expect(newSate).toStrictEqual(expectedState);
  });

  it('should return the new prev state', () => {
    const prevState = {};
    const newSate = companiesReducer(prevState, loadCompanies());
    expect(newSate).toStrictEqual(prevState);
  });
});
