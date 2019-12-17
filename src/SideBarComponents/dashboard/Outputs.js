import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Barchart from "../../Charts/Barchart"
import {Card, Divider} from "@material-ui/core";


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
            flexWrap: 'wrap'
            // background: '#90a4ae'
        },
        outputCards: {
            display: 'flex',
            flexDirection: 'column',
            width: '49%',
            marginLeft: '5px',
            marginRight: '5px',
            marginBottom: '1vh',
            background: '#172535',
            padding: '3px'
        },
        titleHeader: {
            color: 'white',
            fontFamily: 'Quicksand',
            fontWeight: '450',
            marginTop: '3px',
            marginLeft: '7px'
        },
        cardSection: {
            color: '#B4B8AB',
            fontFamily: 'Quicksand',
            fontWeight: '450',
            marginTop: '10px',
            marginLeft: '3px'
        },
        titleBox: {
            color: '#212121',
            fontSize: '0.8em',
            fontWeight: '450',
            fontFamily: 'Quicksand'
        },
        divider: {
            marginTop: '5%',
            marginBottom: '2%',
            backgroundColor: '#5C6671'
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
                    <Card className={classes.outputCards} key={data.title}>
                        <h1 className={classes.titleHeader}>{data.title}</h1>
                        <Barchart
                            currSolution={data.values}
                            fill={chartColors[idx]}
                            domain={data.domains}
                        />
                        {/*<Divider className={classes.divider} light={true}/>*/}
                        <h3 className={classes.cardSection}>Variance Analysis</h3>
                        <h4 className={classes.titleHeader}>Some text goes here and here and here</h4>
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






