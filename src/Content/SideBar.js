import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ImportExportIcon from '@material-ui/icons/ImportExport'
import InsertChartIcon from '@material-ui/icons/InsertChart'
import ShowChartIcon from '@material-ui/icons/ShowChart'
import FilterCenterFocusIcon from '@material-ui/icons/FilterCenterFocus'
import AccountTreeIcon from '@material-ui/icons/AccountTree'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import SaveAltIcon from '@material-ui/icons/SaveAlt'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import TuneIcon from '@material-ui/icons/Tune'
import {NavLink} from 'react-router-dom'
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles(theme => ({
            root: {
                display: 'flex',
                height: '100vh',
                maxWidth: '12%',
                minWidth: '12%',
                position: 'fixed',
                flexDirection: 'column',
                alignContent: 'flex-start',
                backgroundColor: '#FEFEFD'
            },
            buttons: {
                display: 'flex',
                margin: '3px',
                color: '#292F36',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingLeft: '1px',
                paddingRight: '1px',
                paddingTop: '7px',
                paddingBottom: '7px',
                "&:hover": {
                    background: "#D2DBE6"
                }
            },
            saveButton: {
                display: 'flex',
                margin: '3px',
                color: '#292F36',
                backgroundColor: '#EBECEC',
                borderStyle:'solid',
                borderColor:'#D8D9DA',
                borderWidth:1,
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingLeft: '1px',
                paddingRight: '1px',
                paddingTop: '7px',
                paddingBottom: '7px',
                "&:hover": {
                    background: "#D2DBE6"
                }
            },
            buttonLabel: {
                fontSize: '0.95em',
                paddingLeft: '5px',
                fontFamily: 'Questrial',
                color: '#292F36',
                "&:hover": {
                    color: "#293E56"
                }
            },
            outputLabel: {
                fontSize: '0.95em',
                paddingLeft: '5px',
                fontFamily: 'Questrial',
                color: '#292F36',
                "&:hover": {
                    // color: "#F4F9E9"
                }
            },
            outputIcon: {
                color: '#4B719C'
            },
            icon: {
                color: '#292F36',
                "&:hover": {
                    // color: "#0091ea"
                }
            }
        }
    )
)

export default function SideBar(props) {
    const classes = useStyles()

    const outputs = props.outputs.map(output => {
        return (
            <NavLink to={`/outputs/${output.category}`} style={{textDecoration: 'none'}} key={output.category}>
                <ListItem className={classes.buttons} button={true}>
                    <PlayArrowIcon className={classes.outputIcon}/>
                    <div className={classes.outputLabel}>{output.category}</div>
                </ListItem>
            </NavLink>
        )

    })

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <List component="nav" aria-label="main mailbox folders">
                    <NavLink to="/dashboard" style={{textDecoration: 'none'}}>
                        <ListItem className={classes.buttons} button={true}>
                            <InsertChartIcon className={classes.icon}/>
                            <div className={classes.buttonLabel}>Live Dashboard</div>
                        </ListItem>
                    </NavLink>
                    {outputs}
                    <Divider/>
                    <NavLink to="/sensitivity" style={{textDecoration: 'none'}}>
                        <ListItem className={classes.buttons} button={true}>
                            <ShowChartIcon className={classes.icon}/>
                            <div className={classes.buttonLabel}>Sensitivity Analysis</div>
                        </ListItem>
                        <ListItem className={classes.buttons} button={true}>
                            <ImportExportIcon className={classes.icon}/>
                            <div className={classes.buttonLabel}>Input Importance</div>
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
                    <Divider/>
                    <ListItem className={classes.buttons} button={true}>
                        <CloudUploadIcon className={classes.icon}/>
                        <div className={classes.buttonLabel}>Update Model Version</div>
                    </ListItem>
                    <ListItem className={classes.buttons} button={true}>
                        <TuneIcon className={classes.icon}/>
                        <div className={classes.buttonLabel}>Change Inputs and Outputs</div>
                    </ListItem>
                    <ListItem className={classes.saveButton} button={true}>
                        <SaveAltIcon className={classes.icon}/>
                        <div className={classes.buttonLabel}>Save Dashboard</div>
                    </ListItem>
                </List>
            </div>
        </div>
    )
}