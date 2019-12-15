import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import InputSlider from "./Sliders"
import Slide from "@material-ui/core/Slide"
import Paper from "@material-ui/core/Paper"
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

const useStyles = makeStyles(theme => ({
            root: {
                display: 'flex',
                flexShrink:2,
                flexDirection: 'column',
                alignItems: 'flex-end',
                padding: '4px'
            },
            inputContainer: {
                display: 'flex',
                flexDirection: 'column',
                minHeight: '80vh',
                width: '15vw',
                backgroundColor: '#d7ccc8',
            },
            inputText: {
                fontSize: '1.1em',
                fontFamily: 'Roboto',
                fontWeight: 'bold',
                color: '#795548',
                paddingTop: '1vh',
                paddingBottom: '1vh',
                marginBottom: '2vh',
                textAlign: 'center',
            },
            sliderContainer: {
                display: 'flex',
                flexDirection: 'column',
                minHeight: '80vh',
                justifyContent: 'space-evenly',
                marginLeft: '3.5%',
                marginRight: '3.5%'
            },
            showInputsSwitch: {
            },
            switchBase: {
                color:'#5d4037'
            },
            label: {
                fontFamily: 'Roboto',
                fontSize: '0.8em'

            }
        }
    )
)


export default function Input(props) {
    const classes = useStyles()
    const [checked, setChecked] = React.useState(true);

    const handleChange = () => {
        setChecked(prev => !prev);
    }

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
            <div className={classes.showInputsSwitch}>
            <FormControlLabel
                classes={{root: classes.showInputsSwitch, label: classes.label}}
                control={<Switch checked={checked} classes={{root:classes.switch, switchBase: classes.switchBase}} size="small" onChange={handleChange}/>}
                label="Toggle Inputs"
            />
            </div>
            <Slide
                direction="left"
                in={checked}
                timeout={500}
                mountOnEnter
                unmountOnExit>
                <Paper className={classes.inputContainer} rounded={"true"}>
                    <div className={classes.inputText}>INPUTS</div>
                    <div className={classes.sliderContainer}>
                        {sliders}
                        {/*{sliders}*/}
                    </div>
                </Paper>
            </Slide>
        </div>
    )
}


