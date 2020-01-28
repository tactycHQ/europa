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
import RemoveCircleSharpIcon from '@material-ui/icons/RemoveCircleSharp'
import IconButton from "@material-ui/core/IconButton";
import {
    between,
    convert_format,
    myRound,
    createBounds,
    computeSteps,
    ascending,
    hasNumber
} from "../utils/utils";


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
        buttonContainer: {
            display: 'flex'
        },
        selectButton: {
            display: 'flex',
            background: '#006E9F',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#FEFEFD',
            padding: '5px',
            margin: '5px',
            width: '100%',
            height: '40px',
        },
        buttonText: {
            // backgroundColor:'yellow',
            fontSize: '0.85em',
            fontWeight: '100',
            fontFamily: 'Questrial',
            margin: '0px'
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
        singleButtonContainer: {
            display: 'flex',
            width: '100%',
            justifyContent:'center',
            alignItems:'center'
        },
        selectedInputs: {
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#BD467C',
            padding: '2px',
            marginBottom: '2px',
            width: '90%',
            "&:hover": {
                backgroundColor: "#A5014B",
            }
        },
        selectedInputsText: {
            fontFamily: 'Questrial',
            fontSize: '0.8em',
            fontWeight: '500',
            color: '#FEFEFD',
            margin:'0px'
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
                setErrorOpen(false)
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

                setErrorOpen(false)
                setLoaded(true)
            }
        }
    }, [props.inputs, props.clickedCells])


    const createIOPanel = () => {

        const labelSelector = createLabelSelector()
        const boundSelector = createBoundSelector()
        const stepSelector = createStepSelector()
        let incrementEl = createIncrementEl()
        let error_msg = null

        //Check whether cell value is within bounds
        if (!between(value, bounds[0], bounds[1])) {
            error_msg = `Bounds must include current cell value of ${convert_format(format, value)}`
            incrementEl = null
        }


        return (
            <div className={classes.selectionContainer} key={address}>
                {labelSelector}
                <Paper className={classes.categoryContainer}>
                    {boundSelector}
                    {stepSelector}
                </Paper>
                {incrementEl}
                <h3 className={classes.selectNote} style={{color: 'red', margin: '10px'}}>{error_msg}</h3>
            </div>
        )
    }

    const createBoundSelector = () => {

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
        if (!hasNumber(e.target.value)) {
            setErrorOpen(true)
            setError("Bound can only be a number")
        } else {
            if (type === 'lb') {
                newb = [myRound(parseFloat(e.target.value)), bounds[1]]
            } else {
                newb = [bounds[0], myRound(parseFloat(e.target.value))]
            }
            setBounds([...newb])
            const new_increments = computeSteps(props.clickedCells.value, newb[0], newb[1], numSteps)
            setIncr([...new_increments])
        }
    }

    const incrementHandler = (e, idx) => {
        // e.persist()
        if (!hasNumber(e.target.value)) {
            setErrorOpen(true)
            setError("Increment can only be a number")
        } else {
            const new_incr = incr
            new_incr[idx] = parseFloat(e.target.value)
            const new_bounds = [Math.min(...new_incr), Math.max(...new_incr)]
            setIncr([...new_incr])
            setBounds([...new_bounds])
        }
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

    const setInputHandler = () => {

        //If label matches address, thow a dialog. TODO make this into matching address
        if (label === '') {
            setErrorOpen(true)
            setError("Please give this input a name before proceeding. A name could be descriptions of the driver, such as Growth Rate or Profit Margin.")
        }

        //Check if label has already been assigned to another input, throw a duplicate error
        else if (props.inputs.some(input => {
            return (input.label === label) && (input.address !== address)
        })) {
            setErrorOpen(true)
            setError("Input name has already been assigned to another input. Please select a different name")
        }

        //Otherwise we are go for inserting into input array
        else {
            const inputPayload = {
                "address": address,
                "value": value,
                "label": label,
                "values": incr.sort(ascending),
                "format": format,
            }
            props.setInputHandler(inputPayload)
            resetState()
        }
    }

    const loadInputHandler = (address) => {
        props.loadInputHandler(address)
    }

    const resetState = () => {
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
    }

    const createButtons = () => {

        let setInputButton = null
        let doneWithInputs = null

        if (loaded) {
            setInputButton = (
                <Button className={classes.selectButton} size="small" onClick={() => setInputHandler()}>
                    <h3 className={classes.buttonText}>SET</h3>
                </Button>)
        }


        if (props.inputs.length >= 1 && !loaded) {
            doneWithInputs = (
                <Button className={classes.selectButton} size="small">
                    <h3 className={classes.buttonText}>DONE WITH INPUTS</h3>
                </Button>)
        }

        return (
            <div className={classes.buttonContainer}>
                {setInputButton}
                {doneWithInputs}
            </div>
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
                    <div className={classes.singleButtonContainer}>
                        <Button
                            key={input.address}
                            className={classes.selectedInputs}
                            onClick={(e) => loadInputHandler(input.address)}
                        >
                            <h3 className={classes.selectedInputsText}>{input.label}</h3>
                        </Button>
                        <IconButton onClick={() => props.deleteInputHandler(input.address)} size="small">
                            <RemoveCircleSharpIcon style={{color: '#BD467C'}} size="small"/>
                        </IconButton>
                    </div>
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
                    <h3 className={classes.selectNote} style={{
                        fontSize: '0.9em',
                        fontWeight: '800',
                        color: '#A5014B',
                        marginBottom: '1px'
                    }}>Selected Inputs Thus Far</h3>
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
