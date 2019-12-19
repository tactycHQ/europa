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
            minHeight:'100vh',
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
            // marginBottom: '1vh',
            background: '#FEFEFD',
            padding: '2px'
        },
        titleHeader: {
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
            marginTop: '15px',
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
            alignContent:'flex-end'
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
            marginRight:'0px'
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
            marginLeft: '3px',

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
                            <div className={classes.sa1_chart_container}>
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
        return props.chartData.map((data, idx) => {
                return (
                    <Card className={classes.outputCards} key={data.title}>
                        <div className={classes.cardTop}>
                            <NavLink to={`/outputs/${data.title}`} style={{textDecoration: 'none'}}>
                                <h2 className={classes.titleHeader}>{data.title}</h2>
                            </NavLink>
                            <CardSettings/>
                        </div>
                        <LiveChart
                            currSolution={data.values}
                            fill={chartColors[idx]}
                            domain={data.domains}
                        />
                        {afterLiveInfo}
                        <div className={classes.sa1_container}>
                            {createSAcharts(data.title)}
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






