import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Content from "./Content";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import {getSolutions, getMetaData} from "../api/api";

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
    }
}));

export default function Layout() {
    const classes = useStyles()

    const [solutions, setSolutions] = useState(null)
    const [currSolution, setcurrSolution] = useState(null)
    const [inputVal, setInputVal] = useState(null)
    const [metadata, setMetaData] = useState(null)
    const [inputs, setInputs] = useState(null)
    const [outputs, setOutputs] = useState(null)
    const [cases, setCases] = useState(null)
    const [charts, setCharts] = useState(null)
    const [dashName, setDashName] = useState("Loading...")


    const refreshOutputs = async () => {
        const solutions = await getSolutions()
        setSolutions(solutions)
    }


    const handleSliderChange = (event, newValue) => {
        setInputVal(newValue)
    }

    const handleClick = () => {
        refreshOutputs()
    }

    useEffect(() => {

        const getInputIndex = (inputVal) => {
            const rangeVal = [0.7, 0.9, 1.0]
            if (inputVal) {
                return rangeVal.indexOf(inputVal)
            } else {
                return 0
            }
        }

        const selectSolutions = (solutions, inputVal) => {
            if (solutions) {
                let idx = getInputIndex(inputVal)
                let outputs = solutions[idx].outputs
                return Object.entries(outputs).map(i => ({
                            name: i[0],
                            Value: i[1]
                        }
                    )
                )
            }
        }

        setcurrSolution((selectSolutions(solutions, inputVal)))

    }, [solutions, inputVal])

    useEffect(() => {
        const runEffect = async () => {
            const _metadata = await getMetaData()
            const _solutions = await getSolutions()
            setSolutions(_solutions)
            setMetaData(_metadata)
            setDashName(_metadata['name'])
            setCases(_metadata['cases'])
            setInputs(_metadata['inputs'])
            setOutputs(_metadata['oututs'])
        }
        runEffect()
    }, [])

    return (
        <div className={classes.root}>
            <Grid container spacing={0}>
                <Grid className={classes.top} item xs={12} lg={12}>
                    <TopBar dashName={dashName}/>
                </Grid>
                <Grid item xs={12} lg={12}>
                    <div className={classes.middle}>
                        <SideBar/>
                        <Content refreshClick={handleClick}
                                 handleSliderChange={handleSliderChange}
                                 currSolution={currSolution}
                                 inputs = {inputs}
                                 outputs = {outputs}
                                 cases = {cases}
                                 charts = {charts}
                        />
                    </div>
                </Grid>
                {/*<Grid className={classes.bottom} item xs={12} lg={12}>*/}
                {/*    Copyright Information, Epoch One, LLC 2019*/}
                {/*</Grid>*/}
            </Grid>
        </div>
    );
}