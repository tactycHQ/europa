import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {myRound} from "../utils/utils";
import Spreadsheet from "../Features/Spreadsheet";
import InputSelector from "./InputSelector";
import OutputSelector from "./OutputSelector";
import Dialog from "@material-ui/core/Dialog";

export default function IOSelector(props) {

    const useStyles = makeStyles(theme => ({
        root: {
            display: 'flex',
            width: '100%'
        },
    }))
    const classes = useStyles()


    const [IOState, setIOState] = useState("outputs")
    const [selectedCells, setSelectedCells] = useState([])
    const [selectedLabels, setSelectedLabels] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('Category')
    const [enableClick, setEnableClick] = useState(true)
    const [loadMode, setLoadMode] = useState(false)
    const [stage, setStage] = useState("empty")
    const [errorOpen, setErrorOpen] = useState(false)
    const [error, setError] = useState('')


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
        updateStage("labelSelect")
    }


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

        setSelectedCells([])
        setSelectedLabels([])
        setEnableClick(true)
        updateStage("summary")
    }

    const deleteOutputHandler = (category) => {
        const newOutputs = props.outputs.filter(output => output.category !== category)
        props.updateOutputs([...newOutputs])
    }

    const deleteOutLabHandler = (address) => {
        const indexToRemove = selectedCells.findIndex(output => output.address === address)

        const cellToRemove = selectedCells[indexToRemove]
        props.wb.Sheets[cellToRemove.sheet][cellToRemove.raw].s.fgColor = {rgb: cellToRemove.oldColor}
        const newCells = selectedCells.filter(output => output.address !== address)
        setSelectedCells([...newCells])


        if ((stage === 'labelSelect' || stage === 'labelComplete') && typeof (selectedLabels[indexToRemove]) !== 'undefined') {
            const labelToRemove = selectedLabels[indexToRemove]
            console.log(labelToRemove)
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

    const updateStage = (update) => {
        setStage(update)
    }

    const updateIOState = (type) => {
        setIOState(type)
    }

    const updateEnableClick = (update) => {
        setEnableClick(update)
    }

    const updateErrorOpen = (update) => setErrorOpen(update)

    const updateError = (update) => setError(update)

    const updateCategory = (update) => setSelectedCategory(update)

    const updateLabels = (address, newLabel) => {
        console.log("to come")
    }

    const handleErrorClose = () => {
        setErrorOpen(false)
    }


    return (
        <div className={classes.root}>
            <OutputSelector
                stage={stage}
                updateStage={updateStage}
                outputs={props.outputs}
                selectedCells={selectedCells}
                selectedLabels={selectedLabels}
                selectedCategory={selectedCategory}
                updateCategory={updateCategory}
                updateLabels={updateLabels}
                updateErrorOpen={updateErrorOpen}
                updateError={updateError}
            />
            <Spreadsheet
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
