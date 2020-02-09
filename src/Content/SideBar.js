import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import InsertChartIcon from '@material-ui/icons/InsertChart'
import FilterCenterFocusIcon from '@material-ui/icons/FilterCenterFocus'
import SaveAltIcon from '@material-ui/icons/SaveAlt'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import TuneIcon from '@material-ui/icons/Tune'
import ShareSharpIcon from '@material-ui/icons/ShareSharp'
import CloudDownloadSharpIcon from '@material-ui/icons/CloudDownloadSharp'
import PieChartSharpIcon from '@material-ui/icons/PieChartSharp'
import TimelineSharpIcon from '@material-ui/icons/TimelineSharp'
import GraphicEqSharpIcon from '@material-ui/icons/GraphicEqSharp'
import InfoSharpIcon from '@material-ui/icons/InfoSharp'
import {NavLink} from 'react-router-dom'
import Divider from "@material-ui/core/Divider";
import {useLocation} from 'react-router-dom'
import Tooltip from '@material-ui/core/Tooltip'
import Fade from '@material-ui/core/Fade'

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
            overflowY: 'auto'

        },
        content: {
            // height: '100%',
        },
        divider: {
            backgroundColor: '#D7DEE2',
            margin: '5px',
            minHeight: '1px',
            maxHeight: '1px',
            marginTop: '10%',
            marginBottom: '10%'
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
        activeButtons: {
            display: 'flex',
            // color: '#006E9F',
            backgroundColor: '#D0E4ED',
            justifyContent: 'flex-start',
            alignItems: 'center',
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
            fontSize: '0.9em',
            paddingLeft: '5px',
            fontFamily: 'Questrial',
            color: '#292F36'
        },
        outputLabel: {
            fontSize: '0.9em',
            paddingLeft: '5px',
            fontFamily: 'Questrial',
            color: '#292F36'
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
        },
        tipsText: {
            padding: '10px',
            fontSize: '0.95em',
            fontWeight: '100',
            fontFamily: 'Questrial',
            marginTop: '20px',
            color: '#292F36'
        },
        toolTip: {
            fontFamily: 'Questrial',
            color: '#292F36',
            backgroundColor: '#DEE3D4',
            opacity: '50%',
            fontSize: '1em'
        }
    }))
    const classes = useStyles()
    let location = useLocation()


    const createTips = () => {
        let tipText = ''
        if (location.pathname === '/dashboard') {
            tipText = 'Click on any chart element to view detailed metrics on that output variable'
        } else if (location.pathname === '/distributions') {
            tipText = 'Selecting an output generates a histogram and probability density function. The output values are calculated based on all possible input combinations '+
                'within the defined input range'
        } else if (location.pathname === '/inputimportance') {
            tipText = 'Select an output to see which input variables drive the greatest (or least) variance. The impact of each input is calculated based on the average change of ' +
                'the output value over the defined input range'
        }

        return (
            <Fade in={true} timeout={3000}>
                <h3 className={classes.tipsText}>{tipText}</h3>
            </Fade>

        )
    }


    const tipsEl = createTips()


    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <List component="nav" aria-label="main mailbox folders">
                    <NavLink to="/summary" activeClassName={classes.activeButtons} style={{textDecoration: 'none'}}>
                        <Tooltip title="Overall statistics and instructions relating to these pages" enterDelay={500}
                                 classes={{tooltip: classes.toolTip}} placement='right'>
                            <ListItem className={classes.buttons} button={true}>
                                <InfoSharpIcon className={classes.icon}/>
                                <div className={classes.buttonLabel}>Information</div>
                            </ListItem>
                        </Tooltip>
                    </NavLink>
                    <NavLink to="/dashboard" activeClassName={classes.activeButtons} style={{textDecoration: 'none'}}>
                        <Tooltip
                            title="See a dynamic view of the model by flexing input values to evaluate output values"
                            enterDelay={500} classes={{tooltip: classes.toolTip}} placement='right'>
                            <ListItem className={classes.buttons} button={true}>
                                <InsertChartIcon className={classes.icon}/>
                                <div className={classes.buttonLabel}>Dashboard</div>
                            </ListItem>
                        </Tooltip>
                    </NavLink>
                    <NavLink to="/distributions" activeClassName={classes.activeButtons}
                             style={{textDecoration: 'none'}}>
                        <Tooltip
                            title="See output distributions and evaluate key statistics such as mean, bounds and associated probabilities"
                            enterDelay={500} classes={{tooltip: classes.toolTip}} placement='right'>
                            <ListItem className={classes.buttons} button={true}>
                                <GraphicEqSharpIcon className={classes.icon}/>
                                <div className={classes.buttonLabel}>Output Distributions</div>
                            </ListItem>
                        </Tooltip>
                    </NavLink>
                    <NavLink to="/inputimportance" activeClassName={classes.activeButtons}
                             style={{textDecoration: 'none'}}>
                        <Tooltip title="Analysis summarizing which inputs matter the most" enterDelay={500}
                                 classes={{tooltip: classes.toolTip}} placement='right'>
                            <ListItem className={classes.buttons} button={true}>
                                <PieChartSharpIcon className={classes.icon}/>
                                <div className={classes.buttonLabel}>Input Contribution</div>
                            </ListItem>
                        </Tooltip>
                    </NavLink>
                    <NavLink to="/sensitivity" activeClassName={classes.activeButtons} style={{textDecoration: 'none'}}>
                        <Tooltip title="Sensitivity analysis showing output values as 2 inputs are flexed"
                                 enterDelay={500} classes={{tooltip: classes.toolTip}} placement='right'>
                            <ListItem className={classes.buttons} button={true}>
                                <TimelineSharpIcon className={classes.icon}/>
                                <div className={classes.buttonLabel}>Sensitivity Analysis</div>
                            </ListItem>
                        </Tooltip>
                    </NavLink>
                    <NavLink to="/scenario" activeClassName={classes.activeButtons} style={{textDecoration: 'none'}}>
                        <Tooltip title="Find input combinations that generate desired output outcomes" enterDelay={500}
                                 classes={{tooltip: classes.toolTip}} placement='right'>
                            <ListItem className={classes.buttons} button={true}>
                                <FilterCenterFocusIcon className={classes.icon}/>
                                <div className={classes.buttonLabel}>Scenario Analysis</div>
                            </ListItem>
                        </Tooltip>
                    </NavLink>

                    <Divider variant="middle" className={classes.divider}/>

                    <NavLink to="/spreadsheet" style={{textDecoration: 'none'}}>
                        <ListItem className={classes.buttons} button={true} onClick={() => props.generateBackupIO()}>
                            <TuneIcon className={classes.icon}/>
                            <div className={classes.buttonLabel}>Change Inputs/Outputs</div>
                        </ListItem>
                    </NavLink>
                    <ListItem className={classes.buttons} button={true}>
                        <CloudUploadIcon className={classes.icon}/>
                        <div className={classes.buttonLabel}>Upload New Model Excel</div>
                    </ListItem>
                    <ListItem className={classes.buttons} button={true} onClick={() => props.downloadModel()}>
                        <CloudDownloadSharpIcon className={classes.icon}/>
                        <div className={classes.buttonLabel}>Download Model Excel</div>
                    </ListItem>
                    <ListItem className={classes.saveButton} button={true} onClick={() => props.saveDash()}>
                        <SaveAltIcon className={classes.icon}/>
                        <div className={classes.buttonLabel}>Save Dashboard</div>
                    </ListItem>
                    <ListItem className={classes.saveButton} button={true}>
                        <ShareSharpIcon className={classes.icon}/>
                        <div className={classes.buttonLabel}>Send Dashboard</div>
                    </ListItem>
                </List>
            </div>
            {tipsEl}
        </div>
    )
}