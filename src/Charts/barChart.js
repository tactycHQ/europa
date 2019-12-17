import React from 'react'
import {BarChart, Bar, XAxis, YAxis, LabelList, Tooltip, ResponsiveContainer, AreaChart} from 'recharts'
import {makeStyles} from "@material-ui/core"
import DataFormatter from 'excel-style-dataformatter'


export default function Barchart(props) {

    // Defining hooks
    const useStyles = makeStyles(theme => ({
        chartContainer: {},
        bar: {
        }
    }))
    const dataFormatter = new DataFormatter()
    const classes = useStyles()

    // Defined variables
    const title = Object.keys(props.currSolution[0])[1]
    const master_fmt = Object.entries(props.currSolution[0])[2][1]
    const color_url =  "url(#"+props.fill+")"

    // Defined functions
    const process_formats = () => {
        return props.currSolution.map(output => {
                return (
                    {
                        ...output,
                        label: convert_format(output.format, output[title])
                    })
            }
        )
    }

    const convert_format = (fmt, value) => {
        let temp_format = dataFormatter.format(value, 'Number', fmt).value.replace(' ', ',')
        if (temp_format.substr(-1) === ',') {
            return temp_format.slice(0, -1)
        } else {
            return temp_format
        }
    }

    const yAxisFormatter = value => convert_format(master_fmt, value)

    function CustomizedYAxisTick(props) {
        const {x, y, stroke, payload} = props

        return (
            <g transform={`translate(${x},${y})`}>
                <text
                    x={0}
                    y={0}
                    dy={16}
                    textAnchor="end"
                    transform="rotate(-0)"
                    fontSize='1.0em'
                    fill={props.fill}
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


    // Calling functions
    const processedData = process_formats()



    return (
        <ResponsiveContainer width="100%" height={250}>
            <BarChart
                data={processedData}
                margin={{top: 15, right: 10, left: 10, bottom: 5}}
                maxBarSize={30}
            >
                <defs>
                    <linearGradient id={props.fill} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={props.fill} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={props.fill} stopOpacity={0.2}/>
                    </linearGradient>
                </defs>
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
                    stroke={props.fill}
                    type="number"
                    allowDecimals={false}
                    padding={{top: 30, bottom: 30}}
                    interval={0}
                    domain={props.domain}
                    tickFormatter={tick => yAxisFormatter(tick)}
                />

                <Tooltip cursor={{fill: '#5C6671'}}/>

                <Bar
                    className={classes.bar}
                    dataKey={title}
                    name={title}
                    isAnimationActive={true}
                    fill={color_url}
                >
                    <LabelList
                        dataKey="label"
                        position="top"
                        // formatter={(value) => value}
                        style={{fill: props.fill, fontFamily: 'Quicksand', fontSize: '1.0em', fontWeight: '500'}}
                    />
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    )
}
