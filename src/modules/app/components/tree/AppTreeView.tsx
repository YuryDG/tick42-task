/* eslint-disable react/require-default-props */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import CompanyTreeItem from './CompanyTreeItem';
import {
  SelectedItem, TreeData, NodeType, TreeDataItem,
} from '../../types';

type Props = {
    treeData: TreeData,
    selectedItem: SelectedItem,
    loadDataForCurrentNode: (selectedItem: SelectedItem) => void,
}

const useStyles = makeStyles({
  root: {
    flex: 1,
  },
});

const AppTreeView = (props: Props): JSX.Element => {
  const classes = useStyles();
  const { loadDataForCurrentNode } = props;
  const { selectedItem, treeData = { items: [] } } = props;

  // eslint-disable-next-line max-len
  const renderCompanyItems = (item: TreeDataItem) => <CompanyTreeItem key={item.company.id} item={item} />;

  const getSelectedItem = (nodeValue: string): SelectedItem => {
    let currentNodeId = '';
    let companyId = '';
    const [currentNode, value] = nodeValue.split(':');
    if (currentNode === 'Company') {
      currentNodeId = value;
      companyId = value;
    } else if (currentNode === 'JobArea') {
      const [areaName, idCompany] = value.split('*');
      currentNodeId = areaName;
      companyId = idCompany;
    } else { // click on Employee
      const [employeeId, idCompany] = value.split('*');
      currentNodeId = employeeId;
      companyId = idCompany;
    }

    return {
      companyId,
      currentNode: (currentNode as NodeType),
      id: currentNodeId,
    };
  };

  const handleSelectItem = (event: any, nodeId: string) => {
    const newSelectedItem = getSelectedItem(nodeId);
    if (selectedItem) {
      const isDifferentId = selectedItem.id !== newSelectedItem.id;
      const isDifferentCompany = selectedItem.companyId !== newSelectedItem.companyId;

      // load node info when click on a different one
      if (isDifferentId || isDifferentCompany) {
        loadDataForCurrentNode(newSelectedItem);
      }
    }
  };

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      onNodeSelect={handleSelectItem}
    >
      { treeData.items.map(renderCompanyItems) }
    </TreeView>
  );
};

export default AppTreeView;
