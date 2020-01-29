import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core'
import SummaryChart from "../Features/SummaryChart"
import SensitivityAnalysis from "../Features/SensitivityAnalysis"
import DistributionChart from "../Features/DistributionChart";
import InputImportance from "../Features/InputImportance";
import ScenarioAnalysis from "../Features/ScenarioAnalysis";
import {getAvg, convert_format, getAvgfromKey, getDomains, getSumfromKey} from "../utils/utils";
import isEqual from "lodash.isequal";


export default function Dashboard(props) {

    const getWidth = () => {
        if (['summary', 'distributions', 'sensitivity'].includes(props.type)) {
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
        }
    }))
    const classes = useStyles()


    //=======Defining hooks=========
    const [currOutputCell, setCurrOutputCell] = useState('') //for output label selection from dropdown
    const [currCategory, setCurrCategory] = useState(props.outputs[0]['category']) //for category selection from dropdown
    const [summaryPrefs, setSummaryPrefs] = useState({}) //for chart preferences
    const [saInput1, setSAInput1] = useState('') //for category selection from dropdown
    const [saInput2, setSAInput2] = useState('') //for category selection from dropdown

    // Scenario Analysis Hooks
    const createDefaults = () => {

        return props.outputs.reduce((acc, output) => {
            const addresses = Object.entries(output.labels)

            addresses.forEach((pair) => {
                let address = pair[0]
                const _min = props.distributions.min[address]
                const _max = props.distributions.max[address]
                acc[address] = [_min, _max]
            })

            return acc
        }, {})
    }
    const createCheckDefaults = () => {
        return props.outputs.reduce((acc, output) => {
            const addresses = Object.entries(output.labels)

            addresses.forEach((pair) => {
                let address = pair[0]
                acc[address] = false
            })
            return acc
        }, {})
    }
    const [sa_value, setSAValue] = useState(() => createDefaults())
    const [checked, setChecked] = useState(() => createCheckDefaults())


    /// Handlers
    const handleOutputLabelChange = (event) => {
        setCurrOutputCell(event.target.value)
    }

    const handleOutputCategoryChange = (event) => {
        setCurrCategory(event.target.value)
        setCurrOutputCell('')
    }


    const handleSummaryTickMouseClick = (event, category) => {
        setCurrCategory(category)
        const _catdata = props.outputs.find(cat => cat.category === category)
        const _catlabels = _catdata.labels
        const catlabel = Object.keys(_catdata.labels).find(k => _catlabels[k] === event.value)
        setCurrOutputCell(catlabel)
    }

    const handleSummaryBarMouseClick = (event, category) => {
        setCurrCategory(category)
        const _catdata = props.outputs.find(cat => cat.category === category)
        const _catlabels = _catdata.labels
        const catlabel = Object.keys(_catdata.labels).find(k => _catlabels[k] === event.payload.x)
        setCurrOutputCell(catlabel)
    }


    ///======== Utility Functions========
    //Returns output address and category name of dropdown
    const getOutAdd = () => {

        const outCat = props.outputs.find(output => (output.category === currCategory))

        let outAdd
        if (currOutputCell === '') {
            // outAdd = Object.keys(outCat.labels).slice(-1)[0]
            outAdd = Object.keys(outCat.labels)[0]
        } else {
            outAdd = currOutputCell
        }
        return {'outAdd': outAdd, 'outCat': outCat}
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


    ///======== Summary Chart Functions========

    //Adds labels and formats to solutions
    const addLiveChartMetaData = (solutionSet) => {

        const labelsInChart = props.outputs.map(output => {

                // Applying labels and formats
                const reformatted = Object.entries(output.labels).map(labelSet => {
                    return {
                        x: labelSet[1],
                        value: solutionSet[labelSet[0]],
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
                    domains: getDomains(min_domain, max_domain)
                }
            }
        )

        return labelsInChart
    }

    //Mini Charts
    const distKeyStats = (outAdd) => {
        const xmin = props.distributions.min[outAdd]
        const xmax = props.distributions.max[outAdd]
        const xmean = props.distributions.mean[outAdd]
        const xstd = props.distributions.std[outAdd]

        return {
            'xmean': xmean,
            'xmax': xmax,
            'xmin': xmin,
            'xstd': xstd
        }
    }

    //Summary chart creator
    const createSummaryCharts = (summaryChartData, outAdd, outCat, out_fmt, inputLabelMap, distSummaryData, iiSummaryData) => {

        return (
            <SummaryChart
                summaryData={summaryChartData}
                distSummaryData={distSummaryData}
                iiSummaryData={iiSummaryData}
                outAdd={outAdd}
                outCat={outCat}
                inputLabelMap={inputLabelMap}
                formats={props.formats}
                summaryPrefs={summaryPrefs}
                setSummaryPrefs={setSummaryPrefs}
                handleSummaryBarMouseClick={handleSummaryBarMouseClick}
                handleSummaryTickMouseClick={handleSummaryTickMouseClick}
            />
        )
    }


    ///======== SA Functions========

    // SA Handlers
    const handleInput1Change = (event) => {
        setSAInput1(event.target.value)
    }

    const handleInput2Change = (event) => {
        setSAInput2(event.target.value)
    }

    //Creates rows and lines for SA charts i.e. range of output values over a bound
    const createLines = (saCombo, outAdd) => {

        const flexInputs = saCombo.inputs
        const bounds = saCombo.bounds
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
    }

    const getInput1 = () => {
        if (saInput1 === '') {
            return Object.keys(inputLabelMap)[0]
        } else {
            return saInput1
        }
    }

    const getInput2 = () => {
        if (saInput2 === '') {
            return Object.keys(inputLabelMap)[1]
        } else {
            return saInput2
        }
    }

    const createSAData = (input1, input2) => {

        // const saPairs = generateSAPairs()

        // return saPairs.map(address => {

        const add1 = input1
        const add2 = input2

        const in1bounds = props.inputs.find(i1 => (i1.address === add1))
        const in2bounds = props.inputs.find(i2 => (i2.address === add2))

        return {
            inputs: [add1, add2],
            bounds: [{[add1]: in1bounds.values}, {[add2]: in2bounds.values}]
        }

    }

    const createSAcharts = (lineData, outAdd, outCat, input1, input2) => {
        return (
            <SensitivityAnalysis
                data={lineData}
                outAdd={outAdd}
                outCat={outCat}
                formats={props.formats}
                outputs={props.outputs}
                inputLabelMap={inputLabelMap}
                input1={input1}
                input2={input2}
                handleOutputLabelChange={handleOutputLabelChange}
                handleOutputCategoryChange={handleOutputCategoryChange}
                handleInput1Change={handleInput1Change}
                handleInput2Change={handleInput2Change}
            />
        )
    }


    // =========Distributions=======
    const createDistcharts = (outAdd, outCat) => {
        return (
            <DistributionChart
                distributions={props.distributions}
                currSolution={currSolution}
                findSolution={findSolution}
                inputLabelMap={inputLabelMap}
                formats={props.formats}
                outputs={props.outputs}
                outCat={outCat}
                outAdd={outAdd}
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
            const in_fmt = props.formats[inAdd]
            const increments = input.values

            const averages = increments.reduce((acc, incr, idx) => {
                const outVals = []
                props.solutions.map(solution => {
                    if (solution.inputs[inAdd] === incr) {
                        outVals.push(solution.outputs[outAdd])
                    }
                    return outVals
                })
                acc.push({
                    "name": incr,
                    "value": getAvg(outVals)
                })
                return acc

            }, [])
            const delta = averages.reduce((_acc, average, idx) => {
                if (idx < averages.length - 1) {
                    _acc.push({
                        'name': `${convert_format(in_fmt, average.name)} to ${convert_format(in_fmt, averages[idx + 1].name)}`,
                        'value': averages[idx + 1].value - average.value
                    })
                }
                return _acc
            }, [])

            return {[inAdd]: delta}
        })

    }

    const createInputImptCharts = (avgData, iiSummaryData, outAdd, outCat) => {

        return (
            <InputImportance
                avgData={avgData}
                iiSummaryData={iiSummaryData}
                outAdd={outAdd}
                outCat={outCat}
                inputLabelMap={inputLabelMap}
                formats={props.formats}
                outputs={props.outputs}
                handleOutputLabelChange={handleOutputLabelChange}
                handleOutputCategoryChange={handleOutputCategoryChange}
            />
        )
    }

    const createIISummary = (avgData) => {
        const avgAcrossInput = avgData.reduce((acc, inptData) => {
            const inAdd = Object.keys(inptData)
            const inputLabel = inputLabelMap[inAdd]
            const inVal = Object.values(inptData)[0]

            acc.push({
                "name": inputLabel,
                "value": Math.abs(getAvgfromKey(inVal, "value")),
            })
            return acc
        }, [])

        const totals = getSumfromKey(avgAcrossInput, 'value')
        const contributions = avgAcrossInput.map(averages => {
            return ({
                "name": averages.name,
                "value": averages.value / totals
            })
        })

        return contributions
    }

    // ========ScenarioAnalysis=====


    // Scenario Analysis Handlers
    const handleOutSliderChange = (event, newValue, address) => {
        setSAValue(value => ({
            ...value,
            [address]: newValue
        }))
    }

    const handleCheckChange = (event, address) => {
        setChecked(checked => ({
            ...checked,
            [address]: event.target.checked
        }))
    }

    const createScenarioAnalysis = () => {

        return (
            <ScenarioAnalysis
                {...props}
                sa_value={sa_value}
                checked={checked}
                handleOutSliderChange={handleOutSliderChange}
                handleCheckChange={handleCheckChange}
                inputLabelMap={inputLabelMap}
            />
        )
    }


    ///// ===========Final dispatcher===========/////
    const createCharts = () => {


        const outCellData = getOutAdd()
        const {outAdd, outCat} = outCellData
        const out_fmt = props.formats[outAdd]


        if (props.type === 'summary') {


            //Get relevant data for summary charts
            const summaryChartData = addLiveChartMetaData(currSolution)
            const distSummaryData = distKeyStats(outAdd)
            const avgData = createImpacts(outAdd)
            const iiSummaryData = createIISummary(avgData)


            return createSummaryCharts(
                summaryChartData,
                outAdd,
                outCat,
                out_fmt,
                inputLabelMap,
                distSummaryData,
                iiSummaryData
            )


        } else if (props.type === 'sensitivity') {

            //Get relevant data for SA charts
            const input1 = getInput1()
            const input2 = getInput2()
            const saCombos = createSAData(input1, input2)

            const lineData = createLines(saCombos, outAdd)

            return createSAcharts(lineData, outAdd, outCat, input1, input2)

        } else if (props.type === 'distributions') {

            return createDistcharts(outAdd, outCat, out_fmt)

        } else if (props.type === 'inputimportance') {

            //Get relevant data for II charts
            const avgData = createImpacts(outAdd)
            const iiSummaryData = createIISummary(avgData)

            return createInputImptCharts(avgData, iiSummaryData, outAdd, outCat)

        } else if (props.type === 'scenarioanalysis') {

            //Get relevant data
            // const solutions = createScenario(outputRanges)

            return createScenarioAnalysis()
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






