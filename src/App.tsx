/* eslint-disable max-len */
import { connect } from 'react-redux';

import { AppState } from './store/AppStore';
import { buildTreeData } from './utils';
import { SelectedItem } from './modules/app/types';
import { fetchInitialData } from './modules/companies/actions';
import { loadDataForCurrentItem } from './modules/app/actions';
import AppLayout from './modules/app/components/AppLayout';

const mapStateToProps = (state: AppState) => {
  const { companies, employees, selectedItem } = state;
  const treeData = buildTreeData(companies, employees);
  return { treeData, selectedItem };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDispatchToProps = (dispatch: any) => ({
  loadCompanies: () => dispatch(fetchInitialData()),
  loadDataForCurrentNode: (selectedItem: SelectedItem) => dispatch(loadDataForCurrentItem(selectedItem)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppLayout);
