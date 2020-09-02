import { errorLoadCompanies, loadCompanies } from '../../../companies/actions';
import errorReducer from '../errorReducer';

describe('app/reducer/errorReducer', () => {
  it('should return the error state', () => {
    const prevState = '';
    const message = 'Network error';
    const action = errorLoadCompanies(message);
    const newSate = errorReducer(prevState, action);

    expect(newSate).toStrictEqual(message);
  });

  it('should return the previous state', () => {
    const prevState = '';
    const action = loadCompanies();
    const newSate = errorReducer(prevState, action);

    expect(newSate).toStrictEqual(prevState);
  });
});
