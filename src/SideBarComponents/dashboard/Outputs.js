import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Barchart from "../../Charts/Barchart"


// import StackedBar from "./stackedbar";
// import MixBar from "./mixbar";
// import Radial from "./radial";


const useStyles = makeStyles(theme => ({
            root: {
                display: 'flex',
                flexDirection: 'column',
                // flexGrow: 1
            },
            charts: {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'flex-start'
                // alignContent:'flex-start',

            }
        }
    )
)


const chartColors = [
    '#8f2600',
    '#006064',
    '#8f2600',
    '#546e7a',
    '#0288d1',
    '#0288d1'
]

export default function Output(props) {
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
            <div className={classes.charts}>
                {charts}
                {/*<Barchart {...props}/>*/}
                {/*<StackedBar data={outputs}/>*/}
                {/*<MixBar data={outputs}/>*/}
                {/*<Radial data={outputs}/>*/}
                {/*<Barchart data={outputs}/>*/}
                {/*<Barchart data={outputs}/>*/}
                {/*<StackedBar data={outputs}/>*/}
                {/*<MixBar data={outputs}/>*/}
                {/*<Radial data={outputs}/>*/}
                {/*<Barchart data={outputs}/>*/}
            </div>
        </div>

    )
}






