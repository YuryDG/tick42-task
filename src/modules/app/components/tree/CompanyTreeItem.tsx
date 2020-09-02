import React from 'react';
import BusinessIcon from '@material-ui/icons/Business';

import JobAreaList from './JobAreaList';
import { TreeDataItem } from '../../types';
import StyledTreeItem from './StyledTreeItem';

type Props = {
  item: TreeDataItem;
}

const CompanyTreeItem = ({ item }: Props): JSX.Element => {
  const { company } = item;
  const nodeId = `Company:${company.id}`;
  return (
    <StyledTreeItem
      nodeId={nodeId}
      labelText={company.name}
      labelIcon={BusinessIcon}
      labelInfo={`Areas ${item.jobAreas.length}`}
      color="#1a73e8"
      bgColor="#e8f0fe"
    >
      <JobAreaList data={item.jobAreas} />
    </StyledTreeItem>
  );
};

export default CompanyTreeItem;
