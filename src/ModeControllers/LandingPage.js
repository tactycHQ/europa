import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import {Card} from "@material-ui/core";
import Button from "@material-ui/core/Button"
import {Switch, Route} from 'react-router-dom'
import Main from "./Main";
import Background from '../images/home.jpg'


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
    }))
    const classes = useStyles()


    return (
        <div>
            <Switch>
                <Route exact path={"/"}>
                    <Paper className={classes.root}>
                        <Card>
                            <Button>
                                Login
                            </Button>
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


