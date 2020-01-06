import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import SummaryChart from "../Outputs/SummaryChart"
import {Card} from "@material-ui/core"
import CardSettings from "../Outputs/CardSettings"
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


    //Defining Styles
    const useStyles = makeStyles(theme => ({
        root: {
            display: 'flex',
            minHeight: '100vh',
            width: '72.5%',
            marginLeft: '12%',
            flexWrap: 'wrap',
            justifyContent: 'center',
            padding: '8px'
        }

    }))
    const classes = useStyles()


    //Defining hooks
    // Hook to set current output label selected by user in sensitivity analysis drop down
    const [currOutputCell, setCurrOutputCell] = useState('')
    const [currCategory, setCurrCategory] = useState(props.outputs[0]['category'])
    const [summaryPrefs, setSummaryPrefs] = useState({})


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
                key={"solution" + solutionSet.category}
                category={solutionSet.category}
                currSolution={solutionSet.values}
                fill={chartColors[idx]}
                domain={solutionSet.domains}
                summaryPrefs={summaryPrefs}
                setSummaryPrefs={setSummaryPrefs}
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
                outputs={props.outputs}
                currCategory={currCategory}
                currOutputCell={currOutputCell}
                handleOutputLabelChange={handleOutputLabelChange}
                handleOutputCategoryChange={handleOutputCategoryChange}
            />
        )
    }

    const createCharts = () => {

        if (props.type === 'summary') {
            return props.data.map((solutionSet, idx) => {
                return createSummaryCharts(solutionSet, idx)

            })
        } else if (props.type === 'sensitivity') {
            return createSAcharts(currCategory, currOutputCell)
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






