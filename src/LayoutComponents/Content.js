import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Output from "../Content/Outputs"
import Input from "../Content/Inputs";
import {Switch, Route} from 'react-router-dom'
import SideBar from "../Content/SideBar";
import IOSelection from "../Content/IOSelection";
import Spreadsheet from "../Outputs/Spreadsheet";
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
    const [enableClick, setEnableClick] = useState(true)
    const [IOState, setIOState] = useState("outputs")

    //INPUT SELECTIONS
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

    const refreshWorksheetColor = () => {
        props.wb.Sheets[clickedCells.sheet][clickedCells.raw].s.fgColor = {rgb: clickedCells.oldColor}
    }

    const updateIOState = (type) =>{
        setIOState(type)
    }


    let contentEl

    if (props.mode === 'loaded') {
        contentEl = (
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
        contentEl = (
            <div className={classes.content}>
                <IOSelection
                    outputs={props.outputs}
                    currSheet={props.currSheet}
                    clickedCells={clickedCells}
                    setInputHandler={setInputHandler}
                    loadInputHandler={loadInputHandler}
                    deleteInputHandler={deleteInputHandler}
                    handleSheetChange={props.handleSheetChange}
                    addClickedCell={addClickedCell}
                    enableClick={enableClick}
                    inputs={props.inputs}
                    IOState={IOState}
                    updateIOState={updateIOState}
                />
                <Switch>
                    <Route exact path="/spreadsheet">
                        <Spreadsheet
                            type="spreadsheet"
                            mode={props.mode}
                            worksheet={props.worksheet}
                            currSheet={props.currSheet}
                            clickedCells={clickedCells}
                            addClickedCell={addClickedCell}
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


    return (
        <div className={classes.root}>
            {contentEl}
        </div>
    )
}


