import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Output from "../Content/Outputs"
import Input from "../Content/Inputs";
import {Switch, Route} from 'react-router-dom'
import ScenarioAnalysis from "../Sidebar/ScenarioAnalysis"
import DependencyGraph from "../Sidebar/DependencyGraph"
import isEqual from "lodash.isequal";
import SideBar from "../Content/SideBar";


export default function Content(props) {

    // Defining Hooks
    const useStyles = makeStyles(theme => ({
        root: {
            display: 'flex',
            width: '100%'
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


    // Custom Utility Functions
    const generateInputLabelMap = () => {
        return props.inputs.reduce((acc, inputData) => {
                acc[inputData.address] = inputData.label
                return acc
            }, {}
        )
    }
    const inputLabelMap = generateInputLabelMap()

    const findSolution = (inputCombo) => {
        if (props.solutions && inputCombo) {
            const foundSolution = props.solutions.find(i => isEqual(i.inputs, inputCombo))
            return foundSolution.outputs
        } else {
            return "No solution found"
        }
    }

    const addLiveChartMetaData = (solutionSet) => {
        const labelsInChart = props.outputs.map(output => {

                // Applying labels and formats
                const reformatted = Object.entries(output.labels).map(labelSet => {

                    return {
                        x: labelSet[1],
                        [output.category]: solutionSet[labelSet[0]],
                        format: props.formats[labelSet[0]]
                    }
                })


                // Adding max domains
                const max_domains = Object.entries(output.labels).map(labelSet => {
                    return props.distributions.max[labelSet[0]]
                })
                const max_domain = Math.max(...max_domains)


                // Adding min domains
                const min_domains = Object.entries(output.labels).map(labelSet => {
                    return props.distributions.min[labelSet[0]]
                })
                const min_domain = Math.min(...min_domains)

                return {
                    category: output.category,
                    values: reformatted,
                    domains: [min_domain, max_domain]
                }
            }
        )

        return labelsInChart
    }

    // SA Functions
    const generateSAPairs = () => {
        return props.inputs.reduce((acc, v, i) =>
                acc.concat(props.inputs.slice(i + 1).map(w => [v.address, w.address])),
            [])
    }
    const saPairs = generateSAPairs()

    const createSAData = () => {
        return saPairs.map(address => {

            const add1 = address[0]
            const add2 = address[1]

            const in1bounds = props.inputs.find(i1 => (i1.address === add1))
            const in2bounds = props.inputs.find(i2 => (i2.address === add2))

            return {
                inputs: [add1, add2],
                bounds: [{[add1]: in1bounds.values}, {[add2]: in2bounds.values}]
            }
        })
    }


// Function Executions
    const currSolution = findSolution(props.currInputVal)
    const summaryChartData = addLiveChartMetaData(currSolution)
    const saChartData = createSAData()


    //const customRoutes = summaryChartData.map(chartCategory => {
    //     return (
    //         <Route exact path={[`/outputs/${chartCategory.category}`]} key={chartCategory.category}>
    //             <SideBar className={classes.sidebar}/>
    //             <Output
    //                 type="detail"
    //                 summaryChartData={[chartCategory]}
    //                 saChartData={saChartData}
    //                 currInputVal={props.currInputVal}
    //                 findSolution = {findSolution}
    //                 chartSize={"100%"}
    //                 inputLabelMap={inputLabelMap}
    //                 formats={props.formats}
    //                 outputs={props.outputs}
    //                 domains={props.domains}
    //                 solutions={props.solutions}
    //             />
    //             <Input
    //                 handleSliderChange={props.handleSliderChange}
    //                 handleCaseChange={props.handleCaseChange}
    //                 currInputVal={props.currInputVal}
    //                 inputs={props.inputs}
    //                 checked={checked}
    //                 cases={props.cases}
    //             />
    //         </Route>
    //     )
    // })

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <SideBar className={classes.sidebar} outputs={props.outputs}/>
                <Switch>
                    <Route exact path={["/", "/dashboard"]}>
                        <Output
                            type="summary"
                            data={summaryChartData}
                            outputs={props.outputs}
                        />
                    </Route>
                    <Route exact path="/distributions">
                        <Output
                            type="distributions"
                            distributions={props.distributions}
                            currSolution={currSolution}
                            findSolution = {findSolution}
                            outputs={props.outputs}
                            solutions={props.solutions}
                            formats={props.formats}
                            inputLabelMap={inputLabelMap}
                            currInputVal={props.currInputVal}
                            cases={props.cases}
                        />
                    </Route>
                    <Route exact path="/sensitivity">
                        <Output
                            type="sensitivity"
                            data={saChartData}
                            outputs={props.outputs}
                            formats={props.formats}
                            findSolution = {findSolution}
                            inputLabelMap={inputLabelMap}
                            solutions={props.solutions}
                            currInputVal={props.currInputVal}
                        />
                    </Route>
                    <Route exact path="/inputimportance">
                        <Output
                            type="inputimportance"
                            data={summaryChartData}
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
                <Input
                    handleSliderChange={props.handleSliderChange}
                    handleCaseChange={props.handleCaseChange}
                    currInputVal={props.currInputVal}
                    inputs={props.inputs}
                    cases={props.cases}
                />
            </div>
        </div>
    )
}


