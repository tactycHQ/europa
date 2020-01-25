import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import {NavLink} from "react-router-dom";

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
            background: '#FEFEFD'
        },
        paper: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '1%',
            padding: '5px',
            background: 'linear-gradient(#F4F4F4 10%,#FEFEFD)',
            // width: '100%',
            border: 'solid'
        },
        paperHeaderContainer: {
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
        },
        chartTitle: {
            fontFamily: 'Questrial',
            fontSize: '0.9em',
            fontWeight: '200',
            color: '#3C4148',
            marginTop: '0px',
            marginBottom: '0px'
        },
    }))
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)

    const newDash = () => {
        props.setDashid(20)
        props.setMode('new')
        props.setDashName('')

    }

    const openDash = (dash_id) => {
        props.setDashid(dash_id)
        props.setMode('existing')
        props.setDashName('')
    }



    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <div className={classes.paperHeaderContainer}>
                    <NavLink to="/spreadsheet" style={{textDecoration: 'none'}}>
                        <h1 className={classes.chartTitle} onClick={() => newDash()}>Create New
                            Dashboard</h1>
                    </NavLink>
                </div>
            </Paper>
            <Paper className={classes.paper}>
                <div className={classes.paperHeaderContainer}>
                    <NavLink to="/dashboard" style={{textDecoration: 'none'}}>
                        <h1 className={classes.chartTitle} onClick={() => openDash(7)}>LPI Dashboard</h1>
                    </NavLink>
                </div>
            </Paper>
            <Paper className={classes.paper}>
                <div className={classes.paperHeaderContainer}>
                    <NavLink to="/dashboard" style={{textDecoration: 'none'}}>
                        <h1 className={classes.chartTitle} onClick={() => openDash(9)}>VC Returns</h1>
                    </NavLink>
                </div>
            </Paper>

            {/*<input*/}
            {/*    // accept="image/*"*/}
            {/*    className={classes.input}*/}
            {/*    style={{display: 'none'}}*/}
            {/*    id="raised-button-file"*/}
            {/*    multiple*/}
            {/*    type="file"*/}
            {/*    onChange={e => onChange(e)}*/}
            {/*/>*/}
            {/*<label htmlFor="raised-button-file">*/}
            {/*    <Button variant="raised" component="span" className={classes.button}>*/}
            {/*        Create New Dashboard*/}
            {/*    </Button>*/}
            {/*</label>*/}


        </div>
    )
}


