import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import { SelectedItem, TreeData } from '../types';
import CompaniesTree from '../../companies/components/CompaniesTree';
import CompanyDetails from '../../companies/components/CompanyDetails';
import JobAreaDetails from '../../employees/components/JobAreaDetails';
import EmployeeDetails from '../../employees/components/EmployeeDetails';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flex: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  parent: {
    backgroundColor: '#cfe8fc',
    padding: 20,
  },
}));

type Props = {
  selectedItem: SelectedItem,
  treeData: TreeData,
  loadCompanies: () => void,
  loadDataForCurrentNode: (selectedItem: SelectedItem) => void,
}

function AppLayout({
  selectedItem, treeData, loadCompanies, loadDataForCurrentNode,
}: Props): JSX.Element {
  const classes = useStyles();

  useEffect(() => {
    loadCompanies();
  }, []);

  const renderRightPanel = (): JSX.Element | null => {
    switch (selectedItem.currentNode) {
      case 'Employee':
        return <EmployeeDetails />;
      case 'JobArea':
        return <JobAreaDetails />;
      case 'Company':
        return <CompanyDetails />;
      default:
        return null;
    }
  };

  return (
    <div className={classes.root}>
      <Typography component="div" className={classes.parent}>
        <Grid container spacing={1}>
          <Grid item sm={4}>
            <Paper className={classes.paper}>
              <CompaniesTree
                treeData={treeData}
                selectedItem={selectedItem}
                loadDataForCurrentNode={loadDataForCurrentNode}
              />
            </Paper>
          </Grid>
          <Grid item sm={8}>
            <Paper className={classes.paper}>
              {renderRightPanel()}
            </Paper>
          </Grid>
        </Grid>
      </Typography>
    </div>
  );
}

export default AppLayout;
