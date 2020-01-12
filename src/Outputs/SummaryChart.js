import React from 'react'
import {BarChart, Bar, XAxis, YAxis, LabelList, Tooltip, ResponsiveContainer, ReferenceLine, Cell} from 'recharts'
import {Paper, makeStyles} from "@material-ui/core"
import {convert_format} from "../utils/utils"
import CardSettings from "./CardSettings";


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
    const getWidth = () => {
        if (props.category in props.summaryPrefs && 'size' in props.summaryPrefs[props.category]) {
            if (props.summaryPrefs[props.category].size === 'Maximize') {
                return '100%'
            } else {
                return defaultWidth
            }
        } else {
            return defaultWidth
        }
    }
    const chartWidth = getWidth(props)


    // Defining hooks
    const useStyles = makeStyles(theme => ({
        paper: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '1%',
            padding: '1%',
            background: 'linear-gradient(#F4F4F4 10%,#EBEEF0)',
            width: chartWidth
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
            fontSize: '1.2em',
            fontWeight: '300',
            color: '#3C4148',
            marginBottom: '0'
            // backgroundColor:'blue'
        },
        bar: {
            "&:hover": {
                fill: '#A5014B'
            }
        }
    }))
    const classes = useStyles()


    // Defined variables
    const title = Object.keys(props.currSolution[0])[1]
    const master_fmt = Object.entries(props.currSolution[0])[2][1]
    const color_url = (color) => ("url(#" + color + ")")

    // Defined functions
    // Defined functions
    const process_formats = () => {
        return props.currSolution.map(output => {
                return (
                    {
                        ...output,
                        label: convert_format(output.format, output[title])
                    })
            }
        )
    }

    const yAxisFormatter = value => convert_format(master_fmt, value)

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

    // Function executions
    const processedData = process_formats()

    //Handlers

    return (
        <Paper className={classes.paper} key={"summary" + props.category} elevation={3}>
            <div className={classes.cardHeaderContainer}>
                <h2 className={classes.chartTitle}>{props.category}</h2>
                <CardSettings category={props.category}
                              setSummaryPrefs={props.setSummaryPrefs}
                              summaryPrefs={props.summaryPrefs}/>
            </div>
            <ResponsiveContainer width="100%" height={310}>
                <BarChart
                    data={processedData}
                    margin={{top: 15, right: 15, left: 10, bottom: 0}}
                    maxBarSize={20}
                >
                    <defs>
                        <linearGradient id={props.fill} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="25%" stopColor={props.fill} stopOpacity={0.75}/>
                            <stop offset="95%" stopColor={props.fill} stopOpacity={0.25}/>
                        </linearGradient>
                    </defs>
                    <defs>
                        <linearGradient id={'_active' + props.fill} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="60%" stopColor={props.fill} stopOpacity={1.0}/>
                            <stop offset="100%" stopColor={props.fill} stopOpacity={0.65}/>
                        </linearGradient>
                    </defs>
                    <XAxis
                        hide={false}
                        stroke={props.fill}
                        dataKey="x"
                        name={title}
                        tickLine={false}
                        minTickGap={2}
                        interval={0}
                        tick={<CustomizedXAxisTick outAdd={props.outAdd} outCat={props.outCat}/>}
                        padding={{top: 30, bottom: 30}}
                        onMouseDown={(e) => props.handleSummaryTickMouseClick(e, props.category)}
                    />

                    <YAxis
                        hide={true}
                        tick={<CustomizedYAxisTick/>}
                        // ticks={[0,1000,2000,3000,4000,5000,6000,7000]}
                        stroke={props.fill}
                        type="number"
                        allowDecimals={false}
                        padding={{top: 30, bottom: 30}}
                        interval={0}
                        domain={props.domain}
                        // tickFormatter={tick => yAxisFormatter(tick)}
                    />

                    <Tooltip
                        wrapperStyle={{fontSize: '0.9em', fontFamily: 'Questrial', color: props.fill}}
                        cursor={{fill: '#FEFEFD', fontFamily: 'Questrial', fontSize: '0.8em'}}
                        formatter={(value) => yAxisFormatter(value)
                        }
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
                            // fontWeight: labelWeight
                        }}
                        stroke='#B1B3B5'
                        strokeDasharray="3 3"
                    />

                    <Bar
                        className={classes.bar}
                        dataKey={title}
                        name={title}
                        isAnimationActive={false}
                        // fill={color_url(props.fill)}
                        animationDuration={200}
                        onMouseDown={(e) => props.handleSummaryBarMouseClick(e, props.category)}
                        style={{cursor: 'pointer'}}
                    >
                        {processedData.map((entry, index) => (
                            <Cell
                                fill={entry['x'] === props.outCat.labels[props.outAdd] && Object.keys(entry)[1] === props.outCat.category ? color_url("_active" + props.fill) : color_url(props.fill)}/>
                        ))}
                        <LabelList
                            dataKey="label"
                            position="top"
                            style={{
                                fill: props.fill,
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
