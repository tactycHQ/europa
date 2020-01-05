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
            width: '72.5%',
            marginLeft: '12%',
            flexWrap: 'wrap',
            justifyContent: 'center',
            padding: '8px',
            // paddingTop:'8px',
            // background: "red"

        },
        outputCards: {
            display: 'flex',
            flexDirection: 'column',
            width: custom_width,
            margin: '5px',
            background: '#FEFEFD'
        },
        saCard: {
            // borderStyle: 'solid',
            flexDirection: 'column',
            // backgroundColor:'orange',
            width: '100%'
        },
        saChartContainer: {
            display: 'flex',
            // backgroundColor:'orange',
            flexWrap: 'wrap'
        },
        cardHeaderContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            // backgroundColor:'yellow',
            // marginBottom:0
        },
        cardTitleHeader: {
            color: '#4F545A',
            fontFamily: 'Questrial',
            fontWeight: '20',
            fontSize: '2em',
            marginTop: '3px',
            marginLeft: '7px',
            // backgroundColor:'blue'
        }
    }))
    const classes = useStyles()


    //Defining hooks
    // Hook to set current output label selected by user in sensitivity analysis drop down
    const [currOutputCell, setCurrOutputCell] = useState('')
    const [currCategory, setCurrCategory] = useState(props.outputs[0]['category'])


    // Defining custom functions
    // Drop down selection of output label in sensitivity analysis
    const handleOutputLabelChange = (event) => {
        setCurrOutputCell(event.target.value)
    }

    const handleOutputCategoryChange = (event) => {
        setCurrCategory(event.target.value)
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

    const createSAcharts = (currCategory, currOutputCell) => {
        return (
            <SAChart
                data={props.data}
                currInputVal={props.currInputVal}
                findSolution={props.findSolution}
                inputLabelMap={props.inputLabelMap}
                formats={props.formats}
                outputs={props.outputs.find(i => (i.category === currCategory))}
                currOutputCell={currOutputCell}
            />
        )
    }

    const createSAHeader = (currCategory) => {
        return (
            <div>
                <div className={classes.cardHeaderContainer}>
                    <h2 className={classes.cardTitleHeader}>Sensitivity Analysis</h2>
                </div>
                <LabelSelector outputs={props.outputs}
                               handleOutputLabelChange={handleOutputLabelChange}
                               handleOutputCategoryChange={handleOutputCategoryChange}
                               currOutputCell={currOutputCell}
                               currCategory={currCategory}
                               titleText={"For "}/>
            </div>

        )
    }


    const createCharts = () => {

        if (props.type === 'summary') {
            return props.data.map((solutionSet, idx) => {
                return (
                    <Card className={classes.outputCards} key={"summary" + solutionSet.category}>
                        <div className={classes.cardHeaderContainer}>
                            <h2 className={classes.cardTitleHeader}>{solutionSet.category}</h2>
                            <CardSettings/>
                        </div>
                        {createSummaryCharts(solutionSet, idx)}
                    </Card>
                )
            })
        } else if (props.type === 'sensitivity') {
            saHeader = createSAHeader(currCategory)
            saContainer = createSAcharts(currCategory, currOutputCell)
            return (
                <Card className={classes.saCard} key={"SA" + currCategory}>
                    {saHeader}
                    <div className={classes.saChartContainer}>
                        {saContainer}
                    </div>
                </Card>
            )
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






