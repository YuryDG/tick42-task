import React from 'react';
import { Employee } from '../../../employees/types';
import EmployeeTreeItem from './EmployeeTreeItem';

type Props = {
  data: Employee[]
}

const EmployeeTree = ({ data }: Props): JSX.Element => (
  <>
    {
     data.map((item) => <EmployeeTreeItem key={item.id} item={item} />)
    }
  </>
);

export default EmployeeTree;
