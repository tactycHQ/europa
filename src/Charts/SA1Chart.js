import React from 'react'
import {LineChart, XAxis, YAxis, Tooltip, Line, ResponsiveContainer, Legend} from 'recharts'
import {makeStyles} from "@material-ui/core"
// import DataFormatter from 'excel-style-dataformatter'

const chartColors = [
    '#083D77',
    'red',
    'green',
    '#546e7a',
    '#0288d1',
    '#0288d1'
]

export default function SA1Chart(props) {
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
        return idxs.map((LineData, idx) => {
            return (
                <Line key={LineData + props.title}
                      type="monotone"
                      dataKey={LineData}
                      stroke={chartColors[idx]}
                      dot={true}
                      fillOpacity={1}
                      fill="#73766D"
                      animationDuration={500}
                />
            )
        })
    }

    const createCharts = () => {
        return (
            <ResponsiveContainer width="100%" height={250}>
                <LineChart width={730}
                           height={250}
                           data={props.data}
                           margin={{top: 10, right: 30, left: 15, bottom: 0}}
                           style={{background:'linear-gradient(#FEFEFD,#EEF2F6)'}}
                >
                    <XAxis dataKey={props.title}/>
                    <YAxis
                        hide={true}
                        padding={{top: 30, bottom: 30}}/>
                    <Tooltip/>
                    <Legend
                        wrapperStyle={{fontSize:'0.8em', fontFamily:'Questrial'}}
                        verticalAlign="bottom"
                        height={25}
                        iconSize={10}

                    />
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
