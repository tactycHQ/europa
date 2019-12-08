import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import InputSlider from "./Sliders";
import Button from '@material-ui/core/Button'


const useStyles = makeStyles(theme => ({
            root: {
                display: 'flex',
                // position:'fixed',
                flexDirection: 'column',
                height: '92vh',
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
                paddingBottom: '15px'
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



    return (
        <div className={classes.root}>
            <div className={classes.inputText}>Inputs</div>
            <InputSlider name={"Input A"} onChange={props.handleSliderChange}/>
            <InputSlider name={"Input B"}/>
            <InputSlider name={"Input C"}/>
            <InputSlider name={"Input D"}/>
            <InputSlider name={"Input E"}/>
            <div className={classes.refreshContainer}>
                < Button
                    className={classes.refreshButton}
                    variant="contained"
                    size={"small"}
                    onClick={props.refreshClick}>
                    Refresh
                    </Button>
            </div>
        </div>

)

}


