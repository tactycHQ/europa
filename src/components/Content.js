import React, {useState, useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Output from "./Outputs"
import Input from "./Inputs";
import {getRefreshOutputsEager} from "../api/api";


const useStyles = makeStyles(theme => ({
            root: {
                display: 'flex',
                width: '85%',
                marginLeft: '15%'
            },
        }
    )
)

export default function Content(props) {
    const classes = useStyles()
    const [solutions, setSolutions] = useState(null)
    const [currSolution, setcurrSolution] = useState(null)
    const [inputVal, setInputVal] = useState(null)

    const refreshOutputs = async () => {
        const result = await getRefreshOutputsEager()
        setSolutions(result)
    }

    useEffect(() => {

        const selectSolutions = (solutions, inputVal) => {
            let clean = {}
            if (solutions) {
                let idx = getInputIndex(inputVal)
                clean.inputs = solutions[idx].inputs
                clean.outputs = solutions[idx].outputs
                return Object.entries(clean.outputs).map(i => ({
                    name: i[0],
                    Value: i[1]
                }))
            }
        }

        const getInputIndex = (inputVal) => {
            const rangeVal = [0.3, 0.6, 0.9, 1.0]
            if (inputVal) {
                return rangeVal.indexOf(inputVal) * 100
            } else {
                return 0
            }
        }

        setcurrSolution((selectSolutions(solutions, inputVal)))
    }, [solutions, inputVal])

    const handleSliderChange = (event, newValue) => {
        setInputVal(newValue)
    }

    const handleClick = () => {
        refreshOutputs()
    }

    return (
        <div className={classes.root}>
            <Output data={currSolution}/>
            <Input refreshClick={handleClick} handleSliderChange={handleSliderChange}/>
        </div>
    )
}


