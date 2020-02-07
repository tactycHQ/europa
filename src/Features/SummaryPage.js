import React from 'react'
import {Card, Paper, makeStyles} from "@material-ui/core";

export default function SummaryPage(props) {


    const useStyles = makeStyles(theme => ({
        topCard: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            background: '#FEFEFD'
        },
        paper: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '1%',
            padding: '1%',
            background: 'linear-gradient(#F4F4F4 10%,#FEFEFD)',
            // borderRadius:'64px'
        },
        cardHeaderContainer: {
            display: 'flex',
            justifyContent: 'space-between',
        },
        cardTitleHeader: {
            color: '#4F545A',
            fontFamily: 'Questrial',
            fontWeight: '20',
            fontSize: '2em',
            marginTop: '10px',
            marginLeft: '15px',
            marginBottom: '20px'
        },
        chartNote: {
            fontFamily: 'Questrial',
            fontSize: '0.9em',
            fontWeight: '300',
            color: '#3C4148',
            marginTop: '0'
        }
    }))
    const classes = useStyles()

    const totalCombos = props.solutions.length
    const numOutputs = props.outputs.length
    const outputNames = props.outputs.map(output => output.category)
    const numInputs = props.inputs.length
    // const inputNames = props.inputs.length

    console.log(totalCombos)
    console.log(numOutputs)
    console.log(outputNames)
    console.log(numInputs)
    console.log(Object.values(props.inputLabelMap))

    const createInfo = () => {
        return (
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', width: '100%'}}>
                <h3 className={classes.chartNote}>
                    The following presents an analysis of overall model metrics.
                </h3>
                <h3 className={classes.chartNote}>
                    A total of {props.solutions.length} input combinations have been calculated based on the defined
                    input ranges.
                    These {props.solutions.length} input combinations result in a total output universe of [ ] values
                    across the following defined output categories: [ ]
                </h3>
                <h3 className={classes.chartNote}>
                    Pre-defined input and values can be changed at any time by revisiting the "Change Inputs/Outputs"
                    link on the sidebar. Each time the inputs and output definitions
                    are changed, the entire solution set will be recalculated.
                </h3>
                <h3 className={classes.chartNote}>
                    The original excel model file is available for download here. If a new version of the model is
                    available, it can be uploaded here.
                </h3>
                <h3 className={classes.chartNote}>
                    At any point, click on Save Dashboard in order to save the latest version of the dashboard with your
                    changes. The dashboard is auto-saved upon a recalculation of the model
                    if the inputs / outputs definitions were changed.
                </h3>
                <h3 className={classes.chartNote}>
                    The following features each presents a different facet of analysis of these solutions.
                </h3>
                <h3 className={classes.chartNote}>
                    The Dashboard page shows a live view of the current output values and a slider for you to change the
                    input values. The output values will dynamically update as each input slider is changed.
                    <br/><br/>
                    Input Sliders can be saved as separate cases (for e.g. Low, High, Base). A default case of Default is automatically populated based on the
                    current input values in the excel model.
                    <br/><br/>
                    At any point, click on any of the output values in the charts, in order to see key metrics such as
                    mean, standard deviation etc. for the given output. An evaluation of each input's impact on the given output variable is also shown in a
                    contribution analysis in the key metrics panel. Clicking on the key metrics panel will take you to the more detailed Output Distributions page.
                </h3>
                <h3 className={classes.chartNote}>
                    The Output Distributions page shows an overall distribution of values for the given output. A histogram is automatically generated and corresponding
                    probability density function plotted to show the probability of each value being achieved. If input cases have been defined, these are also shows as reference lines on
                    both the probability and histogram charts.
                    <br/><br/>
                    Input combinations resulting in minimums or maximums of the selected output variable are summarized on this page.
                </h3>
                <h3 className={classes.chartNote}>
                    The Input Contribution page shows the impact each input variable has on each output variable in the form of variance contribution. These impacts are shown in the form of "Average Change" in output value for
                    each increment of the input slider.
                </h3>
                <h3 className={classes.chartNote}>
                    The Sensitivity Analysis page shows the variance in output values for the selected input set. 2 inputs are flexed across their ranges and the corresponding output values plotted and charted in a table.
                </h3>
                <h3 className={classes.chartNote}>
                    The Scenario Analysis page is similar to Excel's Goal Seek methodology. You can set bounds for mutliple output values and the set of input combinations that result in the output criteria will be presented.
                </h3>
            </div>
        )
    }


    const information = createInfo()


    return (
        <Card
            className={classes.topCard}
            elevation={0}
        >
            <div className={classes.cardHeaderContainer}>
                <h2 className={classes.cardTitleHeader}>Information</h2>
            </div>
            <Paper className={classes.paper}>
                {information}
            </Paper>
        </Card>
    )
}


