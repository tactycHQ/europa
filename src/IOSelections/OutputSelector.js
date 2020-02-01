import React, {useState, useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Paper from "@material-ui/core/Paper"
import Dialog from "@material-ui/core/Dialog";
import RemoveCircleSharpIcon from '@material-ui/icons/RemoveCircleSharp'
import IconButton from "@material-ui/core/IconButton";
import isEqual from 'lodash.isequal'


export default function OutputSelector(props) {


    const MAXCAT = 10
    const MAXLABEL = 10

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
        title: {
            fontSize: '0.9em',
            paddingLeft: '5px',
            fontFamily: 'Questrial',
            color: '#292F36',
            margin: '2px'
        },
        instruction: {
            fontSize: '0.9em',
            fontWeight: '100',
            paddingLeft: '5px',
            fontFamily: 'Questrial',
            color: '#292F36',
            margin: '10px'
        },
        loadButtonContainer: {
            display: 'flex',
            width: '100%',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        loadedButton: {
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
        loadedText: {
            fontFamily: 'Questrial',
            fontSize: '0.8em',
            fontWeight: '500',
            color: '#FEFEFD',
            margin: '0px'
        },
        selectionContainer: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'flex-start'
        },
        genericSelector: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '5px',
            background: '#D7DEE2',
            padding: '4px',
            width: '100%'
        },
        rootTextContainer: {
            display: 'flex',
            width: '100%',
            margin: '2px'
        },
        textField: {
            fontSize: '0.8em',
            fontWeight: '100',
            fontFamily: 'Questrial',
            paddingTop: '5px',
            paddingBottom: '0px',
        },
        labelAddress: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '0.85em',
            color: '#FEFEFD',
            fontWeight: '100',
            fontFamily: 'Questrial',
            textAlign: 'center',
            width: '100%',
            backgroundColor: '#004666',
            padding: '2px',
            margin: '2px',
            borderRadius: '3px'
        },
        labelField: {
            fontSize: '1.1em',
            fontWeight: '100',
            fontFamily: 'Questrial',
            width: '100%',
        },
        buttonContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '1px'
        },
        setButton: {
            display: 'flex',
            flexDirection: 'column',
            background: '#006E9F',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#FEFEFD',
            padding: '3px',
            margin: '5px',
            width: '100px',
            height: '40px',
        },
        buttonText: {
            fontSize: '0.85em',
            fontWeight: '100',
            fontFamily: 'Questrial',
            margin: '0px',
        },

    }))
    const classes = useStyles()
    const [address, setAddress] = useState([])
    const [category, setCategory] = useState('Category')
    const [labels, setLabels] = useState({})
    const [formats, setFormats] = useState([])
    const [error, setError] = useState(null)
    const [errorOpen, setErrorOpen] = useState(false)

    const {outputs, stage, updateStage, selectedCells, selectedLabels, loadMode, loadLabels, loadCat} = props


    //Hooks
    useEffect(() => {

                //If there was error passed, keep the user at the label completed form to make changes
        if (errorOpen) {
            updateStage("labelComplete")
        }

        //Otherwise check if any cells have been selected
        else if (selectedCells.length >= 1) {

            let _addresses = []
            let _labels = {}
            let _formats = []

            // If in load mode, then load values from selectedCells and loadLabels
            if (loadMode) {
                selectedCells.forEach((c, idx) => {
                    _addresses.push(c.address)
                    _labels[c.address] = loadLabels[idx]
                    _formats.push(c.format)
                })

                setAddress([..._addresses])
                setLabels({..._labels})
                setFormats([..._formats])
                setCategory(loadCat)
                setErrorOpen(false)
                updateStage("labelComplete")

                //otherwise, load default values
            } else if (stage!=='labelComplete') {
                selectedCells.forEach((c, idx) => {
                        _addresses.push(c.address)
                        if (typeof (selectedLabels[idx]) === 'undefined') {
                            _labels[c.address] = " "
                        } else {
                            _labels[c.address] = selectedLabels[idx].value
                        }
                        _formats.push(c.format)
                    }
                )
                setAddress([..._addresses])
                setLabels({..._labels})
                setFormats([..._formats])
                if (category !== 'Category') {
                    setCategory(category)
                }


                // If no outputs have been set before, previous stage would be empty, otherwise previous stage would be
                // summary
                if (stage === 'empty' || stage === 'summary') {
                    updateStage("loaded")
                }
            }


        } else if (outputs.length >= 1) {
            updateStage("summary")
        } else {
            updateStage("empty")
        }

    }, [category, errorOpen, outputs, stage, updateStage, selectedCells, selectedLabels, loadMode, loadLabels, loadCat])


    //Creators
    const createIOPanel = () => {

        if (stage === 'empty') {
            return null
        } else {
            let error_msg = null
            let labelSelector = null
            const genericSelector = createCatSelector()

            if (Object.keys(labels).length <= MAXLABEL) {
                labelSelector = Object.keys(labels).map((address) => {
                    return createLabelSelector(address)
                })
            } else {
                error_msg = "Maximum of 10 labels for this output category has been reached. Only the first 10 labels" +
                    "will be considered."
                labelSelector = Object.keys(labels).splice(0, MAXLABEL - 1).map(label => {
                    return createLabelSelector(label)
                })
            }

            return (
                <div className={classes.selectionContainer} key={address}>
                    {genericSelector}
                    {labelSelector}
                    <h3 className={classes.instructions} style={{color: 'red', margin: '10px'}}>{error_msg}</h3>
                </div>
            )
        }
    }

    const createCatSelector = () => {
        if (stage === 'loaded' || stage === 'labelSelect' || stage === 'labelComplete') {

            return (
                <Paper className={classes.genericSelector}>
                    <TextField
                        required id="standard-required"
                        className={classes.rootTextContainer}
                        label="Output Category"
                        size="small"
                        InputLabelProps={{
                            className: classes.labelField
                        }}
                        InputProps={{
                            classes: {
                                input: classes.textField
                            }
                        }}
                        defaultValue={category}
                        onChange={(e) => catHandler(e)}
                    />
                </Paper>
            )
        } else {
            return null
        }
    }

    const createLabelSelector = (address) => {

        if (stage === 'loaded') {
            return (
                <div key={address} style={{display: 'flex', width: '100%'}}>
                    <h3 className={classes.labelAddress}
                        onMouseEnter={(e) => labelEnter(e, address)}
                        onMouseLeave={(e) => labelExit(e, address)}
                    >{address}</h3>
                    <IconButton onClick={() => deleteLabelHandler(address)} size="small">
                        <RemoveCircleSharpIcon style={{color: '#004666'}} size="small"/>
                    </IconButton>
                </div>
            )
        } else if (stage === 'labelSelect' || stage === 'labelComplete') {
            return (
                <div key={address} style={{display: 'flex', width: '100%'}}>
                    <TextField
                        key={address}
                        required
                        className={classes.rootTextContainer}
                        label={address}
                        size="small"
                        InputLabelProps={{
                            className: classes.labelField
                        }}
                        InputProps={{
                            classes: {
                                input: classes.textField
                            },
                        }}
                        value={labels[address]}
                        onChange={(e) => labelHandler(e, address)}
                        onMouseEnter={(e) => labelEnter(e, address)}
                        onMouseLeave={(e) => labelExit(e, address)}
                    />
                    <IconButton onClick={() => deleteLabelHandler(address)} size="small">
                        <RemoveCircleSharpIcon style={{color: '#8BBDD3'}} size="small"/>
                    </IconButton>
                </div>
            )
        } else {
            return null
        }
    }

    const createButtons = () => {

        //Activates when status is empty
        let setOutputButton
        let backButton
        let doneWithOutputs

        if (stage === 'loaded') {
            setOutputButton = (
                <Button className={classes.setButton} size="small" onClick={() => updateStage("labelSelect")}>
                    <h3 className={classes.buttonText}>SELECT LABELS</h3>
                </Button>)
        } else if (stage === 'labelSelect') {
            backButton = (
                <Button className={classes.setButton} size="small" onClick={() => updateStage("loaded")}>
                    <h3 className={classes.buttonText}>BACK TO CELL SELECTION</h3>
                </Button>)

            if (Object.values(labels).every(labelCheck)) {
                updateStage("labelComplete")
            }

        } else if (stage === 'labelComplete') {
            let setText = "OK"
            if (props.loadMode) {
                setText = "UPDATE"
            }
            setOutputButton = (
                <Button className={classes.setButton} size="small" onClick={() => setOutputHandler()}>
                    <h3 className={classes.buttonText}>{setText}</h3>
                </Button>)

        } else if (stage === 'summary') {
            doneWithOutputs = (
                <Button className={classes.setButton} size="small" onClick={() => props.updateIOState("outputs")}>
                    <h3 className={classes.buttonText}>DONE WITH ALL OUTPUTS</h3>
                </Button>)
        } else {
            setOutputButton = null
            backButton = null
            doneWithOutputs = null
        }

        return (
            <div className={classes.buttonContainer}>
                {backButton}
                {setOutputButton}
                {doneWithOutputs}
            </div>
        )
    }

    const createInstructions = () => {

        let alreadySelected = null

        if (props.outputs.length > 0) {
            alreadySelected = props.outputs.map(output => {
                return (
                    <div className={classes.loadButtonContainer} key={output.category}>
                        <Button
                            key={output.address}
                            className={classes.loadedButton}
                            onClick={(e) => loadOutputHandler(output.category)}
                        >
                            <h3 className={classes.loadedText}>{output.category}</h3>
                        </Button>
                        <IconButton onClick={() => props.deleteOutputHandler(output.category)} size="small">
                            <RemoveCircleSharpIcon style={{color: '#BD467C'}} size="small"/>
                        </IconButton>
                    </div>
                )
            })
        }

        //If no outputs have been selected yet
        if (stage === 'empty') {

            return (
                <h3 className={classes.instruction}>
                    Select an output cell or range in the spreadsheet. <br/><br/>

                    Output cells must be in the same <em>category</em> and have the same <em>units</em>. For
                    example, Revenue (in dollars) or IRRs (in %).<br/><br/>

                    Multiple cells within a category (for e.g. 2020 Profit, 2021 Profit, 2022 Profit) are
                    called <em>labels</em>.<br/><br/>

                    You can select upto 10 categories and 25 labels per category.<br/><br/>

                    Click <em>Done with Outputs</em> to start calculations.
                </h3>
            )

            //If user has selected at least one input
        } else if (stage === 'summary' && props.outputs.length < MAXCAT) {

            return (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '10px'
                }}>
                    <h3 className={classes.instruction}>
                        Please select the next output category from the spreadsheet.<br/><br/>
                        You can select up to 10 output categories with 20 cells (labels) within each category.
                    </h3>
                    <h3 className={classes.instruction} style={{
                        fontSize: '0.9em',
                        fontWeight: '800',
                        color: '#A5014B',
                        marginBottom: '1px'
                    }}>Selected Outputs</h3>
                    {alreadySelected}
                </div>

            )

            //All 5 inputs have been selected
        } else if (props.outputs.length === MAXCAT) {
            return (
                <>
                    <h3 className={classes.instruction}>
                        Maximum of 10 outputs have been defined. Click on the outputs below to go back and change
                        assumptions, or click on the to remove icon to delete this output
                        <br/>
                    </h3>
                    {alreadySelected}
                </>
            )
        } else {
            return null
        }
    }


    //Handlers

    const catHandler = (e) => {
        setCategory(e.target.value)
    }

    const labelHandler = (e, address) => {
        setLabels({
            ...labels,
            [address]: e.target.value
        })
    }

    const labelEnter = (e, address) => {
        const splits = address.split("!")
        const sheetName = splits[0]
        let raw = splits[1]
        if (props.currSheet === sheetName) {
            document.getElementById('sjs-' + raw.toString()).style.backgroundColor = "#FE9653"
            document.getElementById('sjs-' + raw.toString()).scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "center"
            })
        } else {
            props.handleSheetChange(sheetName)
        }
    }

    const labelExit = (e, address) => {
        const splits = address.split("!")
        const sheetName = splits[0]
        let raw = splits[1]
        if (props.currSheet === sheetName) {
            document.getElementById('sjs-' + raw.toString()).style.backgroundColor = "#FCCA46"
        }
        window.scrollTo({left: 0, top: 0, behavior: 'smooth'})
    }

    const handleErrorClose = () => {
        setErrorOpen(false)
    }

    const setOutputHandler = () => {

        //Validations Start
        //If category is not set
        if (category === ' ') {
            setErrorOpen(true)
            setError("Please give this ouput a category name before proceeding. A name could be descriptions of the output category, such as Net Income, or Enterprise Value, or IRR.")
        }

        //If category is a duplicate while the underlying addresses match, update the output


        //If category is a duplicate while the underlying addresses do not match, throw this error
        if (outputs.some(output => {
            let currSelectedAdds = props.selectedCells.map(label => label.address)
            return (output.category === category && !(isEqual(Object.keys(output.labels), currSelectedAdds)))
            // return (output.category === category)
        })) {
            setErrorOpen(true)
            setError("Output category has already been assigned to other cells. Please select a different name")
        }

        //Otherwise we are go for inserting into input array
        else {
            const outputPayload = {
                "category": category,
                "labels": labels,
                "format": formats
            }
            props.setOutputHandler(outputPayload)
            resetState()
        }

        updateStage("summary")
    }


    const loadOutputHandler = (category) => {
        props.loadOutputHandler(category)
    }

    const deleteLabelHandler = (address) => {
        props.deleteOutLabHandler(address)
    }

    //Utility
    const resetState = () => {
        setAddress([])
        setLabels({})
        setCategory("Category")
        setFormats([])
        setError(null)
        setErrorOpen(false)
    }

    const labelCheck = (label) => {
        return label !== ' ';
    }


    let instructions = createInstructions()
    let buttons = createButtons()
    let outputCells = createIOPanel()

    return (

        <div className={classes.root}>
            <h3 className={classes.title}>Define Model Outputs</h3>
            {instructions}
            {outputCells}
            {buttons}
            <Dialog open={errorOpen} onClose={handleErrorClose}>
                <div>
                    <h2 className={classes.instruction}>{error}</h2>
                </div>
            </Dialog>
        </div>
    )
}
