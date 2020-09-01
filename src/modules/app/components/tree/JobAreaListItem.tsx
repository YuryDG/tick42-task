import React from 'react';
import TreeItem from '@material-ui/lab/TreeItem';
import { JobArea } from '../../types';
import EmployeeTree from './EmployeeTree';

type Props = {
  item: JobArea
}

const JobAreaListItem = ({ item }: Props): JSX.Element => {
  const nodeId = `JobArea:${item.areaId}`;
  return (
    <TreeItem nodeId={nodeId} label={item.name}>
      <EmployeeTree data={item.employees} />
    </TreeItem>
  );
};

export default JobAreaListItem;
