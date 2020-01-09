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
import TableRow from '@material-ui/core/TableRow';
import {getAvg} from '../utils/utils'

const chartColors = [
    '#004666',
    '#A5014B',
    '#247308',
    '#41C0EB',
    '#006E9F',
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
            marginTop: '10px',
            marginLeft: '15px',
            marginBottom: '20px',
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
        lineChartContainer: {
            margin: '2.5%'
        },
        tableChartContainer: {
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            borderRadius: '5px',
            background: '#EBEEF0',
            padding: '10px'
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
        bodyRow: {
            "&:hover": {
                backgroundColor: "#EED0DE !important"
            },
            // backgroundColor: '#FEFEFD'
        },
        tableCell: {
            fontFamily: 'Questrial',
            fontSize: '0.9em',
            fontWeight: '550',
            textAlign: 'center',
            color: '#005B83',
            padding: '5px'
        },
        topBoundCell: {
            fontFamily: 'Questrial',
            fontSize: '0.9em',
            fontWeight: '500',
            textAlign: 'center',
            // background: '#B9D7E4',
            color: '#FEFEFD',
            background: '#4595B9',
            // height:'20px'
            // width:'15px'
            // height: '20px',
            padding: '5px',
        },
        leftBoundCell: {
            fontFamily: 'Questrial',
            fontSize: '0.9em',
            fontWeight: '500',
            textAlign: 'center',
            // background: '#B9D7E4',
            color: '#FEFEFD',
            background: '#4595B9',
            width: '100px',
            padding: '0px',

        },
        cornerCell: {
            fontFamily: 'Questrial',
            fontSize: '0',
            textAlign: 'center',
            border: 'none'
            // background: '#284B63',
            // color: '#284B63'
        },
        labelTopCell: {
            fontFamily: 'Questrial',
            fontSize: '0.9em',
            textAlign: 'center',
            fontWeight: '600',
            // background: '#D7DEE2',
            color: '#006E9F',
            padding: '5px',
        },
        columnLabelCell: {
            position: 'relative',
            top: '20px',
            display: 'flex',
            fontFamily: 'Questrial',
            fontSize: '0.9em',
            textAlign: 'center',
            fontWeight: '600',
            color: '#006E9F',
            wordWrap: 'break-word',
            padding: '2px',
            border: 'none',
            marginTop: '20px',
            // background: 'red'
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


    const generateCharts = (outAdd) => {
        return props.data.map(chartData => {
            const flexInputs = chartData.inputs
            const bounds = chartData.bounds
            const add1 = flexInputs[0]
            const add2 = flexInputs[1]
            const out_fmt = props.formats[outAdd]
            const add1_fmt = props.formats[add1]
            const add2_fmt = props.formats[add2]
            const bounds1 = bounds[0][add1]
            const bounds2 = bounds[1][add2]

            const lineChart = createLineChart(chartData, outAdd, bounds1, bounds2, add1, add2, add2_fmt, add1_fmt, out_fmt)
            const tableChart = createTableChart(chartData, outAdd, bounds1, bounds2, add1, add2, add2_fmt, add1_fmt, out_fmt)

            return (
                <Paper
                    className={classes.paper}
                    key={outAdd + add1 + add2 + '_combo'}
                    elevation={2}
                >
                    <h3 className={classes.chartTitle}>{outCat.labels[outAdd]}, {props.currCategory}</h3>
                    <h3 className={classes.chartNote}><em>Sensitized
                        Variables:</em> {props.inputLabelMap[add2]}, {props.inputLabelMap[add1]}</h3>
                    {lineChart}
                    {tableChart}
                </Paper>
            )
        })
    }

    //Table chart creator
    const createTableChart = (chartData, outAdd, bounds1, bounds2, add1, add2, add2_fmt, add1_fmt, out_fmt) => {

        const body = bounds1.map((value1) => {

            const row = bounds2.reduce((acc, value2, idx) => {
                    const combo = {
                        ...props.currInputVal,
                        [add1]: value1,
                        [add2]: value2
                    }
                    const answer = props.findSolution(combo)[outAdd]

                    acc.push(<TableCell
                        className={classes.tableCell}
                        key={add1 + add2 + '_table' + add2 + value2}
                    >
                        {convert_format(out_fmt, answer)}
                    </TableCell>)

                    return acc

                },
                [<TableCell className={classes.leftBoundCell} key={add1 + add2 + '_leftBound'}>
                    {convert_format(add1_fmt, value1)}
                </TableCell>]
            )

            return (
                <TableRow className={classes.bodyRow} key={bounds1 + value1} hover>
                    {row}
                </TableRow>
            )
        })


        const topRow = bounds2.reduce((acc, value2) => {
            acc.push(<TableCell className={classes.topBoundCell}
                                key={add1 + add2 + '_tabletoprow' + add2 + value2}>{convert_format(add2_fmt, value2)}</TableCell>)
            return acc
        }, [
            <TableCell className={classes.cornerCell}
                       key={add1 + add2 + '_corner2'}>
                {convert_format(add1_fmt, 0)}
            </TableCell>
        ])

        const labelRow = [
            <TableCell
                key={add1 + add2 + '_tablecornercell2'}
                className={classes.cornerCell}
            >
                {convert_format(add1_fmt, 0)}
            </TableCell>,
            <TableCell
                key={add1 + add2 + '_tablelabeltopcell'}
                className={classes.labelTopCell}
                colSpan={bounds2.length}
            >
                {props.inputLabelMap[add2]}
            </TableCell>
        ]

        return (
            <Paper className={classes.tableChartContainer} elevation={4}>
                <div className={classes.columnLabelCell}>
                    {props.inputLabelMap[add1]}
                </div>
                <TableContainer
                    key={add1 + add2 + 'table'}
                >
                    <Table>
                        <TableBody>
                            <TableRow>
                                {labelRow}
                            </TableRow>
                            <TableRow>
                                {topRow}
                            </TableRow>
                            {body}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>)
    }

    //Area chart creator
    const createLineChart = (chartData, outAdd, bounds1, bounds2, add1, add2, add2_fmt, add1_fmt, out_fmt) => {

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
                    isAnimationActive={true}
                    animationDuration={600}
                    dot={{stroke: 'white', fill: chartColors[idx], strokeWidth: 2}}
                    activeDot={{stroke: 'white', strokeWidth: 2, r: 4}}
                />
            )
        })

        const gradients = bounds2.map((bound, idx) => {
            return (
                <defs key={bound}>
                    <linearGradient id={bound} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={chartColors[idx]} stopOpacity={0.15}/>
                        {/*<stop offset="12%" stopColor={chartColors[idx]} stopOpacity={0.01}/>*/}
                        <stop offset="75%" stopColor={chartColors[idx]} stopOpacity={0.01}/>
                    </linearGradient>
                </defs>
            )
        })

        return (
            <ResponsiveContainer
                width="100%"
                height={310}
                className={classes.lineChartContainer}
                key={add1 + add2 + 'line'}
            >
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
                        // padding={{top: 30, bottom: 30}}
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
                        padding={{top: 30, bottom: 5}}
                        stroke='#3C4148'
                    >
                    </YAxis>
                    <Tooltip
                        wrapperStyle={{fontSize: '0.9em', fontFamily: 'Questrial'}}
                        cursor={{fill: '#FEFEFD', fontFamily: 'Questrial', fontSize: '0.8em'}}
                        formatter={(value,name) => [AxisFormatter(out_fmt, value),`${props.inputLabelMap[add2]+'@ '+name}`]}
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
                        formatter={(value) => `${props.inputLabelMap[add2]}: ` + value}
                    />
                </AreaChart>
            </ResponsiveContainer>
        )

    }


    //Execute Functions
    const outAdd = getOutAdd()
    const charts = generateCharts(outAdd)


    return (
        <Card
            className={classes.saCard}
            key={"SA" + props.currOutputCell}
            elevation={3}
        >
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
            {charts}
        </Card>
    )
}

