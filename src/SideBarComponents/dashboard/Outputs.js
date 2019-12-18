import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Barchart from "../../Charts/barChart"
import {Card} from "@material-ui/core";
import CardSettings from "../../Outputs/CardSettings";
import Areachart from "../../Charts/areaChart";


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

    //Defining hooks
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
            color: 'white',
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
        cardTop: {
            display: 'flex',
            justifyContent: 'space-between'
        },
        satitle: {
            color: '#B4B8AB',
            fontFamily: 'Quicksand',
            fontWeight: '450',
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
                            {createSAcharts(data.title)}
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






