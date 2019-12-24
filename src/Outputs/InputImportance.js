import React from 'react';
import {makeStyles} from '@material-ui/core/styles'
import {RadialBarChart, RadialBar, Legend, Tooltip, ResponsiveContainer} from "recharts"
import Paper from '@material-ui/core/Paper'
// import {convert_format} from "../utils/utils'


const data = [
    {
        "name": "18-24",
        "uv": 31.47,
        "pv": 2400,
        "fill": "#8884d8"
    },
    {
        "name": "25-29",
        "uv": 26.69,
        "pv": 4567,
        "fill": "#83a6ed"
    },
    {
        "name": "30-34",
        "uv": -15.69,
        "pv": 1398,
        "fill": "#8dd1e1"
    },
    {
        "name": "35-39",
        "uv": 8.22,
        "pv": 9800,
        "fill": "#82ca9d"
    },
    {
        "name": "40-49",
        "uv": -8.63,
        "pv": 3908,
        "fill": "#a4de6c"
    },
    {
        "name": "50+",
        "uv": -2.63,
        "pv": 4800,
        "fill": "#d0ed57"
    },
    {
        "name": "unknow",
        "uv": 6.67,
        "pv": 4800,
        "fill": "#ffc658"
    }
]


export default function InputImportance(props) {

    return (
        <Paper>
        <ResponsiveContainer width="100%" height={310}>
            <RadialBarChart
                innerRadius="30%"
                outerRadius="100%"
                data={data}
                startAngle={180}
                endAngle={0}
            >
                <RadialBar
                    minAngle={15}
                    label={{fill: '#666', position: 'insideStart'}}
                    background
                    clockWise={true}
                    dataKey='uv'
                />
                <Legend
                    iconSize={10}
                    // width={120}
                    // height={140}
                    layout='vertical'
                    verticalAlign='middle'
                    align="right"
                />
                <Tooltip/>
            </RadialBarChart>
        </ResponsiveContainer>
        </Paper>
    )
}
