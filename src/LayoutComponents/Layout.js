import React, {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Content from "./Content"
import Home from "./Home";
import TopBar from "./TopBar"
import Spinner from "../Other/Spinner"
import {getSolutions, getMetaData, getFormats} from "../api/api"
import {Switch, Route} from 'react-router-dom'

//import {convert_format} from "../utils/utils";


function extractDefaults(values) {
    if (Object.keys(values)[0] === 'Default') {
        return values.Default
    }
}

export default function Layout(props) {

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
    const [formats, setFormats] = useState("0.0")
    const [currInputVal, setcurrInputVal] = useState(null)
    const [inputs, setInputs] = useState(null)
    const [outputs, setOutputs] = useState(null)
    const [cases, setCases] = useState(null)
    const [charts, setCharts] = useState(null)
    const [dashName, setDashName] = useState('')
    const [mode, setMode] = useState('')


    // At initial load
    useEffect(() => {
        const executeAPIcalls = async () => {
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

        if (mode==='existing') {
            executeAPIcalls()
        }
    }, [mode,dashid])


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
        if (mode === 'loaded') {
            return <Content handleSliderChange={handleSliderChange}
                            handleCaseChange={handleCaseChange}
                            solutions={solutions}
                            currInputVal={currInputVal}
                            distributions={distributions}
                            formats={formats}
                            inputs={inputs}
                            outputs={outputs}
                            charts={charts}
                            cases={cases}
            />
        } else if (mode=== 'new' && dashid==null) {
            return <div>New Dash board. Upload Excel File</div>
        } else if (mode==='new' &&  dashid) {
               return <div>New Dash board with Data</div>
        }
        else {
            return <Spinner className={classes.spinner}/>
        }

    }

    const createHome = () => {
        return <Home
            setMode={setMode}
            setDashid={setDashid}
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