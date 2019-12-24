import React, {useState, useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import LiveChart from "../Outputs/LiveChart"
import {Card} from "@material-ui/core"
import CardSettings from "../Outputs/CardSettings"
import SA1Chart from "../Outputs/SA1Chart"
import {NavLink} from "react-router-dom"
import SA2Chart from "../Outputs/SA2Chart"
import {LabelSelector} from "../Outputs/LabelSelector";


// import StackedBar from "./stackedbar";
// import MixBar from "./mixbar";
// import Radial from "./radial";


const chartColors = [
    '#006E9F',
    '#A5014B',
    '#247308',
    '#41C0EB',
    '#EC7404',
    '#00044E'
]

export default function Output(props) {

    //Initialization functions for formatting depending on type
    const get_width = () => {
        if (props.type === "summary") {
            return "48%"
        } else {
            return "100%"
        }
    }
    const custom_width = get_width()


    //Defining hooks
    const useStyles = makeStyles(theme => ({
        root: {
            display: 'flex',
            minHeight: '100vh',
            width: '72%',
            marginLeft: '12%',
            flexWrap: 'wrap',
            justifyContent: 'center',
            padding: '7px'
            // background: "red"

        },
        outputCards: {
            display: 'flex',
            flexDirection: 'column',
            width: custom_width,
            margin: '5px',
            background: '#FEFEFD'
        },
        cardHeaderContainer: {
            display: 'flex',
            justifyContent: 'space-between'
        },
        cardTitleHeader: {
            color: '#4F545A',
            fontFamily: 'Questrial',
            fontWeight: '20',
            fontSize: '2em',
            marginTop: '3px',
            marginLeft: '7px'
        },
        saContainer: {
            display: 'flex',
            // flexDirection: 'column',
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            flexWrap: 'wrap',
            // background: 'red'
        }
    }))
    const classes = useStyles()
    const [currOutputCell, setCurrOutputCell] = useState('')


    // Defining custom functions for Live charts
    const handleOutputLabelChange = (event) => {
        setCurrOutputCell(event.target.value)
    }

    const createLiveCharts = (solutionSet, idx) => {
        return (
            <LiveChart
                currSolution={solutionSet.values}
                fill={chartColors[idx]}
                domain={solutionSet.domains}
            />
        )
    }

    const createSAContainer = (category, currOutputCell) => {
        return (
            <div className={classes.saContainer}>
                {createSAcharts(category, currOutputCell)}
            </div>
        )
    }

    const createSAcharts = (category, currOutputCell) => {
        if (props.type === "summary") {
        } else {
            return (
                <SA2Chart
                    category={category}
                    data={props.saChartData}
                    currInputVal={props.currInputVal}
                    findSolution={props.findSolution}
                    inputLabelMap={props.inputLabelMap}
                    formats={props.formats}
                    outputs={props.outputs.find(i => (i.category === category))}
                    domains={props.domains}
                    currOutputCell={currOutputCell}
                />
            )
        }
    }

    const createSAHeader = (type, category) => {

        if (type === "detail") {
            return (
                <LabelSelector outputs={props.outputs.find(i => (i.category === category))}
                               handleOutputLabelChange={handleOutputLabelChange}
                               currOutputCell={currOutputCell}
                />

            )
        }
    }

    const createCharts = () => {
        return props.liveChartData.map((solutionSet, idx) => {
            return (
                <Card className={classes.outputCards} key={solutionSet.category}>
                    <div className={classes.cardHeaderContainer}>
                        <NavLink to={`/outputs/${solutionSet.category}`} style={{textDecoration: 'none'}}>
                            <h2 className={classes.cardTitleHeader}>{solutionSet.category}</h2>
                        </NavLink>
                        <CardSettings/>
                    </div>
                    {createLiveCharts(solutionSet, idx)}
                    {createSAHeader(props.type, solutionSet.category)}
                    {createSAContainer(solutionSet.category, currOutputCell)}
                </Card>
            )
        })
    }

    return (
        <div className={classes.root}>
            {createCharts()}
        </div>
    )
}






