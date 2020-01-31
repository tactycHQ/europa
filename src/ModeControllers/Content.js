import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Output from "../Content/Dashboard"
import Input from "../Content/InputsController";
import {Switch, Route} from 'react-router-dom'
import SideBar from "../Content/SideBar";
import InputSelector from "../IOSelections/InputSelector"
import OutputSelector from "../IOSelections/OutputSelector";
import Spreadsheet from "../Features/Spreadsheet";
import {myRound} from "../utils/utils";


export default function Content(props) {


    // Defining Hooks
    const useStyles = makeStyles(theme => ({
        root: {
            display: 'flex',
            width: '100%',
            background: '#FEFEFD'
        },
        content: {
            display: 'flex',
            width: '100%'
        },
        menuBar: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '6px',
        },
    }))
    const classes = useStyles()
    const [clickedCells, setClickedCell] = useState({})
    const [selectedCells, setSelectedCells] = useState([])
    const [selectedLabels, setSelectedLabels] = useState([])
    const [enableClick, setEnableClick] = useState(true)
    const [labelSelectMode, setLabelSelectMode] = useState(false)
    const [IOState, setIOState] = useState("outputs")
    const [loadCat, setLoadCat] = useState('')
    const [loadLabels, setLoadLabels] = useState([])
    const [loadMode, setLoadMode] = useState(false)

    //Input Selection Functions
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

    const addClickedCell = (newCell, sheetName) => {

        let oldColor
        let v
        let format

        //if clicked a different cell, then reset color of unclicked cell
        if (clickedCells.raw && clickedCells.raw !== newCell) {
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
    }

    const loadInput2ClickedCell = (address) => {
        const splits = address.split("!")
        const sheetName = splits[0]
        if (sheetName !== props.currSheet) {
            props.handleSheetChange(sheetName)
        }
        const rawAdd = splits[1]
        addClickedCell(rawAdd, sheetName)
    }

    const refreshWorksheetColor = () => {
        if (IOState === 'inputs') {
            props.wb.Sheets[clickedCells.sheet][clickedCells.raw].s.fgColor = {rgb: clickedCells.oldColor}
        } else {
            selectedCells.forEach(c => {
                props.wb.Sheets[c.sheet][c.raw].s.fgColor = {rgb: c.oldColor}
            })

            selectedLabels.forEach(c => {
                props.wb.Sheets[c.sheet][c.raw].s.fgColor = {rgb: c.oldColor}
            })
        }
    }

    //Input Handlers
    const setInputHandler = (payload) => {
        let foundIndex = props.inputs.findIndex(input => input.address === payload.address)
        if (foundIndex === -1) {
            props.updateInputs([...props.inputs, payload])
        } else {
            let newInputs = [...props.inputs]
            newInputs[foundIndex] = payload
            props.updateInputs([...newInputs])
        }
        refreshWorksheetColor()
        setClickedCell({})
        setEnableClick(true)
    }

    const deleteInputHandler = (address) => {
        const newInputs = props.inputs.filter(input => input.address !== address)
        props.updateInputs([...newInputs])
        setClickedCell({})
    }

    const loadInputHandler = (address) => {
        loadInput2ClickedCell(address)
        setEnableClick(false)
    }


    //Output Selection Functions
    const addSelectedCells = (newCell, sheetName) => {

        let oldColor
        let v
        let format

        //if clicked a cell that already exists then reset color of that cell

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


            //Set new clicked cell
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

        Object.entries(foundOutput.labels).forEach(entry => {
            const splits = entry[0].split("!")
            const sheetName = splits[0]
            if (sheetName !== props.currSheet) {
                props.handleSheetChange(sheetName)
            }
            const rawAdd = splits[1]
            addSelectedCells(rawAdd, sheetName)
            setLoadLabels([...loadLabels,entry[1]])
        })

        setLoadCat(category)
        setEnableClick(false)
        setLoadMode(true)
    }

    // }
    // })
    // }


    //Output Handlers
    const setOutputHandler = (payload) => {
        let foundIndex = props.outputs.findIndex(output => output.category === payload.category)

        //if caategory already exists, update ot
        if (foundIndex === -1) {
            props.updateOutputs([...props.outputs, payload])

            //else add new
        } else {
            let newOutputs = [...props.outputs]
            newOutputs[foundIndex] = payload
            props.updateOutputs([...newOutputs])
        }
        refreshWorksheetColor()
        setSelectedCells([])
        setSelectedLabels([])
        setLabelSelectMode(false)
        setEnableClick(true)
        setLoadCat('')
    }

    const loadOutputHandler = (category) => {
        loadOutput2SelectedCells(category)
    }


    //Global Functions
    const updateLabelSelectMode = (update) => {
        setLabelSelectMode(update)
    }

    const updateIOState = (type) => {
        setIOState(type)
    }

    const updateEnableClick = (update) => {
        setEnableClick(update)
    }

    const generateIOSelector = () => {
        if (IOState === "inputs") {
            return (
                <InputSelector
                    outputs={props.outputs}
                    inputs={props.inputs}
                    IOState={IOState}
                    updateIOState={updateIOState}
                    currSheet={props.currSheet}
                    clickedCells={clickedCells}
                    setInputHandler={setInputHandler}
                    loadInputHandler={loadInputHandler}
                    deleteInputHandler={deleteInputHandler}
                    handleSheetChange={props.handleSheetChange}
                    addClickedCell={addClickedCell}
                    enableClick={enableClick}
                />
            )
        } else {
            return (
                <OutputSelector
                    loadMode={loadMode}
                    loadCat={loadCat}
                    loadLabels={loadLabels}
                    outputs={props.outputs}
                    IOState={IOState}
                    currSheet={props.currSheet}
                    selectedCells={selectedCells}
                    handleSheetChange={props.handleSheetChange}
                    labelSelectMode={labelSelectMode}
                    selectedLabels={selectedLabels}
                    updateEnableClick={updateEnableClick}
                    updateIOState={updateIOState}
                    loadOutputHandler={loadOutputHandler}
                    updateLabelSelectMode={updateLabelSelectMode}
                    setOutputHandler={setOutputHandler}
                />
            )
        }
    }

    const generateContent = () => {

        if (props.mode === 'loaded') {
            return (
                <div className={classes.content}>
                    <SideBar className={classes.sidebar} outputs={props.outputs}/>
                    <Switch>
                        <Route exact path={"/dashboard"}>
                            <Output
                                type="summary"
                                {...props}
                            />
                            <Input
                                {...props}
                            />
                        </Route>
                        <Route exact path="/distributions">
                            <Output
                                type="distributions"
                                {...props}
                            />
                            <Input
                                {...props}
                            />
                        </Route>
                        <Route exact path="/inputimportance">
                            <Output
                                type="inputimportance"
                                {...props}
                            />
                        </Route>
                        <Route exact path="/sensitivity">
                            <Output
                                type="sensitivity"
                                {...props}
                            />
                            <Input
                                {...props}
                            />
                        </Route>
                        <Route exact path="/scenario">
                            <Output
                                type="scenarioanalysis"
                                {...props}
                            />
                        </Route>
                        <Route exact path="/spreadsheet">
                            <Spreadsheet
                                type="spreadsheet"
                                mode={props.mode}
                                worksheet={props.worksheet}
                            />
                        </Route>
                    </Switch>
                </div>
            )
        } else {
            const ioEl = generateIOSelector()
            return (
                <div className={classes.content}>
                    {ioEl}
                    <Switch>
                        <Route exact path="/spreadsheet">
                            <Spreadsheet
                                type="spreadsheet"
                                mode={props.mode}
                                worksheet={props.worksheet}
                                currSheet={props.currSheet}
                                clickedCells={clickedCells}
                                selectedCells={selectedCells}
                                addClickedCell={addClickedCell}
                                addSelectedCells={addSelectedCells}
                                sheets={props.sheets}
                                handleSheetChange={props.handleSheetChange}
                                IOState={IOState}
                                enableClick={enableClick}
                                labelSelectMode={labelSelectMode}
                                selectedLabels={selectedLabels}
                                addSelectedLabels={addSelectedLabels}
                            />
                        </Route>
                    </Switch>
                </div>
            )
        }
    }

    const contentEl = generateContent()

    return (
        <div className={classes.root}>
            {contentEl}
        </div>
    )
}


