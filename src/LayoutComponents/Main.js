import React, {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Content from "./Content"
import Home from "./Home";
import TopBar from "./TopBar"
import Spinner from "../Other/Spinner"
import {getSolutions, getMetaData, getFormats, loadFile} from "../api/api"
import {Switch, Route} from 'react-router-dom'
import {fixFormat, myRound} from "../utils/utils";


function extractDefaults(values) {
    if (Object.keys(values)[0] === 'Default') {
        return values.Default
    }
}

export default function Main(props) {


    // Defining hooks
    const useStyles = makeStyles(theme => ({
        root: {
            display: 'flex',
            flexDirection: 'column'
        },
        top: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            position: 'fixed',
            zIndex: '2'
        },
        divider: {
            backgroundColor: '#EBECEC'
        },
        middle: {
            display: 'flex',
            marginTop: '5vh',
        },
        spinner: {
            display: 'flex'
        }
    }));
    const classes = useStyles()
    const [dashid, setDashid] = useState(null)
    const [solutions, setSolutions] = useState(null)
    const [distributions, setDistributions] = useState(null)
    const [formats, setFormats] = useState('General')
    const [currInputVal, setcurrInputVal] = useState(null)
    const [inputs, setInputs] = useState([])
    const [outputs, setOutputs] = useState(null)
    const [cases, setCases] = useState(null)
    const [charts, setCharts] = useState(null)
    const [dashName, setDashName] = useState('')
    const [mode, setMode] = useState('')
    const [wb, setwb] = useState(null)
    const [sheets, setSheets] = useState([])
    const [worksheet, setWorksheet] = useState(false)
    const [currSheet, setCurrSheet] = useState(null)
    const [clickedCells, setClickedCell] = useState({})
    const [visitMode, setVisitMode] = useState(false)


    //----------------Modes-------------------
    //1. New - a new dashboard is to be created. Dash id and filename have been provided
    //2. Ready - file has been loaded. Pending user I/O selection
    //3  Calc - I/O selection complete. Generate calcs. When complete auto-save and set mode to Loaded
    //4  Existing - This is an existing dashboard that needs loading. Pending API call to get solutions
    //5  Loaded - All data is complete. Entire dashboard can be loaded


    // console.log(mode)
    // console.log(dashid)
    // console.log(apiData)
    // console.log(dashName)


    // At initial load
    useEffect(() => {
        const executeExistingAPIcalls = async (dashid) => {
            const metadata = await getMetaData(dashid)
            const _solutions = await getSolutions(dashid)
            const _formats = await getFormats(dashid)
            // const _variance = await getVarianceAnalysis()
            setSolutions(_solutions.solutions)
            setDistributions(_solutions.distributions)

            for (const _add in _formats) {
                _formats[_add] = _formats[_add].replace(/\\/g, "")
            }

            setFormats(_formats)
            setDashName(metadata.name)
            setCases(metadata.cases)
            setInputs(metadata.inputs)

            let defaults = metadata.cases.map(i => {
                return extractDefaults(i)
            })

            setcurrInputVal(defaults[0])
            setOutputs(metadata.outputs)
            setCharts(metadata.charts)
            setMode('loaded')
        }

        const executeNewAPIcalls = async () => {
            const wb = await loadFile(setSheets)
            setwb(wb)
            setSheets(Object.keys(wb.Sheets))
            setCurrSheet(Object.keys(wb.Sheets)[0])
            setMode('ready')
        }

        if (mode === 'existing') {
            executeExistingAPIcalls(dashid)
        }

        if (mode === 'new') {
            executeNewAPIcalls()
        }

    }, [mode, dashid])
    //

    useEffect(() => {
        if (wb && currSheet) {
            const currws = wb.Sheets[currSheet]
            currws["!gridlines"] = false
            setWorksheet(fixFormat(currws))
        }

    }, [wb, currSheet])


    // useEffect(() => {
    //     sessionStorage.setItem('mode', JSON.stringify(JSON.stringify(mode)))
    //     sessionStorage.setItem('dashid', JSON.stringify(JSON.stringify(dashid)))
    //     sessionStorage.setItem('dashname', JSON.stringify(JSON.stringify(dashName)))
    //     sessionStorage.setItem('solutions', JSON.stringify(JSON.stringify(solutions)))
    //     sessionStorage.setItem('currInputVal', JSON.stringify(JSON.stringify(currInputVal)))
    //     sessionStorage.setItem('distributions', JSON.stringify(JSON.stringify(distributions)))
    //     sessionStorage.setItem('formats', JSON.stringify(JSON.stringify(formats)))
    //     sessionStorage.setItem('inputs', JSON.stringify(JSON.stringify(inputs)))
    //     sessionStorage.setItem('outputs', JSON.stringify(JSON.stringify(outputs)))
    //     sessionStorage.setItem('charts', JSON.stringify(JSON.stringify(charts)))
    //     sessionStorage.setItem('cases', JSON.stringify(JSON.stringify(cases)))
    //     console.log("Local Storage Saved")
    //     console.log(dashName)
    //     console.log(sessionStorage.getItem("dashName"))
    //     // console.log(JSON.parse(sessionStorage.getItem("dashName")) || 'nothing')
    // }, [mode, dashid, dashName, solutions, currInputVal, distributions, formats, inputs, charts, cases, outputs])


    // Defining functions
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
        wb.Sheets[sheetName][newCell].s.fgColor = {rgb: "FCCA46"}


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


    const getOldColor = (newCell, sheetName) => {
        try {
            return wb.Sheets[sheetName][newCell].s.fgColor.rgb
        } catch {
            return "FFFFFF"
        }
    }

    const getValue = (newCell, sheetName) => {
        try {
            return myRound(wb.Sheets[sheetName][newCell].v)
        } catch {
            return 0
        }
    }

    const getFormat = (newCell, sheetName) => {
        try {
            return wb.Sheets[sheetName][newCell].z
        } catch {
            return 'General'
        }
    }



    const nextInputHandler = (payload) => {

        //If clicked cell already exists in input , update the label and values
        if (inputs.some(input => input.address === payload.address)) {
            let foundIndex = inputs.findIndex(input => input.address === payload.address)
            inputs[foundIndex].label = payload.label
            inputs[foundIndex].values = payload.values

            //If there are more inputs to show, user is cycling through inputs. So populate the next input
            if (inputs.length - 1 > foundIndex) {
                const nextAddress = inputs[foundIndex + 1].address
                setVisitMode(true)
                refreshWorksheetColor()
                addAddresstoClickedCell(nextAddress)
            }

            //No more inputs to show, so default to null so we can go to loading screen
            else {
                setVisitMode(false)
                refreshWorksheetColor()
                setClickedCell({})
            }

        //New input being created
        } else {

            //Update current visit
            if (visitMode) {

            }
            //create new input
            else {
                setInputs(inputs => [...inputs, payload])
                refreshWorksheetColor()
                setClickedCell({})
            }
        }
    }

    const prevInputHandler = (address) => {

        let prevAddress

        //If clicked cell already exists in inputs, we must be cycling through inputs
        if (inputs.some(input => input.address === address)) {
            setVisitMode(true)
            const currIndex = inputs.findIndex(input => input.address === address)
            prevAddress = inputs[currIndex - 1].address

        //This means we are entering previous for the first time, so just return the last element in inputs
        } else {
            setVisitMode(true)
            prevAddress = inputs.slice(-1)[0].address
        }
        addAddresstoClickedCell(prevAddress)
    }

    const addAddresstoClickedCell = (address) => {

        const splits = address.split("!")
        const sheetName = splits[0]
        if (sheetName !== currSheet) {
            handleSheetChange(sheetName)
        }
        const rawAdd = splits[1]
        addClickedCell(rawAdd, sheetName)
    }


    const refreshWorksheetColor = () => {
        wb.Sheets[clickedCells.sheet][clickedCells.raw].s.fgColor = {rgb: clickedCells.oldColor}
    }

    const handleSliderChange = (event, newValue, setAddress) => {
        setcurrInputVal(prevState => ({
            ...prevState,
            [setAddress]: newValue
        }))
    }

    const handleCaseChange = event => {
        setcurrInputVal(cases[0][event.target.value])
    }

    const handleSheetChange = (sheet) => {
        setCurrSheet(sheet)
    }

    const createContent = () => {
        if (mode === 'loaded') {
            return <Content
                mode={mode}
                handleSliderChange={handleSliderChange}
                handleCaseChange={handleCaseChange}
                solutions={solutions}
                currInputVal={currInputVal}
                distributions={distributions}
                formats={formats}
                inputs={inputs}
                outputs={outputs}
                charts={charts}
                cases={cases}
                worksheet={worksheet}
                sheets={sheets}
            />
        } else if (mode === 'ready') {
            return <Content
                mode={mode}
                worksheet={worksheet}
                sheets={sheets}
                currSheet={currSheet}
                handleSheetChange={handleSheetChange}
                clickedCells={clickedCells}
                addClickedCell={addClickedCell}
                prevInputHandler={prevInputHandler}
                nextInputHandler={nextInputHandler}
                inputs={inputs}
            />

        } else {
            return <Spinner className={classes.spinner}/>
        }

    }

    const createHome = () => {
        return <Home
            setMode={setMode}
            setDashid={setDashid}
            setDashName={setDashName}
        />
    }


    // Executing functions
    const content = createContent()
    const home = createHome()


    return (
        <div className={classes.root}>
            <div className={classes.top}>
                <TopBar dashName={dashName}/>
            </div>
            <Switch>
                <Route exact path={["/", "/home"]}>
                    <div className={classes.middle}>
                        {home}
                    </div>
                </Route>
                <Route exact
                       path="/(dashboard|distributions|inputimportance|sensitivity|scenario|dependency|spreadsheet)">
                    <div className={classes.middle}>
                        {content}
                    </div>
                </Route>
            </Switch>
        </div>
    );
}