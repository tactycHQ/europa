import React, {useState, useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Output from "./Outputs"
import Input from "./Inputs";

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

    const getRefreshOutputsEager = async () => {
        console.log("Getting API...");
        const api_url = "http://localhost:5000/refreshOutputsEager"
        let dash_id = 5
        const headers = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({dash_id: dash_id})
        }
        let result
        try {
            const response = await fetch(api_url, headers)
            const response_JSON = await response.json()
            result = response_JSON.message
        } catch (error) {
            result = "Server not responsive"
        }
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
        console.log(solutions)
    }, [solutions, inputVal])


    const handleSliderChange = (event, newValue) => {
        setInputVal(newValue)
    }

    const handleClick = () => {
        getRefreshOutputsEager()
    }

    return (
        <div className={classes.root}>
            <Output data={currSolution}/>
            <Input refreshClick={handleClick} handleSliderChange={handleSliderChange}/>
        </div>
    )
}


