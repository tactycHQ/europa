import React, {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import InputSlider from "./Sliders"


const useStyles = makeStyles(theme => ({
            root: {
                display: 'flex',
                // position:'fixed',
                flexDirection: 'column',
                width: '20%',
                height: '94vh',
                right: '0',
                padding: '10px',
                borderLeftStyle: 'solid',
                borderLeftColor: '#cfd8dc',
                backgroundColor: '#eceff1',
                alignItems: 'center',
            },
            inputText: {
                fontSize: '1em',
                fontFamily: 'Roboto',
                fontWeight: 'bold',
                color: '#607d8b',
                paddingTop: '2%',
                marginBottom: '15%'
            },
            inputContainer: {
                display: 'flex',
                flexDirection: 'column',
                height: '80vh',
                justifyContent: 'space-evenly'
            }
        }
    )
)


function getDefault(cases, address) {

    let result

    cases.map(_case => {
            if (_case['case_name'] === "Default") {
                let inputs = _case["inputs"]
                inputs.map(input => {
                        if (input['address'] === address) {
                            result = input['values']
                            return result
                        }
                    }
                )
            }
        }
    )
    return result
}


export default function Input(props) {
    const classes = useStyles()

    let inputName
    let inputAddress
    let inputValues
    let sliders
    let defaultVal

    if (props.inputs) {
        sliders = props.inputs.map(input => {
                inputName = input.label
                inputAddress = input.address
                inputValues = input.values
                defaultVal = getDefault(props.cases, input.address)
                return (
                    <InputSlider name={inputName}
                                 onChange={props.handleSliderChange}
                                 key={inputAddress}
                                 address={inputAddress}
                                 values={inputValues}
                                 defaultValue={defaultVal}/>
                )
            }
        )
    }


    return (
        <div className={classes.root}>
            <div className={classes.inputText}>Inputs</div>
            <div className={classes.inputContainer}>
                {sliders}
            </div>
            < /div>
                )
                }


