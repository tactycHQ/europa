import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts'


export default function Barchart(props) {

    const data = props.currSolution


    return (
        <BarChart
            width={1000}
            height={300}
            data={data}
            margin={{
                top: 10, right: 40, left: 30, bottom: 15,
            }}
        >
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Legend/>
            <Bar dataKey="Value" fill="#26a69a"/>
        </BarChart>
    )

}
