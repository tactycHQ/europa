import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles'
import {Card, Paper} from "@material-ui/core";
import OutSlider from "../Other/OutSliders"
import Checkbox from '@material-ui/core/Checkbox'
import {convert_format} from "../utils/utils";
// import {convert_format} from "../utils/utils";


const chartColors = [
    '#006E9F',
    '#A5014B',
    '#3DA32D',
    '#6014BC',
    '#C62525',
    '#002247',
    '#006E9F',
    '#A5014B',
    '#3DA32D',
    '#6014BC',
    '#C62525',
    '#002247'
]


export default function ScenarioAnalysis(props) {


    const useStyles = makeStyles({
        // root: {
        //     width: 300,
        // },
        topCard: {
            display: 'flex',
            width: '100%',
            padding: '10px',
            // justifyContent: 'space-between',
            // background: 'yellow',
        },
        outputContainer: {
            display: 'flex',
            flexDirection: 'column',
            // alignItems:'flex-start',
            width: '50%'
        },
        solutionContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '50%'
        },
        outputPaper: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            margin: '1%',
            padding: '1%',
            background: 'linear-gradient(#F4F4F4 10%,#FEFEFD)',
        },
        paperHeaderContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            width: '100%',
        },
        solutionPaper: {
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            maxHeight: '100%',
            // width: '100%',
            margin: '1%',
            padding: '1%',
            background: '#4595B9'
        },
        solutionTextContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            background: '#E7F1F6',
            margin: '1%'
        },
        answerContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '10px'
        },
        solutionText: {
            color: '#3C4148',
            fontFamily: 'Questrial',
            textAlign: 'center',
            margin: '0px',
            fontWeight: '20',
            fontSize: '0.9em'
        },
        chartTitle: {
            fontFamily: 'Questrial',
            fontSize: '1.3em',
            fontWeight: '200',
            color: '#3C4148',
            marginTop: '0px',
            marginBottom: '10px',
            width: '100%'
        },
        chartNote: {
            fontFamily: 'Questrial',
            fontSize: '0.9em',
            fontWeight: '300',
            color: '#3C4148',
            marginTop: '0'
        },
        selectionContainer: {
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            padding: '0px',
            paddingRight: '40px',
            paddingBottom: '0px',
        },
        checkbox: {
            top: 8,
            color: '#8A8D91',
        },
        label: {
            paddingTop: '24px',
            fontWeight: '550',
            fontSize: '0.9em',
            fontFamily: 'Questrial',
            color: '#3C4148',
            width: '80px',
            wordWrap: 'break-word'
        },
        checked: {
            color: '#006E9F'
        }
    })
    const classes = useStyles()

    //Utils
    const isBetween = (x, bounds) => {
        return x >= bounds[0] && x <= bounds[1];
    }

    const comboCheck = (combo, checkedOutputs) => {
        const checks = checkedOutputs.map(address => isBetween(combo.outputs[address], props.sa_value[address]))
        if (checks.every(v => v === true)) {
            return combo.inputs
        } else {
            return {}
        }
    }

    //Function Definitions
    const createSliders = () => {
        return props.outputs.map((output, idx) => {
            const addresses = Object.entries(output.labels)
            const categorySliders = addresses.map(pair => {
                const address = pair[0]
                const label = pair[1]
                const _min = props.distributions.min[address]
                const _max = props.distributions.max[address]
                const displayVal = props.sa_value[address]
                const checkstate = props.checked[address]
                let SliderEl
                let checkEl


                if (checkstate) {
                    SliderEl = (
                        <OutSlider
                            type="checked"
                            key={address}
                            category={output.category}
                            address={address}
                            label={label}
                            displayVal={displayVal}
                            min={_min}
                            max={_max}
                            values={Object.keys(props.distributions.prob[address]).map(Number)}
                            format={props.formats[address]}
                            handleChange={props.handleOutSliderChange}
                        />
                    )
                } else {
                    SliderEl = (
                        <OutSlider
                            type="unchecked"
                            key={address}
                            category={output.category}
                            address={address}
                            label={label}
                            min={_min}
                            max={_max}
                            format={props.formats[address]}
                        />
                    )
                }

                if (_min === _max) {
                    checkEl = (
                        <Checkbox
                            checked={checkstate}
                            onChange={(event) => props.handleCheckChange(event, address)}
                            value="primary"
                            disabled
                            inputProps={{'aria-label': 'primary-checkbox'}}
                            size="small"
                            color="default"
                            classes={{root: classes.checkbox, checked: classes.checked}}
                        />
                    )
                } else {
                    checkEl = (
                        <Checkbox
                            checked={checkstate}
                            onChange={(event) => props.handleCheckChange(event, address)}
                            value="primary"
                            inputProps={{'aria-label': 'primary-checkbox'}}
                            size="small"
                            color="default"
                            classes={{root: classes.checkbox, checked: classes.checked}}
                        />
                    )
                }

                return (
                    <div key={'check_' + address} className={classes.selectionContainer}>
                        <div className={classes.label}>{label}</div>
                        {checkEl}
                        {SliderEl}
                    </div>
                )
            })
            return (
                <Paper className={classes.outputPaper} key={output.category} elevation={4}>
                    <div className={classes.paperHeaderContainer}>
                        <h3 className={classes.chartTitle} style={{color: chartColors[idx]}}>{output.category}</h3>
                    </div>
                    {categorySliders}
                </Paper>
            )
        })
    }

    const createSolutions = () => {
        const checkedOutputs = Object.keys(props.checked).filter(address => props.checked[address] === true)
        const foundSolutions = props.solutions.filter(combo => Object.keys(comboCheck(combo, checkedOutputs)).length >= 1)
        return foundSolutions
    }

    const renderSolutions = (foundSolutions) => {


        const solutions = foundSolutions.map(solution => {
            const addresses = Object.keys(solution.inputs)

            const answer = addresses.map((address, idx) => {

                const fmt = props.formats[address]
                const val = solution.inputs[address]
                const val_text = convert_format(fmt, val)

                return (
                    <div key={"solution_" + idx} className={classes.answerContainer}>
                        <h2 className={classes.solutionText}
                            style={{fontWeight: '550', color: '#005174'}}>{props.inputLabelMap[address]}</h2>
                        <h2 className={classes.solutionText}>{val_text}</h2>
                    </div>
                )
            })

            return (
                <Paper className={classes.solutionTextContainer} elevation={0}>
                    {answer}
                </Paper>
            )
        })

        return (
            <div>
                {solutions}
            </div>
        )
    }

    const createSolutionEl = (foundSolutions) => {
        // console.log(props.inputs)
        const maxSol = 100
        const numSol = foundSolutions.length
        if (numSol >= maxSol) {
            return (
                <Paper className={classes.solutionPaper} elevation={4}>
                    <h2 className={classes.solutionText} style={{color: '#F4F9E9', fontSize: '1em'}}>
                        {numSol} solutions found. In order to view the results, please filter for less than 100
                        solutions
                    </h2>
                </Paper>
            )
        } else {

            const shownSol = renderSolutions(foundSolutions)

            return (
                <Paper className={classes.solutionPaper}>
                    <h2 className={classes.solutionText} style={{color: '#F4F9E9', fontSize: '1em'}}>
                        {numSol} solutions found.
                    </h2>
                    {shownSol}
                </Paper>
            )
        }
    }

    //Function Executions
    const outSliders = createSliders()

    const foundSolutions = createSolutions()

    const solutionsEl = createSolutionEl(foundSolutions)


    //Return
    return (
        <Card className={classes.topCard} elevation={0}>
            {/*<h3 className={classes.chartNote}>Select Desired Output Value Range</h3>*/}
            <div className={classes.outputContainer}>
                {outSliders}
            </div>
            <div className={classes.solutionContainer}>
                {solutionsEl}
            </div>
        </Card>
    )

}
