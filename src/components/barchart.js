import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts'


export default function Barchart(props) {

    const js_data = props.data
    // console.log(js_data.outputs)
    let outVals
    let data
    if (js_data) {
        outVals = js_data.outputs
        data = Object.entries(outVals).map(i => ({
              name: i[0],
              Value: i[1]
            }
        ))
    }

    return (
        <BarChart
            width={520}
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
