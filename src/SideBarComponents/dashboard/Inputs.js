import React from 'react'
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
                backgroundColor: '#eceff1',
                alignItems: 'stretch',
            },
            inputText: {
                fontSize: '1em',
                fontFamily: 'Roboto',
                fontWeight: 'bold',
                color: '#607d8b',
                paddingTop: '1vh',
                paddingBottom: '1vh',
                marginBottom:'2vh',
                textAlign: 'center',
            },
            inputContainer: {
                display: 'flex',
                flexDirection: 'column',
                height: '80vh',
                justifyContent: 'space-evenly',
                paddingLeft:'3.5%',
                paddingRight:'3.5%'
            }
        }
    )
)


export default function Input(props) {
    const classes = useStyles()

    let inputName
    let inputAddress
    let inputValues
    let sliders
    let defaultInputVal

    if (props.inputs) {
        sliders = props.inputs.map(input => {
                inputName = input.label
                inputAddress = input.address
                inputValues = input.values

                defaultInputVal = props.defaultInputVal[inputAddress]

                return (
                    <InputSlider name={inputName}
                                 onChange={props.handleSliderChange}
                                 key={inputAddress}
                                 address={inputAddress}
                                 values={inputValues}
                                 defaultInputVal={defaultInputVal}/>
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


