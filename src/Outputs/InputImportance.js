import React from 'react';
import {makeStyles} from '@material-ui/core/styles'
import {
    AreaChart,
    BarChart,
    Bar,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine,
    Label
} from 'recharts'
import Paper from '@material-ui/core/Paper'
import {Card} from "@material-ui/core";
import {LabelSelector} from "./LabelSelector";
import {convert_format} from "../utils/utils"
import Fade from '@material-ui/core/Fade'


export default function Distribution(props) {


    //Styles
    const useStyles = makeStyles(theme => ({
        distCard: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            background: '#FEFEFD'
        },
        paper: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '1%',
            padding: '1%',
            background: 'linear-gradient(#F4F4F4 10%,#EBEEF0)',
            // borderRadius:'64px'
        },
        keyStatsContainer: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            alignItems: 'center',
            width: '100%',
            margin: '1%',
        },
        keyStatsPaper: {
            display: 'flex',
            flexDirection: 'column',
            // justifyContent: 'center',
            // alignItems: 'center',
            minWidth: '20%',
            // maxHeight:'5%',
            margin: '1%',
            padding: '1%',
            background: '#4595B9'
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
            fontSize: '2.0em'
        },
        cardHeaderContainer: {
            display: 'flex',
            justifyContent: 'space-between',
        },
        cardTitleHeader: {
            color: '#4F545A',
            fontFamily: 'Questrial',
            fontWeight: '20',
            fontSize: '2em',
            marginTop: '10px',
            marginLeft: '15px',
            marginBottom: '20px',
            // backgroundColor:'blue'
        },
        chartTitle: {
            fontFamily: 'Questrial',
            // background: '#7C97B7',
            fontSize: '1.2em',
            fontWeight: '300',
            color: '#3C4148',
            marginBottom: '0'
        },
        chartNote: {
            fontFamily: 'Questrial',
            fontSize: '0.9em',
            fontWeight: '300',
            color: '#3C4148',
            marginTop: '0'
        },
        xlabel: {
            fontFamily: 'Questrial',
            fontSize: '1.0em',
            fontWeight: '100',
            fill: '#4F545A'
        },
        ylabel: {
            fontFamily: 'Questrial',
            fontSize: '1.0em',
            fill: '#4F545A',
            textAnchor: 'left'
        }
    }))
    const classes = useStyles()
    const color_url = "url(#" + '#006E9F' + ")"
    const area_color_url = "url(#" + '#006E9F' + ")"


    // Get address of outout label selected from dropdown
    const outCat = props.outputs.find(output => (output.category === props.currCategory))

    const getOutAdd = () => {
        let outAdd
        if (props.currOutputCell === '') {
            outAdd = Object.keys(outCat.labels)[0]
        } else {
            outAdd = props.currOutputCell
        }
        return outAdd
    }
    const outAdd = getOutAdd()
    const outAdd_fmt = props.formats[outAdd]
    const probs = props.distributions.prob[outAdd]
    // Object.keys(probs).forEach(function (el) {
    //     probs[el] = parseFloat(probs[el])
    // })


    const processCases = () => {

        const probKey = props.currSolution[outAdd].toFixed(3)
        return Object.entries(props.cases[0]).reduce((acc, caseData) => {
            const caseName = caseData[0]
            const inputCombo = caseData[1]
            const caseOutVal = props.findSolution(inputCombo)[outAdd].toFixed(3)
            acc[caseName] = [caseOutVal, probs[caseOutVal][1]]
            return acc
        }, {'Current': [props.currSolution[outAdd], probs[probKey][1]]})
    }


    //Tick formatter

    const generateHistChart = (outAdd, caseVals, counts, bin_centers) => {
        const hist_data = createHistogramData(bin_centers, counts)
        const referenceBars = createRefBars(caseVals, "count")

        return (
            <Paper className={classes.paper} elevation={2}>
                <h3 className={classes.chartTitle}>Histogram for {props.currCategory}, {outCat.labels[outAdd]}</h3>
                <h3 className={classes.chartNote}><em>Represents relative frequency of values assuming a standrard bin
                    width</em></h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={hist_data}
                        margin={{top: 50, right: 100, left: 100, bottom: 0}}
                        barSize={20}
                        // style={{background: 'linear-gradient(#FFFFFF 60%,#F4F4F4)'}}
                    >
                        <defs>
                            <linearGradient id={'#006E9F'} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={'#006E9F'} stopOpacity={0.5}/>
                                <stop offset="75%" stopColor={'#006E9F'} stopOpacity={0.25}/>
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="value"
                            type="number"
                            tick={<CustomizedXAxisTick fmt={outAdd_fmt}/>}
                            ticks={bin_centers}
                            tickLine={false}
                            interval={0}
                            // padding={{top: 30, bottom: 30}}
                            stroke='#004666'
                            // scale="linear"
                            domain={[props.distributions.min[outAdd], props.distributions.max[outAdd]]}
                        />
                        <Label
                            value={`${props.inputLabelMap[outAdd]}`}
                            position="bottom"
                            className={classes.xlabel}
                        />
                        <YAxis
                            yAxisId="count"
                            hide={true}/>
                        <Tooltip/>
                        {referenceBars}
                        <Bar
                            yAxisId="count"
                            dataKey="count"
                            fill={color_url}
                            isAnimationActive={true}>
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </Paper>
        )
    }

    const generateKeyStats = (outAdd) => {
        const xmin = props.distributions.min[outAdd]
        const xmax = props.distributions.max[outAdd]
        const xmean = props.distributions.mean[outAdd]
        const xstd = props.distributions.std[outAdd]

        return (
            <div className={classes.keyStatsContainer}>
                <Paper className={classes.keyStatsPaper} elevation={3}>
                    <h2 className={classes.statsText}>{'Mean'}</h2>
                    <h3
                        className={classes.statFigure}>{convert_format(outAdd_fmt, xmean)}
                    </h3>
                </Paper>
                <Paper className={classes.keyStatsPaper} elevation={3}>
                    <h2 className={classes.statsText}>{'Minimum'}</h2>
                    <h3 className={classes.statFigure}>{convert_format(outAdd_fmt, xmin)}</h3>
                </Paper>
                <Paper className={classes.keyStatsPaper} elevation={3}>
                    <h2 className={classes.statsText}> {'Maximum'}</h2>
                    <h3 className={classes.statFigure}>{convert_format(outAdd_fmt, xmax)}</h3>
                </Paper>
                <Paper className={classes.keyStatsPaper} elevation={3}>
                    <h2 className={classes.statsText}> {'Standard Deviation'}</h2>
                    <h3 className={classes.statFigure}>{convert_format(outAdd_fmt, xstd)}</h3>
                </Paper>
            </div>
        )
    }


    //Execute Functions
    const caseVals = processCases()
    const counts = props.distributions.count[outAdd]
    const bin_centers = createBinCenters(counts)
    const histChart = generateHistChart(outAdd, caseVals, counts, bin_centers)
    const probChart = generateProbChart(outAdd, caseVals, bin_centers)
    const keyStats = generateKeyStats(outAdd)

    return (
        <Card
            className={classes.distCard}
            key={"dist" + props.currOutputCell}
            // raised={true}
            elevation={3}
        >
            <div className={classes.cardHeaderContainer}>
                <h2 className={classes.cardTitleHeader}>Output Distributions</h2>
            </div>
            <LabelSelector
                type="withLabel"
                outputs={props.outputs}
                handleOutputLabelChange={props.handleOutputLabelChange}
                handleOutputCategoryChange={props.handleOutputCategoryChange}
                currOutputCell={props.currOutputCell}
                currCategory={props.currCategory}/>
            <Fade in={true} timeout={1000}>
                {keyStats}
            </Fade>
            {histChart}
            {probChart}
        </Card>
    )

}
