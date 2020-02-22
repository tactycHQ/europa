import React from 'react'
import Main from "./Main";
import {useAuth0} from "../react-auth0-spa"
import {Route, Switch} from "react-router";
import HomePage from "../Homepage/HomePage";

export default function LandingPage() {

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


