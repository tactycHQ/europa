import React, {useState, useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import {Card} from "@material-ui/core";
import AddCircleSharpIcon from '@material-ui/icons/AddCircleSharp'
import {Link} from 'react-router-dom'
import {getRecords} from "./api";
import Spinner from "../UtilityComponents/Spinner";

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
            padding: '10px',
            background: '#FEFEFD'
        },
        existingContainer: {
            display: 'flex',
            minWidth: '180px',
            flexDirection: 'column',
            width: '100%',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            background: 'linear-gradient(#F4F4F4 10%,#FEFEFD)',
            padding: '5px',
            margin: '10px'
        },
        existingdash: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            margin: '4px',
            padding: '5px',
            background: '#627C8D',
            width: '100%',
            height: '30px',
            cursor: 'pointer',
            "&:hover": {
                background: '#A5014B',
            }
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
    const [records, setRecords] = useState([])


    useEffect(() => {
        const executeGetUserRecords = async () => {
            const userRecords = await getRecords()
            setRecords([...userRecords])
        }
        executeGetUserRecords()

    }, [])


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

    const createMyDashboards = () => {
        if (records.length >= 1) {
            let myDashboards = records.map(record => {
                return (
                    <Paper className={classes.existingdash}
                           key={record.id}
                           component={Link} to="/dashboard"
                           style={{textDecoration: 'none'}}
                           onClick={() => openDash(record.id)}>
                        <h1 className={classes.dashTitle}>{record.name}</h1>
                    </Paper>
                )
            })

            return (
                <Card className={classes.existingContainer}>
                    <h1 className={classes.dashTitle} style={{
                        fontFamily: 'Questrial',
                        fontSize: '1.2em',
                        fontWeight: '200',
                        color: '#006E9F',
                        marginBottom: '5px'
                    }}>My Dashboards</h1>
                    {myDashboards}
                </Card>
            )
        } else {
            return <Spinner/>

        }
    }

    let myDashboards = createMyDashboards()


    return (
        <div className={classes.root}>
            <Paper className={classes.newdashboardpaper} component={Link} to="/spreadsheet"
                   style={{textDecoration: 'none'}}>
                <AddCircleSharpIcon style={{color: '#FEFEFD'}}/>
                <h1 className={classes.dashTitle} onClick={() => newDash()}>Create New
                    Dashboard</h1>
            </Paper>
            {myDashboards}
        </div>
    )
}


