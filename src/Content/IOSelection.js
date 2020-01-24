import React, {useState, useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper"
import InputLabel from "@material-ui/core/InputLabel";
import {between, convert_format, myRound, addAndSort, range} from "../utils/utils";


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

    const [numSteps, setNumSteps] = useState(5)
    const [bounds, setBounds] = useState({lb: 0.9, ub: 1.1})

    //Hooks
    useEffect(() => {
        setNumSteps(5)
        setBounds({lb: 0.9, ub: 1.1})
    }, [props.clickedCells])

    //Functions
    const createIOPanel = () => {

        const address = props.clickedCells.address
        const value = props.clickedCells.value
        const format = props.clickedCells.format
        const lb = bounds.lb * value
        const ub = bounds.ub * value


        const labelSelector = createLabelSelector(address)
        const boundSelector = createBoundSelector(lb, ub, value, format)
        const stepSelector = createStepSelector()
        let incrementEl = createIncrementEl(value, lb, ub, format)

        if (!between(value, lb, ub)) {
            incrementEl =
                <h3 className={classes.selectNote} style={{color: 'red', margin: '10px'}}>Bounds must include current
                    cell value</h3>
        }


        return (
            <div className={classes.selectionContainer} key={address}>
                {labelSelector}
                <Paper className={classes.categoryContainer}>
                    {boundSelector}
                    {stepSelector}
                </Paper>
                {incrementEl}
            </div>
        )
    }

    const createBoundSelector = (lb, ub, value, format) => {

        if (isNaN(lb)) {
            lb = '-'
        }

        if (isNaN(ub)) {
            ub = '-'
        }

        return (
            <>
                <TextField
                    id="lb"
                    className={classes.rootTextContainer}
                    label={"Lower Bound: " + convert_format(format, lb)}
                    size="small"
                    InputLabelProps={{
                        className: classes.labelField
                    }}
                    InputProps={{
                        classes: {
                            input: classes.textField
                        }
                    }}
                    defaultValue={myRound(lb)}
                    onChange={e => boundHandler(e, "lb", value)}
                />
                <TextField
                    id="ub"
                    className={classes.rootTextContainer}
                    label={"Upper Bound: " + convert_format(format, ub)}
                    size="small"
                    InputLabelProps={{
                        className: classes.labelField
                    }}
                    InputProps={{
                        classes: {
                            input: classes.textField
                        }
                    }}
                    defaultValue={myRound(ub)}
                    onChange={e => boundHandler(e, "ub", value)}
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

    const createIncrementEl = (value, lb, ub, format) => {

        const increments = computeSteps(value, lb, ub)

        const incrEls = increments.map((v, idx) => {

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
                            style: {
                                color: '#006E9F',
                                fontSize: '1.0em',
                                fontWeight: '200',
                                fontFamily: 'Questrial',
                                marginTop: '5px',
                                width: '100%',
                            }
                        }}
                        InputProps={{
                            style: {
                                color: '#006E9F',
                                fontSize: '0.85em',
                                fontWeight: '100',
                                fontFamily: 'Questrial',
                                paddingBottom: '0px',
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

    const createLabelSelector = (address) => {
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
                    onChange={(e) => LabelInput(e)}
                />
            </Paper>
        )

    }

    const computeSteps = (value, lb, ub) => {

        if (numSteps === 1) {
            return [value]
        }

        const steps = (ub - lb) / (numSteps - 1)
        const index = range(0, numSteps - 1)

        const incr = index.map((i) => {
                return myRound(lb + steps * i)
            }
        )

        if (incr.includes(value)) {
            return incr
        } else {
            return addAndSort(incr, value)
        }
    }

    //Event Handlers
    const boundHandler = (e, type, value) => {
        const perChange = e.target.value / value
        if (type === 'lb') {
            setBounds(prevBound => {
                return {...prevBound, lb: [perChange]}
            })
        } else {
            setBounds(prevBound => {
                return {...prevBound, ub: [perChange]}
            })
        }
    }

    const LabelInput = (e) => {
        return e.target.value
    }

    const stepChangeHandler = (e) => {
        setNumSteps(e.target.value)
    }

    //Function Executions
    let selectedCells
    let instructions
    if (props.clickedCells.hasOwnProperty("address")) {
        selectedCells = createIOPanel()
        instructions = null
    } else {
        instructions = (
            <h3 className={classes.selectNote}>
                Select an input cell in the spreadsheet. <br/><br/>

                These are hardcoded cells that
                are typically key model assumptions that drive the rest of the model. For e.g., <em>Annual Growth
                Rate</em> or <em>Profit Margin</em><br/><br/>

                Please note that the input cell <strong>must</strong> be a number and cannot be a text or date
                cell.<br/><br/>

                After selecting each input, click <em>Next Input</em> to define another input. A maximum of 5
                inputs can be selected in total.<br/><br/>

                Click <em>Done with Inputs</em> to start selecting outputs.
            </h3>
        )
        selectedCells = null
    }

    return (
        <div className={classes.root}>
            <div className={classes.selectHeader}>
                <h3 className={classes.selectText}>Define Model Inputs</h3>
                {instructions}
            </div>
            {selectedCells}
            <Button className={classes.selectButton} variant="contained" color="secondary" size="small">
                Next Input
            </Button>
            <Button className={classes.selectButton} variant="contained" color="secondary" size="small">
                Done with all inputs
            </Button>
        </div>
    )
}