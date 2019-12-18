import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Output from "../SideBarComponents/dashboard/Outputs"
import Input from "../SideBarComponents/dashboard/Inputs";
import Sensitivity from "../SideBarComponents/Sensitivity";
import {Switch, Route} from 'react-router-dom'
import ScenarioAnalysis from "../SideBarComponents/ScenarioAnalysis"
import DependencyGraph from "../SideBarComponents/DependencyGraph"
import ToggleInput from "../MenuBar/ToggleInput"
import isEqual from "lodash.isequal";


export default function Content(props) {


    // Defining Hooks
    const useStyles = makeStyles(theme => ({
        root: {
            display: 'flex',
            flexDirection: 'column',
            marginLeft: '13.0%',
            width: '100%',
        },
        menuBar: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '6px',
        },
        content: {
            display: 'flex'
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

    const generateOutputLabelMap = () => {
        return props.outputs.reduce((acc, outputData) => {

                Object.entries(outputData.labels).map(addressLabel => {
                    acc[addressLabel[0]] = {
                        category: outputData.category,
                        label: addressLabel[1]
                    }
                })
                return acc
            }, {}
        )
    }

    const findSolution = (inputCombo) => {
        // console.log(inputCombo)
        if (props.solutions && inputCombo) {
            const foundSolution = props.solutions.find(i => isEqual(i.inputs, inputCombo))
            return foundSolution.outputs
        } else {
            return "No solution found"
        }
    }

    const extractLiveChartMetaData = (solutions) => {
        const labelsInChart = props.outputs.map(data => {
                const reformatted = Object.entries(data.labels).map(labelSet => {
                    return {
                        x: labelSet[1],
                        [data.category]: solutions[labelSet[0]],
                        format: props.formats[labelSet[0]]
                    }
                })

                const max_domains = Object.entries(data.labels).map(labelSet => {
                    return props.domains.max[labelSet[0]]
                })

                const min_domains = Object.entries(data.labels).map(labelSet => {
                    return props.domains.min[labelSet[0]]
                })

                const max_domain = Math.max(...max_domains)
                const min_domain = Math.min(...min_domains)

                return {
                    title: data.category,
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
                                [inputLabelMap[singleSolution.input]]:singleSolution.inputValue,
                                ...__data
                                }
                        }
                    )
                    return {
                        category: output.category,
                        title: inputLabelMap[solution[0].input],
                        data: solutionPayload
                    }
                }
            )
            return _payload
        })
    }


//Toggle Input Handler
    const handleChange = () => {
        setChecked(prev => !prev);
    }


// Function Executions
    const inputLabelMap = generateInputLabelMap()
    // const outputLabelMap = generateOutputLabelMap()


    const liveSolutions = findSolution(props.currInputVal)
    const chartData = extractLiveChartMetaData(liveSolutions)

    const sa_combos = createSAcombos()
    const sa_solutions = findSASolution()
    const sa_charts = arrangeByCategory()


// console.log(props.outputs)
// const final_sa = replaceWithLabels(sa_solutions)


// console.log(props.inputs)

    return (
        <div className={classes.root}>
            <div className={classes.menuBar}>
                <ToggleInput checked={checked} handleChange={handleChange}/>
            </div>

            <div className={classes.content}>
                <Switch>
                    <Route exact path={["/", "/dashboard"]}>
                        <Output
                            chartData={chartData}
                            saChartData={sa_charts}
                        />
                        <Input
                            handleSliderChange={props.handleSliderChange}
                            defaultInputVal={props.defaultInputVal}
                            inputs={props.inputs}
                            checked={checked}/>
                    </Route>
                    <Route exact path="/sensitivity">
                        {/*<Output*/}
                        {/*    {...other}/>*/}
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

            < /div>
                )
                }


