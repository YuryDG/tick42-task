import React from 'react';
import WorkIcon from '@material-ui/icons/Work';

import { JobArea } from '../../types';
import EmployeeTree from './EmployeeTree';
import StyledTreeItem from './StyledTreeItem';

type Props = {
  item: JobArea
}

const JobAreaListItem = ({ item }: Props): JSX.Element => {
  const nodeId = `JobArea:${item.areaId}`;
  return (
    <StyledTreeItem
      nodeId={nodeId}
      labelText={item.name}
      labelIcon={WorkIcon}
      labelInfo={`Employees ${item.employees.length}`}
      color="#1a73e8"
      bgColor="#e8f0fe"
    >
      <EmployeeTree data={item.employees} />
    </StyledTreeItem>

  );
};

export default JobAreaListItem;
