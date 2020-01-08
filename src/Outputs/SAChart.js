import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {AreaChart, XAxis, YAxis, Tooltip, Legend, Area, Label, ResponsiveContainer} from "recharts"
import Paper from '@material-ui/core/Paper'
import {convert_format} from "../utils/utils"
import {LabelSelector} from "./LabelSelector"
import {Card} from "@material-ui/core"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


const chartColors = [
    '#004666',
    '#A5014B',
    '#247308',
    '#41C0EB',
    '#EC7404',
    '#00044E'
]


export default function SAChart(props) {

    //Initializing variables
    const outCat = props.outputs.find(output => (output.category === props.currCategory))

    //Styles
    const useStyles = makeStyles(theme => ({
        saCard: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%'
        },
        paper: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '1%',
            padding: '1%',
            background: 'linear-gradient(#F4F4F4 10%,#EBEEF0)',
        },
        cardHeaderContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            // backgroundColor:'orange',
            // marginBottom:0
        },
        cardTitleHeader: {
            color: '#4F545A',
            fontFamily: 'Questrial',
            fontWeight: '20',
            fontSize: '2em',
            marginTop: '3px',
            marginLeft: '7px',
            marginBottom: '10px',
            // backgroundColor:'blue'
        },
        chartTitle: {
            fontFamily: 'Questrial',
            fontSize: '1.2em',
            fontWeight: '300',
            color: '#3C4148',
            marginBottom: '0'
        },
        chartNote: {
            fontFamily: 'Questrial',
            fontSize: '0.9em',
            fontWeight: '300',
            color: '#3C4148',
            marginTop: '0'
        },
        xlabel: {
            fontFamily: 'Questrial',
            fontSize: '1.0em',
            fontWeight: '100',
            fill: '#4F545A'
        },
        ylabel: {
            fontFamily: 'Questrial',
            fontSize: '1.0em',
            fill: '#4F545A',
            textAnchor: 'left'
        },
        tableCell: {
            fontFamily: 'Questrial',
            fontSize: '0.9em',
            fontWeight:'550',
            textAlign: 'center',
            color: '#3C4148',
            background: '#FEFEFD',
        },
        topBoundCell: {
            fontFamily: 'Questrial',
            fontSize: '0.9em',
            fontWeight: '500',
            textAlign: 'center',
            // background: '#B9D7E4',
            color: '#001021',
            background: '#D7DEE2',
            // width:'15px'
        },
        leftBoundCell: {
            fontFamily: 'Questrial',
            fontSize: '0.9em',
            fontWeight: '500',
            textAlign: 'center',
            // background: '#B9D7E4',
            color: '#001021',
            background: '#D7DEE2'
        },
        cornerCell: {
            fontFamily: 'Questrial',
            fontSize: '0',
            textAlign: 'center',
            // background: '#284B63',
            // color: '#284B63'
        }

    }))
    const classes = useStyles()

    //Custom Functions
    // Get address of outout label selected from dropdown
    const getOutAdd = () => {
        let outAdd
        if (props.currOutputCell === '') {
            outAdd = Object.keys(outCat.labels)[0]
        } else {
            outAdd = props.currOutputCell
        }
        return outAdd
    }

    //Axis formatter
    const AxisFormatter = (fmt, value) => convert_format(fmt, value)

    //Tick formatter
    const CustomizedYAxisTick = (props) => {
        const {x, y, payload, fmt} = props

        return (
            <g transform={`translate(${x},${y})`}>
                <text
                    x={0}
                    y={0}
                    dy={16}
                    textAnchor="end"
                    transform="rotate(-0)"
                    fontSize='0.9em'
                    fill='#3C4148'
                    fontFamily="Questrial"
                >
                    {AxisFormatter(fmt, payload.value)}
                </text>
            </g>
        )
    }

    //Tick formatter
    const CustomizedXAxisTick = (props) => {
        const {x, y, payload, fmt} = props

        return (
            <g transform={`translate(${x},${y})`}>
                <text
                    x={0}
                    y={0}
                    dy={16}
                    textAnchor="middle"
                    fill='#3C4148'
                    transform="rotate(-0)"
                    fontSize='0.9em'
                    fontFamily="Questrial"
                    fontWeight='500'
                >
                    {AxisFormatter(fmt, payload.value)}
                </text>
            </g>
        )
    }

    //Area chart creator
    const generateLineCharts = (outAdd) => {
        const charts = props.data.map(chartData => {
            const flexInputs = chartData.inputs
            const bounds = chartData.bounds
            const add1 = flexInputs[0]
            const add2 = flexInputs[1]
            const out_fmt = props.formats[outAdd]
            const add1_fmt = props.formats[add1]
            const add2_fmt = props.formats[add2]
            const bounds1 = bounds[0][add1]
            const bounds2 = bounds[1][add2]

            const lineChart = bounds1.map((value1) => {
                const row = bounds2.reduce((acc, value2) => {
                    const combo = {
                        ...props.currInputVal,
                        [add1]: value1,
                        [add2]: value2
                    }

                    const answer = props.findSolution(combo)[outAdd]
                    acc[convert_format(add2_fmt, value2)] = answer
                    return acc
                }, {})
                return {
                    [add1]: value1,
                    ...row
                }
            })

            const areas = bounds2.map((bound, idx) => {
                const color_url = `url(#${bound})`
                return (
                    <Area
                        key={bound}
                        type="monotone"
                        dataKey={convert_format(add2_fmt, bound)}
                        stroke={chartColors[idx]}
                        fill={color_url}
                        // strokeWidth={1.2}
                        isAnimationActive={false}
                        animationDuration={500}
                        dot={{stroke: 'white', fill: chartColors[idx], strokeWidth: 2}}
                        activeDot={{stroke: 'white', strokeWidth: 2, r: 4}}
                    />
                )
            })

            const gradients = bounds2.map((bound, idx) => {
                return (
                    <defs key={bound}>
                        <linearGradient id={bound} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="1%" stopColor={chartColors[idx]} stopOpacity={0.1}/>
                            <stop offset="12%" stopColor={chartColors[idx]} stopOpacity={0.01}/>
                            <stop offset="20%" stopColor={chartColors[idx]} stopOpacity={0.00}/>
                        </linearGradient>
                    </defs>
                )
            })

            return (
                <Paper className={classes.paper} key={chartData.inputs.toString() + outAdd.toString()}>
                    <h3 className={classes.chartTitle}>{outCat.labels[outAdd]}, {props.currCategory}</h3>
                    <h3 className={classes.chartNote}><em>Sensitized
                        Variables:</em> {props.inputLabelMap[add2]}, {props.inputLabelMap[add1]}</h3>
                    <ResponsiveContainer width="100%" height={310}>
                        <AreaChart
                            // width={730}
                            // height={250}
                            data={lineChart}
                            margin={{top: 5, right: 20, left: 10, bottom: 30}}
                            baseValue="dataMin"
                        >
                            {gradients}
                            <XAxis
                                dataKey={add1}
                                tick={<CustomizedXAxisTick fmt={add1_fmt}/>}
                                tickLine={false}
                                padding={{top: 30, bottom: 30}}
                                stroke='#3C4148'
                            >
                                <Label
                                    value={`${props.inputLabelMap[add1]}`}
                                    position="bottom"
                                    className={classes.xlabel}
                                />
                            </XAxis>
                            <YAxis
                                type="number"
                                tick={<CustomizedYAxisTick fmt={out_fmt}/>}
                                tickLine={false}
                                domain={['auto', 'auto']}
                                interval={0}
                                padding={{top: 30, bottom: 30}}
                                stroke='#3C4148'
                            >
                            </YAxis>
                            <Tooltip
                                wrapperStyle={{fontSize: '0.9em', fontFamily: 'Questrial'}}
                                cursor={{fill: '#FEFEFD', fontFamily: 'Questrial', fontSize: '0.8em'}}
                                formatter={(value) => AxisFormatter(out_fmt, value)}
                                labelFormatter={(value) => `${props.inputLabelMap[add1]}: ` + AxisFormatter(add1_fmt, value)}
                            />
                            {areas}
                            <Legend
                                wrapperStyle={{
                                    fontSize: '0.9em',
                                    fontFamily: 'Questrial',
                                    bottom: 0,
                                    color: '#3C4148',
                                }}
                                iconType="circle"
                                iconSize="10"
                                align="center"
                                verticalAlign="bottom"
                                layout="horizontal"
                                formatter={(value, entry, index) => `${props.inputLabelMap[add2]}: ` + value}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </Paper>
            )
        })
        return charts
    }

    //Table chart creator
    const generateTableCharts = (outAdd) => {
        const charts = props.data.map(chartData => {
            const flexInputs = chartData.inputs
            const bounds = chartData.bounds
            const add1 = flexInputs[0]
            const add2 = flexInputs[1]
            const out_fmt = props.formats[outAdd]
            const add1_fmt = props.formats[add1]
            const add2_fmt = props.formats[add2]
            const bounds1 = bounds[0][add1]
            const bounds2 = bounds[1][add2]

            const body = bounds1.map((value1) => {
                const row = bounds2.reduce((acc, value2, idx) => {
                    const combo = {
                        ...props.currInputVal,
                        [add1]: value1,
                        [add2]: value2
                    }

                    const answer = props.findSolution(combo)[outAdd]
                    acc.push(<TableCell className={classes.tableCell}>{convert_format(out_fmt, answer)}</TableCell>)
                    return acc
                }, [<TableCell className={classes.leftBoundCell}>{convert_format(add1_fmt, value1)}</TableCell>])
                return (
                    <TableRow>
                        {row}
                    </TableRow>
                )
            })


            const topRow = bounds2.reduce((acc, value2) => {
                acc.push(<TableCell className={classes.topBoundCell}>{convert_format(add2_fmt, value2)}</TableCell>)
                return acc
            }, [<TableCell className={classes.cornerCell}>{convert_format(add1_fmt, 0)}</TableCell>])

            return (
                <Paper className={classes.paper} key={chartData.inputs.toString() + outAdd.toString()}>
                    <h3 className={classes.chartTitle}>{outCat.labels[outAdd]}, {props.currCategory}</h3>
                    <h3 className={classes.chartNote}><em>Sensitized
                        Variables:</em> {props.inputLabelMap[add2]}, {props.inputLabelMap[add1]}</h3>
                    <TableContainer>
                        <Table>
                            <TableHead>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    {topRow}
                                </TableRow>
                                {body}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            )
        })
        return charts
    }

    //Execute Functions
    const outAdd = getOutAdd()
    const linecharts = generateLineCharts(outAdd)
    const tablecharts = generateTableCharts(outAdd)


    return (
        <Card className={classes.saCard} key={"SA" + props.currOutputCell}>
            <div className={classes.cardHeaderContainer}>
                <h2 className={classes.cardTitleHeader}>Sensitivity Analysis</h2>
            </div>
            <LabelSelector
                type="withLabel"
                outputs={props.outputs}
                handleOutputLabelChange={props.handleOutputLabelChange}
                handleOutputCategoryChange={props.handleOutputCategoryChange}
                currOutputCell={props.currOutputCell}
                currCategory={props.currCategory}/>
            {/*{linecharts}*/}
            {tablecharts}
        </Card>
    )
}

