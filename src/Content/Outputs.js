import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import SummaryChart from "../Outputs/SummaryChart"
import SAChart from "../Outputs/SAChart"
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
        },
        summaryContainer: {
            display: 'flex',
            width:'100%',
            flexWrap:'wrap'
        }

    }))
    const classes = useStyles()


    //Defining hooks
    const [currOutputCell, setCurrOutputCell] = useState('') //for output label selection from dropdown
    const [currCategory, setCurrCategory] = useState(props.outputs[0]['category']) //for category selection from dropdown
    const [summaryPrefs, setSummaryPrefs] = useState({}) //for chart preferences


    // Defining custom function
    // Drop down selection of output label in detailed analysis
    const handleOutputLabelChange = (event) => {
        setCurrOutputCell(event.target.value)
    }

    // Drop down selection of output category in detailed analysis
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

    const createDistcharts = (currCategory, currOutputCell) => {
        return (
            <DistributionChart
                distributions={props.distributions}
                currSolution={props.currSolution}
                findSolution={props.findSolution}
                inputLabelMap={props.inputLabelMap}
                formats={props.formats}
                outputs={props.outputs}
                currCategory={currCategory}
                currOutputCell={currOutputCell}
                handleOutputLabelChange={handleOutputLabelChange}
                handleOutputCategoryChange={handleOutputCategoryChange}
                cases={props.cases}
            />
        )
    }

    const createCharts = () => {

        if (props.type === 'summary') {
            const summaryCharts = props.data.map((solutionSet, idx) => {
                return createSummaryCharts(solutionSet, idx)
            })
            return (
                <div className={classes.summaryContainer}>
                    {summaryCharts}
                </div>)
        } else if (props.type === 'sensitivity') {
            return createSAcharts(currCategory, currOutputCell)
        } else if (props.type === 'distributions') {
            return createDistcharts(currCategory, currOutputCell)
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






