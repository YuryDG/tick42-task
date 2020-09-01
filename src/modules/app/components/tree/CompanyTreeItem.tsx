import React from 'react';
import TreeItem from '@material-ui/lab/TreeItem';

import JobAreaList from './JobAreaList';
import { TreeDataItem } from '../../types';

type Props = {
  item: TreeDataItem;
}

const CompanyTreeItem = ({ item }: Props): JSX.Element => {
  const { company } = item;
  const nodeId = `Company:${company.id}`;
  return (
    <TreeItem nodeId={nodeId} label={company.name}>
      <JobAreaList data={item.jobAreas} />
    </TreeItem>
  );
};

export default CompanyTreeItem;
