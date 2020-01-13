import React from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    LabelList,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine,
    Cell,
    PieChart, Pie
} from 'recharts'
import {Paper, makeStyles, Card} from "@material-ui/core"
import {convert_format} from "../utils/utils"
import CardSettings from "./CardSettings";
import Fade from "@material-ui/core/Fade";
import {NavLink} from "react-router-dom";


const chartColors = [
    '#006E9F',
    '#A5014B',
    '#2D7721',
    '#4B719C',
    '#FE7F2D',
    '#00044E'
]

export default function SummaryChart(props) {


    // Initialization function to get width of chart based on user preferences
    const defaultWidth = '48%'
    const getWidth = (category) => {
        if (category in props.summaryPrefs && 'size' in props.summaryPrefs[category]) {
            if (props.summaryPrefs[category].size === 'Maximize') {
                return '100%'
            } else {
                return defaultWidth
            }
        } else {
            return defaultWidth
        }
    }
    let stats_fill = '#1790C4'


    // Defining hooks
    const useStyles = makeStyles(theme => ({
        summaryChartContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            width: '100%',
            padding: '1.2%',
            paddingTop: '1%'
        },
        SummaryPaper: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            margin: '1%',
            padding: '1%',
            background: 'linear-gradient(#F4F4F4 10%,#FEFEFD)',
            width: '48%'
        },
        paperHeaderContainer: {
            display: 'flex',
            // flexDirection:'column',
            width: '100%',
            justifyContent: 'space-between'
        },
        maxPaper: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '1%',
            padding: '1%',
            background: 'linear-gradient(#F4F4F4 10%,#EBEEF0)',
            width: '100%'
        },
        contributionContainer: {
            display: 'flex',
            width: '100%',
            // background: 'red'
        },
        contribStatsContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        },
        chartTitle: {
            fontFamily: 'Questrial',
            // background: '#7C97B7',
            fontSize: '1.2em',
            fontWeight: '300',
            color: '#3C4148',
            marginTop: '0px',
            marginBottom: '0px'
        },
        chartNote: {
            fontFamily: 'Questrial',
            fontSize: '0.9em',
            fontWeight: '300',
            color: '#3C4148',
            marginTop: '0'
        },
        statsContainer: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: '100%',
            justifyContent: 'center',
            padding: '10px',
            alignItems: 'center',
            margin: '5%',
            // background: 'red'
        },
        keyStatsPaper: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '200px',
            // height: '100%',
            margin: '10px',
            padding: '3%',
            opacity: '80%'
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
            fontWeight: '10',
            fontSize: '0.8em'
        },
        statFigure: {
            color: '#F4F9E9',
            textAlign: 'center',
            margin: '0px',
            marginBottom: '5%',
            fontFamily: 'Questrial',
            fontWeight: '10',
            fontSize: '1.2em'
        },
        bar: {
            "&:hover": {
                fill: '#A5014B',
                // opacity:"100%"
            }
        }
    }))
    const classes = useStyles()


    // Defined variables
    const color_url = (color) => ("url(#" + color + ")")

    // Defined functions
    // Chart helpers
    const addFormats = (currSolution) => {
        return currSolution.map(output => {
                return (
                    {
                        ...output,
                        label: convert_format(output.format, output.value)
                    })
            }
        )
    }

    const yAxisFormatter = (value) => {
        // console.log(props)
        return convert_format('0.0', value)
    }

    const tooltipFormatter = (value, name, props) => {
        // console.log(props)
        return props.payload.label
    }

    function CustomizedYAxisTick(props) {
        // console.log(props)
        const {x, y, payload} = props

        return (
            <g transform={`translate(${x},${y})`}>
                <text
                    x={0}
                    y={0}
                    dy={16}
                    textAnchor="end"
                    transform="rotate(-0)"
                    fontSize='1.0em'
                    fill={props.fill}
                    fontFamily="Questrial"
                >
                    {yAxisFormatter(payload.value)}
                </text>
            </g>
        )
    }

    function CustomizedXAxisTick(props) {
        const {x, y, payload, fill} = props

        // let _fill=props.fill
        let _fontWeight = '500'
        if (props.name === props.outCat.category && props.payload.value === props.outCat.labels[props.outAdd]) {
            _fontWeight = '700'
        }

        return (
            <g transform={`translate(${x},${y})`}>
                <text
                    x={0}
                    y={0}
                    dy={16}
                    textAnchor="middle"
                    fill={fill}
                    transform="rotate(-0)"
                    fontSize='0.9em'
                    fontFamily="Questrial"
                    fontWeight='500'
                    cursor='pointer'
                    style={{fontWeight: _fontWeight}}

                >
                    {payload.value}
                </text>
            </g>
        )
    }

    const pieLabelFormatter = (props, fmt) => {
        const {cx, x, y, payload, index} = props

        return (
            <g>
                <text
                    x={x}
                    y={y}
                    textAnchor={x > cx ? "start" : "end"}
                    fontSize='0.85em'
                    fontWeight={500}
                    fill={chartColors[index]}
                    fontFamily="Questrial"
                    // width="100"
                >
                    {payload.name + ": " + convert_format(fmt, payload.value)}
                </text>
            </g>

        )
    }


    // Function executions
    const createSingleChart = (solutionSet, idx) => {

        const category = solutionSet.category
        const domains = solutionSet.domains
        const chartData = addFormats(solutionSet.values)
        const _width = getWidth(category)
        const fill = chartColors[idx]
        let container_paper = classes.SummaryPaper
        if (_width === '100%') {
            container_paper = classes.maxPaper
        }


        return (
            <Paper className={container_paper} key={"summary" + category} elevation={3}>
                <div className={classes.paperHeaderContainer}>
                    <h1 className={classes.chartTitle}>{category}</h1>
                    <CardSettings category={category}
                                  setSummaryPrefs={props.setSummaryPrefs}
                                  summaryPrefs={props.summaryPrefs}/>
                </div>
                <ResponsiveContainer width="100%" height={310}>
                    <BarChart
                        data={chartData}
                        margin={{top: 15, right: 15, left: 10, bottom: 0}}
                        maxBarSize={20}
                    >
                        <defs>
                            <linearGradient id={fill} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="25%" stopColor={fill} stopOpacity={0.75}/>
                                <stop offset="95%" stopColor={fill} stopOpacity={0.25}/>
                            </linearGradient>
                        </defs>
                        <defs>
                            <linearGradient id={'_active' + fill} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="60%" stopColor={fill} stopOpacity={1.0}/>
                                <stop offset="100%" stopColor={fill} stopOpacity={0.65}/>
                            </linearGradient>
                        </defs>
                        <XAxis
                            hide={false}
                            stroke={fill}
                            dataKey="x"
                            name={category}
                            tickLine={false}
                            minTickGap={2}
                            interval={0}
                            tick={<CustomizedXAxisTick outAdd={props.outAdd} outCat={props.outCat}/>}
                            padding={{top: 30, bottom: 30}}
                            onMouseDown={(e) => props.handleSummaryTickMouseClick(e, category)}
                        />

                        <YAxis
                            hide={true}
                            dataKey="value"
                            tick={<CustomizedYAxisTick/>}
                            // ticks={[0,1000,2000,3000,4000,5000,6000,7000]}
                            stroke={fill}
                            type="number"
                            allowDecimals={false}
                            padding={{top: 30, bottom: 30}}
                            interval={0}
                            // domains={"auto"}
                            domain={domains}
                            // tickFormatter={(tick => yAxisFormatter(tick)}
                        />

                        <Tooltip
                            wrapperStyle={{fontSize: '0.9em', fontFamily: 'Questrial', color: fill}}
                            cursor={{fill: '#FEFEFD', fontFamily: 'Questrial', fontSize: '0.8em'}}
                            formatter={(value, name, props) => {
                                return [tooltipFormatter(value, name, props)]
                            }}

                        />
                        <ReferenceLine
                            y={0}
                            label={{
                                position: "right",
                                value: '0',
                                opacity: '60%',
                                fontFamily: 'Questrial',
                                fontSize: '0.8em',
                                fill: '#767A7F',
                                width: '10px'
                            }}
                            stroke='#B1B3B5'
                            strokeDasharray="3 3"
                        />

                        <Bar
                            className={classes.bar}
                            dataKey="value"
                            isAnimationActive={true}
                            // fill={color_url(fill)}
                            animationDuration={200}
                            onMouseDown={(e) => props.handleSummaryBarMouseClick(e, category)}
                            style={{cursor: 'pointer'}}
                        >
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={"Cell_" + index}
                                    fill={entry['x'] === props.outCat.labels[props.outAdd] && category === props.outCat.category ? color_url("_active" + fill) : color_url(fill)}
                                />
                            ))}
                            <LabelList
                                dataKey="label"
                                position="top"
                                style={{
                                    fill: fill,
                                    fontFamily: 'Questrial',
                                    fontSize: '0.9em',
                                    fontWeight: '500'
                                }}
                            />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </Paper>
        )
    }


    const createIISummary = () => {

        const outCat = props.outCat
        const outAdd = props.outAdd
        const out_fmt = props.formats[outAdd]
        const keyStats = generateIIStats(props.pieData)

        return (
            <Paper className={classes.maxPaper} elevation={3}>
                <div className={classes.paperHeaderContainer}>
                    <NavLink to="/inputimportance" style={{textDecoration: 'none'}}>
                        <h1 className={classes.chartTitle}>Input Contribution Analysis</h1>
                        <h2 className={classes.chartNote}>{outCat.category}, {outCat.labels[outAdd]} </h2>
                    </NavLink>
                </div>
                <div className={classes.contributionContainer}>
                    {keyStats}
                    <ResponsiveContainer
                        width="100%"
                        height={300}
                        margin={{top: 5, right: 0, left: 0, bottom: 300}}
                    >
                        <PieChart>
                            <Pie
                                data={props.pieData}
                                dataKey="value"
                                cx={"50%"}
                                cy={"50%"}
                                labelLine={true}
                                label={(labelData) => pieLabelFormatter(labelData, out_fmt)}
                                innerRadius={60}
                                outerRadius={100}
                                animationDuration={600}
                            >
                                {
                                    props.pieData.map((entry, index) => <Cell key={"cell_" + index}
                                                                              fill={chartColors[index]}/>)
                                }
                            </Pie>
                            <Tooltip
                                wrapperStyle={{fontSize: '0.9em', fontFamily: 'Questrial'}}
                                cursor={{fill: '#FEFEFD', fontFamily: 'Questrial', fontSize: '0.8em'}}
                                // labelFormatter={value => `${value}`}
                                formatter={(value, name) => [`${convert_format(out_fmt, value)}`, `${name}`]}/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </Paper>


        )
    }

    const generateIIStats = (inptMagData) => {

        stats_fill = chartColors[(props.summaryData.findIndex(output => output.category === props.outCat.category))]

        const mostSensitiveMag = inptMagData.reduce(function (prev, current) {
            return (prev.value > current.value) ? prev : current
        })

        const leastSensitiveMag = inptMagData.reduce(function (prev, current) {
            return (prev.value < current.value) ? prev : current
        })

        return (
            <div className={classes.contribStatsContainer}>
                <NavLink to="/distributions" style={{textDecoration: 'none'}}>
                    <Paper className={classes.keyStatsPaper} style={{background: stats_fill}}>
                        <h2 className={classes.statsText}>{'Most Sensitive Driver'}</h2>
                        <h3
                            className={classes.statFigure}>{mostSensitiveMag.name}
                        </h3>
                    </Paper>
                </NavLink>
                <NavLink to="/distributions" style={{textDecoration: 'none'}}>
                    <Paper className={classes.keyStatsPaper} style={{background: stats_fill}}>
                        <h2 className={classes.statsText}>{'Least Sensitive Driver'}</h2>
                        <h3
                            className={classes.statFigure}>{leastSensitiveMag.name}
                        </h3>
                    </Paper>
                </NavLink>
            </div>
        )
    }

    const createDistSummary = () => {

        const outCat = props.outCat
        const outAdd = props.outAdd
        const {xmin, xmax, xmean, xstd} = props.miniData
        const out_fmt = props.formats[outAdd]
        stats_fill = chartColors[(props.summaryData.findIndex(output => output.category === props.outCat.category))]

        return (
            <Paper className={classes.SummaryPaper} elevation={3}>
                <div className={classes.paperHeaderContainer}>
                    <h1 className={classes.chartTitle}>{`Key Metrics for ${outCat.category}, ${outCat.labels[outAdd]}`}</h1>
                    <CardSettings category={outCat.category}
                                  setSummaryPrefs={props.setSummaryPrefs}
                                  summaryPrefs={props.summaryPrefs}/>
                </div>
                <div className={classes.statsContainer}>
                    <Fade in={true} timeout={1000}>
                        <NavLink to="/distributions" style={{textDecoration: 'none'}}>
                            <Paper className={classes.keyStatsPaper} style={{background: stats_fill}}>
                                <h2 className={classes.statsText}>{'Mean'}</h2>
                                <h2 className={classes.statFigure}>{convert_format(out_fmt, xmean)}</h2>
                            </Paper>
                        </NavLink>
                    </Fade>
                    <Fade in={true} timeout={1000}>
                        <NavLink to="/distributions" style={{textDecoration: 'none'}}>
                            <Paper className={classes.keyStatsPaper} style={{background: stats_fill}}>
                                <h2 className={classes.statsText}>{'Minimum'}</h2>
                                <h2 className={classes.statFigure}>{convert_format(out_fmt, xmin)}</h2>
                            </Paper>
                        </NavLink>
                    </Fade>
                    <Fade in={true} timeout={1000}>
                        <NavLink to="/distributions" style={{textDecoration: 'none'}}>
                            <Paper className={classes.keyStatsPaper} style={{background: stats_fill}}>
                                <h2 className={classes.statsText}> {'Maximum'}</h2>
                                <h2 className={classes.statFigure}>{convert_format(out_fmt, xmax)}</h2>
                            </Paper>
                        </NavLink>
                    </Fade>
                    <Fade in={true} timeout={1000}>
                        <NavLink to="/distributions" style={{textDecoration: 'none'}}>
                            <Paper className={classes.keyStatsPaper} style={{background: stats_fill}}>
                                <h2 className={classes.statsText}> {'Std Dev'}</h2>
                                <h2 className={classes.statFigure}>{convert_format(out_fmt, xstd)}</h2>
                            </Paper>
                        </NavLink>
                    </Fade>
                </div>
            </Paper>
        )
    }

    const createCharts = () => {

        const miniCharts = createDistSummary()
        const iiSummary = createIISummary()
        const summaryCharts = props.summaryData.map((solutionSet, idx) => {
            return createSingleChart(solutionSet, idx)
        })

        return (<div className={classes.summaryChartContainer}>
                {summaryCharts}
                {miniCharts}
                {iiSummary}
            </div>
        )
    }

    const charts = createCharts()


    //Handlers
    return (
        <Card elevation={3}>
            {charts}
        </Card>
    )
}
