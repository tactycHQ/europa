import React, {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Content from "./Content"
import Home from "./Home";
import TopBar from "./TopBar"
import Spinner from "../UtilityComponents/Spinner"
import {getSolutions, getMetaData, getFormats, loadFile} from "./api"
import {Switch, Route} from 'react-router-dom'
import {fixFormat} from "../utils/utils";


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
    const [outputs, setOutputs] = useState([])
    const [cases, setCases] = useState(null)
    const [charts, setCharts] = useState(null)
    const [dashName, setDashName] = useState('')
    const [mode, setMode] = useState('')
    const [wb, setwb] = useState(null)
    const [sheets, setSheets] = useState([])
    const [worksheet, setWorksheet] = useState(false)
    const [currSheet, setCurrSheet] = useState(null)


    //----------------Modes-------------------
    //1. New - a new dashboard is to be created. Dash id and filename have been provided
    //2. PendingIO - file has been loaded. Pending user I/O selection
    //3  PendingCalc - I/O selection complete. Generate calcs. When complete auto-save and set mode to Loaded
    //4  Processed - This is an existing dashboard that needs loading. Pending API call to get solutions
    //5  Loaded - All data is complete. Entire dashboard can be generated


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
            setMode('pendingIO')
        }

        if (mode === 'processed') {
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

    const updateInputs = (inputs) => {
        setInputs([...inputs])
    }

    const updateOutputs = (outputs) => {
        setOutputs([...outputs])
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
        } else if (mode === 'pendingIO') {
            return <Content
                mode={mode}
                worksheet={worksheet}
                sheets={sheets}
                currSheet={currSheet}
                handleSheetChange={handleSheetChange}
                updateInputs={updateInputs}
                updateOutputs={updateOutputs}
                wb={wb}
                inputs={inputs}
                outputs={outputs}

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