import React, {useState, useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Output from "../dashboard/Outputs"
import Input from "../dashboard/Inputs";
import {getRefreshOutputsEager} from "../api/api";
import Sensitivity from "../sensitivity/Sensitivity";
import {Switch, Route} from 'react-router-dom'
import ScenarioAnalysis from "../scenario_analysis/ScenarioAnalysis";
import DependencyGraph from "../dependency_graph/DependencyGraph";


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

    const classes = useStyles()
    const [solutions, setSolutions] = useState(null)
    const [currSolution, setcurrSolution] = useState(null)
    const [inputVal, setInputVal] = useState(null)

    const refreshOutputs = async () => {
        const result = await getRefreshOutputsEager()
        setSolutions(result)
    }

    const handleSliderChange = (event, newValue) => {
        setInputVal(newValue)
    }

    const handleClick = () => {
        refreshOutputs()
    }

    useEffect(() => {

        const getInputIndex = (inputVal) => {
            const rangeVal = [0.3, 0.6, 0.9, 1.0]
            if (inputVal) {
                return rangeVal.indexOf(inputVal) * 100
            } else {
                return 0
            }
        }

        const selectSolutions = (solutions, inputVal) => {
            let clean = {}
            if (solutions) {
                let idx = getInputIndex(inputVal)
                clean.inputs = solutions[idx].inputs
                clean.outputs = solutions[idx].outputs
                return Object.entries(clean.outputs).map(i => ({
                    name: i[0],
                    Value: i[1]
                }))
            }
        }

        setcurrSolution((selectSolutions(solutions, inputVal)))

    }, [solutions, inputVal])

    return (
        <div className={classes.root}>
            <Switch>
                <Route exact path={["/","/dashboard"]}>
                    <Output data={currSolution}/>
                    <Input refreshClick={handleClick} handleSliderChange={handleSliderChange}/>
                </Route>
                <Route exact path="/sensitivity">
                    <Sensitivity/>
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


