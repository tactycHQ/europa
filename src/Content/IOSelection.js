import React, {useState, useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import SaveAltIcon from '@material-ui/icons/SaveAlt'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import CloudDownloadSharpIcon from '@material-ui/icons/CloudDownloadSharp'
import Divider from "@material-ui/core/Divider";
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper"
import InputLabel from "@material-ui/core/InputLabel";
import {between} from "../utils/utils";


export default function IOSelection(props) {
    const useStyles = makeStyles(theme => ({
        root: {
            display: 'flex',
            position: 'fixed',
            height: '94vh',
            flexDirection: 'column',
            alignContent: 'flex-start',
            backgroundColor: '#FEFEFD',
            maxWidth: '15.0%',
            minWidth: '15.0%',
            overflowY: 'auto',
        },
        content: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'space-between',
            padding: '5px'
            // paddingBottom:'10px'

        },
        IOContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            // background: 'red',
            height: '100%'
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
            fontSize: '0.8em',
            fontWeight: '100',
            paddingLeft: '5px',
            fontFamily: 'Questrial',
            color: '#292F36',
            margin: '0px'
        },
        categoryContainer: {
            margin: '10px',
            background: '#D7DEE2',
            padding: '8px',
            maxWidth: '100%'
        },
        selectButton: {
            fontSize: '0.8em',
            fontWeight: '100',
            paddingLeft: '5px',
            fontFamily: 'Questrial',
            background: '#006E9F',
            color: '#FEFEFD',
            margin: '5px',
            width: '200px'
        },
        textField: {
            fontSize: '0.85em',
            fontWeight: '100',
            fontFamily: 'Questrial',
        },
        labelField: {
            fontSize: '1.2em',
            fontWeight: '100',
            fontFamily: 'Questrial',
            marginTop: '5px',
        },
        formControl: {
            // margin: theme.spacing(1),
            width: 135,
            marginTop: '10px'
        },
        stepSelect: {
            marginTop: '5px',
            fontFamily: 'Questrial',
            fontSize: '0.85em',
            background: '#D7DEE2',
            padding: '2px',
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

    useEffect(() => {
        setNumSteps(5)
        setBounds({lb: 0.9, ub: 1.1})
    },[props.clickedCells])

    const renderClickedcells = () => {

        const selectedCells = Object.keys(props.clickedCells).reduce((acc, cell) => {
            if (props.clickedCells[cell].to_add === true) {
                acc.push({[props.sheetName + '!' + cell]: props.clickedCells[cell].value})
            }
            return acc
        }, [])

        if (selectedCells.length > 1) {
            return (
                <h3 className={classes.selectNote} style={{color: 'red', margin: '10px'}}>Please select 1 cell only. You
                    can select another input cell after
                    completing definition for this input</h3>
            )
        } else {

            return selectedCells.map((cell, idx) => {
                const cellData = Object.entries(cell)
                const address = cellData[0][0]
                const value = cellData[0][1]
                const lb = bounds.lb * value
                const ub = bounds.ub * value

                let incrementEl = createIncrementEl(value, lb, ub, numSteps)
                const labelSelector = createLabelSelector(address)
                const boundSelector = createBoundSelector(lb, ub, value)
                const stepSelector = createStepSelector()

                if (!between(value, lb, ub)) {
                    incrementEl =
                        <h3 className={classes.selectNote} style={{color: 'red', margin: '10px'}}>Bounds must include current cell value</h3>
                }


                return (
                    <div key={props.sheetName + cellData[0] + idx}>
                        <div className={classes.selectHeader}>
                            <h3 className={classes.selectNote}>Cell: {address}</h3>
                            <h3 className={classes.selectNote}>Current Model Value: {value}</h3>
                        </div>
                        {labelSelector}
                        <Paper className={classes.categoryContainer}>
                            {boundSelector}
                            {stepSelector}
                        </Paper>
                        {incrementEl}
                    </div>
                )
            })
        }
    }

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

    const createBoundSelector = (lb, ub, value) => {
        return (
            <>
                <TextField
                    id="lb"
                    className={classes.textField}
                    label="Lower Bound"
                    size="small"
                    InputLabelProps={{
                        className: classes.labelField
                    }}
                    InputProps={{
                        classes: {
                            input: classes.textField
                        }
                    }}
                    defaultValue={lb}
                    onChange={e => boundHandler(e, "lb", value)}
                />
                <TextField
                    className={classes.textField}
                    label="Upper Bound"
                    size="small"
                    InputLabelProps={{
                        className: classes.labelField
                    }}
                    InputProps={{
                        classes: {
                            input: classes.textField
                        }
                    }}
                    defaultValue={ub}
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
                    classes={{selectMenu: classes.stepSelect}}
                    onChange={(e) => stepChangeHandler(e)}
                >
                    <MenuItem classes={{root: classes.stepItem}} value={1}>1</MenuItem>
                    <MenuItem classes={{root: classes.stepItem}} value={2}>2</MenuItem>
                    <MenuItem classes={{root: classes.stepItem}} value={3}>3</MenuItem>
                    <MenuItem classes={{root: classes.stepItem}} value={4}>4</MenuItem>
                    <MenuItem classes={{root: classes.stepItem}} value={5}>5</MenuItem>
                    <MenuItem classes={{root: classes.stepItem}} value={6}>6</MenuItem>
                    <MenuItem classes={{root: classes.stepItem}} value={7}>7</MenuItem>
                    <MenuItem classes={{root: classes.stepItem}} value={8}>8</MenuItem>
                    <MenuItem classes={{root: classes.stepItem}} value={9}>9</MenuItem>
                    <MenuItem classes={{root: classes.stepItem}} value={10}>10</MenuItem>
                </Select>
            </FormControl>
        )

    }

    const stepChangeHandler = (e) => {
        setNumSteps(e.target.value)
    }

    const createIncrementEl = (value, lb, ub) => {
        const increments = computeSteps(value, lb, ub)
        const incrEls = increments.map((v, idx) => {
            return (
                <TextField
                    key={v + idx.toString()}
                    defaultValue={v}
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
                    className={classes.textField}
                    required id="standard-required"
                    label="Label"
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

    const LabelInput = (e) => {
        return e.target.value
    }

    const computeSteps = (value, lb, ub) => {

        if (numSteps===1) {
            return [value]
        }

        const steps = (ub - lb) / (numSteps - 1)
        const index = range(0, numSteps - 1)

        const incr = index.map((i) => {
                return parseFloat((lb + steps * i).toFixed(5))
            }
        )

        if (incr.includes(value)) {
            return incr.sort()
        } else {
            return addAndSort(incr, value)
        }
    }

    function range(start, end) {
        return Array(end - start + 1).fill().map((_, idx) => start + idx)
    }

    function addAndSort(arr, val) {
        arr.push(val);
        for (let i = arr.length - 1; i > 0 && arr[i] < arr[i - 1]; i--) {
            var tmp = arr[i];
            arr[i] = arr[i - 1];
            arr[i - 1] = tmp;
        }
        return arr;
    }


    const selectedCells = renderClickedcells()

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <div className={classes.IOContainer}>
                    <div className={classes.selectHeader}>
                        <h3 className={classes.selectText}>Select Inputs</h3>
                        <h3 className={classes.selectNote}>Click 1 cell at a time</h3>
                    </div>
                    <div>{selectedCells}</div>
                    <Button className={classes.selectButton} variant="contained" color="secondary" size="small">
                        Next Input
                    </Button>
                    <Button className={classes.selectButton} variant="contained" color="secondary" size="small">
                        Done with all inputs
                    </Button>
                </div>
                <List component="nav" aria-label="main mailbox folders">
                    <Divider variant="middle" className={classes.divider}/>
                    <ListItem className={classes.buttons} button={true}>
                        <CloudUploadIcon className={classes.icon}/>
                        <div className={classes.buttonLabel}>Upload New Model Excel</div>
                    </ListItem>
                    <ListItem className={classes.buttons} button={true}>
                        <CloudDownloadSharpIcon className={classes.icon}/>
                        <div className={classes.buttonLabel}>Download Model Excel</div>
                    </ListItem>
                    <ListItem className={classes.saveButton} button={true}>
                        <SaveAltIcon className={classes.icon}/>
                        <div className={classes.buttonLabel}>Save Dashboard</div>
                    </ListItem>
                </List>
            </div>
        </div>
    )
}