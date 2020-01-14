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
    PieChart, Pie, Text
} from 'recharts'
import {Paper, makeStyles, Card} from "@material-ui/core"
import {convert_format} from "../utils/utils"
import CardSettings from "./CardSettings";
import Fade from "@material-ui/core/Fade";
import {NavLink} from "react-router-dom";


const chartColors = [
    '#006E9F',
    '#A5014B',
    '#3DA32D',
    '#6014BC',
    '#C62525',
    '#002247',
    '#006E9F',
    '#A5014B',
    '#3DA32D',
    '#6014BC',
    '#C62525',
    '#002247'
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
    let stats_fill = '#006E9F'


    // Defining hooks
    const useStyles = makeStyles(theme => ({
        summaryChartContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            width: '100%',
            padding: '1.2%',
            paddingTop: '2px',
            // background:'yellow'
        },
        SummaryPaper: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            margin: '10px',
            marginTop: '0px',
            marginBottom: '20px',
            padding: '1%',
            background: 'linear-gradient(#F4F4F4 10%,#FEFEFD)',
            width: '48%'
        },
        maxPaper: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '10px',
            marginTop: '0px',
            marginBottom: '20px',
            padding: '1%',
            background: 'linear-gradient(#F4F4F4 10%,#FEFEFD)',
            width: '100%'
        },
        paperHeaderContainer: {
            display: 'flex',
            // flexDirection:'column',
            // marginTop:'0px',
            width: '100%',
            justifyContent: 'space-between'
        },
        chartTitle: {
            fontFamily: 'Questrial',
            // background: '#7C97B7',
            fontSize: '1.3em',
            fontWeight: '200',
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
        bar: {
            "&:hover": {
                fill: '#A5014B',
                // opacity:"100%"
            }
        },
        distStatsContainer: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: '100%',
            justifyContent: 'center',
            padding: '10px',
            alignItems: 'center',
            margin: '5%',
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
        keyStatsPaper: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '200px',
            // height: '100%',
            margin: '10px',
            padding: '3%',
            opacity: '80%',
            "&:hover": {
                // background: '#A5014B',
                opacity: "100%"
            }
        },
        statsText: {
            color: '#F4F9E9',
            fontFamily: 'Questrial',
            // textAlign:'center',
            margin: '0px',
            fontWeight: '10',
            fontSize: '0.9em'
        },
        statFigure: {
            color: '#F4F9E9',
            textAlign: 'center',
            margin: '0px',
            marginBottom: '5%',
            fontFamily: 'Questrial',
            fontWeight: '10',
            fontSize: '1.5em'
        },
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

    const pieLabelFormatter = (props) => {
        const {cx, x, y, payload, index} = props

        return (
            <Text
                x={x}
                y={y}
                width={200}
                textAnchor={x > cx ? "start" : "end"}
                fontSize='0.9em'
                fontWeight={300}
                fill={chartColors[index]}
                fontFamily="Questrial"
            >
                {payload.name + ": " + convert_format('0.0%', payload.value)}
            </Text>
        )
    }

//     const pieLabelFormatter2 = (props) => {
//         const {cx, cy, midAngle, innerRadius, outerRadius, payload, index} = props
//         console.log(props)
//         const RADIAN = Math.PI / 180;
//
//         // eslint-disable-next-line
//         let radius = 20 + innerRadius + (outerRadius - innerRadius);
//         // eslint-disable-next-line
//         let x = cx + radius * Math.cos(-midAngle * RADIAN);
//         // eslint-disable-next-line
//         let y = cy + radius * Math.sin(-midAngle * RADIAN);
//
//         if (payload.value < 0) {
//             return null;
//         }
//
//         console.log(x,y)
//
//         return (
//             <text
//                 x={x}
//                 y={y}
//                 fill="#000"
//                 fontWeight="300"
//                 fontSize="13px"
//                 fontFamily="'Source Sans Pro', 'Roboto', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'"
//                 textAnchor={x > cx ? "start" : "end"}
//                 dominantBaseline="central"
//             >
//                 {payload.name} {payload.value}
//             </text>
//         )
//     }
//
//
// const labelLineFmt = (props) => {
//     const {cx, cy, midAngle, innerRadius, outerRadius, value, index} = props
//
//     const RADIAN = Math.PI / 180
//     // eslint-disable-next-line
//     let radius1 = 20 + innerRadius + (outerRadius - innerRadius);
//
//     let radius2 = innerRadius + (outerRadius - innerRadius);
//     // eslint-disable-next-line
//     let x2 = cx + radius1 + index*10;
//     // eslint-disable-next-line
//     let y2 = cy + radius1 + index*10;
//
//     let x1 = cx + radius2 * index*10;
//     // eslint-disable-next-line
//     let y1 = cy + radius2 * index*10;
//
//     if (value < 0) {
//         return null;
//     }
//
//     return (
//         <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#ccc" strokeWidth={1}>
//         </line>
//     )
// }


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
                    <h3 className={classes.chartTitle}>{category}</h3>
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
                            radius={[3, 3, 0, 0]}
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
        const keyStats = generateIIStats(props.iiSummaryData)

        return (
            <Paper className={classes.maxPaper} elevation={3}>
                <div className={classes.paperHeaderContainer}>
                    <NavLink to="/inputimportance" style={{textDecoration: 'none'}}>
                        <h3 className={classes.chartTitle}>Input Contribution Analysis</h3>
                        <h3 className={classes.chartNote}>{outCat.category}, {outCat.labels[outAdd]} </h3>
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
                                data={props.iiSummaryData}
                                dataKey="value"
                                cx={"50%"}
                                cy={"50%"}
                                labelLine={true}
                                label={(labelData) => pieLabelFormatter(labelData)}
                                innerRadius={60}
                                outerRadius={100}
                                animationDuration={600}
                            >
                                {
                                    props.iiSummaryData.map((entry, index) => <Cell key={"cell_" + index}
                                                                                    fill={chartColors[index]}/>)
                                }
                            </Pie>
                            <Tooltip
                                wrapperStyle={{fontSize: '0.9em', fontFamily: 'Questrial'}}
                                cursor={{fill: '#FEFEFD', fontFamily: 'Questrial', fontSize: '0.8em'}}
                                // labelFormatter={value => `${value}`}
                                formatter={(value, name) => [`${convert_format('0.0%', value)}`, `${name}`]}/>
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
                <NavLink to="/inputimportance" style={{textDecoration: 'none'}}>
                    <Paper className={classes.keyStatsPaper} style={{background: stats_fill}}>
                        <h2 className={classes.statsText}>{'Most Sensitive Driver'}</h2>
                        <h3
                            className={classes.statFigure}>{mostSensitiveMag.name}
                        </h3>
                    </Paper>
                </NavLink>
                <NavLink to="/inputimportance" style={{textDecoration: 'none'}}>
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
        const {xmin, xmax, xmean, xstd} = props.distSummaryData
        const out_fmt = props.formats[outAdd]
        stats_fill = chartColors[(props.summaryData.findIndex(output => output.category === props.outCat.category))]

        return (
            <Paper className={classes.SummaryPaper} elevation={3}>
                <div className={classes.paperHeaderContainer}>
                    <NavLink to="/distributions" style={{textDecoration: 'none'}}>
                        <h3 className={classes.chartTitle}>Key Metrics</h3>
                        <h3 className={classes.chartNote}>{outCat.category}, {outCat.labels[outAdd]} </h3>
                    </NavLink>
                </div>
                <div className={classes.distStatsContainer}>
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

        return (
            <div className={classes.summaryChartContainer}>
                {summaryCharts}
                {miniCharts}
                {iiSummary}
            </div>
        )
    }

    const charts = createCharts()


//Handlers
    return (
        <Card elevation={0}>
            {charts}
        </Card>
    )
}
