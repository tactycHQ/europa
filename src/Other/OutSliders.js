import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles'
import {} from 'recharts'
import Paper from '@material-ui/core/Paper'
import {Card} from "@material-ui/core";
import Slider from '@material-ui/core/Slider'
import {convert_format} from "../utils/utils";


const chartColors = [
    '#006E9F',
    '#A5014B',
    '#3DA32D',
    '#6014BC',
    '#C62525',
    '#002247'
]


export default function OutSliders(props) {


    const useStyles = makeStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            // backgroundColor: 'red',
            marginBottom: '0px',
            width: 300
        },
        sliderContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            // width:'100%',
            // backgroundColor: 'green',
            // margin: '5%'
        },
        label: {
            display: 'flex',
            fontWeight: '650',
            fontSize: '0.9em',
            fontFamily: 'Questrial',
            marginTop: '0%',
            marginBottom: '7%',
            color: '#006E9F',
            textAlign: 'center'
        },
        mark: {
            backgroundColor: '#C4C6C8',
            height: 0,
            width: 0.8
        },
        markActive: {
            backgroundColor: '#006E9F'
        },
        rail: {
            backgroundColor: '#767A7F',
        },
        track: {
            backgroundColor: '#006E9F',
        },
        active: {
            backgroundColor: '#A5014B'
        },
        markLabel: {
            borderStyle: 'solid',
            borderColor: '#D8D9DA',
            borderRadius: '10%',
            borderWidth: '1px',
            fontSize: '0.0em',
            color: '#4F545A',
            top:13,
            fontFamily: 'Questrial',
            "&:hover": {
                fontSize: '0.9em',
                borderStyle: 'none',
                top: -17
            }
        },
        markLabelActive: {
            borderColor: '#9DADB8',
            color: '#006E9F',
            fontFamily: 'Questrial',
            // fontWeight:'600',
        },
        thumb: {
            color: '#006E9F',
            fontFamily: 'Questrial'
        },
        valueLabel: {
            left: 'calc(-50%)',
            top: -22,
            '& *': {
                background: 'transparent',
                color: '#006E9F',
                fontFamily: 'Questrial',
            },
            color: '#006E9F',
            fontFamily: 'Questrial',
            fontSize: '0.9em',
            // backgroundColor:'red'
        }
    })
    const classes = useStyles()

    const [value, setValue] = React.useState([0, 1])

    function valueLabelFormat(value) {
        return convert_format(props.format, value)
    }

    function valuetext(value) {
        return convert_format('0.0', value)
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    function generateMarks(values) {
        return values.map(v => (
                {
                    value: v,
                    label: convert_format(props.format, v)
                }
            )
        )
    }


    useEffect(() => {
        setValue([props.min, props.max])
    }, [props.min, props.max])

    const createOutputSlider = () => {


        if (props.min === props.max) {
            return (
                <div key={'nochange_' + props.address}>No change</div>
            )
        } else {
            let _key = 'slider_' + props.address.toString().replace(' ', '')
            const marks = generateMarks(props.values)

            return (
                <div key={'div_' + _key} className={classes.root}>
                    <Slider
                        classes={{
                            root: classes.root,
                            active: classes.active,
                            mark: classes.mark,
                            markActive: classes.markActive,
                            markLabel: classes.markLabel,
                            markLabelActive: classes.markLabelActive,
                            thumb: classes.thumb,
                            valueLabel: classes.valueLabel,
                            track: classes.track,
                            rail: classes.rail
                        }}
                        key={'slider_' + _key}
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="on"
                        marks={marks}
                        step={null}
                        min={props.min}
                        max={props.max}
                        aria-labelledby="range-slider"
                        getAriaValueText={valuetext}
                        valueLabelFormat={valueLabelFormat}
                    >
                    </Slider>
                </div>
            )
        }
    }


    const outSlider = createOutputSlider()


    //Execute Functions


    return (
        <div className={classes.sliderContainer} key={'top_' + props.address}>
            {outSlider}
        </div>
    )

}
