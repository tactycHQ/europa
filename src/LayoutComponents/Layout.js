import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Content from "./Content";
import TopBar from "./TopBar";
import Spinner from "../Other/Spinner";
import {getSolutions, getMetaData, getFormats} from "../api/api"
import Divider from "@material-ui/core/Divider"


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
        marginTop: '5vh'
    },
    spinner: {
        display: 'flex'
    }
}));

function extractDefaults(values) {
    if (Object.keys(values)[0] === 'Default') {
        return values.Default
    }
}

export default function Layout() {

    // Defining hooks
    const classes = useStyles()
    const [solutions, setSolutions] = useState(null)
    const [domains, setDomains] = useState(null)
    const [formats, setFormats] = useState("0.0")
    const [currInputVal, setcurrInputVal] = useState(null)
    const [defaultInputVal, setdefaultInputVal] = useState(null)
    const [inputs, setInputs] = useState(null)
    const [outputs, setOutputs] = useState(null)
    const [cases, setCases] = useState(null)
    const [inputCase, setInputCase] = useState(null)
    const [charts, setCharts] = useState(null)
    const [dashName, setDashName] = useState('')
    const [isLoaded, setisLoaded] = useState(false)
    let content

    // At initial load
    useEffect(() => {
        const runEffect = async () => {
            const metadata = await getMetaData()
            const _solutions = await getSolutions()
            const _formats = await getFormats()
            setSolutions(_solutions.solutions)
            setDomains(_solutions.domains)

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

            setdefaultInputVal(defaults[0])
            setcurrInputVal(defaults[0])
            setOutputs(metadata.outputs)
            setCharts(metadata.charts)

            setisLoaded(isLoaded => !isLoaded)
        }
        runEffect()
    }, [])


    useEffect (() => {
        if (inputCase) {
            setcurrInputVal(cases[0][inputCase])
        }

    },[cases, inputCase])

    // Defining functions
    const handleSliderChange = (event, newValue, setAddress) => {
        setcurrInputVal(prevState => ({
            ...prevState,
            [setAddress]: newValue
        }))
    }

    const handleCaseChange = event => {
        setInputCase(event.target.value)
    }

    if (isLoaded) {
        content =
            <Content handleSliderChange={handleSliderChange}
                     handleCaseChange={handleCaseChange}
                     solutions={solutions}
                     currInputVal={currInputVal}
                     domains={domains}
                     formats={formats}
                     inputs={inputs}
                     outputs={outputs}
                     charts={charts}
                     cases={cases}
            />


    } else {
        content = <Spinner className={classes.spinner}/>
    }


    return (
        <div className={classes.root}>
            <div className={classes.top}>
                <TopBar dashName={dashName}/>
                <Divider className={classes.divider} variant="middle"/>
            </div>
            <div className={classes.middle}>
                {content}
            </div>
        </div>
    );
}