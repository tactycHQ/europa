import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Barchart from "../../charts/barchart"

// import StackedBar from "./stackedbar";
// import MixBar from "./mixbar";
// import Radial from "./radial";


const useStyles = makeStyles(theme => ({
            root: {
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                // justifyContent:'flex-start',
                width: '80%'
            },
            OutputText: {
                fontSize: '1em',
                fontFamily: 'Roboto',
                fontWeight: 'bold',
                color: '#607d8b',
                paddingTop: '1vh',
                paddingBottom: '1vh',
                marginBottom:'2vh',
                width: '100%',
                textAlign: 'center',
            },
            charts: {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between'
            }
        }
    )
)


const chartColors = [
    '#0288d1',
    '#880e4f',
    '#004d40',
    '#827717',
    '#607d8b'
]

export default function Output(props) {
    const classes = useStyles()

    const extractChartData = () => {

        const labelsInChart = props.outputs.map(data => {
                const reformatted = Object.entries(data.labels).map(labelSet => {
                    return {
                        name: labelSet[1],
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
            <div className={classes.OutputText}>Outputs</div>
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






