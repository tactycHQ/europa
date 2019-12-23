import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {LineChart, XAxis, YAxis, Tooltip, Legend, Line, BarChart} from "recharts";
import Paper from '@material-ui/core/Paper'
import {convert_format} from "../utils/utils"

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
            background: 'linear-gradient(#FEFEFD,#EEF2F6)',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '1%',
            padding: '1%'


        },
        table: {
            margin: '5%'

        },
        headerRow: {
            background: '#4B719C',
            display: 'flex',
            width: '48%',
            justifyContent: 'space-between'

        },
        headerCell: {
            backgroundColor: '#4B719C',
            color: '#F4F9E9',
            fontSize: '1.0em',
            fontWeight: '500',
            fontFamily: 'Questrial',
            borderStyle: 'none',
            padding: 10,
            minWidth: '15%',
            maxWidth: '15%'
        },
        cell: {
            fontSize: '1.0em',
            color: '#4F545A',
            fontFamily: 'Questrial',
            padding: 10,
            minWidth: '15%',
            maxWidth: '15%',
        },
        row: {
            display: 'flex',
            width: '48%',
            justifyContent: 'space-between'

        }
    }))

    const classes = useStyles()

    const yAxisFormatter = (fmt, value) => convert_format(fmt, value)

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
                    fontSize='1.0em'
                    // fill={props.fill}
                    fontFamily="Questrial"
                >
                    {yAxisFormatter(fmt, payload.value)}
                </text>
            </g>
        )
    }

    const generateTables = (outAdd) => {

        const tables = props.data.map(tableData => {


            const minDomain = props.domains.min[outAdd]
            const maxDomain = props.domains.max[outAdd]
            const outDomain = [minDomain, maxDomain]
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
                    acc[value2] = answer
                    return acc
                }, {})

                return {
                    [add1]: value1,
                    ...row
                }
            })

            const lines = bounds2.map((bound, idx) => {
                const color_url = "url(#" + idx + ")"
                return (
                    <Line
                        key={bound}
                        type="monotone"
                        dataKey={bound}
                        stroke={color_url}
                        fill={chartColors[idx]}
                        strokeWidth={1}
                    />
                )
            })


            const gradients = bounds2.map((bound, idx) => {
                return (
                    <defs>
                        <linearGradient id={idx} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="50%" stopColor={chartColors[idx]} stopOpacity={0.8}/>
                            <stop offset="75%" stopColor={chartColors[idx]} stopOpacity={0.5}/>
                            <stop offset="0%" stopColor={chartColors[idx]} stopOpacity={0.3}/>
                        </linearGradient>
                    </defs>
                )
            })

            return (
                <Paper className={classes.tableContainer}>
                    <h3>{`${props.inputLabelMap[add1]} vs. ${props.inputLabelMap[add2]}`}</h3>
                    <LineChart
                        width={730}
                        height={250}
                        data={table}
                        margin={{top: 5, right: 30, left: 20, bottom: 5}}
                    >
                        {gradients}
                        <XAxis dataKey={add1}/>
                        <YAxis
                            type="number"
                            tick={<CustomizedYAxisTick fmt={add1_fmt}/>}
                            domain={['auto', 'auto']}
                            interval={0}
                        />
                        <Tooltip/>
                        <Legend/>
                        {lines}
                    </LineChart>
                </Paper>
            )


        })
        return tables
    }


    //Execute Functions
    const tables = generateTables("Annual!D73")


    return (

        tables.map(table => {
            return (
                <div className={classes.chartsContainer}>
                    {table}
                </div>
            )
        })
    )
}
