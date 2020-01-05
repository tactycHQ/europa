import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import InputSlider from "../Inputs/Sliders"
import Slide from "@material-ui/core/Slide"
import {Card, CardHeader} from "@material-ui/core"
import CaseSelector from "../Inputs/CaseSelector";


const useStyles = makeStyles(theme => ({
            root: {
                display: 'flex',
                position: 'fixed',
                right: 0,
                flexDirection: 'column',
                width: '15%',
                marginTop: '10px',
                marginRight: '0.5%',
                // background:'pink'
            },
            inputContainer: {
                display: 'flex',
                flexDirection: 'column',
                minHeight: '92vh',
                background: '#FEFEFD'
            },
            inputHeader: {
                background: '#006E9F',
                height: '3vh',
                marginBottom: '5%'
            },
            inputTitle: {
                color: '#F4F9E9',
                fontSize: '1.0em',
                fontWeight: '400',
                fontFamily: 'Questrial'
            },
            caseSelectorContainer: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '5px',
                textAlign: 'center'
            },
            caseText: {
                fontFamily: 'Questrial',
                fontSize: '0.9em',
                fontWeight: '800',
                color: '#4B719C',
                marginRight: '10px'
            },
            sliderContainer: {
                display: 'flex',
                flexDirection: 'column',
                minHeight: '80vh',
                maxHeight: '80vh',
                justifyContent: 'space-evenly',
                marginLeft: '3.5%',
                marginRight: '3.5%',
                // background:'green',
                // overflowY:'auto',
                // overflowX:'hidden'

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
    let currSliderVal

    if (props.inputs) {
        sliders = props.inputs.map(input => {
                inputName = input.label
                inputAddress = input.address
                inputValues = input.values

                currSliderVal = props.currInputVal[inputAddress]

                return (
                    <InputSlider name={inputName}
                                 onChange={props.handleSliderChange}
                                 key={inputAddress}
                                 address={inputAddress}
                                 values={inputValues}
                                 currSliderVal={currSliderVal}
                    />
                )
            }
        )
    }

    return (
        <div className={classes.root}>
            <Slide
                direction="left"
                in={true}
                timeout={1000}
                mountOnEnter
                unmountOnExit>
                <Card className={classes.inputContainer} rounded={"true"}>
                    <CardHeader classes={{root: classes.inputHeader, title: classes.inputTitle}} title="Inputs"/>
                    <div className={classes.caseSelectorContainer}>
                        <div className={classes.caseText}>Case</div>
                        <CaseSelector
                            handleCaseChange={props.handleCaseChange}
                            cases={props.cases}
                            currInputVal={props.currInputVal}
                        />
                    </div>
                    <div className={classes.sliderContainer}>
                        {sliders}
                        {/*{sliders}*/}
                    </div>
                </Card>
            </Slide>
        </div>
    )
}


