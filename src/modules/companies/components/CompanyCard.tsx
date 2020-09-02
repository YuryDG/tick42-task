/* eslint-disable react/require-default-props */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Address } from '../../addresses/types';

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
  address?: Address,
}

const CompanyCard = ({ address }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          Country: {address?.country}
        </Typography>
        <Typography color="textSecondary">
          City: {address?.city}
        </Typography>
        <Typography color="textSecondary">
          State: {address?.state}
        </Typography>
        <Typography color="textSecondary">
          Street: {address?.city}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CompanyCard;
