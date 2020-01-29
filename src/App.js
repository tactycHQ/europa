import React from 'react'
import Main from "./ModeControllers/Main"
import {BrowserRouter} from 'react-router-dom'
import ScrollToTop from 'react-router-scroll-top'
import ContextProvider from "./Context"
import CssBaseline from '@material-ui/core/CssBaseline'
import {makeStyles} from "@material-ui/core"

const useStyles = makeStyles(theme => ({
    app: {}
}))

export default function App() {
    const classes = useStyles()

    return (
        <ContextProvider>
            <CssBaseline/>
            <BrowserRouter>
                <ScrollToTop>
                    <div className={classes.app}>
                        <Main/>
                    </div>
                </ScrollToTop>
            </BrowserRouter>
        </ContextProvider>
    )
}


