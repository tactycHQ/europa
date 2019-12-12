import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import InputSlider from "./Sliders";
import Button from '@material-ui/core/Button'


const useStyles = makeStyles(theme => ({
            root: {
                display: 'flex',
                // position:'fixed',
                flexDirection: 'column',
                width: '20%',
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
            refreshContainer: {
                display: 'flex',
                justifyContent: "center",
                marginBottom: '3%'
            },
            refreshButton: {
                fontSize: '1.0em',
                color: 'white',
                backgroundColor: '#546e7a',
            },
        }
    )
)

export default function Input(props) {
    const classes = useStyles()

    let inputName
    let inputAddress
    let inputValues
    let sliders = <div>Loading</div>

    if (props.inputs) {
        sliders = props.inputs.map(input => {
                inputName = input.label
                inputAddress = input.address
                inputValues = input.values
                return (
                    <InputSlider name={inputName} onChange={props.handleSliderChange} key={inputAddress}/>
                )
            }
        )
    }


    return (
        <div className={classes.root}>
            <div className={classes.inputText}>Inputs</div>
            {sliders}
        </div>

    )

}


