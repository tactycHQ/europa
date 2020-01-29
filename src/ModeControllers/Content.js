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
    const [enableClick, setEnableClick] = useState(true)
    const [IOState, setIOState] = useState("outputs")

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
        props.wb.Sheets[sheetName][newCell].s.fgColor = {rgb: "FDE29A"}


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

    const refreshWorksheetColor = () => {
        props.wb.Sheets[clickedCells.sheet][clickedCells.raw].s.fgColor = {rgb: clickedCells.oldColor}
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
        addAddresstoClickedCell(address)
        setEnableClick(false)
    }

    const addAddresstoClickedCell = (address) => {

        const splits = address.split("!")
        const sheetName = splits[0]
        if (sheetName !== props.currSheet) {
            props.handleSheetChange(sheetName)
        }
        const rawAdd = splits[1]
        addClickedCell(rawAdd, sheetName)
    }

    //Output Handlers
    const loadOutputHandler = (category) => {
        console.log("to come")
    }

    //Global Functions
    const updateIOState = (type) => {
        setIOState(type)
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
                    outputs={props.outputs}
                    inputs={props.inputs}
                    IOState={IOState}
                    updateIOState={updateIOState}
                    loadOutputHandler={loadOutputHandler}
                    currSheet={props.currSheet}
                    selectedCells={selectedCells}
                    handleSheetChange={props.handleSheetChange}
                    enableClick={enableClick}
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


