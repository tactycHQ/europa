import React, {useState, useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

export default function LabelField(props) {

    const useStyles = makeStyles(theme => ({

        rootTextContainer: {
            display: 'flex',
            width: '100%',
            margin: '2px',
            fontWeight: '100',
            fontFamily: 'Questrial',
            fontSize: '0.85em'
        },
        textField: {
            fontSize: '0.85em',
            fontWeight: '100',
            fontFamily: 'Questrial',
            paddingTop: '5px',
            paddingBottom: '0px',
        },
        labelField: {
            fontSize: '1.1em',
            fontWeight: '100',
            fontFamily: 'Questrial',
            width: '100%',
        }
    }))
    const classes = useStyles()
    const [value, setValue] = useState(props.label)


    useEffect(() => {
        console.log("here")
        setValue(props.label)
    }, [props.label])

    // useEffect(() => {
    //     props.updateLabels(value,props.idx)
    // },[props,typed])


    const labelChange = (e) => {
        setValue(e.target.value)
        props.updateLabels(value, props.idx)
    }


    return (
        <TextField
            required
            className={classes.rootTextContainer}
            label={props.address}
            size="small"
            InputLabelProps={{
                className: classes.labelField
            }}
            InputProps={{
                classes: {
                    input: classes.textField,
                }
            }}
            value={value}
            onChange={(e) => labelChange(e)}
            onMouseEnter={(e) => props.labelEnter(e, props.address)}
            onMouseLeave={(e) => props.labelExit(e, props.address)}
        />
    )
}