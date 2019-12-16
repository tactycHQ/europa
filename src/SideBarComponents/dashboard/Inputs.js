import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import InputSlider from "./Sliders"
import Slide from "@material-ui/core/Slide"
import {Card, CardHeader} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
            root: {
                display: 'flex',
                position: 'fixed',
                right: 0,
                flexDirection: 'column',
                width: '15%'

            },
            inputContainer: {
                display: 'flex',
                flexDirection: 'column',
                minHeight: '80vh'
                // background: '#e1f5fe'
            },
            inputHeader: {
                background: '#009688',
                height: '3vh',
                marginBottom: '5%'
            },
            inputTitle: {
                color: '#eeeeee',
                fontSize: '1.1em',
                fontWeight: '400',
                fontFamily: 'Quicksand',

            },
            sliderContainer: {
                display: 'flex',
                flexDirection: 'column',
                minHeight: '80vh',
                justifyContent: 'space-evenly',
                marginLeft: '3.5%',
                marginRight: '3.5%'
            },
            showInputsSwitch: {},
            switchBase: {
                color: '#5d4037'
            },
            label: {
                fontFamily: 'Quicksand',
                fontSize: '0.8em'

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
            <Slide
                direction="left"
                in={props.checked}
                timeout={500}
                mountOnEnter
                unmountOnExit>
                <Card className={classes.inputContainer} rounded={"true"}>
                    <CardHeader classes={{root: classes.inputHeader, title: classes.inputTitle}} title="INPUTS"/>
                    <div className={classes.sliderContainer}>
                        {sliders}
                        {/*{sliders}*/}
                    </div>
                </Card>
            </Slide>
        </div>
    )
}


