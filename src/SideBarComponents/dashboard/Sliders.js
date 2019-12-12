import React, {useState, useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Slider from '@material-ui/core/Slider'


const useStyles = makeStyles(theme => ({
        root: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center',
            padding: '20px',
        },
        label: {
            display: 'flex',
            fontWeight: 'bold',
            fontSize: '1.0em',
            fontFamily: 'Roboto',
            marginTop: '0%',
            marginBottom: '5%'
        },
        slider: {
            color: '#0091ea'
        },
        mark: {
            backgroundColor: '#0091ea',
            height: 8,
            width: 1,
            marginTop: -3
        }
    }
))


function valuetext(value) {
    return `${value}%`
}

function valueLabelFormat(value) {
    return `${value * 100}%`
}

export default function InputSlider(props) {
    const classes = useStyles()
    const [defaultVal, setdefaultVal] = useState(null)


    useEffect(() => {

            const getDefaults = () => {
                let default_val

                props.cases.map(_case => {
                        if (_case['case_name'] === "Default") {
                            let inputs = _case["inputs"]
                            inputs.map(input => {
                                if (input['address'] === props.address) {
                                    default_val = input['values']
                                }
                            })
                        }
                    }
                )
                return (
                    default_val
                )
            }

            setdefaultVal(getDefaults())

        }, [props.address, props.cases]
    )

    const marks = [
        {
            value: 0.7,
            label: '70%',
        },
        {
            value: 0.9,
            label: '90%',
        },
        {
            value: 1.0,
            label: '100%',
        }
    ]

    return (
        <div className={classes.root}>
            <Slider classes={{root: classes.slider, mark: classes.mark}}
                    defaultValue={defaultVal}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-restrict"
                    valueLabelDisplay="on"
                    valueLabelFormat={valueLabelFormat}
                    min={0.7}
                    max={1.0}
                    step={null}
                    marks={marks}
                    onChange={props.onChange}
            />
            <div className={classes.label}>
                {props.name}
            </div>
        </div>

    )
}


