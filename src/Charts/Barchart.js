import React from 'react'
import {BarChart, Bar, XAxis, YAxis, LabelList, Tooltip, Legend, ResponsiveContainer} from 'recharts'
import {Card, CardHeader, makeStyles} from "@material-ui/core";

// import {VictoryChart, VictoryBar, VictoryTheme, VictoryLabel, VictoryAxis, VictoryTooltip} from 'victory'


function CustomizedXAxisTick(props) {
    const {x, y, stroke, payload} = props

    return (
        <g transform={`translate(${x},${y})`}>
            <text
                x={0}
                y={0}
                dy={16}
                textAnchor="end"
                fill="#263238"
                transform="rotate(-0)"
                fontSize='0.8em'
                fontFamily="Quicksand"
            >{payload.value}</text>
        </g>
    )
}


function CustomizedYAxisTick(props) {
    const {x, y, stroke, payload} = props

    return (
        <g transform={`translate(${x},${y})`}>
            <text
                x={0}
                y={0}
                dy={16}
                textAnchor="end"
                fill="#263238"
                transform="rotate(-0)"
                fontSize='0.8em'
                fontFamily="Quicksand"
            >{payload.value}</text>
        </g>
    )
}

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        marginLeft:'2%',
        marginRight:'2%',
        marginBottom: '1vh'
        // backgroundColor: 'yellow'
    },
    chartContainer: {
        // backgroundColor: 'orange'
    },
    titleHeader: {
        background: '#0091ea',
        height:'3vh',
        marginBottom: '5%'
    },
    titleBox: {
        color: 'white',
        fontSize: '0.9em',
        fontWeight: '400',
        fontFamily: 'Quicksand',

    }
}))


export default function Barchart(props) {
    const classes = useStyles()


    const title = Object.keys(props.currSolution[0])[1]


    return (
        <Card className={classes.container}>
            <CardHeader classes={{root: classes.titleHeader, title: classes.titleBox}} title={title}/>
            <ResponsiveContainer width="100%" height={350}>
                <BarChart
                    data={props.currSolution}
                    margin={{top: 0, right: 600, left: 10, bottom: 10}}
                    maxBarSize={30}
                >
                    <XAxis dataKey="x" minTickGap={2} interval={0} tick={<CustomizedXAxisTick/>}/>
                    <YAxis tick={<CustomizedYAxisTick/>}/>
                    <Tooltip/>
                    <Bar dataKey={title} fill={props.fill}>
                        <LabelList
                            datakey={title}
                            position={"top"}
                            formatter={(value) => Math.round(value)}
                            style={{color: 'red', fontFamily: 'Quicksand', fontSize: '0.8em'}}
                        />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>

            {/*<VictoryChart*/}
            {/*    animate={{*/}
            {/*        duration: 500,*/}
            {/*        onLoad: {duration: 500}*/}
            {/*    }}*/}
            {/*    domainPadding={{x: 100}}*/}
            {/*>*/}
            {/*    <VictoryBar*/}
            {/*        data={props.currSolution}*/}
            {/*        // barRatio={0.8}*/}
            {/*        x={"x"}*/}
            {/*        y={title}*/}
            {/*        labelComponent ={<VictoryTooltip/>}*/}
            {/*        labels={data => Math.round(data.y)}*/}
            {/*        style={{*/}
            {/*            data: {fill: props.fill, stroke: "gray", strokeWidth: 2},*/}
            {/*            labels: {fill: props.fill}*/}
            {/*        }}*/}
            {/*        labelComponent={<VictoryLabel dy={-15}/>}*/}
            {/*    />*/}
            {/*    /!*<VictoryAxis/>*!/*/}
            {/*</VictoryChart>*/}
            < /Card>
                )
                }
