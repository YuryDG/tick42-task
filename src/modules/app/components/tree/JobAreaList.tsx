import React from 'react';
import JobAreaListItem from './JobAreaListItem';
import { JobArea } from '../../types';

type Props = {
  data: JobArea[]
}

const JobAreaList = ({ data }: Props): JSX.Element => (
  <>
    {
      data.map((item) => <JobAreaListItem key={item.areaId} item={item} />)
    }
  </>
);

export default JobAreaList;
