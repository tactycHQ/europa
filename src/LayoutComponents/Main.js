import React, {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Content from "./Content"
import Home from "./Home";
import TopBar from "./TopBar"
import Spinner from "../Other/Spinner"
import {getSolutions, getMetaData, getFormats, loadFile} from "../api/api"
import {Switch, Route} from 'react-router-dom'
import Spreadsheet from "../Outputs/Spreadsheet";
import {fixformats} from "../utils/utils";


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
    const [inputs, setInputs] = useState(null)
    const [outputs, setOutputs] = useState(null)
    const [cases, setCases] = useState(null)
    const [charts, setCharts] = useState(null)
    const [dashName, setDashName] = useState('')
    const [mode, setMode] = useState('')
    const [apiData, setAPIData] = useState(false)
    const [worksheet, setWorksheet] = useState(false)

    //2 modes
    //New - a new dashboard is to be created. Dash id and filename have been provided
    //Existing - load an existing dashboard from dash id

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
            setAPIData(true)
        }

        const executeNewAPIcalls = async () => {
            const ws_data = await loadFile()
            setWorksheet(ws_data)
            setAPIData(true)
        }

        if (mode === 'existing' && !apiData) {
            executeExistingAPIcalls(dashid)
        }

        if (mode === 'new') {
            executeNewAPIcalls()
        }

    }, [mode, dashid, apiData])
    //


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

    const createContent = () => {
        if (apiData && mode === 'existing') {
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
            />
        } else if (apiData && mode === 'new') {
            return <Content
                mode={mode}
                worksheet={worksheet}
            />

        } else {
            return <Spinner className={classes.spinner}/>
        }

    }

    const createHome = () => {
        return <Home
            setMode={setMode}
            setDashid={setDashid}
            setAPIdata={setAPIData}
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