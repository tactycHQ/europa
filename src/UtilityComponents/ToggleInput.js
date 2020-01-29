import React from 'react'
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import {makeStyles} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
            showInputsSwitch: {
                marginLeft: '90%'
            },
            switchBase: {
                color: '#292F36'
            },
            label: {
                fontFamily: 'Questrial',
                fontSize: '0.7em',
                color: '#292F36'
            }
        }
    )
)


export default function ToggleInput(props) {

    const classes = useStyles()

    return (
        <FormControlLabel
            classes={{root: classes.showInputsSwitch, label: classes.label}}
            control={<Switch checked={props.checked} classes={{root: classes.switch, switchBase: classes.switchBase}}
                             size="small" onChange={props.handleChange}/>}
            label="Toggle Inputs"
        />

    )
}
