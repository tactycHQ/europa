import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Output from "./Outputs"
import Input from "./Inputs";

const useStyles = makeStyles(theme => ({
        root: {
            display:'flex',
            width:'85%',
            marginLeft:'15%'
        },
        }
    )
)

export default function Content(props) {
    const classes = useStyles()
    const [outputs, setOutputs] = useState(null)
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
        setOutputs(processOutput(result))
    }

    const processOutput = (result) => {
    let clean ={}
    if (result != null) {
        console.log(Object.values(result))
        clean.inputs = result[0].inputs
        clean.outputs = result[0].outputs
    }
    return (
        clean
    )}

    const handleSliderChange = (event,newValue) =>{
        setInputVal(newValue)
    }


    const handleClick = () => {
        getRefreshOutputsEager()
    }

    return (
        <div className={classes.root}>
            <Output data={outputs} />
            <Input refreshClick={handleClick} handleSliderChange={handleSliderChange}/>
        </div>
    )
}


