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
import {between, convert_format, myRound, createBounds, computeSteps, ascending} from "../utils/utils";


export default function IOSelection(props) {


    const MAXINPUTS = 5
    const LOWER_RATIO = 0.9
    const UPPER_RATIO = 1.1
    const NUM_STEPS = 5

    const useStyles = makeStyles(theme => ({
        root: {
            display: 'flex',
            position: 'fixed',
            height: '93vh',
            flexDirection: 'column',
            alignItems: 'center',
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
        },
        selectedInputs: {
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#A5014B',
            padding: "2px",
            marginBottom: '3px',
            width: '100%'
        },
        selectedInputsText: {
            fontFamily: 'Questrial',
            fontSize: '0.85em',
            fontWeight: '300',
            color: '#FEFEFD',
            margin: '0px'
            // marginTop:'5px'
        }
    }))
    const classes = useStyles()


    const [address, setAddress] = useState('')
    const [label, setLabel] = useState('')
    const [numSteps, setNumSteps] = useState(5)
    const [bounds, setBounds] = useState([])
    const [incr, setIncr] = useState([])
    const [value, setvalue] = useState(null)
    const [format, setFormat] = useState('General')
    const [error, setError] = useState(null)
    const [errorOpen, setErrorOpen] = useState(false)

    const [loaded, setLoaded] = useState(false)


    //Hooks
    // This is the default hook to load up initial input assumptions when a cell has been clicked
    useEffect(() => {

        if (props.clickedCells.hasOwnProperty("address")) {

            if (props.inputs.some(input => input.address === props.clickedCells.address)) {
                let foundInput = props.inputs.find(input => input.address === props.clickedCells.address)
                setAddress(foundInput.address)
                setLabel(foundInput.label)
                setvalue(foundInput.value)
                setFormat(foundInput.format)
                setNumSteps(foundInput.values.length)
                setBounds([Math.min(...foundInput.values), Math.max(...foundInput.values)])
                setIncr(foundInput.values)
                setLoaded(true)

            } else {

                const default_value = props.clickedCells.value
                const default_bounds = createBounds(default_value, LOWER_RATIO, UPPER_RATIO)
                const default_increments = computeSteps(default_value, default_bounds[0], default_bounds[1], NUM_STEPS)

                setAddress(props.clickedCells.address)
                setLabel(props.clickedCells.address)
                setvalue(props.clickedCells.value)
                setFormat(props.clickedCells.format)
                setNumSteps(NUM_STEPS)
                setBounds(default_bounds)
                setIncr(default_increments)
                setLoaded(true)
            }
        }
    }, [props.inputs, props.clickedCells])


    const createIOPanel = () => {

        const labelSelector = createLabelSelector()
        const boundSelector = createBoundSelector()
        const stepSelector = createStepSelector()
        let incrementEl = createIncrementEl()
        let errorEl = null

        //Check whether all increments are in bounds
        for (let i in incr) {
            if (!between(incr[i], bounds[0], bounds[1])) {
                errorEl =
                    <h3 className={classes.selectNote} style={{color: 'red', margin: '10px'}}>All increments must be
                        between
                        the lower and upper bounds</h3>
            }
        }

        //Check whether cell value is within bounds
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

    const createBoundSelector = () => {

        console.log(bounds)

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

    const createIncrementEl = () => {

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
                    defaultValue={label}
                    onChange={(e) => labelHandler(e)}
                />
            </Paper>
        )
    }


    //Event Handlers
    const boundHandler = (e, type) => {
        let newb
        if (type === 'lb') {
            newb = [myRound(parseFloat(e.target.value)), bounds[1]]
        } else {
            newb = [bounds[0], myRound(parseFloat(e.target.value))]
        }
        setBounds([...newb])
        const new_increments = computeSteps(props.clickedCells.value, newb[0], newb[1], numSteps)
        setIncr([...new_increments])
    }

    const incrementHandler = (e, idx) => {
        // e.persist()
        const new_incr = incr
        new_incr[idx] = parseFloat(e.target.value)
        const new_bounds = [Math.min(...new_incr),Math.max(...new_incr)]
        setIncr([...new_incr])
        setBounds([...new_bounds])
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

    const prevHandler = () => {
        let lastInput = props.inputs.slice(-1)[0]
        props.addClickedCell(lastInput.address.split("!").pop())
    }

    const nextHandler = () => {

        //If label matches address, thow a dialog
        if (label === address) {
            setErrorOpen(true)
            setError("Please give this input a name before proceeding. A name could be descriptions of the driver, such as Growth Rate or Profit Margin.")

        //Check if label has already been assigned to another input
        } else if (props.inputs.some(input => {return (input.label === label) && (input.address !== address)})) {
            setErrorOpen(true)
            setError("Input name has already been assigned to another input. Please select a different name")

        //Go for inserting into input array
        } else {
            const inputPayload = {"address": address, "value": value, "label": label, "values": incr.sort(ascending), "format": format,}
            setAddress('')
            setvalue(null)
            setLabel('')
            setNumSteps([])
            setBounds([])
            setIncr([])
            setFormat('General')
            setError(null)
            setErrorOpen(false)
            setLoaded(false)
            props.nextInputHandler(inputPayload)
        }
    }

    const createButtons = () => {

        let prevInputButton = null
        let nextInputButton = null
        let doneWithInputs = null

        if (loaded) {
            nextInputButton = (
                <Button className={classes.selectButton} variant="contained" color="secondary" size="small"
                        onClick={() => nextHandler()}>
                    Next Input
                </Button>)


        }


        if (props.inputs.length > 0) {
            doneWithInputs = (
                <Button className={classes.selectButton} variant="contained" color="secondary" size="small">
                    Done with all inputs
                </Button>)
        }


        if (props.inputs.length > 0) {
            prevInputButton = (
                <Button className={classes.selectButton} variant="contained" color="secondary" size="small"
                        onClick={() => prevHandler()}>
                    Previous Input
                </Button>
            )
        }

        return (
            <>
                {nextInputButton}
                {prevInputButton}
                {doneWithInputs}
            </>
        )
    }

    const createInstructions = () => {

        //If no inputs have been selected yet
        if (props.inputs.length === 0) {
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

            //If user has selected at least one input
        } else if (props.inputs.length > 0 && props.inputs.length < MAXINPUTS) {

            let alreadySelected = props.inputs.map(input => {
                return (
                    <Paper key={input.address} className={classes.selectedInputs} elevation={0}>
                        <h3 className={classes.selectedInputsText}>{input.label} : {input.address}</h3>
                    </Paper>
                )
            })


            return (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '10px'
                }}>
                    <h3 className={classes.selectNote}>
                        Please select the next input. You can select up to 5 inputs <br/><br/>
                    </h3>
                    <h3 className={classes.selectNote} style={{color: '#A5014B', marginBottom: '1px'}}>Selected Inputs
                        Thus Far</h3>
                    {alreadySelected}
                </div>

            )

            //All 5 inputs have been selected
        } else if (props.inputs.length === MAXINPUTS) {
            return (
                <h3 className={classes.selectNote}>
                    Select an output cell or range in the spreadsheet. <br/><br/>

                    Output cells must be in the same <em>category</em> and have the same <em>units</em>. For
                    example, Revenue (in dollars) or IRRs (in %).<br/><br/>

                    Multiple cells within a category (for e.g. 2020 Profit, 2021 Profit, 2022 Profit) are
                    called <em>labels</em>.<br/><br/>

                    You can select upto 10 categories and 25 labels per category.<br/><br/>

                    Click <em>Done with Outputs</em> to start calculations.
                </h3>
            )
        }
    }


//Function Executions
    let selectedCells = null
    let instructions = createInstructions()
    let buttons = createButtons()

    if (loaded) {
        instructions = null
        selectedCells = createIOPanel()
    }


    return (

        <div className={classes.root}>
            <div className={classes.selectHeader}>
                <h3 className={classes.selectText}>Define Model Inputs</h3>
                {instructions}
            </div>
            {selectedCells}
            {buttons}
            <Dialog open={errorOpen} onClose={handleErrorClose}>
                <div>
                    <h2 className={classes.selectNote}>{error}</h2>
                </div>
            </Dialog>
        </div>
    )
}
