import { loadCompanies } from '../../../companies/actions';
import loadingReducer from '../loadingReducer';
import selectItemReducer from '../selectItemReducer';
import { updateSelectedItem } from '../../actions';
import { SelectedItem } from '../../types';

describe('app/reducer/selectItem', () => {
  it('should return the new item selected', () => {
    const prevState: SelectedItem = { currentNode: 'Company', id: '1', companyId: '1' };
    const action = updateSelectedItem(prevState);
    const newSate = selectItemReducer(prevState, action);

    expect(newSate).toStrictEqual(prevState);
  });

  it('should return the previous state', () => {
    const prevState: SelectedItem = { currentNode: 'None', id: '', companyId: '' };
    const action: any = loadCompanies();
    const newSate = selectItemReducer(prevState, action);

    expect(newSate).toStrictEqual(prevState);
  });
});
