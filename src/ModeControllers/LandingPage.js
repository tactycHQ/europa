import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Button from "@material-ui/core/Button"
import Main from "./Main";
import {useAuth0} from "../react-auth0-spa"
import Background from "../images/home.jpg"
import {Route, Switch} from "react-router";
import HomePage from "../Homepage/HomePage";

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
            width: '100%',
            position: 'fixed',
            zIndex: '2'
        },
        logo: {
            display: 'flex',
            fontFamily: 'Questrial',
            justifyContent: 'center',
            fontWeight: '1000',
            minWidth: '6.5%',
            fontSize: '4.0em',
            color: '#486672',
            letterSpacing: '25px',
            marginTop: '10vh',
            marginBottom: '2px',
        },
    }))
    const classes = useStyles()

    const {isAuthenticated, loginWithRedirect, logout, loading} = useAuth0()

    let mainEl

    if (isAuthenticated && !loading) {
        mainEl = (
            <Main
                logout={logout}
            />
        )
    } else if (loading) {
        mainEl = <div/>
    } else {
        mainEl = <div>Please sign-in first. If you have already sign in, please emake sure to verify your email</div>
    }


    return (
        <div>
            <Switch>
                <Route exact path={"/"}>
                    <HomePage loginWithRedirect={loginWithRedirect}/>
                </Route>
                <Route exact
                       path="/(home|summary|dashboard|distributions|inputimportance|sensitivity|scenario|spreadsheet)">
                    {mainEl}
                </Route>
            </Switch>
        </div>
    )
}


