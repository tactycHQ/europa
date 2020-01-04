import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import SummaryChart from "../Outputs/SummaryChart"
import {Card} from "@material-ui/core"
import CardSettings from "../Outputs/CardSettings"
import {NavLink} from "react-router-dom"
import SAChart from "../Outputs/SAChart"
import {LabelSelector} from "../Outputs/LabelSelector";
import InputImportance from "../Outputs/InputImportance"
import DistributionChart from "../Outputs/DistributionChart";

const chartColors = [
    '#004666',
    '#A5014B',
    '#247308',
    '#41C0EB',
    '#EC7404',
    '#00044E'
]

export default function Output(props) {

    // Initializing variables
    let saHeader
    let saContainer

    //Initialization functions for formatting depending on type
    const get_width = () => {
        if (props.type === "summary") {
            return "48%"
        } else {
            return "100%"
        }
    }
    const custom_width = get_width()

    //Defining Styles
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
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            flexWrap: 'wrap',
            borderStyle:'solid'
        }
    }))
    const classes = useStyles()


    //Defining hooks
    // Hook to set current output label selected by user in sensitivity analysis drop down
    const [currOutputCell, setCurrOutputCell] = useState('')


    // Defining custom functions
    // Drop down selection of output label in sensitivity analysis
    const handleOutputLabelChange = (event) => {
        setCurrOutputCell(event.target.value)
    }

    const createSummaryCharts = (solutionSet, idx) => {
        return (
            <SummaryChart
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
        return (
            <SAChart
                data={props.data}
                currInputVal={props.currInputVal}
                findSolution={props.findSolution}
                inputLabelMap={props.inputLabelMap}
                formats={props.formats}
                outputs={props.outputs.find(i => (i.category === category))}
                currOutputCell={currOutputCell}
            />
        )
    }

    const createSAHeader = (category) => {
        return (
            <LabelSelector outputs={props.outputs.find(i => (i.category === category))}
                           handleOutputLabelChange={handleOutputLabelChange}
                           currOutputCell={currOutputCell}
                           titleText={"Sensitivity Analysis for "}
            />
        )
    }


    const createCharts = () => {

        if (props.type === 'summary') {
            return props.data.map((solutionSet, idx) => {
                return (
                    <Card className={classes.outputCards} key={solutionSet.category}>
                        <div className={classes.cardHeaderContainer}>
                            <h2 className={classes.cardTitleHeader}>{solutionSet.category}</h2>
                            <CardSettings/>
                        </div>
                        {createSummaryCharts(solutionSet, idx)}
                    </Card>
                )
            })
        } else if (props.type === 'sensitivity') {
            return props.outputs.map(output => {
                saHeader = createSAHeader(output.category)
                saContainer = createSAContainer(output.category, currOutputCell)
                return (
                    <div className={classes.saCard}>
                        {saHeader}
                        {saContainer}
                    </div>
                )
            })
        }
    }

//Function executions
    const final_charts = createCharts()

    return (
        <div className={classes.root}>
            {final_charts}
        </div>
    )
}






