import React, {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Content from "./Content"
import Home from "./Home";
import TopBar from "./TopBar"
import Spinner from "../UtilityComponents/Spinner"
import {getSolutions, getMetaData, getFormats, loadFile} from "./api"
import {Switch, Route} from 'react-router-dom'
import {fixFormat} from "../utils/utils"
import Snackbar from '@material-ui/core/Snackbar'
import Slide from '@material-ui/core/Slide'


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
        },
        snackbar: {
            backgroundColor: '#F8FBF1',
            color:'#006E9F',
            fontSize: '0.9em',
            fontFamily: 'Questrial',
            justifyContent: 'center'
        }
    }));
    const classes = useStyles()
    const [dashid, setDashid] = useState(null)
    const [solutions, setSolutions] = useState(null)
    const [distributions, setDistributions] = useState(null)
    const [formats, setFormats] = useState('General')
    const [currInputVal, setcurrInputVal] = useState(null)
    const [inputs, setInputs] = useState([])
    const [outputs, setOutputs] = useState([])
    const [cases, setCases] = useState({})
    const [charts, setCharts] = useState(null)
    const [dashName, setDashName] = useState('')
    const [mode, setMode] = useState('')
    const [wb, setwb] = useState(null)
    const [sheets, setSheets] = useState([])
    const [worksheet, setWorksheet] = useState(null)
    const [currSheet, setCurrSheet] = useState(null)

    const [open, setOpen] = useState(false)
    const [msg, setMsg] = useState('')

    const handleClose = () => {
        setOpen(false);
        setMsg('')
    }


    //----------------Modes-------------------
    //1. New - a new dashboard is to be created. Dash id and filename have been provided
    //2. PendingIO - file has been loaded. Pending user I/O selection
    //3  Calculate - I/O selection complete. Generate calcs. When complete auto-save and set mode to Loaded
    //4  Processed - This is an existing dashboard that needs loading. Pending API call to get solutions
    //5  Loaded - All data is complete. Entire dashboard can be generated


    // At initial load, checks to see which API call to make
    useEffect(() => {
        const executeExistingAPIcalls = async (dashid) => {
            const metadata = await getMetaData(dashid)
            const _solutions = await getSolutions(dashid)
            const _formats = await getFormats(dashid)
            const wb = await loadFile()

            setwb(wb)
            setSheets(Object.keys(wb.Sheets))
            setCurrSheet(Object.keys(wb.Sheets)[0])
            setSolutions(_solutions.solutions)
            setDistributions(_solutions.distributions)

            for (const _add in _formats) {
                _formats[_add] = _formats[_add].replace(/\\/g, "")
            }

            setFormats(_formats)
            setDashName(metadata.name)
            setCases(metadata.cases)
            setInputs(metadata.inputs)
            setcurrInputVal(metadata.cases['Default'])
            setOutputs(metadata.outputs)
            setCharts(metadata.charts)
            setMode('loaded')
        }

        const executeNewAPIcalls = async () => {
            const wb = await loadFile()
            setwb(wb)
            setSheets(Object.keys(wb.Sheets))
            setCurrSheet(Object.keys(wb.Sheets)[0])
            setMode('pendingIO')
        }

        const executeCalculateAPIcalls = async () => {
            updateMode("loaded")
            console.log("Calculate to come")
        }

        if (mode === 'calculate') {
            //TODO
            executeCalculateAPIcalls()
        }

        if (mode === 'processed') {
            executeExistingAPIcalls(dashid)
        }

        if (mode === 'new') {
            setSolutions(null)
            setDistributions(null)
            setDashName('')
            setFormats(null)
            setcurrInputVal(null)
            setInputs([])
            setOutputs([])
            setCases({})
            setCharts(null)
            setwb(null)
            setSheets([])
            setWorksheet(null)
            setCurrSheet(null)
            setOpen(false)
            executeNewAPIcalls()
        }

    }, [mode, dashid])


    // if currsheet is changed, gets the new sheet info from the wb object
    useEffect(() => {
        if (wb && currSheet) {
            const currws = wb.Sheets[currSheet]
            currws["!gridlines"] = false
            setWorksheet(fixFormat(currws))
        }

    }, [wb, currSheet])


    // Defining functions
    const handleSliderChange = (event, newValue, setAddress) => {
        setcurrInputVal(prevState => ({
            ...prevState,
            [setAddress]: newValue
        }))
    }

    const handleCaseChange = event => {
        setcurrInputVal(cases[event.target.value])
    }

    const handleSheetChange = (sheet) => {
        window.scrollTo({left: 0, top: 0, behavior: 'smooth'})
        setMsg('Sheet changed to ' + sheet)
        setOpen(true)
        setCurrSheet(sheet)
    }

    const updateInputs = (inputs) => {
        setInputs([...inputs])
    }

    const updateOutputs = (newOutput) => {
        setOutputs([...newOutput])
    }

    const updateMode = (update) => {
        setMode(update)
    }

    const updateFormats = (update) => {
        setFormats(update)
    }

    const updateCases = (update) => {
        setCases(update)
    }

    const updateMsg = (update) => {
        setMsg(update)
    }

    const updateOpen = (update) => {
        setOpen(update)
    }


    const createContent = () => {
        if (mode === 'loaded') {
            return <Content
                mode={mode}
                handleSliderChange={handleSliderChange}
                handleCaseChange={handleCaseChange}
                handleSheetChange={handleSheetChange}
                sheets={sheets}
                currSheet={currSheet}
                solutions={solutions}
                currInputVal={currInputVal}
                distributions={distributions}
                formats={formats}
                inputs={inputs}
                outputs={outputs}
                charts={charts}
                cases={cases}
                worksheet={worksheet}
                updateInputs={updateInputs}
                updateOutputs={updateOutputs}
                updateMode={updateMode}
                updateFormats={updateFormats}
                updateCases={updateCases}
                updateMsg={updateMsg}
                updateOpen={updateOpen}
                wb={wb}
            />
        } else if (mode === 'pendingIO') {
            return <Content
                mode={mode}
                worksheet={worksheet}
                sheets={sheets}
                currSheet={currSheet}
                updateInputs={updateInputs}
                updateOutputs={updateOutputs}
                wb={wb}
                inputs={inputs}
                outputs={outputs}
                cases={cases}
                handleSheetChange={handleSheetChange}
                updateMode={updateMode}
                updateFormats={updateFormats}
                updateCases={updateCases}
            />

        } else {
            return <Spinner className={classes.spinner}/>
        }
    }

    const createHome = () => {
        return <Home
            updateMode={updateMode}
            setDashid={setDashid}
            setDashName={setDashName}
            updateMsg={updateMsg}
            updateOpen={updateOpen}
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
            <Snackbar
                ContentProps={{
                    classes: {
                        root: classes.snackbar
                    }
                }}
                open={open}
                onClose={handleClose}
                message={msg}
                autoHideDuration={1500}
                TransitionComponent={Slide}
            />
        </div>
    );
}