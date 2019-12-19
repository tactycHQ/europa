import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import InputSlider from "../Inputs/Sliders"
import Slide from "@material-ui/core/Slide"
import {Card, CardHeader} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
            root: {
                display: 'flex',
                position: 'fixed',
                right: 0,
                flexDirection: 'column',
                width: '15%',
                marginTop: '10px',
                marginRight: '0.5%'

            },
            inputContainer: {
                display: 'flex',
                flexDirection: 'column',
                minHeight: '92vh',
                background: '#FEFEFD',
                // opacity:'0.9'
                // background: '#e1f5fe'
            },
            inputHeader: {
                background: '#4B719C',
                height: '3vh',
                marginBottom: '5%'
            },
            inputTitle: {
                color: '#F4F9E9',
                fontSize: '1.0em',
                fontWeight: '400',
                fontFamily: 'Questrial',

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
                fontFamily: 'Questrial',
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
                timeout={1000}
                mountOnEnter
                unmountOnExit>
                <Card className={classes.inputContainer} rounded={"true"}>
                    <CardHeader classes={{root: classes.inputHeader, title: classes.inputTitle}} title="Inputs"/>
                    <div className={classes.sliderContainer}>
                        {sliders}
                        {/*{sliders}*/}
                    </div>
                </Card>
            </Slide>
        </div>
    )
}


