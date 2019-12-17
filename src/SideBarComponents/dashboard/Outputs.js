import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Barchart from "../../Charts/Barchart"
import {Card, CardHeader, Paper} from "@material-ui/core";


// import StackedBar from "./stackedbar";
// import MixBar from "./mixbar";
// import Radial from "./radial";


const chartColors = [
    '#09BC8A',
    '#BC5D2E',
    '#6C969D',
    '#546e7a',
    '#0288d1',
    '#0288d1'
]

export default function Output(props) {
    const useStyles = makeStyles(theme => ({
                root: {
                    display: 'flex',
                    // flexDirection:'column',
                    width: '81.5%',
                    // background: '#90a4ae'
                },
                container: {
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    width:'100%',
                    marginLeft: '5px',
                    marginRight: '5px',
                    marginBottom: '1vh',
                    background: '#172535',
                    padding: '3px'
                },
                titleHeader: {
                    color:'white',
                    fontFamily: 'Quicksand',
                    fontWeight: '450',
                    marginTop: '3px',
                    marginLeft: '7px'
                },
                titleBox: {
                    color: '#212121',
                    fontSize: '0.8em',
                    fontWeight: '450',
                    fontFamily: 'Quicksand'
                }
            }))
    const classes = useStyles()


    const extractChartData = () => {

        const labelsInChart = props.outputs.map(data => {
                const reformatted = Object.entries(data.labels).map(labelSet => {
                    return {
                        x: labelSet[1],
                        [data.category]: props.currSolution[labelSet[0]],
                        format: props.formats[labelSet[0]]
                    }
                })

                const max_domains = Object.entries(data.labels).map(labelSet => {
                    return props.domains.max[labelSet[0]]
                })

                const min_domains = Object.entries(data.labels).map(labelSet => {
                    return props.domains.min[labelSet[0]]
                })

                const max_domain = Math.max(...max_domains)
                const min_domain = Math.min(...min_domains)

                return {
                    title: data.category,
                    values: reformatted,
                    domains: [min_domain, max_domain]
                }
            }
        )
        return labelsInChart
    }

    const createCharts = () => {
        const chartData = extractChartData()
        return chartData.map((data, idx) => {
                return (
                    <Card className={classes.container} key={data.title}>
                        <h1 className={classes.titleHeader}>{data.title}</h1>
                        <Barchart
                            currSolution={data.values}
                            fill={chartColors[idx]}
                            domain={data.domains}
                        />
                        {/*<Paper>*/}
                            {/*Maximum values achieved at:*/}
                        {/*</Paper>*/}
                    </Card>
                )
            }
        )
    }

    const charts = createCharts()

    return (
        <div className={classes.root}>
            {charts}
        </div>

    )
}






