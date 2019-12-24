import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {AreaChart, XAxis, YAxis, Tooltip, Legend, Area, Label, ResponsiveContainer} from "recharts";
import Paper from '@material-ui/core/Paper'
import {convert_format} from "../utils/utils"


const chartColors = [
    '#004666',
    '#A5014B',
    '#247308',
    '#41C0EB',
    '#EC7404',
    '#00044E'
]


export default function SAChart(props) {

    //Styles
    const useStyles = makeStyles(theme => ({
        chartsContainer: {
            display: 'flex',
            flexDirection: 'column',
            width: '48%',
            margin: '1%',
            justifyContent: 'center',
            alignItems: 'center'
        },
        paper: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '1%',
            padding: '1%',
            background: 'linear-gradient(#FFFFFF 60%,#F4F4F4)'
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

    //Custom Functions
    const getOutAdd =() => {
        let outAdd
        if (props.currOutputCell === '') {
            outAdd = Object.keys(props.outputs.labels)[0]
        } else {
            outAdd = props.currOutputCell
        }
        return outAdd
    }

    const AxisFormatter = (fmt, value) => convert_format(fmt, value)

    const CustomizedYAxisTick = (props) => {
        const {x, y, stroke, payload, fmt} = props

        return (
            <g transform={`translate(${x},${y})`}>
                <text
                    x={0}
                    y={0}
                    dy={16}
                    textAnchor="end"
                    transform="rotate(-0)"
                    fontSize='0.9em'
                    fill='#3C4148'
                    fontFamily="Questrial"
                >
                    {AxisFormatter(fmt, payload.value)}
                </text>
            </g>
        )
    }

    const CustomizedXAxisTick = (props) => {
        const {x, y, stroke, payload, fmt} = props

        return (
            <g transform={`translate(${x},${y})`}>
                <text
                    x={0}
                    y={0}
                    dy={16}
                    textAnchor="middle"
                    fill='#3C4148'
                    transform="rotate(-0)"
                    fontSize='0.9em'
                    fontFamily="Questrial"
                    fontWeight='500'
                >
                    {AxisFormatter(fmt, payload.value)}
                </text>
            </g>
        )
    }

    const generateTables = (outAdd) => {

        const tables = props.data.map(tableData => {
            const flexInputs = tableData.inputs
            const bounds = tableData.bounds
            const add1 = flexInputs[0]
            const add2 = flexInputs[1]
            const out_fmt = props.formats[outAdd]
            const add1_fmt = props.formats[add1]
            const add2_fmt = props.formats[add2]
            const bounds1 = bounds[0][add1]
            const bounds2 = bounds[1][add2]

            const table = bounds1.map((value1) => {
                const row = bounds2.reduce((acc, value2) => {

                    const combo = {
                        ...props.currInputVal,
                        [add1]: value1,
                        [add2]: value2
                    }

                    const answer = props.findSolution(combo)[outAdd]
                    acc[convert_format(add2_fmt, value2)] = answer
                    return acc
                }, {})
                return {
                    [add1]: value1,
                    ...row
                }
            })

            const areas = bounds2.map((bound, idx) => {
                const color_url = `url(#${bound})`
                return (
                    <Area
                        key={bound}
                        type="monotone"
                        dataKey={convert_format(add2_fmt, bound)}
                        stroke={chartColors[idx]}
                        fill={color_url}
                        // strokeWidth={1.2}
                        isAnimationActive={false}
                        animationDuration={500}
                        dot={{stroke: 'white', fill: chartColors[idx], strokeWidth: 2}}
                        activeDot={{stroke: 'white', strokeWidth: 2, r: 4}}
                    />
                )
            })

            const gradients = bounds2.map((bound, idx) => {
                return (
                    <defs key={bound}>
                        <linearGradient id={bound} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="1%" stopColor={chartColors[idx]} stopOpacity={0.1}/>
                            <stop offset="12%" stopColor={chartColors[idx]} stopOpacity={0.01}/>
                            <stop offset="20%" stopColor={chartColors[idx]} stopOpacity={0.00}/>
                        </linearGradient>
                    </defs>
                )
            })


            return (
                <Paper className={classes.paper} key={tableData.inputs.toString() + outAdd.toString()}
                >
                    <h3 className={classes.chartTitle}>{props.outputs.labels[outAdd]}, {props.outputs.category}</h3>
                    <h3 className={classes.chartNote}><em>Sensitized
                        Variables:</em> {props.inputLabelMap[add2]}, {props.inputLabelMap[add1]}</h3>
                    <ResponsiveContainer width="100%" height={310}>
                        <AreaChart
                            width={730}
                            height={250}
                            data={table}
                            margin={{top: 5, right: 20, left: 10, bottom: 30}}
                            baseValue="dataMin"
                        >
                            {gradients}
                            <XAxis
                                dataKey={add1}
                                tick={<CustomizedXAxisTick fmt={add1_fmt}/>}
                                tickLine={false}
                                padding={{top: 30, bottom: 30}}
                                stroke='#3C4148'
                            >
                                <Label
                                    value={`${props.inputLabelMap[add1]}`}
                                    position="bottom"
                                    className={classes.xlabel}

                                />
                            </XAxis>
                            <YAxis
                                type="number"
                                tick={<CustomizedYAxisTick fmt={out_fmt}/>}
                                tickLine={false}
                                domain={['auto', 'auto']}
                                interval={0}
                                padding={{top: 30, bottom: 30}}
                                stroke='#3C4148'
                            >
                            </YAxis>
                            <Tooltip
                                wrapperStyle={{fontSize: '0.9em', fontFamily: 'Questrial'}}
                                cursor={{fill: '#FEFEFD', fontFamily: 'Questrial', fontSize: '0.8em'}}
                                formatter={(value) => AxisFormatter(out_fmt, value)}
                                labelFormatter={(value) => `${props.inputLabelMap[add1]}: ` + AxisFormatter(add1_fmt, value)}
                            />
                            {areas}
                            <Legend
                                wrapperStyle={{
                                    fontSize: '0.9em',
                                    fontFamily: 'Questrial',
                                    bottom: 0,
                                    color: '#3C4148',
                                }}
                                iconType="circle"
                                iconSize="10"
                                align="center"
                                verticalAlign="bottom"
                                layout="horizontal"
                                formatter={(value, entry, index) => `${props.inputLabelMap[add2]}: ` + value}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </Paper>
            )


        })
        return tables
    }

    //Execute Functions
    const outAdd = getOutAdd()
    const tables = generateTables(outAdd)


    return (
        tables.map(table => {
            return (
                <div className={classes.chartsContainer} key={table.key}>
                    {table}
                </div>
            )
        })
    )
}
