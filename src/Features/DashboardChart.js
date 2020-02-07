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
    Text
} from 'recharts'
import {Paper, makeStyles, Card} from "@material-ui/core"
import {convert_format} from "../utils/utils"
import CardSettings from "../UtilityComponents/CardSettings"
import {NavLink} from "react-router-dom"
import {Slide} from '@material-ui/core'
import ArrowDropDownSharpIcon from '@material-ui/icons/ArrowDropDownSharp'
import IconButton from '@material-ui/core/IconButton'
import {CircularProgressbar} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'


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

export default function DashboardChart(props) {


    // Initialization function to get width of chart based on user preferences
    let stats_fill = '#006E9F'


    // Defining hooks
    const useStyles = makeStyles(theme => ({
        root: {
            width: '100%'
        },
        summaryChartContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            width: '100%',
            padding: '1.2%',
            paddingTop: '2px',
            marginBottom: '180px'
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
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            padding: '3px',
            paddingLeft: '10px',
            paddingRight: '10px',
            background: '#EBECEC',
            width: '1000px',
            position: 'fixed',
            borderRadius: '10px 10px 0px 0px',
            bottom: 0,
            left: '50%',
            marginLeft: '-500px'
            // transform: 'translateX(-50%)'
        },
        paperHeaderContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%'
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
        contributionContainer: {
            display: 'flex',
            width: '100%'
        },
        contribStatsContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            width: '70%'
        },
        keyStatsPaper: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            margin: '5px',
            width: '120px',
            height: '55px',
            padding: '3px',
            opacity: '80%',
            "&:hover": {
                opacity: "100%",
            }
        },
        statsText: {
            color: '#F4F9E9',
            fontFamily: 'Questrial',
            // textAlign:'center',
            margin: '0px',
            fontWeight: '10',
            fontSize: '0.80em',
            textAlign: 'center'
        },
        statFigure: {
            color: '#F4F9E9',
            textAlign: 'center',
            margin: '0px',
            marginBottom: '2px',
            fontFamily: 'Questrial',
            fontWeight: '600',
            fontSize: '0.95em'
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
        return convert_format('0.0', value)
    }

    const tooltipFormatter = (value, name, props) => {
        return props.payload.label
    }

    function CustomizedYAxisTick(props) {
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

    function CustomizedXAxisTickKeyMetrics(props) {
        const {x, y, payload, fill} = props

        // let _fill=props.fill
        let _fontWeight = '500'
        if (props.name === props.outCat.category && props.payload.value === props.outCat.labels[props.outAdd]) {
            _fontWeight = '700'
        }

        return (
            <Text
                x={x}
                y={y}
                dy={15}
                textAnchor="middle"
                width={110}
                fill={fill}
                fontSize='0.8em'
                fontFamily="Questrial"
                fontWeight='500'
                style={{fontWeight: _fontWeight}}
            >
                {payload.value}
            </Text>

        )
    }


// Function executions
    const createSingleChart = (solutionSet, idx) => {


        const category = solutionSet.category
        const domains = solutionSet.domains
        const chartData = addFormats(solutionSet.values)
        const fill = chartColors[idx]
        let chartEl = null

        if (solutionSet.values.length === 1) {
            let val = solutionSet.values[0].value
            let fmt = convert_format(solutionSet.values[0].format, val)
            const outObj = props.outputs.find(output => output.category === category)
            const outAdd = Object.keys(outObj.labels)[0]
            const xmin = props.distributions.min[outAdd]
            const xmax = props.distributions.max[outAdd]
            chartEl = (
                <div style={{width: '100%', height: '100%'}}
                     onClick={(e) => props.handleSummaryBarMouseClick(e, category, 'pie')}>
                    <CircularProgressbar
                        value={val}
                        minValue={xmin}
                        maxValue={xmax}
                        text={fmt}
                        styles={{
                            root: {
                                width: "100%",
                                height: "210px",
                                cursor: "pointer"
                            },
                            path: {
                                // Path color
                                stroke: fill,
                                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                strokeLinecap: 'round',
                                // Customize transition animation
                                transition: 'stroke-dashoffset 0.5s ease 0s',
                                // Rotate the path
                                transform: 'rotate(0.25turn)',
                                transformOrigin: 'center center',
                            },
                            trail: {
                                // Trail color
                                stroke: fill,
                                opacity: '10%',
                                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                strokeLinecap: 'butt',
                                // Rotate the trail
                                transform: 'rotate(0.25turn)',
                                transformOrigin: 'center center',
                            },
                            text: {
                                fill: fill,
                                fontFamily: 'Questrial',
                                fontSize: '1em'
                            }
                        }}
                    />
                </div>
            )
        } else {
            chartEl = (
                <ResponsiveContainer width="100%" height={210}>
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
                            cursor={{fill: '#FEFEFD'}}
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
                            // onAnimationEnd={()=>{this.setState({});}}
                            // fill={color_url(fill)}
                            animationDuration={200}
                            radius={[3, 3, 0, 0]}
                            onMouseDown={(e) => props.handleSummaryBarMouseClick(e, category, 'bar')}
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
            )
        }

        return (
            <Paper className={classes.SummaryPaper} key={"summary" + category} elevation={3}>
                <div className={classes.paperHeaderContainer}>
                    <h3 className={classes.chartTitle}>{category}</h3>
                    <CardSettings category={category}
                                  setSummaryPrefs={props.setSummaryPrefs}
                                  summaryPrefs={props.summaryPrefs}/>
                </div>
                {chartEl}
            </Paper>
        )
    }

    const createIISummary2 = () => {

        const outCat = props.outCat
        const outAdd = props.outAdd
        const keyStats = generateIIStats(props.iiSummaryData)
        const fill = chartColors[(props.summaryData.findIndex(output => output.category === props.outCat.category))]

        return (
            <Slide in={props.showMetrics} direction="up" timeout={750} mountOnEnter>
                <Paper className={classes.maxPaper} elevation={5}>
                    <div style={{
                        display: 'flex',
                        width: '100%',
                        textAlign: 'center',
                        padding: '2px',
                        justifyContent: 'space-between'
                    }}>
                        <NavLink to="/inputimportance" style={{textDecoration: 'none'}}>
                            <h3 style={{
                                fontFamily: 'Questrial',
                                fontSize: '0.85em',
                                fontWeight: '800',
                                margin: '5px',
                                color: '#63676C'
                            }}>Key Metrics for {outCat.category}, {outCat.labels[outAdd]}. Chart represents % impact
                                of
                                each input on {outCat.category}, {outCat.labels[outAdd]} variance</h3>
                        </NavLink>
                        <IconButton size="small" onClick={() => props.handleShowMetrics(false)}>
                            <ArrowDropDownSharpIcon style={{
                                color: '#63676C',
                                "&:hover": {
                                    color: "#3B9D7E4"
                                },
                            }}/>
                        </IconButton>
                    </div>
                    <div className={classes.contributionContainer}>
                        {keyStats}
                        <ResponsiveContainer
                            width="100%"
                            height={150}
                            margin={{top: 0, right: 0, left: 0, bottom: 0}}
                        >
                            <BarChart
                                data={props.iiSummaryData}
                                margin={{top: 20, right: 20, left: 20, bottom: 0}}
                                maxBarSize={20}
                            >
                                <XAxis
                                    hide={false}
                                    dataKey="name"
                                    tickLine={false}
                                    minTickGap={2}
                                    interval={0}
                                    stroke={fill}
                                    tick={<CustomizedXAxisTickKeyMetrics outAdd={props.outAdd}
                                                                         outCat={props.outCat}/>}
                                    padding={{top: 0, bottom: 0}}
                                />

                                <YAxis
                                    hide={true}
                                    dataKey="value"
                                    type="number"
                                    padding={{top: 0, bottom: 0}}
                                    interval={0}
                                    domain={[0, 1]}
                                />
                                <Bar
                                    className={classes.bar}
                                    dataKey="value"
                                    isAnimationActive={false}
                                    fill={fill}
                                    animationDuration={200}
                                    radius={[3, 3, 0, 0]}
                                >
                                    <LabelList
                                        dataKey="value"
                                        position="top"
                                        style={{
                                            fill: fill,
                                            fontFamily: 'Questrial',
                                            fontSize: '0.8em',
                                            fontWeight: '800'
                                        }}
                                        formatter={(value) => convert_format('0.0%', value)}
                                    />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Paper>
            </Slide>
        )
    }

    const generateIIStats = (inptMagData) => {

        const outAdd = props.outAdd
        const {xmin, xmax, xmean, xstd} = props.distSummaryData
        const out_fmt = props.formats[outAdd]
        stats_fill = chartColors[(props.summaryData.findIndex(output => output.category === props.outCat.category))]
        const mostSensitiveMag = inptMagData.reduce(function (prev, current) {
            return (prev.value > current.value) ? prev : current
        })
        const leastSensitiveMag = inptMagData.reduce(function (prev, current) {
            return (prev.value < current.value) ? prev : current
        })

        return (
            <div className={classes.contribStatsContainer}>
                <NavLink to={{pathname: "/inputimportance", state: {}}}
                         style={{textDecoration: 'none'}}>
                    <Paper className={classes.keyStatsPaper} style={{background: '#FEFEFD'}}>
                        <h2 className={classes.statsText} style={{color: '#63676C'}}>{'Most Sensitive To:'}</h2>
                        <h3
                            className={classes.statFigure} style={{color: stats_fill}}>{mostSensitiveMag.name}
                        </h3>
                    </Paper>
                </NavLink>
                <NavLink to="/inputimportance" style={{textDecoration: 'none'}}>
                    <Paper className={classes.keyStatsPaper} style={{background: '#FEFEFD'}}>
                        <h2 className={classes.statsText} style={{color: '#63676C'}}>{'Least Sensitive To:'}</h2>
                        <h3
                            className={classes.statFigure} style={{color: stats_fill}}>{leastSensitiveMag.name}
                        </h3>
                    </Paper>
                </NavLink>
                <NavLink to="/distributions" style={{textDecoration: 'none'}}>
                    <Paper className={classes.keyStatsPaper} style={{background: '#FEFEFD'}}>
                        <h2 className={classes.statsText} style={{color: '#63676C'}}>{'Mean'}</h2>
                        <h2 className={classes.statFigure}
                            style={{color: stats_fill}}>{convert_format(out_fmt, xmean)}</h2>
                    </Paper>
                </NavLink>
                <NavLink to="/distributions" style={{textDecoration: 'none'}}>
                    <Paper className={classes.keyStatsPaper} style={{background: '#FEFEFD'}}>
                        <h2 className={classes.statsText} style={{color: '#63676C'}}>{'Minimum'}</h2>
                        <h2 className={classes.statFigure}
                            style={{color: stats_fill}}>{convert_format(out_fmt, xmin)}</h2>
                    </Paper>
                </NavLink>
                <NavLink to="/distributions" style={{textDecoration: 'none'}}>
                    <Paper className={classes.keyStatsPaper} style={{background: '#FEFEFD'}}>
                        <h2 className={classes.statsText} style={{color: '#63676C'}}> {'Maximum'}</h2>
                        <h2 className={classes.statFigure}
                            style={{color: stats_fill}}>{convert_format(out_fmt, xmax)}</h2>
                    </Paper>
                </NavLink>
                <NavLink to="/distributions" style={{textDecoration: 'none'}}>
                    <Paper className={classes.keyStatsPaper} style={{background: '#FEFEFD'}}>
                        <h2 className={classes.statsText} style={{color: '#63676C'}}> {'Std Dev'}</h2>
                        <h2 className={classes.statFigure}
                            style={{color: stats_fill}}>{convert_format(out_fmt, xstd)}</h2>
                    </Paper>
                </NavLink>
            </div>
        )
    }


    const createCharts = () => {
        // const miniCharts = createDistSummary()
        const iiSummary = createIISummary2()
        const summaryCharts = props.summaryData.map((solutionSet, idx) => {
            return createSingleChart(solutionSet, idx)
        })

        return (
            <div className={classes.summaryChartContainer}>
                {summaryCharts}
                {iiSummary}
            </div>
        )
    }

    const charts = createCharts()


    //Handlers
    return (
        <Card elevation={0} className={classes.root}>
            {charts}
        </Card>
    )
}
