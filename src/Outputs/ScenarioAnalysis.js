import React from 'react';
import {makeStyles} from '@material-ui/core/styles'
import {Card, Paper} from "@material-ui/core";
import OutSliders from "../Other/OutSliders";
// import {convert_format} from "../utils/utils";


const chartColors = [
    '#006E9F',
    '#A5014B',
    '#3DA32D',
    '#6014BC',
    '#C62525',
    '#002247'
]


export default function ScenarioAnalysis(props) {


    const useStyles = makeStyles({
        // root: {
        //     width: 300,
        // },
        topCard: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            padding: '10px',
            // background: '#FEFEFD',
        },
    })
    const classes = useStyles()


    const createSliders = () => {
        return props.outputs.map(output => {
            const addresses = Object.entries(output.labels)
            const categorySliders =  addresses.map(pair => {
                const address = pair[0]
                const label = pair[1]
                return (
                    <OutSliders
                        key={address}
                        category={output.category}
                        address={address}
                        label={label}
                        min={props.distributions.min[address]}
                        max={props.distributions.max[address]}
                        marks={Object.keys(props.distributions.prob[address]).map(Number)}
                        format={props.formats[address]}
                    />
                )
            })
            return (
                <Paper key={output.category}>
                    {categorySliders}
                </Paper>
            )
        })
    }
    const outSliders = createSliders()

    //Execute Functions
    return (
        <Card className={classes.topCard} elevation={4}>
            {outSliders}
        </Card>
    )

}
