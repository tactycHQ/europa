import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';

const useStyles = makeStyles(theme => ({
  root: {
      flexGrow: 1,
  },
  menuButton: {
      marginRight: theme.spacing(2),
      textAlign:'center'
  },
  toolbar: {
    display: 'flex',
    backgroundColor:'#607d8b',
    justifyContent: 'space-between'
  },
   modelname: {
    fontSize:'1.3em'
  }
}));

export default function DenseAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar} variant="dense">
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <div className={classes.modelname}>LPI Dashboard</div>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <HomeTwoToneIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}