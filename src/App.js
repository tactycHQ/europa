import React from 'react'
import LandingPage from "./ModeControllers/LandingPage";
import {BrowserRouter} from 'react-router-dom'
import ScrollIntoView from "./UtilityComponents/ScrollIntoView";
import ContextProvider from "./Context"
import CssBaseline from '@material-ui/core/CssBaseline'
import {makeStyles} from "@material-ui/core"
import {Auth0Provider} from "./react-auth0-spa";
import config from "./config/auth_config";
import history from "./utils/history"

const useStyles = makeStyles(theme => ({
    app: {}
}))

export default function App() {
    const classes = useStyles()

    const onRedirectCallback = appState => {
        history.push(
            appState && appState.targetUrl
                ? appState.targetUrl
                : window.location.pathname
        );
    }

    console.log(window.location.origin)

    return (
        <ContextProvider>
            <CssBaseline/>
            <BrowserRouter>
                <ScrollIntoView>
                    <div className={classes.app}>
                        <Auth0Provider
                            domain={config.domain}
                            client_id={config.clientId}
                            redirect_uri={window.location.origin}
                            onRedirectCallback={onRedirectCallback}
                        >
                            <LandingPage/>
                        </Auth0Provider>
                    </div>
                </ScrollIntoView>
            </BrowserRouter>
        </ContextProvider>
    )
}


