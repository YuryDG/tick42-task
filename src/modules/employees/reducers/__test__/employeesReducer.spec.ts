import employeesReducer from '../employeesReducer';
import { employeesIndexed, employees } from '../../../../test-data';
import { companiesLoaded, loadCompanies } from '../../../companies/actions';

describe('employees/reducer', () => {
  it('should return the state with new employees', () => {
    const prevState = {};
    const expectedState = employeesIndexed;
    const newSate = employeesReducer(prevState, companiesLoaded([], employees));
    expect(newSate).toStrictEqual(expectedState);
  });

  it('should return the prev state', () => {
    const prevState = {};
    const newSate = employeesReducer(prevState, loadCompanies());
    expect(newSate).toStrictEqual(prevState);
  });
});
