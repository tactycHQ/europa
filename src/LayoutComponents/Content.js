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
    const createSAcombos = () => {
        return props.inputs.map(input => {
                let combo = input.values.map(value => {
                        return {
                            ...props.currInputVal,
                            [input.address]: value
                        }
                    }
                )
                return {[input.address]: combo}
            }
        )
    }

    const findSASolution = () => {
        return sa_combos.map(inputCombo => {
                const input_address = Object.keys(inputCombo)[0]
                const input_combos = inputCombo[input_address]

                const output_answers = input_combos.map(combo => {
                        const answers = findSolution(combo)
                        return {
                            input: input_address,
                            inputValue: combo[input_address],
                            format: props.formats[input_address],
                            outputs: {...answers}
                        }
                    }
                )
                return output_answers
            }
        )
    }

    const arrangeByCategory = () => {
        return props.outputs.map(output => {
            const _payload = sa_solutions.map(solution => {
                    const solutionPayload = solution.map(singleSolution => {

                            const __data = Object.entries(output.labels).reduce((acc, addresslabel) => {
                                acc[addresslabel[1]] = singleSolution.outputs[addresslabel[0]]
                                return acc
                            }, {})


                            return {
                                [inputLabelMap[singleSolution.input]]: singleSolution.inputValue,
                                ...__data
                            }
                        }
                    )

                    return {
                        category: output.category,
                        title: inputLabelMap[solution[0].input],
                        inputFormat: props.formats[solution[0].input],
                        outputFormat: props.formats[Object.keys(output.labels)[0]],
                        data: solutionPayload
                    }
                }
            )
            return _payload
        })
    }


//Toggle Input Handler
//     const handleChange = () => {
//         setChecked(prev => !prev);
//     }


// Function Executions
    const inputLabelMap = generateInputLabelMap()
    const liveSolutionSet = findSolution(props.currInputVal)
    const liveChartData = extractLiveChartMetaData(liveSolutionSet)
    const sa_combos = createSAcombos()
    const sa_solutions = findSASolution()
    const sa_charts = arrangeByCategory()

    const customRoutes = liveChartData.map(chartCategory => {
        return (
            <Route exact path={[`/outputs/${chartCategory.category}`]} key={chartCategory.category}>
                <SideBar className={classes.sidebar} outputs={props.outputs}/>
                <Output
                    type="detail"
                    liveChartData={[chartCategory]}
                    saChartData={sa_charts}
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
                            saChartData={sa_charts}
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


