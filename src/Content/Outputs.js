import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core'
import SummaryChart from "../Outputs/SummaryChart"
import SAChart from "../Outputs/SAChart"
import DistributionChart from "../Outputs/DistributionChart";
import InputImportance from "../Outputs/InputImportance";
import {convert_format} from "../utils/utils";
import isEqual from "lodash.isequal";
import {getAvg} from "../utils/utils";
import Paper from "@material-ui/core/Paper";
import {NavLink} from "react-router-dom";
import Fade from "@material-ui/core/Fade";


export default function Output(props) {


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
        },
        keyStatsContainer: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            alignItems: 'center',
            maxwidth: '100%',
            marginLeft: '2.5%',
            marginRight: '2.5%',
            marginTop: '1%',
            marginBottom: '0%',
            background: 'linear-gradient(#F4F4F4 10%,#EBEEF0)',
        },
        keyStatsHeader: {
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            marginTop: '5px',
            marginBottom: '0px',
            color: 'red',
            // background:'red'
        },
        keyStatsPaper: {
            display: 'flex',
            flexDirection: 'column',
            minWidth: '20%',
            margin: '1%',
            padding: '1%',
            background: '#4595B9'
        },
        headerText: {
            color: '#3C4148',
            fontFamily: 'Questrial',
            margin: '5px',
            fontWeight: '20',
            fontSize: '1.2em'
        },
        statsText: {
            color: '#F4F9E9',
            fontFamily: 'Questrial',
            // textAlign:'center',
            margin: '0px',
            fontWeight: '20',
            fontSize: '1em'
        },
        statFigure: {
            color: '#F4F9E9',
            textAlign: 'center',
            margin: '0px',
            fontFamily: 'Questrial',
            fontWeight: '10',
            fontSize: '1.5em'
        },
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
                    domains: [min_domain, max_domain]
                }
            }
        )

        return labelsInChart
    }


    //Mini Charts
    const distKeyStats = (outAdd, out_fmt, outCat) => {
        const xmin = props.distributions.min[outAdd]
        const xmax = props.distributions.max[outAdd]
        const xmean = props.distributions.mean[outAdd]
        const xstd = props.distributions.std[outAdd]


        return (
            <Paper className={classes.keyStatsContainer} elevation={3}>

                <div className={classes.keyStatsHeader}>
                    <h2 className={classes.headerText}>{`Key Stats for ${outCat.category} ${outCat.labels[outAdd]}`}</h2>
                </div>
                <Fade in={true} timeout={1000}>
                    <Paper className={classes.keyStatsPaper}>
                        <NavLink to="/distributions" style={{textDecoration: 'none'}}>
                            <h2 className={classes.statsText}>{'Mean'}</h2>
                            <h3 className={classes.statFigure}>{convert_format(out_fmt, xmean)}</h3>
                        </NavLink>
                    </Paper>
                </Fade>
                <Fade in={true} timeout={1000}>
                    <Paper className={classes.keyStatsPaper}>
                        <NavLink to="/distributions" style={{textDecoration: 'none'}}>
                            <h2 className={classes.statsText}>{'Minimum'}</h2>
                            <h3 className={classes.statFigure}>{convert_format(out_fmt, xmin)}</h3>
                        </NavLink>
                    </Paper>
                </Fade>
                <Fade in={true} timeout={1000}>
                    <Paper className={classes.keyStatsPaper}>
                        <NavLink to="/distributions" style={{textDecoration: 'none'}}>
                            <h2 className={classes.statsText}> {'Maximum'}</h2>
                            <h3 className={classes.statFigure}>{convert_format(out_fmt, xmax)}</h3>
                        </NavLink>
                    </Paper>
                </Fade>
                <Fade in={true} timeout={1000}>
                    <Paper className={classes.keyStatsPaper}>
                        <NavLink to="/distributions" style={{textDecoration: 'none'}}>
                            <h2 className={classes.statsText}> {'Standard Deviation'}</h2>
                            <h3 className={classes.statFigure}>{convert_format(out_fmt, xstd)}</h3>
                        </NavLink>
                    </Paper>
                </Fade>

            </Paper>
        )
    }

    //Summary chart creator
    const createSummaryCharts = (summaryChartData, outAdd, outCat, out_fmt, inputLabelMap) => {

        const miniCharts = distKeyStats(outAdd, out_fmt, outCat)

        return (
            <SummaryChart
                summaryData={summaryChartData}
                miniCharts={miniCharts}
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
                formats={props.formats}
                outputs={props.outputs}
                inputLabelMap={inputLabelMap}
                handleOutputLabelChange={handleOutputLabelChange}
                handleOutputCategoryChange={handleOutputCategoryChange}
            />
        )
    }


    // =========Distributions=======
    const createDistcharts = (outAdd, outCat, out_fmt) => {
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


    const createInputImptCharts = (avgData, outAdd, outCat, out_fmt) => {

        return (
            <InputImportance
                avgData={avgData}
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


    // =========Final dispatcher=======
    const createCharts = () => {

        const outCellData = getOutAdd()
        const {outAdd, outCat} = outCellData
        const out_fmt = props.formats[outAdd]

        if (props.type === 'summary') {


            //Get relevant data for summary charts
            const summaryChartData = addLiveChartMetaData(currSolution)
            return createSummaryCharts(summaryChartData, outAdd, outCat, out_fmt, inputLabelMap)


        } else if (props.type === 'sensitivity') {

            //Get relevant data for SA charts
            const saCombos = createSAData()
            const lineData = createLines(saCombos, outAdd)

            return createSAcharts(lineData, outAdd, outCat, out_fmt)

        } else if (props.type === 'distributions') {

            return createDistcharts(outAdd, outCat, out_fmt)

        } else if (props.type === 'inputimportance') {

            //Get relevant data for II charts
            const avgData = createImpacts(outAdd)

            return createInputImptCharts(avgData, outAdd, outCat, out_fmt)
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






