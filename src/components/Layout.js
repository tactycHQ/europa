import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Content from "./Content";
import TopBar from "./TopBar";
import SideBar from "./SideBar";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  topbar: {
    textAlign: 'center',
  },
  sidebar: {
    textAlign: 'center',
  },
  content: {
    textAlign: 'center',
  },
  footer: {
    textAlign: 'center',
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <TopBar/>
        </Grid>
        <Grid item xs={2} lg={1}>
          <SideBar/>
        </Grid>
        <Grid item xs={10} lg={11}>
          <Content/>
        </Grid>
      </Grid>
    </div>
  );
}