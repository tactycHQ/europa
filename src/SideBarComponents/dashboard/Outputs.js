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
                flexGrow: 1,
                paddingTop:'3.5%'
            },
            charts: {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-evenly'
            }
        }
    )
)


const chartColors = [
    '#00838f',
    '#607d8b',
    '#00acc1',
    '#00695c',
    '#607d8b'
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






