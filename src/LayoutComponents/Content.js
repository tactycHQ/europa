import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Output from "../Content/Outputs"
import Input from "../Content/Inputs";
import {Switch, Route} from 'react-router-dom'
import ScenarioAnalysis from "../Sidebar/ScenarioAnalysis"
import DependencyGraph from "../Sidebar/DependencyGraph"
import SideBar from "../Content/SideBar";


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
        }
    }))
    const classes = useStyles()


    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <SideBar className={classes.sidebar} outputs={props.outputs}/>
                <Switch>
                    <Route exact path={["/", "/dashboard"]}>
                        <Output
                            type="summary"
                            distributions={props.distributions}
                            solutions={props.solutions}
                            currInputVal={props.currInputVal}
                            formats={props.formats}
                            outputs={props.outputs}
                            inputs={props.inputs}
                        />
                        <Input
                            handleSliderChange={props.handleSliderChange}
                            handleCaseChange={props.handleCaseChange}
                            currInputVal={props.currInputVal}
                            inputs={props.inputs}
                            cases={props.cases}
                            formats={props.formats}
                        />
                    </Route>
                    <Route exact path="/distributions">
                        <Output
                            type="distributions"
                            distributions={props.distributions}
                            outputs={props.outputs}
                            inputs={props.inputs}
                            solutions={props.solutions}
                            formats={props.formats}
                            currInputVal={props.currInputVal}
                            cases={props.cases}
                        />
                        <Input
                            handleSliderChange={props.handleSliderChange}
                            handleCaseChange={props.handleCaseChange}
                            currInputVal={props.currInputVal}
                            inputs={props.inputs}
                            cases={props.cases}
                            formats={props.formats}
                        />
                    </Route>
                    <Route exact path="/inputimportance">
                        <Output
                            type="inputimportance"
                            inputs={props.inputs}
                            outputs={props.outputs}
                            solutions={props.solutions}
                            formats={props.formats}
                        />
                    </Route>
                    <Route exact path="/sensitivity">
                        <Output
                            type="sensitivity"
                            inputs={props.inputs}
                            outputs={props.outputs}
                            solutions={props.solutions}
                            formats={props.formats}
                            currInputVal={props.currInputVal}
                        />
                        <Input
                            handleSliderChange={props.handleSliderChange}
                            handleCaseChange={props.handleCaseChange}
                            currInputVal={props.currInputVal}
                            inputs={props.inputs}
                            cases={props.cases}
                            formats={props.formats}
                        />
                    </Route>
                    <Route exact path="/scenario">
                        <ScenarioAnalysis/>
                    </Route>
                    <Route exact path="/dependency">
                        <DependencyGraph/>
                    </Route>
                    <Route exact path="/home">
                        <div>This is home</div>
                    </Route>
                </Switch>
            </div>
        </div>
    )
}


