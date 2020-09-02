import React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import { Employee } from '../../../employees/types';
import StyledTreeItem from './StyledTreeItem';

type Props = {
  item: Employee
}

const EmployeeTreeItem = ({ item }: Props): JSX.Element => {
  const nodeId = `Employee:${item.id}*${item.companyId}`;
  return (
    <StyledTreeItem
      nodeId={nodeId}
      labelText={`${item.firstName} ${item.lastName}`}
      labelIcon={PersonIcon}
      color="#1a73e8"
      bgColor="#e8f0fe"
    />
  );
};

export default EmployeeTreeItem;
