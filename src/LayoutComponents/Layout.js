import React, {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Content from "./Content"
import TopBar from "./TopBar"
import Spinner from "../Other/Spinner"
import {getSolutions, getMetaData, getFormats} from "../api/api"


function extractDefaults(values) {
    if (Object.keys(values)[0] === 'Default') {
        return values.Default
    }
}

export default function Layout() {

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
            marginTop: '5vh'
        },
        spinner: {
            display: 'flex'
        }
    }));
    const classes = useStyles()
    const [solutions, setSolutions] = useState(null)
    // const [variance, setVariance] = useState(null)
    const [distributions, setDistributions] = useState(null)
    const [formats, setFormats] = useState("0.0")
    const [currInputVal, setcurrInputVal] = useState(null)
    const [inputs, setInputs] = useState(null)
    const [outputs, setOutputs] = useState(null)
    const [cases, setCases] = useState(null)
    const [inputCase, setInputCase] = useState(null)
    const [charts, setCharts] = useState(null)
    const [dashName, setDashName] = useState('')
    const [isLoaded, setisLoaded] = useState(false)


    // At initial load
    useEffect(() => {
        const runEffect = async () => {
            const metadata = await getMetaData()
            const _solutions = await getSolutions()
            const _formats = await getFormats()
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

            setisLoaded(isLoaded => !isLoaded)
        }
        runEffect()
    }, [])

    // If case is changed
    useEffect(() => {
        if (inputCase) {
            setcurrInputVal(cases[0][inputCase])
        }

    }, [cases, inputCase])

    // If slider is changed
    useEffect(() => {
        setInputCase('')
    }, [currInputVal])


    // Defining functions
    const handleSliderChange = (event, newValue, setAddress) => {
        setcurrInputVal(prevState => ({
            ...prevState,
            [setAddress]: newValue
        }))
    }

    const handleCaseChange = event => setInputCase(event.target.value)

    const createContent = () => {
        if (isLoaded) {
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
                            // variance={variance}
            />
        } else {
            return <Spinner className={classes.spinner}/>
        }
    }

    // Executing functions
    const content = createContent()

    return (
        <div className={classes.root}>
            <div className={classes.top}>
                <TopBar dashName={dashName}/>
            </div>
            <div className={classes.middle}>
                {content}
            </div>
        </div>
    );
}