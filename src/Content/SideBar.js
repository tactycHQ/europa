import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import InsertChartIcon from '@material-ui/icons/InsertChart'
import FilterCenterFocusIcon from '@material-ui/icons/FilterCenterFocus'
import AccountTreeIcon from '@material-ui/icons/AccountTree'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import SaveAltIcon from '@material-ui/icons/SaveAlt'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import TuneIcon from '@material-ui/icons/Tune'
import ShareSharpIcon from '@material-ui/icons/ShareSharp'
import SettingsBackupRestoreSharpIcon from '@material-ui/icons/SettingsBackupRestoreSharp'
import VerifiedUserSharpIcon from '@material-ui/icons/VerifiedUserSharp'
import CloudDownloadSharpIcon from '@material-ui/icons/CloudDownloadSharp';
import {NavLink} from 'react-router-dom'
import Divider from "@material-ui/core/Divider";



export default function SideBar(props) {
    const useStyles = makeStyles(theme => ({
            root: {
                display: 'flex',
                position: 'fixed',
                height: '100%',
                flexDirection: 'column',
                alignContent: 'flex-start',
                backgroundColor: '#FEFEFD',
                maxWidth: '12%',
                minWidth: '12%',
                overflowY: 'auto',
            },
            content: {
                // height: '100%',

            },
            divider: {
                backgroundColor: '#D7DEE2',
                margin:'5px',
                minHeight:'1px',
                maxHeight:'1px'
            },
            buttons: {
                display: 'flex',
                margin: '3px',
                color: '#006E9F',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingLeft: '1px',
                paddingRight: '1px',
                paddingTop: '7px',
                paddingBottom: '7px',
                "&:hover": {
                    background: '#A2CADC'
                }
            },
            saveButton: {
                display: 'flex',
                margin: '3px',
                color: '#292F36',
                backgroundColor: '#EBECEC',
                // borderStyle: 'solid',
                // borderColor: '#D8D9DA',
                // borderWidth: 1,
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingLeft: '1px',
                paddingRight: '1px',
                paddingTop: '7px',
                paddingBottom: '7px',
                "&:hover": {
                    background: "#B9D7E4"
                }
            },
            buttonLabel: {
                fontSize: '0.95em',
                paddingLeft: '5px',
                fontFamily: 'Questrial',
                color: '#292F36',
                "&:hover": {
                    color: "#FEFEFD"
                }
            },
            outputLabel: {
                fontSize: '0.95em',
                paddingLeft: '5px',
                fontFamily: 'Questrial',
                color: '#292F36',
                "&:hover": {
                    color: "#FEFEFD"
                }
            },
            outputIcon: {
                color: '#006E9F',
                height: 15,
                width: 15,
                "&:hover": {
                    color: "#B9D7E4"
                },
            },
            icon: {
                color: '#006E9F',
                "&:hover": {
                    color: "#3B9D7E4"
                },
                height: 15,
                width: 15
            }
        }))
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
                {/*<Divider variant="middle" className={classes.divider}/>*/}
                <List component="nav" aria-label="main mailbox folders">
                    <NavLink to="/dashboard" style={{textDecoration: 'none'}}>
                        <ListItem className={classes.buttons} button={true}>
                            <InsertChartIcon className={classes.icon}/>
                            <div className={classes.buttonLabel}>Live Dashboard</div>
                        </ListItem>
                    </NavLink>
                    {outputs}

                    <Divider variant="middle" className={classes.divider}/>

                    {/*<NavLink to="/sensitivity" style={{textDecoration: 'none'}}>*/}
                    {/*    <ListItem className={classes.buttons} button={true}>*/}
                    {/*        <ShowChartIcon className={classes.icon}/>*/}
                    {/*        <div className={classes.buttonLabel}>Sensitivity Analysis</div>*/}
                    {/*    </ListItem>*/}
                    {/*    <ListItem className={classes.buttons} button={true}>*/}
                    {/*        <ImportExportIcon className={classes.icon}/>*/}
                    {/*        <div className={classes.buttonLabel}>Input Importance</div>*/}
                    {/*    </ListItem>*/}
                    {/*</NavLink>*/}
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

                    <Divider variant="middle" className={classes.divider}/>

                    <ListItem className={classes.buttons} button={true}>
                        <TuneIcon className={classes.icon}/>
                        <div className={classes.buttonLabel}>Change Inputs/Outputs</div>
                    </ListItem>
                    <ListItem className={classes.buttons} button={true}>
                        <VerifiedUserSharpIcon className={classes.icon}/>
                        <div className={classes.buttonLabel}>Audit Model</div>
                    </ListItem>
                    <ListItem className={classes.buttons} button={true}>
                        <CloudUploadIcon className={classes.icon}/>
                        <div className={classes.buttonLabel}>Upload New Model Excel</div>
                    </ListItem>
                    <ListItem className={classes.buttons} button={true}>
                        <CloudDownloadSharpIcon className={classes.icon}/>
                        <div className={classes.buttonLabel}>Download Model Excel</div>
                    </ListItem>
                    <ListItem className={classes.saveButton} button={true}>
                        <SaveAltIcon className={classes.icon}/>
                        <div className={classes.buttonLabel}>Save Dashboard</div>
                    </ListItem>
                    <ListItem className={classes.saveButton} button={true}>
                        <ShareSharpIcon className={classes.icon}/>
                        <div className={classes.buttonLabel}>Send Dashboard</div>
                    </ListItem>
                    <ListItem className={classes.saveButton} button={true}>
                        <SettingsBackupRestoreSharpIcon className={classes.icon}/>
                        <div className={classes.buttonLabel}>Reset Dashboard</div>
                    </ListItem>
                </List>
            </div>
            < /div>
                )
                }