import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {LineChart, XAxis, YAxis, Tooltip, Legend, Line, Label, ResponsiveContainer} from "recharts";
import Paper from '@material-ui/core/Paper'
import {convert_format} from "../utils/utils"
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

// import {convert_format} from "../utils/utils"


const chartColors = [
    '#083D77',
    'red',
    'green',
    '#546e7a',
    '#0288d1',
    '#0288d1'
]


export default function SA2Chart(props) {
    const useStyles = makeStyles(theme => ({
        chartsContainer: {
            display: 'flex',
            flexDirection: 'column',
            margin: '1%'

        },
        tableContainer: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '1%',
            padding: '1%',
            background: 'linear-gradient(#FEFEFD,#EEF2F6)'
        },
        xlabel: {
            fontFamily: 'Questrial',
            fontSize: '1.0em',
            fill: '#4F545A'
        },
        ylabel: {
            fontFamily: 'Questrial',
            fontSize: '1.0em',
            fill: '#4F545A',
            textAnchor: 'left'
        }

    }))

    let outAdd
    if (props.currOutputCell === '') {
        outAdd = Object.keys(props.outputs.labels)[0]
    } else {
        outAdd = props.currOutputCell
    }


    const classes = useStyles()

    const AxisFormatter = (fmt, value) => convert_format(fmt, value)

    function CustomizedYAxisTick(props) {
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
                    fill='#899CA9'
                    fontFamily="Questrial"
                >
                    {AxisFormatter(fmt, payload.value)}
                </text>
            </g>
        )
    }

    function CustomizedXAxisTick(props) {
        const {x, y, stroke, payload, fmt} = props

        return (
            <g transform={`translate(${x},${y})`}>
                <text
                    x={0}
                    y={0}
                    dy={16}
                    textAnchor="middle"
                    fill='#899CA9'
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


            // const minDomain = props.domains.min[outAdd]
            // const maxDomain = props.domains.max[outAdd]
            // const outDomain = [minDomain, maxDomain]
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

            const lines = bounds2.map((bound, idx) => {
                return (
                    <Line
                        key={bound}
                        type="monotone"
                        dataKey={convert_format(add2_fmt, bound)}
                        stroke={chartColors[idx]}
                        fill={chartColors[idx]}
                        strokeWidth={1}
                        isAnimationActive={true}
                        animationDuration={500}
                    />
                )
            })


            return (
                <Paper
                    className={classes.tableContainer}
                    key={tableData.inputs.toString() + outAdd.toString()}
                >
                    <ResponsiveContainer width="100%" height={310}>
                        <LineChart
                            width={730}
                            height={250}
                            data={table}
                            margin={{top: 5, right: 130, left: 50, bottom: 30}}
                        >
                            <XAxis
                                dataKey={add1}
                                tick={<CustomizedXAxisTick fmt={add1_fmt}/>}
                                tickLine={false}
                                padding={{top: 30, bottom: 30}}
                                stroke='#899CA9'
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
                                stroke='#899CA9'
                            >
                            </YAxis>
                            <Tooltip
                                wrapperStyle={{fontSize: '0.9em', fontFamily: 'Questrial'}}
                                cursor={{fill: '#FEFEFD', fontFamily: 'Questrial', fontSize: '0.8em'}}
                                formatter={(value) => AxisFormatter(out_fmt, value)}
                                labelFormatter={(value) => `${props.inputLabelMap[add1]}: ` + AxisFormatter(add1_fmt, value)}
                            />
                            {lines}
                            <Legend
                                wrapperStyle={{
                                    fontSize: '0.8em',
                                    fontFamily: 'Questrial',
                                    bottom: 0,
                                    color: '#899CA9',
                                }}
                                iconType="circle"
                                iconSize="10"
                                align="center"
                                verticalAlign="bottom"
                                layout="horizontal"
                                formatter={(value, entry, index) => `${props.inputLabelMap[add2]}: ` + value}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </Paper>
            )


        })
        return tables
    }


    //Execute Functions
    const tables = generateTables(outAdd)


    return (

        tables.map(table => {

            return (
                <div
                    className={classes.chartsContainer}
                    key={table.key}
                >
                    {table}
                </div>
            )
        })
    )
}
