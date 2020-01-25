import React, {useState, useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper"
import InputLabel from "@material-ui/core/InputLabel"
import Dialog from "@material-ui/core/Dialog";
import {between, convert_format, myRound, createBounds, computeSteps} from "../utils/utils";


export default function IOSelection(props) {
    const useStyles = makeStyles(theme => ({
        root: {
            display: 'flex',
            position: 'fixed',
            height: '93vh',
            flexDirection: 'column',
            alignContent: 'center',
            justifyContent: 'flex-start',
            backgroundColor: '#FEFEFD',
            width: '20.0%',
            overflowY: 'auto',
            padding: '10px'
        },
        selectionContainer: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '100%',
            alignContent: 'center'
        },
        IOContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100%',
            // background:'blue'
        },
        divider: {
            backgroundColor: '#D7DEE2',
            // margin: '5px',
            minHeight: '1px',
            maxHeight: '1px',
            // marginTop: '10%',
            marginBottom: '1%'
        },
        buttons: {
            display: 'flex',
            margin: '3px',
            color: '#006E9F',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingLeft: '1px',
            paddingRight: '1px',
            paddingTop: '7px',
            paddingBottom: '7px',
            "&:hover": {
                background: '#A2CADC'
            }
        },
        saveButton: {
            display: 'flex',
            margin: '3px',
            color: '#292F36',
            backgroundColor: '#EBECEC',
            // borderStyle: 'solid',
            // borderColor: '#D8D9DA',
            // borderWidth: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingLeft: '1px',
            paddingRight: '1px',
            paddingTop: '7px',
            paddingBottom: '7px',
            marginBottom: '8%',
            "&:hover": {
                background: "#B9D7E4"
            }
        },
        buttonLabel: {
            fontSize: '0.9em',
            paddingLeft: '5px',
            fontFamily: 'Questrial',
            color: '#292F36',
            "&:hover": {
                color: "#FEFEFD"
            }
        },
        icon: {
            color: '#006E9F',
            "&:hover": {
                color: "#3B9D7E4"
            },
            height: 15,
            width: 15
        },
        selectHeader: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'flex-start'
        },
        selectText: {
            fontSize: '0.9em',
            paddingLeft: '5px',
            fontFamily: 'Questrial',
            color: '#292F36',
            margin: '2px'
        },
        selectNote: {
            fontSize: '0.9em',
            fontWeight: '100',
            paddingLeft: '5px',
            fontFamily: 'Questrial',
            color: '#292F36',
            margin: '10px'
        },
        categoryContainer: {
            margin: '5px',
            background: '#D7DEE2',
            padding: '8px',
            // width: '100%'
        },
        selectButton: {
            fontSize: '0.8em',
            fontWeight: '100',
            paddingLeft: '5px',
            fontFamily: 'Questrial',
            background: '#006E9F',
            color: '#FEFEFD',
            margin: '5px',
            width: '100%'
        },
        rootTextContainer: {
            display: 'flex',
            // background:'green',
            width: '100%'
        },
        textField: {
            fontSize: '0.75em',
            fontWeight: '100',
            fontFamily: 'Questrial',
            // marginBottom:'0px',
            paddingTop: '5px',
            paddingBottom: '0px',
        },
        labelField: {
            fontSize: '1.0em',
            fontWeight: '100',
            fontFamily: 'Questrial',
            marginTop: '7px',
            width: '100%',
            // background:'yellow'
        },
        formControl: {
            // margin: theme.spacing(1),
            width: "100%",
            marginTop: '5px'
        },
        stepItem: {
            fontFamily: 'Questrial',
            fontSize: '1.0em',
            // background: '#D7DEE2'
        }
    }))
    const classes = useStyles()


    const [address, setAddress] = useState('')
    const [label, setLabel] = useState('')
    const [numSteps, setNumSteps] = useState(5)
    const [bounds, setBounds] = useState([])
    const [incr, setIncr] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [error, setError] = useState(null)
    const [errorOpen, setErrorOpen] = useState(false)


    //Hooks
    useEffect(() => {

        if (props.clickedCells.hasOwnProperty("address")) {

            const default_value = props.clickedCells.value
            const default_bounds = createBounds(default_value, 0.9, 1.1)
            const default_increments = computeSteps(default_value, default_bounds[0], default_bounds[1], 5)

            setAddress(props.clickedCells.address)
            setNumSteps(5)
            setBounds(default_bounds)
            setIncr(default_increments)
            setLoaded(true)
        }

    }, [props.clickedCells])


    const createIOPanel = () => {

        const value = props.clickedCells.value
        const format = props.clickedCells.format

        const labelSelector = createLabelSelector()
        const boundSelector = createBoundSelector(value, format)
        const stepSelector = createStepSelector()
        let incrementEl = createIncrementEl(value, format)
        let errorEl = null


        for (let i in incr) {
            if (!between(incr[i], bounds[0], bounds[1])) {
                errorEl =
                    <h3 className={classes.selectNote} style={{color: 'red', margin: '10px'}}>All increments must be
                        between
                        the lower and upper bounds</h3>
            }
        }

        if (!between(value, bounds[0], bounds[1])) {
            incrementEl =
                <h3 className={classes.selectNote} style={{color: 'red', margin: '10px'}}>Bounds must include current
                    cell value of {convert_format(format, value)}</h3>
            errorEl = null
        }


        return (
            <div className={classes.selectionContainer} key={address}>
                {labelSelector}
                <Paper className={classes.categoryContainer}>
                    {boundSelector}
                    {stepSelector}
                </Paper>
                {incrementEl}
                {errorEl}
            </div>
        )
    }

    const createBoundSelector = (value, format) => {

        if (isNaN(bounds[0])) {
            bounds[0] = '-'
        }
        if (isNaN(bounds[1])) {
            bounds[1] = '-'
        }

        return (
            <>
                <TextField
                    id="lb"
                    className={classes.rootTextContainer}
                    label={"Lower Bound: " + convert_format(format, bounds[0])}
                    size="small"
                    InputLabelProps={{
                        className: classes.labelField
                    }}
                    InputProps={{
                        classes: {
                            input: classes.textField
                        }
                    }}
                    defaultValue={myRound(bounds[0])}
                    onBlur={e => boundHandler(e, "lb")}
                />
                <TextField
                    id="ub"
                    className={classes.rootTextContainer}
                    label={"Upper Bound: " + convert_format(format, bounds[1])}
                    size="small"
                    InputLabelProps={{
                        className: classes.labelField
                    }}
                    InputProps={{
                        classes: {
                            input: classes.textField
                        }
                    }}
                    defaultValue={myRound(bounds[1])}
                    onBlur={e => boundHandler(e, "ub")}
                />
            </>
        )
    }

    const createStepSelector = () => {
        return (
            <FormControl
                className={classes.formControl}
            >
                <InputLabel className={classes.labelField} shrink id="demo-simple-select-placeholder-label-label">
                    Steps
                </InputLabel>
                <Select
                    value={numSteps}
                    classes={{selectMenu: classes.textField}}
                    onChange={(e) => stepChangeHandler(e)}
                >
                    <MenuItem classes={{root: classes.stepItem}} value={1}>1</MenuItem>
                    <MenuItem classes={{root: classes.stepItem}} value={2}>2</MenuItem>
                    <MenuItem classes={{root: classes.stepItem}} value={3}>3</MenuItem>
                    <MenuItem classes={{root: classes.stepItem}} value={4}>4</MenuItem>
                    <MenuItem classes={{root: classes.stepItem}} value={5}>5 (default)</MenuItem>
                    <MenuItem classes={{root: classes.stepItem}} value={6}>6</MenuItem>
                    <MenuItem classes={{root: classes.stepItem}} value={7}>7</MenuItem>
                </Select>
            </FormControl>
        )

    }

    const createIncrementEl = (value, format) => {

        const incrEls = incr.map((v, idx) => {
            if (v === value) {
                return (
                    <TextField
                        // id="incr"
                        className={classes.rootTextContainer}
                        key={v + idx.toString()}
                        disabled
                        label={"Model: " + convert_format(format, v)}
                        value={v}
                        size="small"
                        InputLabelProps={{
                            className: classes.labelField
                        }}
                        InputProps={{
                            classes: {
                                input: classes.textField
                            }
                        }}
                    />
                )
            } else {
                return (
                    <TextField
                        // id="incr"
                        className={classes.rootTextContainer}
                        key={v + idx.toString()}
                        label={convert_format(format, v)}
                        defaultValue={v}
                        size="small"
                        onBlur={(e) => incrementHandler(e, idx)}
                        InputLabelProps={{
                            className: classes.labelField
                        }}
                        InputProps={{
                            classes: {
                                input: classes.textField
                            }
                        }}
                    />
                )
            }
        })

        return (
            <Paper className={classes.categoryContainer}>
                {incrEls}
            </Paper>
        )
    }

    const createLabelSelector = () => {
        return (
            <Paper className={classes.categoryContainer}>
                <TextField
                    required id="standard-required"
                    className={classes.rootTextContainer}
                    label="Input Name"
                    size="small"
                    InputLabelProps={{
                        className: classes.labelField
                    }}
                    InputProps={{
                        classes: {
                            input: classes.textField
                        }
                    }}
                    defaultValue={address}
                    onChange={(e) => labelHandler(e)}
                />
            </Paper>
        )

    }


//Event Handlers
    const boundHandler = (e, type) => {
        let newb
        if (type === 'lb') {
            console.log(typeof (e.target.value))
            newb = [myRound(parseFloat(e.target.value)), bounds[1]]
        } else {
            newb = [bounds[0], myRound(parseFloat(e.target.value))]
        }
        setBounds(newb)
    }

    const incrementHandler = (e, idx) => {
        // e.persist()
        const new_incr = incr
        new_incr[idx] = parseFloat(e.target.value)
        setIncr([...new_incr])
    }

    const labelHandler = (e) => {
        return setLabel(e.target.value)
    }

    const stepChangeHandler = (e) => {
        setNumSteps(e.target.value)
        const new_increments = computeSteps(props.clickedCells.value, bounds[0], bounds[1], e.target.value)
        setIncr([...new_increments])
    }

    const handleErrorClose = () => {
        setErrorOpen(false)
    }


    const nextHandler = () => {

        if (label === "") {
            setErrorOpen(true)
            setError("Please give this input a name before proceeding. A name could be descriptions of the driver, such as Growth Rate or Profit Margin.")
        } else {
            const inputPayload = {"address": address, "label": label, "values": incr}
            setAddress('')
            setLabel('')
            setNumSteps(5)
            setBounds([])
            setIncr([])
            setLoaded(false)
            setError(null)
            props.nextInputHandler(inputPayload)
        }
    }

    const createInstructions = () => {
        if (props.currInputsLength === 0) {
            return (
                <h3 className={classes.selectNote}>
                    Select an input cell in the spreadsheet. <br/><br/>

                    These are hardcoded cells that
                    are typically key model assumptions that drive the rest of the model. For e.g., <em>Annual
                    Growth
                    Rate</em> or <em>Profit Margin</em><br/><br/>

                    Please note that the input cell <strong>must</strong> be a number and cannot be a text or date
                    cell.<br/><br/>

                    After selecting each input, click <em>Next Input</em> to define another input. A maximum of 5
                    inputs can be selected in total.<br/><br/>

                    Click <em>Done with Inputs</em> to start selecting outputs.
                </h3>
            )
        } else if (props.currInputsLength > 0 && props.currInputsLength <5) {
            return (
                <h3 className={classes.selectNote}>
                    Please select the next input. <br/><br/>
                    You can select up to 5 inputs
                </h3>
            )
        } else if (props.currInputsLength ===5) {
            return (
                <h3 className={classes.selectNote}>
                    Select an output cell or range in the spreadsheet. <br/><br/>

                    Output cells must be in the same <em>category</em> and have the same <em>units</em>. For
                    example, Revenue (in dollars) or IRRs (in %).<br/><br/>

                    Multiple cells within a category (for e.g. 2020 Profit, 2021 Profit, 2022 Profit) are called <em>labels</em>.<br/><br/>

                    You can select upto 10 categories and 25 labels per category.<br/><br/>

                    Click <em>Done with Outputs</em> to start calculations.
                </h3>
            )
        }
    }


//Function Executions
    let selectedCells = null
    let instructions = createInstructions()

    if (loaded) {
        instructions=null
        selectedCells = createIOPanel()
    }



    return (

        <div className={classes.root}>
            <div className={classes.selectHeader}>
                <h3 className={classes.selectText}>Define Model Inputs</h3>
                {instructions}
            </div>
            {selectedCells}
            <Button className={classes.selectButton} variant="contained" color="secondary" size="small"
                    onClick={() => nextHandler()}>
                Next Input
            </Button>
            <Button className={classes.selectButton} variant="contained" color="secondary" size="small">
                Done with all inputs
            </Button>
            <Dialog open={errorOpen} onClose={handleErrorClose}>
                <div>
                    <h2 className={classes.selectNote}>{error}</h2>
                </div>
            </Dialog>

        </div>
    )
}
