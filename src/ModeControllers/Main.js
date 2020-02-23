import React, {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Content from "./Content"
import Home from "./Home";
import TopBar from "./TopBar"
import Spinner from "../UtilityComponents/Spinner"
import {getSolutions, getMetaData, calculateSolutions, loadFile, saveDashboard, downloadFile} from "./api"
import {Switch, Route, Redirect} from 'react-router-dom'
import {fixFormat} from "../utils/utils"
import Snackbar from '@material-ui/core/Snackbar'
import Slide from '@material-ui/core/Slide'
import {useAuth0} from "../react-auth0-spa";


export default function Main(props) {


    // Defining hooks
    const useStyles = makeStyles(theme => ({
        root: {
            display: 'flex',
            flexDirection: 'column',
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
            marginTop: '5vh'
        },
        spinner: {
            display: 'flex'
        },
        snackbar: {
            backgroundColor: '#A5014B',
            color: '#FEFEFD',
            fontSize: '1.1em',
            fontFamily: 'Questrial',
            justifyContent: 'center'
        }
    }));
    const classes = useStyles()

    const [mode, setMode] = useState('home')
    const [dashid, setDashid] = useState(null)
    const [origFilename, setOrigFilename] = useState('')
    const [solutions, setSolutions] = useState(null)
    const [distributions, setDistributions] = useState(null)
    const [formats, setFormats] = useState('General')
    const [currInputVal, setcurrInputVal] = useState(null)
    const [inputs, setInputs] = useState([])
    const [outputs, setOutputs] = useState([])
    const [cases, setCases] = useState({})
    const [charts, setCharts] = useState(null)
    const [dashName, setDashName] = useState('')
    const [wb, setwb] = useState(null)
    const [sheets, setSheets] = useState([])
    const [worksheet, setWorksheet] = useState(null)
    const [currSheet, setCurrSheet] = useState(null)
    const [open, setOpen] = useState(false)
    const [msg, setMsg] = useState('')
    const {getTokenSilently} = useAuth0()

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

        const executeExistingAPIcalls = async () => {
            let token = await getTokenSilently()
            const metadata = await getMetaData(dashid)
            const _solutions = await getSolutions(dashid)
            const _wb = await loadFile(dashid, token)

            setwb(_wb)
            setSheets(Object.keys(_wb.Sheets))
            setCurrSheet(Object.keys(_wb.Sheets)[0])
            setSolutions(_solutions.solutions)
            setDistributions(_solutions.distributions)
            setOrigFilename(metadata.filename)
            setFormats(metadata.formats)
            setDashName(metadata.name)
            setCases(metadata.cases)
            setInputs(metadata.inputs)
            setcurrInputVal(metadata.cases['Default'])
            setOutputs(metadata.outputs)
            setCharts(metadata.charts)
            setMode('loaded')
        }

        const executeNewAPIcalls = async () => {
            let token = await getTokenSilently()
            const _wb = await loadFile(dashid, token)
            setwb(_wb)
            setSheets(Object.keys(_wb.Sheets))
            setCurrSheet(Object.keys(_wb.Sheets)[0])
            setMode('pendingIO')
        }

        if (mode === 'processed') {
            executeExistingAPIcalls()
        }

        if (mode === 'new') {
            executeNewAPIcalls()
        }
        // eslint-disable-next-line
    }, [mode, dashid])

    useEffect(() => {
        const executeCalculateAPIcalls = async () => {
            const outputAdds = outputs.reduce((acc, output) => {
                acc.push(...Object.keys(output.labels))
                return acc
            }, [])

            const _solutions = await calculateSolutions(dashid, inputs, outputAdds)
            setSolutions(_solutions.solutions)
            setDistributions(_solutions.distributions)
            setcurrInputVal(cases['Default'])
            setMode("loaded")
            saveDashboard(dashid, dashName, inputs, outputs, cases, formats)
            setMsg("Dashboard saved")
            setOpen(true)
        }

        if (mode === 'calculate') {
            executeCalculateAPIcalls()
        }

    }, [mode, dashid, inputs, outputs, cases, formats, dashName])




    // if currsheet is changed, gets the new sheet info from the wb object
    useEffect(() => {
        if (wb && currSheet) {
            const currws = wb.Sheets[currSheet]
            currws["!gridlines"] = false
            setWorksheet(fixFormat(currws))
        }

    }, [wb, currSheet])

    const clearState = () => {
        setMode('home')
        setDashid(null)
        setOrigFilename('')
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
        setMsg('')
    }

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

    const saveDash = () => {
        saveDashboard(dashid, dashName, inputs, outputs, cases, formats)
        setMsg("Flexboard saved")
        setOpen(true)
    }

    const downloadModel = async () => {
        let token = await getTokenSilently()
        await downloadFile(dashid, origFilename, token)
    }

    const createContent = () => {

        if (mode === 'loaded') {
            return <Content
                mode={mode}
                saveDash={saveDash}
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
                updateInputs={setInputs}
                updateOutputs={setOutputs}
                updateMode={setMode}
                updateFormats={setFormats}
                updateCases={setCases}
                downloadModel={downloadModel}
                updateMsg={setMsg}
                updateOpen={setOpen}
                wb={wb}
            />
        } else if (mode === 'pendingIO') {
            return <Content
                mode={mode}
                worksheet={worksheet}
                sheets={sheets}
                currSheet={currSheet}
                formats={formats}
                updateInputs={setInputs}
                updateOutputs={setOutputs}
                wb={wb}
                inputs={inputs}
                outputs={outputs}
                cases={cases}
                handleSheetChange={handleSheetChange}
                updateMode={setMode}
                updateFormats={setFormats}
                updateCases={setCases}
            />
        } else if (mode === 'home') {
            return <Redirect to="/home"/>
        } else {
            return <Spinner className={classes.spinner}/>
        }
    }

    const createHome = () => {
        return <Home
            mode={mode}
            updateMode={setMode}
            setDashid={setDashid}
            setDashName={setDashName}
            updateMsg={setMsg}
            updateOpen={setOpen}
            clearState={clearState}
            updateFilename={setOrigFilename}
            getToken={props.getToken}
        />
    }

// Executing functions

    const content = createContent()
    const home = createHome()


    return (
        <div className={classes.root}>
            <div className={classes.top}>
                <TopBar
                    mode={mode}
                    dashName={dashName}
                    updateDashname={setDashName}
                    clearState={clearState}
                    logout={props.logout}
                    updateMsg={setMsg}
                    updateOpen={setOpen}
                    saveDash={saveDash}
                />
            </div>
            <Switch>
                <Route exact path={["/home", "/"]}>
                    <div className={classes.middle}>
                        {home}
                    </div>
                </Route>
                <Route exact
                       path="/(summary|dashboard|distributions|inputimportance|sensitivity|scenario|spreadsheet)">
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
                autoHideDuration={1750}
                TransitionComponent={Slide}
            />
        </div>
    );
}