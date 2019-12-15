import React from 'react'
import {
    BarChart, Bar, XAxis, YAxis, Label, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import {VictoryBar} from 'victory'
import {VictoryTheme} from 'victory'

function CustomizedAxisTick(props) {

    const {x, y, stroke, payload} = props

    return (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{payload.value}</text>
        </g>
    )
}

const container = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    width: '45%'
}


export default function Barchart(props) {

    const titleBox = {
        textAlign: 'center',
        color: props.fill,
        fontSize: '1.2em',
        fontWeight: 'bold',
        fontFamily:'Roboto'
    }

    const title = Object.keys(props.currSolution[0])[1]


    return (
        <div style={container}>
            <div style={titleBox}>{title}</div>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    data={props.currSolution}
                    margin={{
                        top: 10, right: 40, left: 30, bottom: 15,
                    }}
                    maxBarSize={30}
                >
                    <XAxis dataKey="name" minTickGap={2} interval={0} tick={<CustomizedAxisTick/>} height={100}/>
                    <YAxis/>
                    <Tooltip/>
                    <Bar dataKey={title} fill={props.fill} />
                </BarChart>
            </ResponsiveContainer>
            {/*<VictoryBar theme={VictoryTheme.material} data={props.currSolution} x={"name"} y={title} style={{*/}
            {/*    data: {fill: "#c43a31"}*/}
        </div>
    )

}
