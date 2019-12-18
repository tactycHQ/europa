import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Barchart from "../Charts/barChart"
import {Card} from "@material-ui/core";
import CardSettings from "../Outputs/CardSettings";
import Areachart from "../Charts/areaChart";


// import StackedBar from "./stackedbar";
// import MixBar from "./mixbar";
// import Radial from "./radial";


const chartColors = [
    '#083D77',
    'red',
    'green',
    '#546e7a',
    '#0288d1',
    '#0288d1'
]

export default function Output(props) {

    //Defining hooks
    const useStyles = makeStyles(theme => ({
        root: {
            display: 'flex',
            width: '100%',
            marginLeft:'13%',
            marginRight:'15.5%',
            flexWrap: 'wrap',
            justifyContent: 'center',
            padding:'7px'


        },
        outputCards: {
            display: 'flex',
            flexDirection: 'column',
            width: '48%',
            margin: '5px',
            // marginBottom: '1vh',
            background: '#FEFEFD',
            padding: '3px'
        },
        titleHeader: {
            color: '#4F545A',
            fontFamily: 'Questrial',
            fontWeight: '100',
            marginTop: '3px',
            marginLeft: '7px'
        },
        cardSection: {
            color: '#0C0D0F',
            fontFamily: 'Questrial',
            fontWeight: '50',
            marginTop: '10px',
            marginLeft: '3px'
        },
        titleBox: {
            color: '#4F545A',
            fontSize: '0.8em',
            fontWeight: '50',
            fontFamily: 'Questrial'
        },
        cardTop: {
            display: 'flex',
            justifyContent: 'space-between'
        },
        satitle: {
            color: '#0C0D0F',
            fontFamily: 'Questrial',
            fontWeight: '50',
            marginTop: '2.5%',
            marginLeft: '3px'
        }
    }))
    const classes = useStyles()


    // Defining custom functions for Live charts
    const createSAcharts = (outputCategory) => {
        return props.saChartData.map(categoryCharts => {
            return categoryCharts.map(chart => {
                if (chart.category === outputCategory) {
                    return (
                        <div>
                            <h4 className={classes.satitle}>{`How does ${chart.category} change with ${chart.title}?`}</h4>
                            <Areachart data={chart.data} category={chart.category} title={chart.title}
                                       key={chart.category + chart.title}/>
                        </div>
                    )
                }
            })
        })
    }

    const createLiveCharts = () => {
        return props.chartData.map((data, idx) => {
                return (
                    <Card className={classes.outputCards} key={data.title}>
                        <div className={classes.cardTop}>
                            <h1 className={classes.titleHeader}>{data.title}</h1>
                            <CardSettings/>
                        </div>
                        <Barchart
                            currSolution={data.values}
                            fill={chartColors[idx]}
                            domain={data.domains}
                          />
                        <h3 className={classes.cardSection}>
                            Single Input Sensitivity Analysis
                        </h3>
                            {/*{createSAcharts(data.title)}*/}
                    </Card>
                )
            }
        )
    }


    //Executing custom functions
    const charts = createLiveCharts()

    return (
        <div className={classes.root}>
            {charts}
        </div>
    )
}






