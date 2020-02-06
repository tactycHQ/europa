import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Dashboard from "../Content/Dashboard"
import Input from "../Content/InputsController";
import {Switch, Route} from 'react-router-dom'
import SideBar from "../Content/SideBar";
import IOController from "../IOSelections/IOController";
import SummaryPage from "../Features/SummaryPage";


export default function Content(props) {

    const [inputsBak, setInputsBak] = useState([])
    const [outputsBak, setOutputsBak] = useState([])

    // Defining Hooks
    const useStyles = makeStyles(theme => ({
        root: {
            display: 'flex',
            width: '100%',
            background: '#FEFEFD'
        },
        content: {
            display: 'flex',
            width: '100%'
        },
        menuBar: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '6px',
        },
    }))
    const classes = useStyles()


    //Input Selection Functions
    const generateIOSelector = () => {
        return (
            <Switch>
                <Route exact path="/spreadsheet">
                    <IOController
                        {...props}
                    />
                </Route>
            </Switch>
        )
    }

    const generateBackupIO = () => {
        setInputsBak(Array.from(props.inputs))
        setOutputsBak(Array.from(props.outputs))
    }

    const generateContent = () => {

        //MODE is LOADED
        if (props.mode === 'loaded') {
            return (
                <div className={classes.content}>
                    <SideBar className={classes.sidebar}
                             downloadModel={props.downloadModel}
                             generateBackupIO={generateBackupIO}
                             saveDash={props.saveDash}
                             outputs={props.outputs}/>
                    <Switch>
                        <Route exact path={"/summary"}>
                            <Dashboard
                                type="summary"
                                {...props}
                            />
                        </Route>
                        <Route exact path={"/dashboard"}>
                            <Dashboard
                                type="dashboard"
                                {...props}
                            />
                            <Input
                                {...props}
                            />
                        </Route>
                        <Route exact path="/distributions">
                            <Dashboard
                                type="distributions"
                                {...props}
                            />
                            <Input
                                {...props}
                            />
                        </Route>
                        <Route exact path="/inputimportance">
                            <Dashboard
                                type="inputimportance"
                                {...props}
                            />
                        </Route>
                        <Route exact path="/sensitivity">
                            <Dashboard
                                type="sensitivity"
                                {...props}
                            />
                            <Input
                                {...props}
                            />
                        </Route>
                        <Route exact path="/scenario">
                            <Dashboard
                                type="scenarioanalysis"
                                {...props}
                            />
                        </Route>
                        <Route exact path="/spreadsheet">
                            <IOController
                                {...props}
                                inputsBak={inputsBak}
                                outputsBak={outputsBak}
                            />
                        </Route>
                    </Switch>
                </div>
            )

            //MODE is PENDINGIO
        } else {
            return generateIOSelector()
        }
    }

    const contentEl = generateContent()

    return (
        <div className={classes.root}>
            {contentEl}
        </div>
    )
}


