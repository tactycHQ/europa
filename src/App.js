import React from 'react'
import Layout from "./LayoutComponents/Layout"
import {BrowserRouter} from 'react-router-dom'
import ContextProvider from "./Context"
import CssBaseline from '@material-ui/core/CssBaseline'
import {makeStyles} from "@material-ui/core"

const useStyles = makeStyles(theme => ({
    app:{
        backgroundColor:'#000E1C',
        height:'100vh',
        width:'100%'
    }
}))

export default function App() {
    const classes = useStyles()

    return (
        <ContextProvider>
            <CssBaseline/>
            <BrowserRouter>
                <div className={classes.app}>
                    <Layout/>
                </div>
            </BrowserRouter>
        </ContextProvider>
    )
}


