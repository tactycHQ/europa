import React from 'react';
import {makeStyles} from '@material-ui/core/styles'
import {
    BarChart,
    Bar,
    LabelList,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    ReferenceLine
} from 'recharts'
import Paper from '@material-ui/core/Paper'
import {Card} from "@material-ui/core";
import {LabelSelector} from "./LabelSelector";
import {getAvgfromKey, getMaxfromKey, getMinfromKey, getDomains, convert_format} from "../utils/utils";
import Fade from '@material-ui/core/Fade'

const chartColors = [
    '#006E9F',
    '#A5014B',
    '#3DA32D',
    '#4B719C',
    '#FE7F2D',
    '#00044E'
]


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
        deltaChartsContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '1%',
            padding: '1%',
            background: 'linear-gradient(#F4F4F4 10%,#EBEEF0)',
        },
        deltaChart: {
            display: 'flex',
            width: '45%',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '1%',
            padding: '1%',
        },
        inputComparisonContainer: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center',
            margin: '1%',
            padding: '1%'
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
            fontSize: '1.5em'
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
        }
    }))
    const classes = useStyles()
    const color_url = (color) => "url(#" + color + ")"


    //Tick formatter
    const CustomizedXAxisTick = (props) => {
        const {x, y, payload} = props

        return (
            <g transform={`translate(${x},${y})`}>
                <text
                    x={0}
                    y={0}
                    dx={10}
                    dy={16}
                    textAnchor="middle"
                    fill='#3C4148'
                    transform="rotate(-0)"
                    fontSize='0.9em'
                    fontFamily="Questrial"
                    fontWeight='500'
                >
                    {payload.value}
                </text>
            </g>
        )
    }

    const LabelFormatter = (props) => {
        const {cx, x, y, payload, fmt} = props

        return (
            <g>
                <text
                    x={x}
                    y={y}
                    textAnchor={x > cx ? "start" : "end"}
                    fontSize='0.85em'
                    fontWeight={500}
                    fill={props.fill}
                    fontFamily="Questrial"
                >
                    {payload.name + ": " + convert_format(fmt, payload.value)}
                </text>
            </g>

        )
    }


    //Functions
    const generateCharts = () => {
        let {avgData, out_fmt} = props


        // const inptMagData = []

        const deltaCharts = avgData.map((inptData, idx) => {
            const inAdd = Object.keys(inptData)
            const inputLabel = props.inputLabelMap[inAdd]
            const inVal = Object.values(inptData)[0]
            const xmax = getMaxfromKey(inVal, "value")
            const xmin = getMinfromKey(inVal, "value")
            const domains = getDomains(xmin, xmax)


            inptCompData.push({
                "name": inputLabel,
                "value": (getAvgfromKey(inVal, "value")),
                "fill": color_url(chartColors[idx])
            })

            inptMagData.push({
                "name": inputLabel,
                "value": Math.abs(getAvgfromKey(inVal, "value")),
                "fill": color_url(chartColors[idx])
            })

            return (
                <div className={classes.deltaChart} key={"Delta_" + out_fmt + inAdd}>
                    <h3 className={classes.chartTitle}>Impact of {inputLabel}</h3>
                    <h3 className={classes.chartNote}><em>Represents average change for one slider increment</em></h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                            data={inVal}
                            margin={{top: 25, right: 10, left: 10, bottom: 10}}
                            barSize={20}
                            // style={{background: 'linear-gradient(#FFFFFF 60%,#F4F4F4)'}}
                        >
                            <defs>
                                <linearGradient id={chartColors[idx]} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor={chartColors[idx]} stopOpacity={0.75}/>
                                    <stop offset="75%" stopColor={chartColors[idx]} stopOpacity={0.25}/>
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="name"
                                type="category"
                                tick={<CustomizedXAxisTick/>}
                                // ticks={bin_centers}
                                tickLine={false}
                                interval={0}
                                // padding={{top: 30, bottom: 30}}
                                stroke='#004666'
                                // scale="linear"
                                // domain={[props.distributions.min[outAdd], props.distributions.max[outAdd]]}
                            />
                            <YAxis
                                // yAxisId="count"
                                hide={true}
                                // domain={[-30000, 0]}
                                domain={domains}
                            />
                            <Tooltip/>
                            <ReferenceLine
                                y={0}
                                label={{
                                    position: "right",
                                    value: '0',
                                    opacity: '60%',
                                    fontFamily: 'Questrial',
                                    fontSize: '0.7em',
                                    fill: '#767A7F',
                                    width: '10px'
                                    // fontWeight: labelWeight
                                }}
                                stroke='#B1B3B5'
                                strokeDasharray="3 3"
                            />
                            <Bar
                                // yAxisId="count"
                                dataKey="value"
                                isAnimationActive={true}
                                fill={color_url(chartColors[idx])}
                            >
                                >
                                <LabelList
                                    dataKey="value"
                                    position="top"
                                    style={{
                                        fontFamily: 'Questrial',
                                        fontSize: '0.8em',
                                        fontWeight: '500',
                                        fill: chartColors[idx]
                                    }}
                                    formatter={(value) => convert_format(out_fmt, value)}
                                />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )
        })

        const inputCompChart = (
            <div className={classes.inputComparisonContainer}>
                <h3 className={classes.chartTitle}>Input Importance Comparison</h3>
                <h3 className={classes.chartNote}><em>Impact of one increment movement in input</em></h3>
                <ResponsiveContainer width="75%" height={300}>
                    <BarChart
                        data={inptCompData}
                        margin={{top: 50, right: 25, left: 25, bottom: 0}}
                        barSize={20}
                    >
                        <XAxis
                            dataKey="name"
                            tick={{
                                fontFamily: 'Questrial',
                                fontSize: '0.90em'
                            }}
                            tickLine={false}
                            interval={0}
                            padding={{top: 30, bottom: 30}}
                            stroke='#004666'
                            // domain={[props.distributions.min[outAdd], props.distributions.max[outAdd]]}
                        />

                        <YAxis
                            hide={true}
                            padding={{top: 30, bottom: 30}}
                        />
                        <Tooltip/>
                        <ReferenceLine
                            y={0}
                            label={{
                                position: "right",
                                value: '0',
                                opacity: '60%',
                                fontFamily: 'Questrial',
                                fontSize: '0.9em',
                                fill: '#767A7F',
                                width: '10px'
                                // fontWeight: labelWeight
                            }}
                            stroke='#B1B3B5'
                            strokeDasharray="3 3"
                        />
                        <Bar
                            dataKey="value"
                            isAnimationActive={true}
                            barSize={30}
                        >
                            <LabelList
                                dataKey="value"
                                position="top"
                                style={{
                                    fontFamily: 'Questrial',
                                    fontSize: '0.9em',
                                    fontWeight: '500',
                                    fill: '#292F36'
                                }}
                                formatter={(value) => convert_format(out_fmt, value)}
                            />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        )

        const inputMagChart = (
            <div className={classes.inputComparisonContainer}>
                <h3 className={classes.chartTitle}>Input Magnitude Comparison</h3>
                <h3 className={classes.chartNote}><em>Absolute impact of one increment movement in input</em></h3>
                <ResponsiveContainer
                    width="75%"
                    height={300}
                    margin={{top: 5, right: 20, left: 10, bottom: 300}}
                >
                    <PieChart>
                        <Pie
                            data={inptMagData}
                            dataKey="value"
                            cx={"50%"}
                            cy={"50%"}
                            labelLine={true}
                            label={<LabelFormatter fmt={out_fmt}/>}
                            innerRadius={60}
                            outerRadius={100}
                            animationDuration={600}
                        >
                            {
                                inptMagData.map((entry, index) => <Cell key={"cell_" + index}
                                                                        fill={chartColors[index]}/>)
                            }
                        </Pie>
                        <Tooltip/>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        )


        return (
            <Paper className={classes.paper} elevation={2}>
                {inputCompChart}
                {inputMagChart}
                <Paper className={classes.deltaChartsContainer} elevation={4}>
                    {deltaCharts}
                </Paper>
            </Paper>

        )

    }

    const generateKeyStats = () => {
        console.log(inptMagData)
        const mostSensitiveMag = inptMagData.reduce(function (prev, current) {
            return (prev.value > current.value) ? prev : current
        })

        const leastSensitiveMag = inptMagData.reduce(function (prev, current) {
            return (prev.value < current.value) ? prev : current
        })

        const mostSensitive = inptCompData.reduce(function (prev, current) {
            return (prev.value > current.value) ? prev : current
        })

        const leastSensitive = inptCompData.reduce(function (prev, current) {
            return (prev.value < current.value) ? prev : current
        })


        return (
            <div className={classes.keyStatsContainer}>
                <Paper className={classes.keyStatsPaper} elevation={3}>
                    <h2 className={classes.statsText}>{'Most Sensitive Driver'}</h2>
                    <h3
                        className={classes.statFigure}>{mostSensitiveMag.name}
                    </h3>
                </Paper>
                <Paper className={classes.keyStatsPaper} elevation={3}>
                    <h2 className={classes.statsText}>{'Least Sensitive Driver'}</h2>
                    <h3
                        className={classes.statFigure}>{leastSensitiveMag.name}
                    </h3>
                </Paper>
                <Paper className={classes.keyStatsPaper} elevation={3}>
                    <h2 className={classes.statsText}>{'Highest Positive Driver'}</h2>
                    <h3
                        className={classes.statFigure}>{mostSensitive.name}
                    </h3>
                </Paper>
                <Paper className={classes.keyStatsPaper} elevation={3}>
                    <h2 className={classes.statsText}>{'Highest Negative Driver'}</h2>
                    <h3
                        className={classes.statFigure}>{leastSensitive.name}
                    </h3>
                </Paper>
            </div>
        )
    }


    //Execute Functions
    const inptCompData = []
    const inptMagData = []
    const charts = generateCharts()
    const keyStats = generateKeyStats()

    return (
        <Card
            className={classes.distCard}
            key={"ii_" + props.outAdd}
            // raised={true}
            elevation={3}
        >
            <div className={classes.cardHeaderContainer}>
                <h2 className={classes.cardTitleHeader}>Input Importance</h2>
            </div>
            <LabelSelector
                type="withLabel"
                outputs={props.outputs}
                handleOutputLabelChange={props.handleOutputLabelChange}
                handleOutputCategoryChange={props.handleOutputCategoryChange}
                currOutputCell={props.outAdd}
                currCategory={props.outCat.category}/>
            <Fade in={true} timeout={1000}>
                {keyStats}
            </Fade>
            {charts}
            {/*{probChart}*/}
        </Card>
    )

}
