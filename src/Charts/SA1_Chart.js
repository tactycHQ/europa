import React from 'react'
import {LineChart, XAxis, YAxis, Tooltip, Line, ResponsiveContainer} from 'recharts'
import {makeStyles} from "@material-ui/core"
// import DataFormatter from 'excel-style-dataformatter'


export default function SA1_Chart(props) {
    const useStyles = makeStyles(theme => ({
        chartContainer: {},
        bar: {
            fill: props.fill
        }
    }))
    // const dataFormatter = new DataFormatter()
    const classes = useStyles()


    const createArea = () => {
        const idxs = Object.keys(props.data[0]).slice(1)
        return idxs.map(idx => {
            return (
                <Line key={idx + props.title}
                      type="monotone"
                      dataKey={idx}
                      stroke="#4B719C"
                      dot={false}
                      fillOpacity={1}
                      fill="#73766D"
                      animationDuration={500}
                />
            )
        })
    }

    const createCharts = () => {
        return (
            <ResponsiveContainer width={400} height={250}>
                <LineChart width={730} height={250} data={props.data}
                           margin={{top: 10, right: 30, left: 15, bottom: 0}}>
                    <XAxis dataKey={props.title}/>
                    <YAxis/>
                    <Tooltip/>
                    {createArea()}
                </LineChart>
            </ResponsiveContainer>
        )
    }

    const sa_charts = createCharts()

    return (
        <div>
            {sa_charts}
        </div>
    )
}
