import React, {useState, useEffect} from 'react'
import OutputSelector from "./OutputSelector";

export default function IOController(props) {
    const [IO, setIO] = useState("outputs")
    const [stage, setStage] = useState("empty")

    const updateStage = (update) => {
        setStage(update)
    }

    useEffect(() => {
        if (props.outputs.length > 0) {
        setStage("summary")
    }

    },[props.outputs])


    if (IO === 'outputs') {

        return (
            <OutputSelector
                {...props}
                stage={stage}
                updateStage={updateStage}
            />
        )
    }


}