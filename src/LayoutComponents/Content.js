import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Output from "../SideBarComponents/dashboard/Outputs"
import Input from "../SideBarComponents/dashboard/Inputs";
import Sensitivity from "../SideBarComponents/Sensitivity";
import {Switch, Route} from 'react-router-dom'
import ScenarioAnalysis from "../SideBarComponents/ScenarioAnalysis";
import DependencyGraph from "../SideBarComponents/DependencyGraph";


const useStyles = makeStyles(theme => ({
            root: {
                display: 'flex',
                width: '85%',
                marginLeft: '15%'
            },
        }
    )
)

export default function Content(props) {

    const {currSolution, outputs, charts,...other} = props

    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Switch>
                <Route exact path={["/", "/dashboard"]}>
                    <Output currSolution={currSolution} outputs={outputs} charts={charts}/>
                    <Input {...other}/>
                </Route>
                <Route exact path="/sensitivity">
                    <Output currSolution={currSolution} outputs={outputs} charts={charts}/>
                    {/*<Sensitivity/>*/}
                </Route>
                <Route exact path="/scenario">
                    <ScenarioAnalysis/>
                </Route>
                <Route exact path="/dependency">
                    <DependencyGraph/>
                </Route>
            </Switch>

        </div>
    )
}


