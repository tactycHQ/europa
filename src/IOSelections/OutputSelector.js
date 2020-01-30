import React, {useState, useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Paper from "@material-ui/core/Paper"
import Dialog from "@material-ui/core/Dialog";
import RemoveCircleSharpIcon from '@material-ui/icons/RemoveCircleSharp'
import IconButton from "@material-ui/core/IconButton";


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
            justifyContent: 'center',
            alignItems: 'center'
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
            margin: '0px'
        }
    }))
    const classes = useStyles()
    const [address, setAddress] = useState([])
    const [category, setCategory] = useState('')
    const [labels, setLabels] = useState({})
    const [formats, setFormats] = useState([])
    const [error, setError] = useState(null)
    const [errorOpen, setErrorOpen] = useState(false)
    const [loaded, setLoaded] = useState(false)


    //Hooks
    useEffect(() => {

        if (props.selectedCells.length >= 1) {

            let _addresses = []
            let _labels = {}
            let _formats = []

            props.selectedCells.forEach((c, idx) => {
                _addresses.push(c.address)

                if (typeof (props.selectedLabels[idx]) === 'undefined') {
                    _labels[c.address] = " "
                } else {
                    _labels[c.address] = props.selectedLabels[idx].value
                }
                _formats.push(c.format)
            })
            setAddress(_addresses)
            setLabels(_labels)
            setFormats(_formats)
            setCategory("Category")
            setErrorOpen(false)
            setLoaded(true)
        }

    }, [props.selectedCells, props.selectedLabels])


    const createIOPanel = () => {

        let error_msg = null
        let labelSelector = null
        const catSelector = createCatSelector()

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
                {catSelector}
                <Paper className={classes.categoryContainer}>
                    {labelSelector}
                </Paper>
                <h3 className={classes.selectNote} style={{color: 'red', margin: '10px'}}>{error_msg}</h3>
            </div>
        )
    }

    const createCatSelector = () => {
        return (
            <Paper className={classes.categoryContainer}>
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
                    onBlur={(e) => catHandler(e)}
                />
            </Paper>
        )
    }

    const createLabelSelector = (address) => {

        if (!props.labelSelectMode) {
            return (
                <div key={address}>{address}</div>
            )
        } else {
            return (
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
            )
        }
    }


    //Handles text input into label field

    const updateLabelMode = () => {
        props.updateLabelSelectMode(true)
    }

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
        if (category === 'Category') {
            setErrorOpen(true)
            setError("Please give this ouput a category name before proceeding. A name could be descriptions of the output category, such as Net Income, or Enterprise Value, or IRR.")
        }

        //If category is a duplicate
        else if (props.outputs.some(output => {
            return (output.category === category)
        })) {
            setErrorOpen(true)
            setError("Output category has already been assigned to other cells. Please select a different name")
        }

        //Otherwise we are go for inserting into input array
        else {
            const outputPayload = {
                "category": category,
                "labels": labels,
                "format": formats,
            }
            props.setOutputHandler(outputPayload)
            resetState()
        }
    }

    const resetState = () => {
        setAddress([])
        setLabels({})
        setCategory("Caetgory")
        setFormats([])
        setError(null)
        setErrorOpen(false)
        setLoaded(false)
    }

    const loadOutputHandler = (category) => {
        props.loadOutputHandler(category)
    }

    const labelCheck = (label) => {
        return label !== ' ';
    }

    const createButtons = () => {
        let setOutputButton = null
        let doneWithOutputs = null


        //Sidebar is populated with input data
        // if (loaded) {
        //     setOutputButton = (
        //         <Button className={classes.selectButton} size="small" onClick={() => setOutputHandler()}>
        //             <h3 className={classes.buttonText}>OK</h3>
        //         </Button>)
        // }

        if (props.labelSelectMode && Object.values(labels).every(labelCheck)) {
            setOutputButton = (
                <Button className={classes.selectButton} size="small" onClick={() => setOutputHandler()}>
                    <h3 className={classes.buttonText}>OK</h3>
                </Button>)
        }

        if (!props.labelSelectMode && Object.keys(labels).length >= 1) {
            setOutputButton = (
                <Button className={classes.selectButton} size="small" onClick={() => updateLabelMode()}>
                    <h3 className={classes.buttonText}>OK</h3>
                </Button>)
        }


        if (props.outputs.length >= 1 && !loaded) {
            doneWithOutputs = (
                <Button className={classes.selectButton} size="small" onClick={() => props.updateIOState("outputs")}>
                    <h3 className={classes.buttonText}>DONE WITH ALL OUTPUTS</h3>
                </Button>)
        }

        return (
            <div className={classes.buttonContainer}>
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
                    <div className={classes.singleButtonContainer} key={output.category}>
                        <Button
                            key={output.address}
                            className={classes.selectedInputs}
                            onClick={(e) => loadOutputHandler(output.category)}
                        >
                            <h3 className={classes.selectedInputsText}>{output.category}</h3>
                        </Button>
                        <IconButton onClick={() => props.deleteOutputHandler(output.category)} size="small">
                            <RemoveCircleSharpIcon style={{color: '#BD467C'}} size="small"/>
                        </IconButton>
                    </div>
                )
            })
        }

        //If no outputs have been selected yet
        if (props.outputs.length === 0) {

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

            //If user has selected at least one input
        } else if (props.outputs.length > 0 && props.outputs.length < MAXCAT) {

            return (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '10px'
                }}>
                    <h3 className={classes.selectNote}>
                        Please select the next output category from the spreadsheet.<br/><br/>
                        You can select up to 10 output categories with 20 cells (labels) within each category.
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

            //All 5 inputs have been selected
        } else if (props.outputs.length === MAXCAT) {
            return (
                <>
                    <h3 className={classes.selectNote}>
                        Maximum of 10 outputs have been defined. Click on the outputs below to go back and change
                        assumptions, or click on the to remove icon to delete this output
                        <br/>
                    </h3>
                    {alreadySelected}
                </>
            )
        }
    }


    let outputCells = null
    let instructions = createInstructions()

    let buttons = createButtons()

    if (loaded) {
        instructions = null
        outputCells = createIOPanel()

    }

    return (

        <div className={classes.root}>
            <div className={classes.selectHeader}>
                <h3 className={classes.selectText}>Define Model Outputs</h3>
                {instructions}
            </div>
            {outputCells}
            {buttons}
            <Dialog open={errorOpen} onClose={handleErrorClose}>
                <div>
                    <h2 className={classes.selectNote}>{error}</h2>
                </div>
            </Dialog>
        </div>
    )
}
