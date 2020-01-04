import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import LiveChart from "../Outputs/LiveChart"
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
        midPanel: {
            display: 'flex',
            flexWrap:'wrap',
            justifyContent:'center',
            alignItems:'space-between'
        },
        saContainer: {
            display: 'flex',
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            flexWrap: 'wrap'
        }
    }))
    const classes = useStyles()


    //Defining hooks
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
        return (
            <SAChart
                data={props.saChartData}
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

    const createOutpuRangeHeader = (category) => {
        return (
            <LabelSelector outputs={props.outputs.find(i => (i.category === category))}
                           handleOutputLabelChange={handleOutputLabelChange}
                           currOutputCell={currOutputCell}
                           titleText={"Distribution of "}
            />
        )
    }

    const createOutputRangeCharts = (category) => {
        return <DistributionChart
            outputs={props.outputs.find(i => (i.category === category))}
            solutions={props.solutions}
        />
    }

    const createInputImportanceHeader = (category) => {
        return (
            <LabelSelector outputs={props.outputs.find(i => (i.category === category))}
                           handleOutputLabelChange={handleOutputLabelChange}
                           currOutputCell={currOutputCell}
                           titleText={"Input Impact on "}
            />
        )
    }

    const createInputImportanceCharts = () => {
        return <InputImportance/>
    }

    const createCharts = () => {
        return props.liveChartData.map((solutionSet, idx) => {

            let saHeader
            let saContainer
            let inputImportanceCharts
            let inputImportanceHeader
            let outputRangeHeader
            let outputRangeCharts
            let detailSection

            if (props.type === 'detail') {
                saHeader = createSAHeader(solutionSet.category)
                saContainer = createSAContainer(solutionSet.category, currOutputCell)
                inputImportanceHeader = createInputImportanceHeader(solutionSet.category)
                inputImportanceCharts = createInputImportanceCharts()
                outputRangeHeader = createOutpuRangeHeader(solutionSet.category)
                outputRangeCharts = createOutputRangeCharts(solutionSet.category)
                detailSection = (
                    <div>
                        <div className={classes.midPanel}>
                            <div className={classes.inputImportance}>
                                {inputImportanceHeader}
                                {inputImportanceCharts}
                            </div>
                            <div className={classes.inputImportance}>
                                {outputRangeHeader}
                                {outputRangeCharts}
                            </div>
                        </div>
                        {saHeader}
                        {saContainer}
                    </div>
                )
            }


            return (
                <Card className={classes.outputCards} key={solutionSet.category}>
                    <div className={classes.cardHeaderContainer}>
                        <NavLink to={`/outputs/${solutionSet.category}`} style={{textDecoration: 'none'}}>
                            <h2 className={classes.cardTitleHeader}>{solutionSet.category}</h2>
                        </NavLink>
                        <CardSettings/>
                    </div>
                    {createLiveCharts(solutionSet, idx)}
                    {detailSection}
                </Card>
            )
        })
    }

    //Function executions
    const final_charts = createCharts()

    return (
        <div className={classes.root}>
            {final_charts}
        </div>
    )
}






