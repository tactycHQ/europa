import React from 'react'
import {BarChart, Bar, XAxis, YAxis, LabelList, Tooltip, ResponsiveContainer, ReferenceLine, Cell} from 'recharts'
import {Paper, makeStyles, Card} from "@material-ui/core"
import {convert_format} from "../utils/utils"
import CardSettings from "./CardSettings";
import Fade from "@material-ui/core/Fade";
import {NavLink} from "react-router-dom";


const chartColors = [
    '#006E9F',
    '#A5014B',
    '#3DA32D',
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


    // Defining hooks
    const useStyles = makeStyles(theme => ({
        summaryChartContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            width: '100%',
            padding: '1.2%',
            paddingTop: '1%'
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
        SummaryPaper: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '1%',
            padding: '1%',
            background: 'linear-gradient(#F4F4F4 10%,#EBEEF0)',
            width: '48%'
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
        cardHeaderContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%'
            // marginBottom:0
        },
        chartTitle: {
            fontFamily: 'Questrial',
            // background: '#7C97B7',
            fontSize: '1.4em',
            fontWeight: '300',
            color: '#3C4148',
            marginBottom: '0'
            // backgroundColor:'blue'
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
    // Defined functions
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


    // Function executions
    const createSingleChart = (solutionSet, idx) => {

        const category = solutionSet.category
        const domains = solutionSet.domains
        const fill = chartColors[idx]
        const chartData = addFormats(solutionSet.values)
        const _width = getWidth(category)
        let container_paper = classes.SummaryPaper
        if (_width === '100%') {
            container_paper = classes.maxPaper
        }


        return (
            <Paper className={container_paper} key={"summary" + category} elevation={3}>
                <div className={classes.cardHeaderContainer}>
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
                            isAnimationActive={false}
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

    const createCharts = () => {
        return props.summaryData.map((solutionSet, idx) => {
            return createSingleChart(solutionSet, idx)
        })
    }

    const createMiniChart = (outCat, outAdd) => {


        const {xmin, xmax, xmean, xstd} = props.miniData

        const out_fmt = props.formats[outAdd]


        return (
            <Paper className={classes.keyStatsContainer} elevation={3}>
                <div className={classes.keyStatsHeader}>
                    <h2 className={classes.headerText}>{`Key Metrics for ${outCat.category}, ${outCat.labels[outAdd]}`}</h2>
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


    const summaryCharts = createCharts()
    const miniCharts = createMiniChart(props.outCat, props.outAdd)

    //Handlers
    return (
        <Card>
            {miniCharts}
            <div className={classes.summaryChartContainer}>
                {summaryCharts}
            </div>
        </Card>
    )
}
