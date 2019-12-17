import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection:'column',
    color:'#F4F9E9',
    justifyContent:'center',
    alignItems:'center',
    // '& > * + *': {
    //   marginLeft: theme.spacing(2),
    // },
    marginLeft: '46vw',
    marginTop:'25vh'
  }
}));

export default function Spinner() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress color="primary"/>
      <h5>Loading Dashboard...</h5>
    </div>
  );
}