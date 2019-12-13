import React from 'react'
import {
    BarChart, Bar, XAxis, YAxis, Label, Tooltip, Legend, ResponsiveContainer
} from 'recharts'

function CustomizedAxisTick(props) {

    const {x, y, stroke, payload} = props

    return (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{payload.value}</text>
        </g>
    )
}


export default function Barchart(props) {

    const container = {
        display: 'flex',
        justifyContent: 'flex-start',
        height: '100%',
        width: '33%'
    }


    return (
        <div style={container}>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    data={props.currSolution}
                    margin={{
                        top: 10, right: 40, left: 30, bottom: 15,
                    }}
                >
                    <XAxis dataKey="name" minTickGap={2} interval={0} tick={<CustomizedAxisTick/>} height={100}/>

                    <YAxis/>
                    <Tooltip/>
                    <Bar dataKey="value" fill="#26a69a"/>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )

}
