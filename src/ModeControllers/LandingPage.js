import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import {Card} from "@material-ui/core";
import Button from "@material-ui/core/Button"
import {Switch, Route} from 'react-router-dom'
import Main from "./Main";
import Background from '../images/home.jpg'
import TopBar from "./TopBar";



// import Button from "@material-ui/core/Button";
// import {Switch, Route} from 'react-router-dom'
// import Spreadsheet from "./Spreadsheet";


export default function LandingPage() {

    // Defining Hooks
    const useStyles = makeStyles(theme => ({
        root: {
            display: 'flex',
            width: '100%',
            height: '100vh',
            flexDirection: 'column',
            backgroundImage: `url(${Background})`
        },
        top: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            position: 'fixed',
            zIndex: '2'
        },
        mainPage: {
            display: 'flex',
            flexDirection: 'column',
            marginTop: '5vh',
            width: '100%',
            position: 'fixed',
            zIndex: '2'
        },
    }))
    const classes = useStyles()


    return (
        <div>
            <Switch>
                <Route exact path={"/"}>
                    <Paper className={classes.root}>
                        <div className={classes.top}>
                            <TopBar/>
                        </div>
                        <Card className={classes.mainPage}>
                        </Card>
                    </Paper>
                </Route>
                <Route exact
                       path="/(home|summary|dashboard|distributions|inputimportance|sensitivity|scenario|dependency|spreadsheet)">
                        <Main/>
                </Route>
            </Switch>
        </div>
    )
}


