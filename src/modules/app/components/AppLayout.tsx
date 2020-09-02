import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import { Alert, AlertTitle } from '@material-ui/lab';
import { SelectedItem, TreeData } from '../types';
import CompanyDetails from '../../companies/components/CompanyDetails';
import JobAreaDetails from '../../employees/components/JobAreaDetails';
import EmployeeDetails from '../../employees/components/EmployeeDetails';
import AppTreeView from './tree/AppTreeView';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flex: 1,
    backgroundColor: '#cfe8fc',
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  parent: {
    padding: 20,
  },
}));

type Props = {
  selectedItem: SelectedItem,
  treeData: TreeData,
  errorMessage: string,
  loadCompanies: () => void,
  loadDataForCurrentNode: (selectedItem: SelectedItem) => void,
}

function AppLayout(props: Props): JSX.Element {
  const classes = useStyles();

  const {
    selectedItem,
    treeData,
    loadCompanies,
    loadDataForCurrentNode,
    errorMessage,
  } = props;

  useEffect(() => {
    loadCompanies();
    loadDataForCurrentNode(selectedItem);
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
        if (errorMessage) {
          return null;
        }
        return (
          <Alert severity="info">
            <AlertTitle>Welcome!</AlertTitle>
            Select an item on a tree — <strong>Lets start!</strong>
          </Alert>
        );
    }
  };

  return (
    <main className={classes.root}>
      <Typography component="div" className={classes.parent}>
        <Grid container spacing={1}>
          <Grid item sm={4}>
            <Paper className={classes.paper}>
              {
                errorMessage && (
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  Something went wrong — <strong>{errorMessage}</strong>
                </Alert>
                )
              }
              <AppTreeView
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
    </main>
  );
}

export default AppLayout;
