import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import SummaryChart from "../Outputs/SummaryChart"
import SAChart from "../Outputs/SAChart"
import DistributionChart from "../Outputs/DistributionChart";
import {convert_format} from "../utils/utils";
import isEqual from "lodash.isequal";
import {getAvg} from "../utils/utils";


const chartColors = [
    '#004666',
    '#A5014B',
    '#247308',
    '#41C0EB',
    '#EC7404',
    '#00044E'
]

export default function Output(props) {


    const getWidth = () => {
        if (['summary', 'distributions', 'sensitivity', 'inputimportance'].includes(props.type)) {
            return '72.5%'
        } else {
            return '100%'
        }
    }
    let outputWidth = getWidth()


    //Defining Styles
    const useStyles = makeStyles(theme => ({
        root: {
            display: 'flex',
            minHeight: '100vh',
            width: outputWidth,
            marginLeft: '12%',
            flexWrap: 'wrap',
            justifyContent: 'center',
            padding: '8px',
        },
        summaryContainer: {
            display: 'flex',
            width: '100%',
            flexWrap: 'wrap'
        }

    }))
    const classes = useStyles()


    //Defining hooks
    const [currOutputCell, setCurrOutputCell] = useState('') //for output label selection from dropdown
    const [currCategory, setCurrCategory] = useState(props.outputs[0]['category']) //for category selection from dropdown
    const [summaryPrefs, setSummaryPrefs] = useState({}) //for chart preferences


    /// Handlers
    const handleOutputLabelChange = (event) => {
        setCurrOutputCell(event.target.value)
    }

    const handleOutputCategoryChange = (event) => {
        setCurrCategory(event.target.value)
        setCurrOutputCell('')
    }

    ///======== Utility Functions========
    //Returns outout address and category of dropdown
    const getOutAdd = () => {

        const outCat = props.outputs.find(output => (output.category === currCategory))

        let outAdd
        if (currOutputCell === '') {
            outAdd = Object.keys(outCat.labels)[0]
        } else {
            outAdd = currOutputCell
        }
        return [outAdd, outCat]
    }

    //Creates an input label map
    const generateInputLabelMap = () => {
        return props.inputs.reduce((acc, inputData) => {
                acc[inputData.address] = inputData.label
                return acc
            }, {}
        )
    }

    //For an input combo, returns the solution of output values
    const findSolution = (inputCombo) => {
        if (props.solutions && inputCombo) {
            const foundSolution = props.solutions.find(i => isEqual(i.inputs, inputCombo))
            return foundSolution.outputs
        } else {
            return "No solution found"
        }
    }

    //Creates rows and lines for SA charts i.e. range of output values over a bound
    const createLines = (saCombos, outAdd) => {

        return saCombos.map(chartData => {
            const flexInputs = chartData.inputs
            const bounds = chartData.bounds
            const add1 = flexInputs[0]
            const add2 = flexInputs[1]
            const add1_fmt = props.formats[add1]
            const add2_fmt = props.formats[add2]
            const bounds1 = bounds[0][add1]
            const bounds2 = bounds[1][add2]

            const lines = bounds1.map((value1) => {
                const row = bounds2.reduce((acc, value2) => {
                    const combo = {
                        ...props.currInputVal,
                        [add1]: value1,
                        [add2]: value2
                    }

                    const answer = findSolution(combo)[outAdd]

                    acc[convert_format(add2_fmt, value2)] = answer
                    return acc
                }, {})
                return {
                    [add1]: value1,
                    ...row
                }
            })

            return ({
                'lines': lines,
                'bounds1': bounds1,
                'bounds2': bounds2,
                'add1': add1,
                'add2': add2,
                'add1_fmt': add1_fmt,
                'add2_fmt': add2_fmt
            })
        })
    }

    ///======== Summary Chart Functions========

    //Adds labels and formats to solutions
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

    //Summary chart creator
    const createSummaryCharts = (solutionSet, idx) => {
        return (
            <SummaryChart
                key={"summary_" + solutionSet.category}
                category={solutionSet.category}
                currSolution={solutionSet.values}
                fill={chartColors[idx]}
                domain={solutionSet.domains}
                summaryPrefs={summaryPrefs}
                setSummaryPrefs={setSummaryPrefs}
            />
        )
    }


    ///======== SA Functions========
    const generateSAPairs = () => {
        return props.inputs.reduce((acc, v, i) =>
                acc.concat(props.inputs.slice(i + 1).map(w => [v.address, w.address])),
            [])
    }

    const createSAData = () => {

        const saPairs = generateSAPairs()

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

    const createSAcharts = (lineData, outAdd, outCat, out_fmt) => {
        return (
            <SAChart
                data={lineData}
                outAdd={outAdd}
                outCat={outCat}
                out_fmt={out_fmt}
                outputs={props.outputs}
                inputLabelMap={inputLabelMap}
                handleOutputLabelChange={handleOutputLabelChange}
                handleOutputCategoryChange={handleOutputCategoryChange}
            />
        )
    }


    // =========Distributions=======
    const createDistcharts = (currCategory, currOutputCell) => {
        return (
            <DistributionChart
                distributions={props.distributions}
                currSolution={currSolution}
                findSolution={findSolution}
                inputLabelMap={inputLabelMap}
                formats={props.formats}
                outputs={props.outputs}
                currCategory={currCategory}
                currOutputCell={currOutputCell}
                handleOutputLabelChange={handleOutputLabelChange}
                handleOutputCategoryChange={handleOutputCategoryChange}
                cases={props.cases}
            />
        )
    }


    // =========II=======
    const createImpacts = (outAdd) => {
        return props.inputs.map(input => {
            const inAdd = input.address
            const values = input.values

            const _values = values.reduce((acc, value) => {
                const outVals = []
                props.solutions.map(solution => {
                    if (solution.inputs[inAdd] === value) {
                        const outVal = solution.outputs[outAdd]
                        outVals.push(outVal)
                    }
                    return outVals
                })
                acc[value] = getAvg(outVals)
                return acc
            }, {})

            return {[inAdd]: _values}
        })

    }


    const createInputImptCharts = (lineData, outAdd, outCat, out_fmt) => {
        console.log(lineData)
    }


    // =========Final dispatcher=======
    const createCharts = () => {

        if (props.type === 'summary') {

            //Get relevant data for summary charts
            const summaryChartData = addLiveChartMetaData(currSolution)
            const summaryCharts = summaryChartData.map((solutionSet, idx) => {
                return createSummaryCharts(solutionSet, idx)
            })
            return (
                <div className={classes.summaryContainer}>
                    {summaryCharts}
                </div>)

        } else if (props.type === 'sensitivity') {

            //Get relevant data for SA charts
            const outCellData = getOutAdd()
            const saCombos = createSAData()

            const outAdd = outCellData[0]
            const outCat = outCellData[1]
            const out_fmt = props.formats[outAdd]
            const lineData = createLines(saCombos, outAdd)

            return createSAcharts(lineData, outAdd, outCat, out_fmt)

        } else if (props.type === 'distributions') {
            return createDistcharts(currCategory, currOutputCell)

        } else if (props.type === 'inputimportance') {

            //Get relevant data for II charts
            const outCellData = getOutAdd()
            const outAdd = outCellData[0]
            // const outCat = outCellData[1]
            // const out_fmt = props.formats[outAdd]
            const avgData = createImpacts(outAdd)
            console.log(avgData)

            // return createInputImptCharts(lineData, outAdd, outCat, out_fmt)
        }
    }


//Function executions
    const currSolution = findSolution(props.currInputVal)
    const inputLabelMap = generateInputLabelMap()
    const final_charts = createCharts()

    return (
        <div className={classes.root}>
            {final_charts}
        </div>
    )
}






