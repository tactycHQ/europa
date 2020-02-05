import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Output from "../Content/Dashboard"
import Input from "../Content/InputsController";
import {Switch, Route} from 'react-router-dom'
import SideBar from "../Content/SideBar";
import IOController from "../IOSelections/IOController";


export default function Content(props) {


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


    const generateContent = () => {

        //MODE is LOADED
        if (props.mode === 'loaded') {
            return (
                <div className={classes.content}>
                    <SideBar className={classes.sidebar} saveDash={props.saveDash} outputs={props.outputs}/>
                    <Switch>
                        <Route exact path={"/dashboard"}>
                            <Output
                                type="summary"
                                {...props}
                            />
                            <Input
                                {...props}
                            />
                        </Route>
                        <Route exact path="/distributions">
                            <Output
                                type="distributions"
                                {...props}
                            />
                            <Input
                                {...props}
                            />
                        </Route>
                        <Route exact path="/inputimportance">
                            <Output
                                type="inputimportance"
                                {...props}
                            />
                        </Route>
                        <Route exact path="/sensitivity">
                            <Output
                                type="sensitivity"
                                {...props}
                            />
                            <Input
                                {...props}
                            />
                        </Route>
                        <Route exact path="/scenario">
                            <Output
                                type="scenarioanalysis"
                                {...props}
                            />
                        </Route>
                        <Route exact path="/spreadsheet">
                            <IOController
                                {...props}
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


