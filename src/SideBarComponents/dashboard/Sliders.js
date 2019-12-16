import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Slider from '@material-ui/core/Slider'
import * as ssf from 'ssf'


const useStyles = makeStyles(theme => ({
        root: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px'

        },
        label: {
            display: 'flex',
            fontWeight: 'bold',
            fontSize: '0.9em',
            fontFamily: 'Quicksand',
            marginTop: '0%',
            marginBottom: '5%',
            color: '#607d8b',
            textAlign:'center'
        },
        slider: {
            color: '#00838f'
        },
        mark: {
            backgroundColor: '#00838f',
            height: 6,
            width: 2
            // marginTop: -3
        },
        active: {
            backgroundColor: '#ff5252'
        },
        markLabel: {
            fontSize: 13,
            color:'#00838f'
        },
        markLabelActive:{
            color:'#607d8b'
        },
        thumb:{
            color:'#00838f'

        }

    }
))



function valueLabelFormat(value) {
    return ssf.format('0%',value)
}

function generateMarks(values) {
    return values.map(v => (
            {
                value: v,
                label:ssf.format('0%',v)
            }
        )
    )
}


export default function InputSlider(props) {
    const classes = useStyles()

    const marks = generateMarks(props.values)
    const min = Math.min(...props.values)
    const max = Math.max(...props.values)


    return (
        <div className={classes.root}>
            <Slider classes={{root: classes.slider, mark: classes.mark, active: classes.active, markLabel: classes.markLabel,thumb: classes.thumb}}
                    defaultValue={props.defaultInputVal}
                    aria-labelledby="discrete-slider-restrict"
                    valueLabelDisplay="on"
                    valueLabelFormat={valueLabelFormat}
                    min={min}
                    max={max}
                    step={null}
                    marks={marks}
                    onChangeCommitted={(event, value) => props.onChange(event, value, props.address)}
            />
            <div className={classes.label}>
                {props.name}
            </div>
        </div>

    )
}


