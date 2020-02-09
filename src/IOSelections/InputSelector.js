import React, {useState} from 'react'
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
    hasNumber, isEmpty
} from "../utils/utils";
import Spreadsheet from "../Features/Spreadsheet";
import {NavLink} from "react-router-dom";


export default function InputSelector(props) {


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
            alignItems: 'center',
            justifyContent: 'flex-start'
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
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '5px',
            background: '#D7DEE2',
            padding: '4px',
            width: '100%'
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
            width: '100%',
            margin: '2px',
            fontWeight: '100',
            fontFamily: 'Questrial',
            fontSize: '0.85em',
        },
        textField: {
            fontSize: '0.9em',
            fontWeight: '100',
            fontFamily: 'Questrial',
            paddingTop: '5px',
            paddingBottom: '0px',
        },
        labelField: {
            fontSize: '1.0em',
            fontWeight: '100',
            fontFamily: 'Questrial',
            width: '100%',
        },
        formControl: {
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
            justifyContent: 'center',
            alignItems: 'center'
        },
        selectedInputs: {
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#4595B9',
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
            margin: '0px'
        }
    }))
    const classes = useStyles()
    const [clickedCells, setClickedCell] = useState({})
    const [address, setAddress] = useState('')
    const [label, setLabel] = useState('')
    const [numSteps, setNumSteps] = useState(5)
    const [bounds, setBounds] = useState([])
    const [incr, setIncr] = useState([])
    const [value, setvalue] = useState(null)
    const [format, setFormat] = useState('General')
    const [error, setError] = useState(null)
    const [errorOpen, setErrorOpen] = useState(false)
    const [enableClick, setEnableClick] = useState(true)

    //Hooks
    // This is the default hook to load up initial input assumptions when a cell has been clicked



    const createIOPanel = () => {

        if (props.stage === 'empty' || props.stage === 'summary') {
            return <div className={classes.selectionContainer} key={address}/>

        } else {
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
    }

    const createButtons = () => {

        let setInputButton = null
        let doneWithInputs = null


        //Sidebar is populated with input data
        if (props.stage === 'loaded') {
            setInputButton = (
                <Button className={classes.selectButton} size="small" onClick={() => setInputHandler()}>
                    <h3 className={classes.buttonText}>OK</h3>
                </Button>)
        }


        if (props.stage === "summary") {
            doneWithInputs = (
                <Button className={classes.selectButton} size="small" onClick={() => props.updateIO("outputs")}>
                    <h3 className={classes.buttonText}>GO TO OUTPUTS</h3>
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

        let alreadySelected = null
        if (props.stage === 'summary') {
            alreadySelected = props.inputs.map(input => {
                return (
                    <div className={classes.singleButtonContainer} key={input.address}>
                        <Button
                            key={input.address}
                            className={classes.selectedInputs}
                            onClick={(e) => loadInputHandler(input.address)}
                        >
                            <h3 className={classes.selectedInputsText}>{input.label}</h3>
                        </Button>
                        <IconButton onClick={() => deleteInputHandler(input.address)} size="small">
                            <RemoveCircleSharpIcon style={{color: '#4595B9'}} size="small"/>
                        </IconButton>
                    </div>
                )
            })

            if (props.inputs.length < MAXINPUTS) {
                return (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: '10px'
                    }}>
                        <h3 className={classes.selectNote}>
                            Please select the next input from the spreadsheet. You can select up to 5 inputs <br/><br/>
                        </h3>
                        <h3 className={classes.selectNote} style={{
                            fontSize: '0.9em',
                            fontWeight: '800',
                            color: '#A5014B',
                            marginBottom: '1px'
                        }}>Selected Inputs</h3>
                        {alreadySelected}
                    </div>
                )
            } else if (props.inputs.length === MAXINPUTS) {
                return (
                    <>
                        <h3 className={classes.selectNote}>
                            Maximum of 5 inputs have been defined. <br/><br/> Click on the inputs below to revisit or
                            change
                            assumptions
                            <br/>
                        </h3>
                        {alreadySelected}
                    </>
                )
            }
        }


        //If no inputs have been selected yet
        else if (props.stage === 'empty') {
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
        }
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
                    type="number"
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
                    type="number"
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
                        label={"Current Model: " + convert_format(format, v)}
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
                        type="number"
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
                <div style={{
                    fontSize: '1.em',
                    fontWeight: '100',
                    fontFamily: 'Questrial',
                    width: '100%',
                    marginBottom: '5px',
                    color: '#8A8D91'
                }}>Generated Increments
                </div>
                {incrEls}
            </Paper>
        )
    }

    const createLabelSelector = () => {
        return (
            <Paper className={classes.categoryContainer}>
                <TextField
                    required
                    className={classes.rootTextContainer}
                    label="Input Name"
                    size="small"
                    type="text"
                    InputLabelProps={{
                        className: classes.labelField
                    }}
                    InputProps={{
                        classes: {
                            input: classes.textField
                        }
                    }}
                    inputProps={{
                        maxLength: 23
                    }}
                    defaultValue={label}
                    onChange={(e) => labelHandler(e)}
                />
            </Paper>
        )
    }

    //
    const addClickedCell = (newCell, sheetName) => {

        if (props.wb.Sheets[sheetName][newCell].hasOwnProperty('f')) {
            setError("Input must be a hardcode and not a formula cell")
            setErrorOpen(true)

        } else if (typeof (props.wb.Sheets[sheetName][newCell]['v']) === 'string') {
            setError("Input must be a number and not a text cell")
            setErrorOpen(true)

        } else {

            let oldColor
            let v
            let format

            //if clicked a different cell, then reset color of unclicked cell
            if (!isEmpty(clickedCells)) {
                refreshWorksheetColor()
            }


            // Get cell metadata on old color, value and format for ne cell
            oldColor = getOldColor(newCell, sheetName)
            v = getValue(newCell, sheetName)
            format = getFormat(newCell, sheetName)
            props.wb.Sheets[sheetName][newCell].s.fgColor = {rgb: "FCCA46"}


            //Set new clicked cell
            setClickedCell({
                address: sheetName + '!' + newCell,
                sheet: sheetName,
                raw: newCell,
                oldColor: oldColor,
                value: v,
                format: format
            })


            const default_bounds = createBounds(v, LOWER_RATIO, UPPER_RATIO)
            const default_increments = computeSteps(v, default_bounds[0], default_bounds[1], NUM_STEPS)

            setAddress(sheetName + '!' + newCell)
            // setLabel(sheetName + '!' + newCell)
            setvalue(v)
            setFormat(format)
            setNumSteps(NUM_STEPS)
            setBounds(default_bounds)
            setIncr(default_increments)
            setErrorOpen(false)
            props.updateStage('loaded')
        }
    }

    const loadInput2ClickedCell = (address) => {
        const splits = address.split("!")
        const sheetName = splits[0]
        if (sheetName !== props.currSheet) {
            props.handleSheetChange(sheetName)
        }
        const rawAdd = splits[1]
        const oldColor = getOldColor(rawAdd, sheetName)
        const v = getValue(rawAdd, sheetName)
        const fmt = props.formats[address]
        props.wb.Sheets[sheetName][rawAdd].s.fgColor = {rgb: "FCCA46"}

        const foundInput = props.inputs.find(input => input.address === (sheetName + '!' + rawAdd))

        setClickedCell({
            address: sheetName + '!' + rawAdd,
            sheet: sheetName,
            raw: rawAdd,
            oldColor: oldColor,
            value: v,
            format: fmt
        })

        setAddress(foundInput.address)
        setLabel(foundInput.label)
        setvalue(v)
        setBounds([Math.min(...foundInput.values), Math.max(...foundInput.values)])
        setIncr([...foundInput.values])
        setNumSteps(foundInput.values.length)
        setFormat(fmt)
        setErrorOpen(false)
        props.updateStage('loaded')
    }

    const refreshWorksheetColor = () => {
        props.wb.Sheets[clickedCells.sheet][clickedCells.raw].s.fgColor = {rgb: clickedCells.oldColor}
    }

    //Input Handlers
    const setInputHandler = () => {


        if (label === address) {
            setError("Input name cannot be the cell address. Please provide a name for the input that will help you identify it with context. For e.g. Growth Rate or EBITDA margin ")
            setErrorOpen(true)

        } else {

            const payload = {
                "address": address,
                "label": label,
                "values": incr,
                "value": value,
                "format": format
            }

            //If address or label is a duplicate, overwrite the past one
            let foundIndex = props.inputs.findIndex(input => (input.address === payload.address) || (input.label === payload.label))

            if (foundIndex === -1) {
                props.updateInputs([...props.inputs, payload])
                props.updateFormats({...props.formats, [address]: format})
                props.updateCases({...props.cases, 'Default': {...props.cases.Default, [address]: value}})

            } else {
                let newInputs = [...props.inputs]
                newInputs[foundIndex] = payload
                props.updateInputs([...newInputs])
                props.updateFormats({...props.formats, [address]: format})
                props.updateCases({...props.cases, 'Default': {...props.cases.Default, [address]: value}})
            }
            resetState()
        }
    }

    const resetState = () => {
        refreshWorksheetColor()
        setLabel('')
        setNumSteps(5)
        setBounds([])
        setIncr([])
        setvalue(null)
        setFormat('General')
        setError(null)
        setErrorOpen(false)
        setClickedCell({})
        setEnableClick(true)
        props.updateStage("summary")
    }



    const deleteInputHandler = (address) => {
        const newInputs = props.inputs.filter(input => input.address !== address)
        props.updateInputs([...newInputs])

        //Delete from formats
        const {[address]: tmp, ...rest} = props.formats
        props.updateFormats({...rest})

        //Delete from values
        const {[address]: curr, ...other} = props.cases.Default
        props.updateCases({...props.cases, 'Default': {...other}})

        setClickedCell({})

        if (newInputs.length === 0) {
            props.updateStage("empty")
        }
    }

    const loadInputHandler = (address) => {
        loadInput2ClickedCell(address)
        setEnableClick(false)
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
            const new_increments = computeSteps(value, newb[0], newb[1], numSteps)
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
        const new_increments = computeSteps(value, bounds[0], bounds[1], e.target.value)
        setIncr([...new_increments])
    }

    const handleErrorClose = () => {
        setErrorOpen(false)
    }

//Other Functions
    const getOldColor = (newCell, sheetName) => {
        try {
            return props.wb.Sheets[sheetName][newCell].s.fgColor.rgb
        } catch {
            return "FFFFFF"
        }
    }

    const getValue = (newCell, sheetName) => {
        try {
            return myRound(props.wb.Sheets[sheetName][newCell].v)
        } catch {
            return 0
        }
    }

    const getFormat = (newCell, sheetName) => {
        try {
            return props.wb.Sheets[sheetName][newCell].z
        } catch {
            return 'General'
        }
    }


//Function Executions
    let instructions = createInstructions()
    let buttons = createButtons()
    let ioPanel = createIOPanel()

    let cancelEl
    if (props.mode === 'loaded') {
        cancelEl = (
            <NavLink to="/dashboard" style={{textDecoration: 'none'}}>
                <h3 style={{
                    color: '#8A8D91',
                    marginTop: '5px',
                    fontSize: '0.85em',
                    fontWeight: '100',
                    fontFamily: 'Questrial',
                    cursor: 'pointer'
                }} onClick={() => props.cancel()}>Cancel and Go Back</h3>
            </NavLink>)
    }

    return (

        <div style={{display: 'flex', width: '100%'}}>
            <div className={classes.root}>
                {instructions}
                {ioPanel}
                {buttons}
                {cancelEl}
            </div>
            <Spreadsheet
                stage={props.stage}
                IO={props.IO}
                inputs={props.inputs}
                worksheet={props.worksheet}
                currSheet={props.currSheet}
                sheets={props.sheets}
                enableClick={enableClick}
                handleSheetChange={props.handleSheetChange}
                clickedCells={clickedCells}
                addClickedCell={addClickedCell}
            />
            <Dialog open={errorOpen} onClose={handleErrorClose}>
                <div>
                    <h2 className={classes.selectNote}>{error}</h2>
                </div>
            </Dialog>
        </div>
    )
}
