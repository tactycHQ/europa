import React from 'react'
import {BarChart, Bar, XAxis, YAxis, LabelList, Tooltip, ResponsiveContainer, ReferenceLine} from 'recharts'
import {Card, makeStyles} from "@material-ui/core"
import {convert_format} from "../utils/utils"
import CardSettings from "./CardSettings";


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
        outputCards: {
            display: 'flex',
            flexDirection: 'column',
            width: chartWidth,
            margin: '5px',
            background: '#FEFEFD'
        },
        cardHeaderContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            // backgroundColor:'orange',
            // marginBottom:0
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
        }
    }))
    const classes = useStyles()


    // Defined variables
    const title = Object.keys(props.currSolution[0])[1]
    const master_fmt = Object.entries(props.currSolution[0])[2][1]
    const color_url = "url(#" + props.fill + ")"

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
        const {x, y, payload} = props

        return (
            <g transform={`translate(${x},${y})`}>
                <text
                    x={0}
                    y={0}
                    dy={16}
                    textAnchor="middle"
                    fill={props.fill}
                    transform="rotate(-0)"
                    fontSize='1.0em'
                    fontFamily="Questrial"
                    fontWeight='500'
                >
                    {payload.value}
                </text>
            </g>
        )
    }

    // Function executions
    const processedData = process_formats()

    return (
        <Card className={classes.outputCards} key={"summary" + props.category} elevation={3}>
            <div className={classes.cardHeaderContainer}>
                <h2 className={classes.cardTitleHeader}>{props.category}</h2>
                <CardSettings category={props.category}
                              setSummaryPrefs={props.setSummaryPrefs}
                              summaryPrefs={props.summaryPrefs}/>
            </div>
            <ResponsiveContainer width="100%" height={310}>
                <BarChart
                    data={processedData}
                    margin={{top: 15, right: 10, left: 10, bottom: 0}}
                    maxBarSize={30}
                    style={{background: 'linear-gradient(#FFFFFF 60%,#F4F4F4)'}}

                >
                    <defs>
                        <linearGradient id={props.fill} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={props.fill} stopOpacity={1.0}/>
                            <stop offset="75%" stopColor={props.fill} stopOpacity={0.4}/>
                        </linearGradient>
                    </defs>
                    <XAxis
                        hide={false}
                        stroke={props.fill}
                        dataKey="x"
                        tickLine={false}
                        minTickGap={2}
                        interval={0}
                        tick={<CustomizedXAxisTick/>}
                        padding={{top: 30, bottom: 30}}
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
                    <ReferenceLine y={0} stroke="gray" strokeDasharray="3 3" strokeWidth={0.1}/>

                    <Bar
                        className={classes.bar}
                        dataKey={title}
                        name={title}
                        isAnimationActive={false}
                        fill={color_url}
                        animationDuration={200}
                    >
                        <LabelList
                            dataKey="label"
                            position="top"
                            style={{fill: props.fill, fontFamily: 'Questrial', fontSize: '1.0em', fontWeight: '500'}}
                        />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </Card>
    )
}
