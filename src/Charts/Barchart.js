import React from 'react'
import {BarChart, Bar, XAxis, YAxis, LabelList, Tooltip, Legend, ResponsiveContainer} from 'recharts'
import {Card, CardHeader, makeStyles} from "@material-ui/core"
import DataFormatter from 'excel-style-dataformatter'


export default function Barchart(props) {

    const useStyles = makeStyles(theme => ({
        chartContainer: {
        },
        bar: {
            fill: props.fill
        }
    }))


    const classes = useStyles()

    const title = Object.keys(props.currSolution[0])[1]
    const fmt = Object.values(props.currSolution[0])[2]
    const dataFormatter = new DataFormatter()

    const convert_format = (fmt, value) => {
        return dataFormatter.format(value, 'Number', fmt).value.replace(' ', ',')
    }

    const yAxisFormatter = value => convert_format(fmt, value)

    const labelFormatter = (value) => convert_format(fmt, value)

    function CustomizedYAxisTick(props) {
        const {x, y, stroke, payload} = props

        return (
            <g transform={`translate(${x},${y})`}>
                <text
                    x={0}
                    y={0}
                    dy={16}
                    textAnchor="middle"
                    fill={props.fill}
                    transform="rotate(-0)"
                    fontSize='1.0em'
                    fontFamily="Quicksand"
                >
                    {yAxisFormatter(payload.value)}
                </text>
            </g>
        )
    }

    function CustomizedXAxisTick(props) {
        const {x, y, stroke, payload} = props

        return (
            <g transform={`translate(${x},${y})`}>
                <text
                    x={0}
                    y={0}
                    dy={16}
                    textAnchor="middle"
                    fill={props.fill}
                    transform="rotate(-0)"
                    fontSize='1.0em'
                    fontFamily="Quicksand"
                    fontWeight='500'
                >
                    {payload.value}
                </text>
            </g>
        )
    }

    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart
                data={props.currSolution}
                margin={{top: 15, right: 10, left: 10, bottom: 5}}
                maxBarSize={30}
            >
                <XAxis
                    hide={false}
                    stroke={props.fill}
                    dataKey="x"
                    tickLine={false}
                    minTickGap={2}
                    interval={0}
                    tick={<CustomizedXAxisTick/>}
                    padding={{top: 30, bottom: 30}}/>

                <YAxis
                    hide={true}
                    // tick={{stroke: 'red', strokeWidth: 2}}
                    tick={<CustomizedYAxisTick/>}
                    // ticks={[0,1000,2000,3000,4000,5000,6000,7000]}
                    type="number"
                    allowDecimals={false}
                    padding={{top: 30, bottom: 30}}
                    interval={0}
                    domain={props.domain}
                    tickFormatter={tick => yAxisFormatter(tick)}
                />

                <Tooltip/>
                <Bar className={classes.bar} dataKey={title} name={title}>
                    <LabelList
                        datakey={title}
                        position={"top"}
                        formatter={(value) => labelFormatter(value)}
                        style={{fill: props.fill, fontFamily: 'Quicksand', fontSize: '1.2em', fontWeight: '500'}}
                    />
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    )
}


{/*<VictoryChart*/
}
{/*    animate={{*/
}
{/*        duration: 500,*/
}
{/*        onLoad: {duration: 500}*/
}
{/*    }}*/
}
{/*    domainPadding={{x: 100}}*/
}
{/*>*/
}
{/*    <VictoryBar*/
}
{/*        data={props.currSolution}*/
}
{/*        // barRatio={0.8}*/
}
{/*        x={"x"}*/
}
{/*        y={title}*/
}
{/*        labelComponent ={<VictoryTooltip/>}*/
}
{/*        labels={data => Math.round(data.y)}*/
}
{/*        style={{*/
}
{/*            data: {fill: props.fill, stroke: "gray", strokeWidth: 2},*/
}
{/*            labels: {fill: props.fill}*/
}
{/*        }}*/
}
{/*        labelComponent={<VictoryLabel dy={-15}/>}*/
}
{/*    />*/
}
{/*    /!*<VictoryAxis/>*!/*/
}
{/*</VictoryChart>*/
}
