import { loadCompanies, errorLoadCompanies } from '../../../companies/actions';
import loadingReducer from '../loadingReducer';

describe('app/reducer/loading', () => {
  it('should be true when loading companies', () => {
    const prevState = false;
    const action = loadCompanies();
    const newSate = loadingReducer(prevState, action);

    expect(newSate).toBeTruthy();
  });

  it('should return the previous state', () => {
    const prevState = false;
    const action = errorLoadCompanies('');
    const newSate = loadingReducer(prevState, action);

    expect(newSate).toBeFalsy();
  });
});
