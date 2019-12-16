import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ImportExportIcon from '@material-ui/icons/ImportExport'
import InsertChartIcon from '@material-ui/icons/InsertChart'
import ShowChartIcon from '@material-ui/icons/ShowChart'
import FilterCenterFocusIcon from '@material-ui/icons/FilterCenterFocus'
import AccountTreeIcon from '@material-ui/icons/AccountTree'
import {NavLink} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
            root: {
                display: 'flex',
                height: '100vh',
                width: '13%',
                position: 'fixed',
                background: 'linear-gradient(#37474f, #b2ebf2)',
                flexDirection: 'column',
                padding: '10px',
                alignContent: 'flex-start'
            },
            buttons: {
                display: 'flex',
                margin: '5px',
                color: '#eeeeee',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingLeft: '1px',
                paddingRight: '1px',
                paddingTop: '7px',
                paddingBottom: '7px',
                "&:hover": {
                    background: "#0097a7"
                }
            },
            buttonLabel: {
                fontSize: '0.9em',
                paddingLeft: '10px',
                fontFamily: 'Quicksand',
                color: '#eeeeee',
                "&:hover": {
                    // color: "#0091ea"
                }
            }
            ,
            icon: {
                color: '#eeeeee',
                "&:hover": {
                    // color: "#0091ea"
                }
            }
        }
    )
)

export default function SideBar(props) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <List component="nav" aria-label="main mailbox folders">
                    <NavLink to="/dashboard" style={{textDecoration: 'none'}}>
                        <ListItem className={classes.buttons} button={true}>
                            <InsertChartIcon className={classes.icon}/>
                            <div className={classes.buttonLabel}>Dashboard</div>
                        </ListItem>
                    </NavLink>
                    <NavLink to="/sensitivity" style={{textDecoration: 'none'}}>
                        <ListItem className={classes.buttons} button={true}>
                            <ShowChartIcon className={classes.icon}/>
                            <div className={classes.buttonLabel}>Sensitivity Analysis</div>
                        </ListItem>
                    </NavLink>
                    <NavLink to="/scenario" style={{textDecoration: 'none'}}>
                        <ListItem className={classes.buttons} button={true}>
                            <FilterCenterFocusIcon className={classes.icon}/>
                            <div className={classes.buttonLabel}>Scenario Analysis</div>
                        </ListItem>
                    </NavLink>
                    <NavLink to="/dependency" style={{textDecoration: 'none'}}>
                        <ListItem className={classes.buttons} button={true}>
                            <AccountTreeIcon className={classes.icon}/>
                            <div className={classes.buttonLabel}>Dependency Graph</div>
                        </ListItem>
                    </NavLink>
                    <ListItem className={classes.buttons} button={true}>
                        <ImportExportIcon className={classes.icon}/>
                        <div className={classes.buttonLabel}>Explore Inputs</div>
                    </ListItem>
                </List>
            </div>
        </div>
    )
}