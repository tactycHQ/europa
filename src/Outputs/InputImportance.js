import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles'
import {Label, ResponsiveContainer, Tooltip} from "recharts"
import Paper from '@material-ui/core/Paper'
import {PieChart, Pie, Sector, Cell} from 'recharts';
import {LabelSelector} from "./LabelSelector";
import {Card} from "@material-ui/core";
import {convert_format} from "../utils/utils"


// const data = [{name: 'Group A', value: 100}, {name: 'Group B', value: 300},
//     {name: 'Group C', value: 300}, {name: 'Group D', value: 200}];
//

const COLORS = [
    '#A5014B',
    '#247308',
    '#00044E',
    '#EC7404',
    '#00044E',
    '#41C0EB']

export default function InputImportance(props) {

    const useStyles = makeStyles(theme => ({
        varianceCard: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%'
        },
        chartContainer: {
            display: 'flex',
            flexWrap: 'wrap'
        },
        paper: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '1%',
            padding: '1%',
            background: 'linear-gradient(#F4F4F4 40%,#F4F4F4)',
            width: '48%'
        },
        cardHeaderContainer: {
            display: 'flex',
            justifyContent: 'space-between',
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
        }
    }))
    const classes = useStyles()


    const outCat = props.outputs.find(output => (output.category === props.currCategory))


    const getPieData = (outCat) => {

        const outAdds = Object.keys(outCat.labels)
        return outAdds.map(address => {
            const st = Object.entries(props.variance[address]['ST'])
            return st.map(pair => {
                return ({
                        "name": props.inputLabelMap[pair[0]],
                        "value": pair[1]
                    }
                )
            })
        })
    }
    const pieData = getPieData(outCat)

    const LabelFormatter = (props) => {
        console.log(props)
        const {cx, x, y, payload} = props

        return (
            <g>
                <text
                    x={x}
                    y={y}
                    textAnchor={x > cx ? "start" : "end"}
                    fontSize='0.8em'
                    fill={props.fill}
                    fontFamily="Questrial"
                >
                    {payload.name + ": " + convert_format('0.0%', payload.value)}
                </text>
            </g>

        )
    }

    const createCharts = () => {
        return pieData.map(data => {
            return (
                <Paper className={classes.paper}>
                    <ResponsiveContainer
                        // className={classes.chart}
                        width="100%"
                        height={310}
                        margin={{top: 5, right: 20, left: 10, bottom: 300}}
                    >
                        <PieChart
                            // style={{background: 'green'}}
                        >
                            <Pie
                                isAnimationActive={true}
                                data={data}
                                innerRadius={40}
                                outerRadius={80}
                                fill="blue"
                                label={LabelFormatter}
                            >
                                {data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)}
                            </Pie>
                            <Tooltip/>
                        </PieChart>
                    </ResponsiveContainer>
                </Paper>
            )
        })
    }


    const pieCharts = createCharts()

    return (
        <Card className={classes.varianceCard} key={"dist" + props.currOutputCell}>
            <div className={classes.cardHeaderContainer}>
                <h2 className={classes.cardTitleHeader}>Input Importance</h2>
            </div>
            <LabelSelector outputs={props.outputs}
                           handleOutputCategoryChange={props.handleOutputCategoryChange}
                           currCategory={props.currCategory}/>
            <div className={classes.chartContainer}>
                {pieCharts}
            </div>
        </Card>
    )
}


