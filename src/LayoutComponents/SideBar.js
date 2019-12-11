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
                height: '91vh',
                width: '15%',
                position: 'fixed',
                backgroundColor: '#eceff1',
                flexDirection: 'column',
                padding: '10px',
                alignContent: 'flex-start'
            },
            buttons: {
                display: 'flex',
                margin: '5px',
                color: '#546e7a',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingLeft: '1px',
                paddingRight: '1px',
                paddingTop: '7px',
                paddingBottom: '7px'
            },
            buttonLabel: {
                fontSize: '1.1em',
                paddingLeft: '10px',
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
                            <InsertChartIcon/>
                            <div className={classes.buttonLabel}>Dashboard</div>
                        </ListItem>
                    </NavLink>
                    <NavLink to="/sensitivity" style={{textDecoration: 'none'}}>
                        <ListItem className={classes.buttons} button={true}>
                            <ShowChartIcon/>
                            <div className={classes.buttonLabel}>Sensitivity Analysis</div>
                        </ListItem>
                    </NavLink>
                    <NavLink to="/scenario" style={{textDecoration: 'none'}}>
                        <ListItem className={classes.buttons} button={true}>
                            <FilterCenterFocusIcon/>
                            <div className={classes.buttonLabel}>Scenario Analysis</div>
                        </ListItem>
                    </NavLink>
                    <NavLink to="/dependency" style={{textDecoration: 'none'}}>
                        <ListItem className={classes.buttons} button={true}>
                            <AccountTreeIcon/>
                            <div className={classes.buttonLabel}>Dependency Graph</div>
                        </ListItem>
                    </NavLink>
                    <ListItem className={classes.buttons} button={true}>
                        <ImportExportIcon/>
                        <div className={classes.buttonLabel}>Explore Inputs</div>
                    </ListItem>
                </List>
            </div>
        </div>
    )
}