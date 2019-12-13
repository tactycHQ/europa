import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Content from "./Content";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import Spinner from "./Spinner";
import {getSolutions, getMetaData} from "../api/api"
import isEqual from 'lodash.isequal'


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    top: {
        display: 'flex',
        position: 'fixed',
        width: '100%',
        height: '6vh',
        zIndex: '1'
    },
    middle: {
        display: 'flex',
        marginTop: '6vh'
    },
    bottom: {
        fontSize: '0.8em',
        fontFamily: 'Roboto',
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
    const classes = useStyles()

    const [solutions, setSolutions] = useState(null)
    const [currSolution, setcurrSolution] = useState(null)
    const [currInputVal, setcurrInputVal] = useState(null)
    const [defaultInputVal, setdefaultInputVal] = useState(null)
    const [inputs, setInputs] = useState(null)
    const [outputs, setOutputs] = useState(null)
    const [cases, setCases] = useState(null)
    const [charts, setCharts] = useState(null)
    const [dashName, setDashName] = useState("Loading...")
    const [isLoaded, setisLoaded] = useState(false)
    let content

    const refreshOutputs = async () => {
        const solutions = await getSolutions()
        setSolutions(solutions)
    }

    const handleSliderChange = (event, newValue, setAddress) => {
        setcurrInputVal(prevState => ({
            ...prevState,
            [setAddress]: newValue
        }))
    }


    const handleClick = () => {
        refreshOutputs()
    }

    useEffect(() => {
        const runEffect = async () => {
            const metadata = await getMetaData()
            const _solutions = await getSolutions()
            setSolutions(_solutions)
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

    useEffect(() => {

            const getSolution = () => {
                if (solutions && currInputVal) {
                    const foundSolution = solutions.find(i => isEqual(i.inputs, currInputVal))
                    return foundSolution.outputs
                } else {
                    return "No solution found"
                }
            }

            setcurrSolution(getSolution())

        }
        , [solutions, currInputVal]
    )

    if (isLoaded) {
        content =
            <Content refreshClick={handleClick}
                     handleSliderChange={handleSliderChange}
                     currSolution={currSolution}
                     inputs={inputs}
                     outputs={outputs}
                     defaultInputVal={defaultInputVal}
                     charts={charts}
            />


    } else {
        content = <Spinner className={classes.spinner}/>
    }


    return (
        <div className={classes.root}>
            <Grid container spacing={0}>
                <Grid className={classes.top} item xs={12} lg={12}>
                    <TopBar dashName={dashName}/>
                </Grid>
                <Grid item xs={12} lg={12}>
                    <div className={classes.middle}>
                        <SideBar/>
                        {content}
                    </div>
                </Grid>

                {/*<Grid className={classes.bottom} item xs={12} lg={12}>*/}
                {/*    Copyright Information, Epoch One, LLC 2019*/}
                {/*</Grid>*/}
            </Grid>
        </div>
    );
}