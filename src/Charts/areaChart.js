import React from 'react'
import {AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area, ResponsiveContainer} from 'recharts'
import {makeStyles} from "@material-ui/core"
import DataFormatter from 'excel-style-dataformatter'


export default function Areachart(props) {
    const useStyles = makeStyles(theme => ({
        chartContainer: {},
        bar: {
            fill: props.fill
        }
    }))
    const dataFormatter = new DataFormatter()
    const classes = useStyles()

    // console.log(props.data)

    return (
        <ResponsiveContainer width="100%" height={250}>
            <AreaChart width={730} height={250} data={props.data}
                       margin={{top: 10, right: 30, left: 15, bottom: 0}}>
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <XAxis dataKey="x"/>
                <YAxis/>
                {/*<CartesianGrid strokeDasharray="3 3"/>*/}
                <Tooltip/>
                <Area type="monotone" dataKey="Investor Cash Flow" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)"/>
                {/*<Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)"/>*/}
            </AreaChart>
        </ResponsiveContainer>

    )


}