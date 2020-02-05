import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import {Card} from "@material-ui/core";
import AddCircleSharpIcon from '@material-ui/icons/AddCircleSharp'
import {Link} from 'react-router-dom'

// import Button from "@material-ui/core/Button";
// import {Switch, Route} from 'react-router-dom'
// import Spreadsheet from "./Spreadsheet";


export default function Home(props) {

    // Defining Hooks
    const useStyles = makeStyles(theme => ({
        root: {
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: '5px',
            background: '#FEFEFD'
        },
        existingContainer: {
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
            minHeight: '60vh',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            background: 'linear-gradient(#F4F4F4 10%,#FEFEFD)',
            padding: '5px',
            margin: '10px',
        },
        existingdash: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '1%',
            padding: '5px',
            background: '#4595B9',
            width: '20%',
            height: '50px',
            cursor: 'pointer'
        },
        newdashboardpaper: {
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginTop: '0px',
            marginBottom: '5px',
            padding: '5px',
            background: '#006491',
            width: '180px',
            cursor: 'pointer'
        },
        dashTitle: {
            fontFamily: 'Questrial',
            fontSize: '0.9em',
            fontWeight: '200',
            color: '#FEFEFD',
            marginTop: '0px',
            marginBottom: '0px'
        },
    }))
    const classes = useStyles()

    const newDash = () => {
        props.clearState()
        props.setDashid(11)
        props.updateMode('new')
        props.setDashName('LPI DASH')
    }

    const openDash = (dash_id) => {
        props.clearState()
        props.setDashid(dash_id)
        props.updateMode('processed')
        props.setDashName('')
        props.updateMsg("Opening Dashboard...")
        props.updateOpen(true)
    }


    return (
        <div className={classes.root}>

            <Paper className={classes.newdashboardpaper} component={Link} to="/spreadsheet"
                   style={{textDecoration: 'none'}}>
                <AddCircleSharpIcon style={{color: '#FEFEFD'}}/>
                <h1 className={classes.dashTitle} onClick={() => newDash()}>Create New
                    Dashboard</h1>
            </Paper>

            <Card className={classes.existingContainer}>
                <h1 className={classes.dashTitle} style={{
                    fontFamily: 'Questrial',
                    fontSize: '1.2em',
                    fontWeight: '200',
                    color: '#006E9F',
                    marginBottom: '5px'
                }}>My Dashboards</h1>

                <Paper className={classes.existingdash}
                       component={Link} to="/dashboard"
                       style={{textDecoration: 'none'}}
                       onClick={() => openDash(7)}>
                    <h1 className={classes.dashTitle}>LPI Dashboard</h1>
                </Paper>

                <Paper className={classes.existingdash}
                       component={Link} to="/dashboard"
                       style={{textDecoration: 'none'}}
                       onClick={() => openDash(9)}>
                    <h1 className={classes.dashTitle}>VC Returns</h1>
                </Paper>

                <Paper className={classes.existingdash}
                       component={Link} to="/dashboard"
                       style={{textDecoration: 'none'}}
                       onClick={() => openDash(11)}>
                    <h1 className={classes.dashTitle}>LPI DASH</h1>
                </Paper>

            </Card>
        </div>
    )
}


