import React from 'react'
import LandingPage from "./ModeControllers/LandingPage";
import {BrowserRouter} from 'react-router-dom'
import ScrollIntoView from "./UtilityComponents/ScrollIntoView";
import CssBaseline from '@material-ui/core/CssBaseline'
import {makeStyles} from "@material-ui/core"
import {Auth0Provider} from "./react-auth0-spa";
import config from "./config/auth_config";

const useStyles = makeStyles(theme => ({
    app: {}
}))

export default function App() {
    const classes = useStyles()


    return (
            <BrowserRouter>
                <CssBaseline/>
                <ScrollIntoView>
                    <div className={classes.app}>
                        <Auth0Provider
                            domain={config.domain}
                            client_id={config.clientId}
                            redirect_uri={config.redirect_uri}
                            audience={config.audience}
                        >
                            <LandingPage/>
                        </Auth0Provider>
                    </div>
                </ScrollIntoView>
            </BrowserRouter>
    )
}


