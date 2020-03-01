import React, {useState, useEffect} from 'react'
import OutputSelector from "./OutputSelector";
import InputSelector from "./InputSelector";
import {Redirect} from "react-router-dom"

export default function IOController(props) {
    const [IO, setIO] = useState("outputs")
    const [stage, setStage] = useState("empty")


    const updateStage = (update) => {
        setStage(update)
    }

    const updateIO = (update) => {
        if (update === 'outputs' && props.outputs.length > 0) {
            setStage("summary")
        } else {
            props.handleSheetChange(props.sheets[0])
            setStage("empty")
        }
        setIO(update)
    }

    useEffect(() => {
        if (props.outputs.length > 0 && props.inputs.length > 0) {
            setStage("summary")
        }

    }, [props.outputs, props.inputs])

    useEffect(() => {
        if (IO === 'calculate') {
            props.updateMode("calculate")
        }
    }, [props, IO])


    const cancel = () => {
        props.updateInputs([...props.inputsBak])
        props.updateOutputs([...props.outputsBak])
    }


    if (IO === 'outputs') {
        return (
            <OutputSelector
                {...props}
                stage={stage}
                IO={IO}
                updateStage={updateStage}
                updateIO={updateIO}
                outputsBak={props.outputBak}
                cancel={cancel}
            />
        )
    } else if (IO === 'inputs') {
        return (
            <InputSelector
                {...props}
                stage={stage}
                IO={IO}
                updateStage={updateStage}
                updateIO={updateIO}
                inputsBak={props.inputsBak}
                cancel={cancel}
            />
        )
    } else {
        return (<Redirect to='/dashboard'/>)
    }
}
