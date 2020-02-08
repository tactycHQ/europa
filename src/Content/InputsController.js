import React, {useState, useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import InputSlider from "./InputSlider"
import Slide from "@material-ui/core/Slide"
import {Card, CardHeader} from "@material-ui/core"
import CaseSelector from "./CaseSelector";
import Button from "@material-ui/core/Button"
import TextField from '@material-ui/core/TextField'
import Dialog from "@material-ui/core/Dialog";
import isEqual from 'lodash.isequal'


const useStyles = makeStyles(theme => ({
            root: {
                display: 'flex',
                position: 'fixed',
                right: 0,
                flexDirection: 'column',
                width: '15%',
                marginTop: '10px',
                marginRight: '0.5%',
                // background:'pink'
            },
            inputContainer: {
                display: 'flex',
                flexDirection: 'column',
                minHeight: '92vh',
                background: '#FEFEFD'
            },
            inputHeader: {
                background: '#006E9F',
                height: '3vh',
                marginBottom: '5%'
            },
            inputTitle: {
                color: '#F4F9E9',
                fontSize: '1.0em',
                fontWeight: '400',
                fontFamily: 'Questrial'
            },
            caseSelectorContainer: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '5px',
                textAlign: 'center'
            },
            caseText: {
                fontFamily: 'Questrial',
                fontSize: '0.9em',
                fontWeight: '800',
                color: '#4B719C',
                marginRight: '10px'
            },
            sliderContainer: {
                display: 'flex',
                flexDirection: 'column',
                minHeight: '80vh',
                maxHeight: '80vh',
                justifyContent: 'flex-start',
                marginTop: '5.0%',
                marginLeft: '3.5%',
                marginRight: '3.5%',
            },
            label: {
                fontFamily: 'Questrial',
                fontSize: '0.8em'
            },
            selectButton: {
                display: 'flex',
                background: '#006E9F',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#FEFEFD',
                padding: '5px',
                margin: '5px'
            },
            buttonText: {
                fontSize: '0.85em',
                fontWeight: '100',
                fontFamily: 'Questrial',
                margin: '0px'
            },
            saveField: {
                fontSize: '0.85em',
                fontWeight: '100',
                fontFamily: 'Questrial',
                margin: '0px'
            },
            labelField: {
                fontSize: '0.95em',
                fontWeight: '100',
                fontFamily: 'Questrial',
                margin: '0px'
            },
            labelFocused: {
                fontSize: '1.1em',
                fontWeight: '100',
                fontFamily: 'Questrial',
                margin: '0px'
            },
        }
    )
)


export default function Input(props) {

    const classes = useStyles()
    const [showAskSave, setShowAskSave] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [showSave, setShowSave] = useState(false)
    const [saveName, setSaveName] = useState('')
    const [error, setError] = useState(null)
    const [errorOpen, setErrorOpen] = useState(false)
    const [askDeleteOpen, setAskDeleteOpen] = useState(false)

    useEffect(() => {
        let foundIndex = Object.values(props.cases).findIndex(caseData => isEqual(caseData, props.currInputVal))
        let foundCase = Object.keys(props.cases)[foundIndex]

        if (foundIndex === -1) {
            setShowAskSave(true)
        } else {
            setShowAskSave(false)
        }

        if (foundCase === 'Default') {
            setShowDelete(false)
        } else {
            setShowDelete(true)
        }


    }, [props.cases, props.currInputVal])


    const saveCase = () => {
        if (saveName === '') {
            setError("Case name cannot be empty")
            setErrorOpen(true)
        } else if (saveName === 'Default') {
            setError("Default case cannot be overwritten")
            setErrorOpen(true)
        } else if (Object.keys(props.cases).includes(saveName)) {
            setError("This case name already exists. Please select a new name")
            setErrorOpen(true)
        } else if (Object.values(props.cases).findIndex(caseData => isEqual(caseData, props.currInputVal)) !== -1) {
            let foundIndex = Object.values(props.cases).findIndex(caseData => isEqual(caseData, props.currInputVal))
            let foundCase = Object.keys(props.cases)[foundIndex]
            setError("This case already exists under " + foundCase)
            setErrorOpen(true)
        } else {
            props.updateCases({...props.cases, [saveName]: props.currInputVal})
            setShowSave(false)
        }
    }

    const createDeleteCase = () => {

        if (showDelete && !showSave) {
            return (
                <h3 style={{
                    color: '#8A8D91',
                    marginTop: '1px',
                    fontSize: '0.85em',
                    fontWeight: '100',
                    fontFamily: 'Questrial',
                    cursor: 'pointer',
                    width: '100%',
                    textAlign: 'center'
                }}
                    onClick={() => setAskDeleteOpen(true)}
                >
                    Delete Case
                </h3>)
        }
    }

    const deleteCase = (deleteCase) => {
        const {[deleteCase]: tmp, ...rest} = props.cases
        props.updateCases({...rest})

    }

    const confirmDeleteHandler = (update) => {
        if (update === true) {
            let foundIndex = Object.values(props.cases).findIndex(caseData => isEqual(caseData, props.currInputVal))
            let foundCase = Object.keys(props.cases)[foundIndex]
            deleteCase(foundCase)
        }
        setAskDeleteOpen(false)
    }

    const createSaveField = () => {
        if (showSave) {
            return (
                <TextField
                    required
                    className={classes.saveField}
                    InputLabelProps={{
                        classes: {
                            root: classes.labelField,
                            focused: classes.labelFocused
                        }
                    }}
                    InputProps={{
                        classes: {
                            input: classes.saveField
                        }
                    }}
                    inputProps={{
                        maxLength: 15
                    }}
                    label="Case Name"
                    defaultValue=""
                    size="small"
                    onBlur={(e) => setSaveName(e.target.value)}
                />
            )
        }
    }

    const createAskSaveButton = () => {
        if (showAskSave && !showSave) {
            return (
                <Button className={classes.selectButton} size="small" onClick={() => setShowSave(true)}>
                    <h3 className={classes.buttonText}>Save as New Case</h3>
                </Button>)
        }
    }

    const createSaveButton = () => {
        if (showSave) {
            return (
                <Button className={classes.selectButton} size="small" onClick={() => saveCase()}>
                    <h3 className={classes.buttonText}>Save</h3>
                </Button>)
        }
    }

    const createSliders = () => {
        let inputName
        let inputAddress
        let inputValues
        let currSliderVal
        if (props.inputs) {
            return props.inputs.map(input => {
                    inputName = input.label
                    inputAddress = input.address
                    inputValues = input.values
                    currSliderVal = props.currInputVal[inputAddress]

                    return (
                        <InputSlider name={inputName}
                                     onChange={props.handleSliderChange}
                                     key={inputAddress}
                                     address={inputAddress}
                                     values={inputValues}
                                     currSliderVal={currSliderVal}
                                     formats={props.formats}
                        />
                    )
                }
            )
        }
    }

    const handleErrorClose = () => {
        setErrorOpen(false)
    }

    const sliders = createSliders()
    const askSaveButton = createAskSaveButton()
    const saveField = createSaveField()
    const saveButton = createSaveButton()
    const deleteOption = createDeleteCase()

    return (
        <div className={classes.root}>
            <Slide
                direction="left"
                in={true}
                timeout={1000}
                mountOnEnter
                unmountOnExit>
                <Card className={classes.inputContainer} rounded={"true"} elevation={4}>
                    <CardHeader classes={{root: classes.inputHeader, title: classes.inputTitle}} title="Inputs"/>
                    <div className={classes.caseSelectorContainer}>
                        <div className={classes.caseText}>Case</div>
                        <CaseSelector
                            handleCaseChange={props.handleCaseChange}
                            cases={props.cases}
                            currInputVal={props.currInputVal}
                        />
                    </div>
                    <div className={classes.sliderContainer}>
                        {sliders}
                        {askSaveButton}
                        {saveField}
                        {saveButton}
                        {deleteOption}
                    </div>
                </Card>
            </Slide>
            <Dialog open={errorOpen} onClose={handleErrorClose}>
                <div>
                    <h2 style={{
                        fontSize: '0.9em',
                        fontWeight: '100',
                        paddingLeft: '5px',
                        fontFamily: 'Questrial',
                        color: '#292F36',
                        margin: '10px'
                    }}>{error}</h2>
                </div>
            </Dialog>
            <Dialog open={askDeleteOpen}>
                <div>
                    <h2 style={{
                        fontSize: '0.9em',
                        fontWeight: '100',
                        paddingLeft: '5px',
                        fontFamily: 'Questrial',
                        color: '#292F36',
                        margin: '10px'
                    }}>Delete this case?</h2>
                </div>
                <Button className={classes.selectButton} size="small" onClick={() => confirmDeleteHandler(true)}>
                    <h3 className={classes.buttonText}>Yes</h3>
                </Button>
                <Button className={classes.selectButton} size="small" onClick={() => confirmDeleteHandler(false)}>
                    <h3 className={classes.buttonText}>No</h3>
                </Button>
            </Dialog>
        </div>
    )
}


