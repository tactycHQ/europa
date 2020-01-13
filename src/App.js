import React from 'react'
import Layout from "./LayoutComponents/Layout"
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
                        <Layout/>
                    </div>
                </ScrollToTop>
            </BrowserRouter>
        </ContextProvider>
    )
}


