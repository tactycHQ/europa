import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import LiveChart from "../Charts/LiveChart"
import {Card} from "@material-ui/core";
import CardSettings from "../Outputs/CardSettings";
import SA1Chart from "../Charts/SA1Chart";
import {NavLink} from "react-router-dom";


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
        cardSectionTitle: {
            color: '#292F36',
            fontFamily: 'Questrial',
            fontWeight: '50',
            marginTop: '4%',
            marginLeft: '7px'
        },
        sa1_title: {
            color: '#0C0D0F',
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
            color: '#0C0D0F',
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
            color: '#9DA0A3',
            marginLeft: '3px'
        }
    }))
    const classes = useStyles()


    // Defining custom functions for Live charts
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
                                <SA1Chart data={chart.data} category={chart.category} title={chart.title}
                                          key={chart.category + chart.title}/>
                            </div>
                        )
                    }
                })
            })
        }
    }

    const afterLive = () => {
        if (props.type === "detail") {
            return (
                <h2 className={classes.cardSectionTitle}>
                    Single Input Sensitivity Analysis
                </h2>
            )
        }
    }

    const afterLiveInfo = afterLive()


    const createLiveCharts = () => {
        return props.liveChartData.map((solutionSet, idx) => {

                return (
                    <Card className={classes.outputCards} key={solutionSet.category}>
                        <div className={classes.cardHeaderContainer}>
                            <NavLink to={`/outputs/${solutionSet.category}`} style={{textDecoration: 'none'}}>
                                <h2 className={classes.cardTitleHeader}>{solutionSet.category}</h2>
                            </NavLink>
                            <CardSettings/>
                        </div>
                        <LiveChart
                            currSolution={solutionSet.values}
                            fill={chartColors[idx]}
                            domain={solutionSet.domains}
                        />
                        {afterLiveInfo}
                        <div className={classes.sa1_container}>
                            {createSAcharts(solutionSet.category)}
                        </div>
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






