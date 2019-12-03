import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  content:{
    height:'100vh',
    padding:'10px',
    backgroundColor:'#eceff1'
  },
   buttons:{
    fontSize:'0.8em',
    color:'#546e7a'
  }
    }
  )
)

export default function SideBar() {
  const classes = useStyles()

  return (
      <div className={classes.content}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem className={classes.buttons} button="true">
          Dashboard
        </ListItem>
        <ListItem className={classes.buttons} button="true" >
            Sensitivity Analysis
        </ListItem>
        <ListItem className={classes.buttons} button="true">
            Scenario Analysis
        </ListItem>
        <ListItem className={classes.buttons} button="true">
            Dependency Graph
        </ListItem>
        <ListItem className={classes.buttons} button="true">
            Input Importance
        </ListItem>
      </List>
    </div>
  )
}