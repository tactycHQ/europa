import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Output from "../Content/Outputs"
import Input from "../Content/Inputs";
import Sensitivity from "../Sidebar/Sensitivity";
import {Switch, Route} from 'react-router-dom'
import ScenarioAnalysis from "../Sidebar/ScenarioAnalysis"
import DependencyGraph from "../Sidebar/DependencyGraph"
import ToggleInput from "../Other/ToggleInput"
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
    const [checked, setChecked] = React.useState(true);


    // Custom Functions
    const generateInputLabelMap = () => {
        return props.inputs.reduce((acc, inputData) => {
                acc[inputData.address] = inputData.label
                return acc
            }, {}
        )
    }

    // const generateOutputLabelMap = () => {
    //     return props.outputs.reduce((acc, outputData) => {
    //
    //             Object.entries(outputData.labels).map(addressLabel => {
    //                 acc[addressLabel[0]] = {
    //                     category: outputData.category,
    //                     label: addressLabel[1]
    //                 }
    //             })
    //             return acc
    //         }, {}
    //     )
    // }

    const findSolution = (inputCombo) => {
        // console.log(inputCombo)
        if (props.solutions && inputCombo) {
            const foundSolution = props.solutions.find(i => isEqual(i.inputs, inputCombo))
            return foundSolution.outputs
        } else {
            return "No solution found"
        }
    }

    const extractLiveChartMetaData = (solutionSet) => {
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
                    return props.domains.max[labelSet[0]]
                })
                const max_domain = Math.max(...max_domains)


                // Adding min domains
                const min_domains = Object.entries(output.labels).map(labelSet => {
                    return props.domains.min[labelSet[0]]
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

    // SA1 Functions
    const generateSAPairs = () => {
        return props.inputs.reduce((acc, v, i) =>
                acc.concat(props.inputs.slice(i + 1).map(w => [v.address, w.address])),
            [])
    }


    const saPairs = generateSAPairs()
    // console.log(saPairs)

    // const createSAcombos = () => {
    //     const result = saPairs.map(pair => {
    //         const foundInputs = pair.map(inputAddress => {
    //             return props.inputs.find(i => (i.address === inputAddress))
    //         })
    //
    //         const in1 = foundInputs[0]
    //         const in2 = foundInputs[1]
    //
    //         return in1.values.map(in1Val => {
    //             return in2.values.map(in2Val => {
    //                 return {
    //                     ...props.currInputVal,
    //                     [in2.address]: in2Val,
    //                     [in1.address]: in1Val
    //                 }
    //             })
    //         })
    //     })
    //     return result
    // }
    const inputLabelMap = generateInputLabelMap()

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

    const addCombos = () => {
        return sa_data.reduce((acc, data) => {

            const arr1 = Object.entries(data.bounds[0])
            const arr2 = Object.entries(data.bounds[1])
            const aName = arr1[0][0]
            const bName = arr2[0][0]


            const f = (a, b) => [].concat(...a.map(_a => b.map(_b => ({[aName]: _a, [bName]: _b}))))
            const cartesian = (a, b) => (b ? cartesian(f(a, b)) : a)

            data['combo'] = cartesian(arr1[0][1], arr2[0][1])
            return acc
        }, sa_data)
    }

    const addSolution = () => {
        return sa_combos.reduce((acc, inputCombo) => {
            const solutions = inputCombo.combo.map(states => {
                const withCurr = {
                    ...props.currInputVal,
                    ...states
                }
                return findSolution(withCurr)
            })

            inputCombo['solutions'] = solutions
            return acc
        }, sa_combos)
    }


// Function Executions
    const liveSolutionSet = findSolution(props.currInputVal)
    const liveChartData = extractLiveChartMetaData(liveSolutionSet)
    const sa_data = createSAData()
    const sa_combos = addCombos()
    const saChartData = addSolution()


    const customRoutes = liveChartData.map(chartCategory => {

        return (
            <Route exact path={[`/outputs/${chartCategory.category}`]} key={chartCategory.category}>
                <SideBar className={classes.sidebar} outputs={props.outputs}/>
                <Output
                    type="detail"
                    liveChartData={[chartCategory]}
                    saChartData={saChartData}
                    chartSize={"100%"}
                />
                <Input
                    handleSliderChange={props.handleSliderChange}
                    handleCaseChange={props.handleCaseChange}
                    currInputVal={props.currInputVal}
                    inputs={props.inputs}
                    checked={checked}
                    cases={props.cases}
                />
            </Route>
        )
    })

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <Switch>
                    <Route exact path={["/", "/dashboard"]}>
                        <SideBar className={classes.sidebar} outputs={props.outputs}/>
                        <Output
                            type="summary"
                            liveChartData={liveChartData}
                        />
                        <Input
                            handleSliderChange={props.handleSliderChange}
                            handleCaseChange={props.handleCaseChange}
                            currInputVal={props.currInputVal}
                            inputs={props.inputs}
                            checked={checked}
                            cases={props.cases}
                        />
                    </Route>
                    <Route exact path="/sensitivity">
                        <SideBar className={classes.sidebar} outputs={props.outputs}/>
                        <Output
                            type="detail"
                            liveChartData={liveChartData}
                            saChartData={saChartData}
                        />
                        <Input
                            handleSliderChange={props.handleSliderChange}
                            handleCaseChange={props.handleCaseChange}
                            currInputVal={props.currInputVal}
                            inputs={props.inputs}
                            checked={checked}
                            cases={props.cases}
                        />
                    </Route>
                    <Route exact path="/scenario">
                        <SideBar className={classes.sidebar} outputs={props.outputs}/>
                        <ScenarioAnalysis/>
                    </Route>
                    <Route exact path="/dependency">
                        <DependencyGraph/>
                    </Route>
                    <Route exact path="/home">
                        <div>This is home</div>
                    </Route>
                    {customRoutes}
                </Switch>
            </div>
        </div>
    )
}


