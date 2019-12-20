import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import LiveChart from "../Outputs/LiveChart"
import {Card} from "@material-ui/core"
import CardSettings from "../Outputs/CardSettings"
import SA1Chart from "../Outputs/SA1Chart"
import {NavLink} from "react-router-dom"
import SA2Chart from "../Outputs/SA2Chart"


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

    //Initialization functions for formatting depending on type
    const get_width = () => {
        if (props.type === "summary") {
            return "48%"
        } else {
            return "100%"
        }
    }
    const custom_width = get_width()


    //Defining hooks
    const useStyles = makeStyles(theme => ({
        root: {
            display: 'flex',
            minHeight: '100vh',
            width: '72%',
            marginLeft: '12%',
            flexWrap: 'wrap',
            justifyContent: 'center',
            padding: '7px'
            // background: "red"

        },
        outputCards: {
            display: 'flex',
            flexDirection: 'column',
            width: custom_width,
            margin: '5px',
            background: '#FEFEFD'
        },
        cardHeaderContainer: {
            display: 'flex',
            justifyContent: 'space-between'
        },
        cardTitleHeader: {
            color: '#4F545A',
            fontFamily: 'Questrial',
            fontWeight: '100',
            marginTop: '3px',
            marginLeft: '7px'
        },
        cardSectionHeader:{
            display:'flex',
            flexDirection: 'column',
            justifyContent:'flex-end',
            // backgroundColor:'gray'
        },
        cardSectionTitle: {
            display:'flex',
            color: '#4F545A',
            fontFamily: 'Questrial',
            fontWeight: '50',
            marginTop: '7%',
            marginBottom: '0%',
            marginLeft: '7px',
            // background: 'red'
        },
        cardSectionNote: {
            display:'flex',
            color: '#4F545A',
            fontFamily: 'Questrial',
            fontWeight: '50',
            marginTop: '0%',
            marginLeft: '7px',
            // background: 'yellow'
        },
        sa1_title: {
            color: '#4F545A',
            fontFamily: 'Questrial',
            fontWeight: '50',
            marginTop: '2.5%',
            marginLeft: '3px',
            display: 'inline'
        },
        sa1_container: {
            display: 'flex',
            height: '100%',
            width: '100%',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignContent: 'flex-end'
        },
        sa1_chart_container: {
            margin: '2%',
            // backgroundColor:'red'
        },
        categoryName: {
            fontFamily: 'Questrial',
            fontWeight: '150',
            color: '#4F545A',
            display: 'inline',
            marginRight: '0px'
        },
        titleName: {
            fontFamily: 'Questrial',
            fontWeight: '750',
            color: '#4B719C',
            display: 'inline'
        },
        detailsText: {
            fontFamily: 'Questrial',
            fontWeight: '100',
            color: '#4F545A',
            marginLeft: '3px'
        }
    }))
    const classes = useStyles()


    // Defining custom functions for Live charts
    const createLiveCharts = (solutionSet, idx) => {
        return (
            <LiveChart
                currSolution={solutionSet.values}
                fill={chartColors[idx]}
                domain={solutionSet.domains}
            />
        )
    }

    const createSAContainer = (solutionSet) => {
        return (
            <div className={classes.sa1_container}>
                {createSAcharts(solutionSet.category)}
            </div>
        )
    }

    const createSAcharts = (outputCategory) => {
        if (props.type === "summary") {
        } else {
            return props.saChartData.map(categoryCharts => {
                return categoryCharts.map(chart => {
                    if (chart.category === outputCategory) {
                        return (
                            <div className={classes.sa1_chart_container} key={chart.category + chart.title}>
                                <h4 className={classes.categoryName}>{chart.category}</h4>
                                <h4 className={classes.sa1_title}> sensitized to </h4>
                                <h4 className={classes.titleName}>{chart.title}</h4>
                                {/*<SA1Chart data={chart.data}*/}
                                {/*          category={chart.category}*/}
                                {/*          title={chart.title}*/}
                                {/*          inputFormat={chart.inputFormat}*/}
                                {/*          outputFormat={chart.outputFormat}*/}
                                {/*          key={chart.category + chart.title}/>*/}
                                <SA2Chart/>
                            </div>
                        )
                    }
                })
            })
        }
    }

    const createSAHeader = (type) => {
        if (type === "detail") {
            return (
                <div className={classes.cardSectionHeader}>
                    <h2 className={classes.cardSectionTitle}>
                        Sensitivity Analysis
                    </h2>
                    <h4 className={classes.cardSectionNote}>
                        1 input sensitized while other inputs set at current slider levels
                    </h4>
                </div>
            )
        }
    }

    const createCharts = () => {
        return props.liveChartData.map((solutionSet, idx) => {
                return (
                    <Card className={classes.outputCards} key={solutionSet.category}>
                        <div className={classes.cardHeaderContainer}>
                            <NavLink to={`/outputs/${solutionSet.category}`} style={{textDecoration: 'none'}}>
                                <h2 className={classes.cardTitleHeader}>{solutionSet.category}</h2>
                            </NavLink>
                            <CardSettings/>
                        </div>
                        {createLiveCharts(solutionSet, idx)}
                        {createSAHeader(props.type)}
                        {createSAContainer(solutionSet)}
                    </Card>
                )
            }
        )
    }
    // console.log(props.saChartData)
    return (
        <div className={classes.root}>
            {createCharts()}
        </div>
    )
}






