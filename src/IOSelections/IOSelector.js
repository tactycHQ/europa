import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {myRound} from "../utils/utils";
import Spreadsheet from "../Features/Spreadsheet";
import Dialog from "@material-ui/core/Dialog";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import RemoveCircleSharpIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Button from "@material-ui/core/Button";
import isEqual from "lodash.isequal";

export default function IOSelector(props) {


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
            margin: '2px',
            fontWeight: '100',
            fontFamily: 'Questrial',
            fontSize: '0.85em'
        },
        textField: {
            fontSize: '0.85em',
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
        }
    }))
    const classes = useStyles()

    const MAXCAT = 10
    const MAXLABEL = 10


    const [selectedCells, setSelectedCells] = useState([])
    const [selectedLabels, setSelectedLabels] = useState([])
    const [category, setCategory] = useState('Category')
    const [labels, setLabels] = useState({})
    const [enableClick, setEnableClick] = useState(true)
    const [loadMode, setLoadMode] = useState(false)
    const [stage, setStage] = useState("empty")
    const [errorOpen, setErrorOpen] = useState(false)
    const [error, setError] = useState('')

    console.log(labels)


    //Creators
    const createIOPanel = () => {

        if (stage === 'empty') {
            return null
        } else {
            let error_msg = null

            const genericSelector = createCatSelector()
            const labelSelector = createLabelSelector()

            return (
                <div className={classes.selectionContainer}>
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
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </Paper>
            )
        } else {
            return null
        }
    }

    const createLabelSelector = () => {

        if (stage === 'loaded') {
            return selectedCells.map(c => {
                return (
                    <div key={c.address} style={{display: 'flex', width: '100%'}}>
                        <h3 className={classes.labelAddress}
                            onMouseEnter={(e) => labelEnter(e, c.address)}
                            onMouseLeave={(e) => labelExit(e, c.address)}
                        >{c.address}</h3>
                        <IconButton onClick={() => deleteLabelHandler(c.address)} size="small">
                            <RemoveCircleSharpIcon style={{color: '#004666'}} size="small"/>
                        </IconButton>
                    </div>
                )
            })
        } else if (stage === 'labelSelect' || stage === 'labelComplete') {

            return selectedCells.map((c, idx) => {
                return (
                    <div key={c.address} style={{display: 'flex', width: '100%'}}>
                        <TextField
                            required
                            className={classes.rootTextContainer}
                            label={c.address}
                            size="small"
                            InputLabelProps={{
                                className: classes.labelField
                            }}
                            InputProps={{
                                classes: {
                                    input: classes.textField,
                                }
                            }}
                            value={labels[c.address]}
                            onChange={(e) => labelChange(e, c.address)}
                            onMouseEnter={(e) => labelEnter(e, c.address)}
                            onMouseLeave={(e) => labelExit(e, c.address)}
                        />
                        <IconButton onClick={() => deleteLabelHandler(c.address)} size="small">
                            <RemoveCircleSharpIcon style={{color: '#8BBDD3'}} size="small"/>
                        </IconButton>
                    </div>
                )
            })
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
                <Button className={classes.setButton} size="small" onClick={() => setStage("labelSelect")}>
                    <h3 className={classes.buttonText}>SELECT LABELS</h3>
                </Button>)
        } else if (stage === 'labelSelect') {
            backButton = (
                <Button className={classes.setButton} size="small" onClick={() => setStage("loaded")}>
                    <h3 className={classes.buttonText}>BACK TO CELL SELECTION</h3>
                </Button>)

            if (labelCheck() === 'true') {
                setStage("labelComplete")
            }

        } else if (stage === 'labelComplete') {
            let setText = "OK"
            if (loadMode) {
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
                            onClick={() => loadOutputHandler(output.category)}
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


    //Output Selection Functions
    const addSelectedCells = (newCell, sheetName) => {

        let oldColor
        let v
        let format

        //if clicked a cell that already exists then reset color of that cell and remove that cell from state
        let foundIndex = selectedCells.findIndex(cell => (cell.raw === newCell && sheetName === cell.sheet))

        if (foundIndex !== -1) {
            props.wb.Sheets[sheetName][newCell].s.fgColor = {rgb: selectedCells[foundIndex].oldColor}
            const newSelection = selectedCells.filter((cell, idx) => idx !== foundIndex)
            setSelectedCells([...newSelection])

        } else {

            // Get cell metadata on old color, value and format for ne cell
            oldColor = getOldColor(newCell, sheetName)
            v = getValue(newCell, sheetName)
            format = getFormat(newCell, sheetName)
            props.wb.Sheets[sheetName][newCell].s.fgColor = {rgb: "FCCA46"}

            // document.getElementById('sjs-D15').style.backgroundColor = "yellow"
            // highlight.scrollIntoView()

            //Set new clicked cell
            setSelectedCells([...selectedCells,
                {
                    address: sheetName + '!' + newCell,
                    sheet: sheetName,
                    raw: newCell,
                    oldColor: oldColor,
                    value: v,
                    format: format
                }])

            setLabels({
                ...labels,
                [sheetName + '!' + newCell]: ''
            })


        }

        if (stage === 'empty') {
            setStage('loaded')
        }
    }

    const addSelectedLabels = (labelCell, labelValue, sheetName) => {

        let oldColor

        let foundIndex = selectedLabels.findIndex(cell => (cell.raw === labelCell && sheetName === cell.sheet))

        if (foundIndex !== -1) {
            props.wb.Sheets[sheetName][labelCell].s.fgColor = {rgb: selectedLabels[foundIndex].oldColor}
            const newSelection = selectedLabels.filter((cell, idx) => idx !== foundIndex)
            setSelectedLabels([...newSelection])

        } else {

            // Get cell metadata on old color, value and format for ne cell
            oldColor = getOldColor(labelCell, sheetName)
            props.wb.Sheets[sheetName][labelCell].s.fgColor = {rgb: "FCCA46"}

            //Update label data
            setLabels({
                ...labels,
                [selectedCells[selectedLabels.length].address]: labelValue
            })


            //Save metadat on label cell in case we need to unhighlight
            setSelectedLabels([...selectedLabels,
                {
                    address: sheetName + '!' + labelCell,
                    sheet: sheetName,
                    raw: labelCell,
                    oldColor: oldColor,
                    value: labelValue,
                }])
        }
    }

    const loadOutput2SelectedCells = (category) => {
        let foundOutput = props.outputs.find(output => output.category === category)

        let newSelectedCells = []
        let newLabels = []

        //Have to do this to avoid setting state within loop. Ugh
        Object.entries(foundOutput.labels).forEach(entry => {
            const splits = entry[0].split("!")
            const sheetName = splits[0]
            if (sheetName !== props.currSheet) {
                props.handleSheetChange(sheetName)
            }
            const rawAdd = splits[1]

            const oldColor = getOldColor(rawAdd, sheetName)
            const v = getValue(rawAdd, sheetName)
            const format = getFormat(rawAdd, sheetName)
            props.wb.Sheets[sheetName][rawAdd].s.fgColor = {rgb: "FCCA46"}

            newSelectedCells.push({
                address: sheetName + '!' + rawAdd,
                sheet: sheetName,
                raw: rawAdd,
                oldColor: oldColor,
                value: v,
                format: format
            })
            newLabels.push(entry[1])
        })

        setSelectedCells([...newSelectedCells])
        setEnableClick(false)
        setLoadMode(true)
        setStage("labelSelect")
    }


    //Output Handlers

    const labelChange = (e, address) => {
        setLabels({...labels,
        [address]:e.target.value
        })
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
        if (props.outputs.some(output => {
            let currSelectedAdds = props.selectedCells.map(label => label.address)
            return (output.category === category && !(isEqual(Object.keys(output.labels), currSelectedAdds)))
            // return (output.category === category)
        })) {
            setErrorOpen(true)
            setError("Output category has already been assigned to other cells. Please select a different name")
        }

        //Otherwise we are go for inserting into output array
        else {
            const outputPayload = {
                "category": category,
                "labels": labels,
                "format": 'General'
            }
            addtoOutput(outputPayload)
        }

    }

    const addtoOutput = (payload) => {
        let foundIndex = props.outputs.findIndex(output => output.category === payload.category)

        //if category already exists, update it
        if (foundIndex === -1) {
            props.updateOutputs([...props.outputs, payload])

            //else add new
        } else {
            let newOutputs = [...props.outputs]
            newOutputs[foundIndex] = payload
            props.updateOutputs([...newOutputs])
        }

        setSelectedCells([])
        setSelectedLabels([])
        setEnableClick(true)
        setStage("summary")
    }

    const deleteOutputHandler = (category) => {
        const newOutputs = props.outputs.filter(output => output.category !== category)
        props.updateOutputs([...newOutputs])
    }

    const deleteLabelHandler = (address) => {
        const indexToRemove = selectedCells.findIndex(output => output.address === address)

        const cellToRemove = selectedCells[indexToRemove]
        props.wb.Sheets[cellToRemove.sheet][cellToRemove.raw].s.fgColor = {rgb: cellToRemove.oldColor}
        const newCells = selectedCells.filter(output => output.address !== address)
        setSelectedCells([...newCells])


        if ((stage === 'labelSelect' || stage === 'labelComplete') && typeof (selectedLabels[indexToRemove]) !== 'undefined') {
            const labelToRemove = selectedLabels[indexToRemove]
            props.wb.Sheets[labelToRemove.sheet][labelToRemove.raw].s.fgColor = {rgb: labelToRemove.oldColor}
            const newLabels = selectedLabels.filter(label => selectedLabels.indexOf(label) !== indexToRemove)
            setSelectedLabels([...newLabels])
        }

    }

    const loadOutputHandler = (category) => {
        loadOutput2SelectedCells(category)
    }


    //Global Functions
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

    const labelCheck = () => {
        return true;
    }

    const updateIOState = (type) => {
        console.log("to come")
    }

    const handleErrorClose = () => {
        setErrorOpen(false)
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

    //Executions
    let instructions = createInstructions()
    let buttons = createButtons()
    let outputCells = createIOPanel()


    return (
        <div style={{display: 'flex', width: '100%'}}>
            <div className={classes.root}>
                <h3 className={classes.title}>Define Model Outputs</h3>
                {instructions}
                {outputCells}
                {buttons}
            </div>
            <Spreadsheet
                stage={stage}
                worksheet={props.worksheet}
                currSheet={props.currSheet}
                sheets={props.sheets}
                enableClick={enableClick}
                handleSheetChange={props.handleSheetChange}
                selectedCells={selectedCells}
                addSelectedCells={addSelectedCells}
                selectedLabels={selectedLabels}
                addSelectedLabels={addSelectedLabels}
            />
            <Dialog open={errorOpen} onClose={handleErrorClose}>
                <div>
                    <h2 className={classes.instruction}>{error}</h2>
                </div>
            </Dialog>
        </div>
    )
}
