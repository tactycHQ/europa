import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Barchart from "../../Charts/Barchart"


// import StackedBar from "./stackedbar";
// import MixBar from "./mixbar";
// import Radial from "./radial";




const chartColors = [
    '#8f2600',
    '#006064',
    '#8f2600',
    '#546e7a',
    '#0288d1',
    '#0288d1'
]

export default function Output(props) {
    const useStyles = makeStyles(theme => ({
            root: {
                display: 'flex',
                flexDirection: 'column',
                width:'84%',
                justifyContent: 'flex-start'

                // flexGrow: 1
            }
        }
    )
)



    const classes = useStyles()

    const extractChartData = () => {

        const labelsInChart = props.outputs.map(data => {
                const reformatted = Object.entries(data.labels).map(labelSet => {
                    return {
                        x: labelSet[1],
                        [data.category]: props.currSolution[labelSet[0]]

                    }
                })
                return {
                    title: data.category,
                    values: reformatted
                }
            }
        )
        return labelsInChart
    }


    const createCharts = () => {
        const chartData = extractChartData()
        return chartData.map((data, idx) => {
            return <Barchart key={data.title} currSolution={data.values} fill={chartColors[idx]}/>


        })
    }

    const charts = createCharts()


    return (
        <div className={classes.root}>
            {charts}
        </div>

    )
}






