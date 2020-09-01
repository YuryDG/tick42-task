import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Employee } from '../types';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

type Props = {
  employee: Employee
}

const EmployeeCard = ({ employee }: Props): JSX.Element => {
  const classes = useStyles();
  const [date, setDate] = useState(employee.dateOfBirth);

  useEffect(() => {
    setDate(new Date(employee.dateOfBirth).toDateString());
  }, []);

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          {employee.firstName} {employee.lastName}
        </Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {employee.jobTitle}
        </Typography>
        <Typography variant="button" component="h2">
          Area: {employee.jobArea}
        </Typography>
        <Typography variant="button" component="h2">
          Type: {employee.jobType}
        </Typography>
        <Typography variant="button" component="h2">
          Birthday: {date}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default EmployeeCard;
