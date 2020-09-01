import React from 'react';
import TreeItem from '@material-ui/lab/TreeItem';
import { Employee } from '../../../employees/types';

type Props = {
  item: Employee
}

const EmployeeTreeItem = ({ item }: Props): JSX.Element => {
  const nodeId = `Employee:${item.id}*${item.companyId}`;
  return (
    <TreeItem nodeId={nodeId} label={`${item.firstName} ${item.lastName}`} />
  );
};

export default EmployeeTreeItem;
