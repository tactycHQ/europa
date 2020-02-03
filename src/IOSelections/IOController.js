import React, {useState, useEffect} from 'react'
import OutputSelector from "./OutputSelector";
import InputSelector from "./InputSelector";

export default function IOController(props) {
    const [IO, setIO] = useState("inputs")
    const [stage, setStage] = useState("empty")

    const updateStage = (update) => {
        setStage(update)
    }

    const updateIO = (update) => {
        setIO(update)

        if (update==='outputs' && props.outputs.length > 0) {
            setStage("summary")
        } else {
            setStage("empty")
        }
    }

    useEffect(() => {
        if (props.outputs.length > 0 && props.inputs.length > 0) {
            setStage("summary")
        }

    }, [props.outputs, props.inputs])

    useEffect(() => {
        if (IO === 'calculate') {
            props.updateMode("loaded")
        }
    }, [props, IO])


    if (IO === 'outputs') {
        return (
            <OutputSelector
                {...props}
                stage={stage}
                IO={IO}
                updateStage={updateStage}
                updateIO={updateIO}
            />
        )
    } else {
        return (
            <InputSelector
                {...props}
                stage={stage}
                IO={IO}
                updateStage={updateStage}
                updateIO={updateIO}
            />
        )
    }
}
