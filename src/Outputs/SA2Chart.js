import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper'

// import {convert_format} from "../utils/utils"


const chartColors = [
    '#083D77',
    'red',
    'green',
    '#546e7a',
    '#0288d1',
    '#0288d1'
]


// function createRow(rowInput, rowOutput) {
//     return {name, calories, fat, carbs, protein};
// }


export default function SA2Chart(props) {
    const useStyles = makeStyles(theme => ({
        chartContainer: {},
        bar: {
            fill: props.fill
        },
        table: {
            backgroundColor: '#D7DEE2',
            fontSize: '1.0em',
            color: 'red',
            fontFamily: 'Questrial'
        },
        cell: {
            // backgroundColor: '#D7DEE2',
            fontSize: '1.0em',
            color: '#4F545A',
            fontFamily: 'Questrial'
        }
    }))

    const classes = useStyles()


    const generateCells = () => {
        return props.data.map(solution => {
            return (
                <TableCell>
                    {solution.output[0]['Y1']}
                </TableCell>
            )
        })
    }

    const generateBounds = () => {
        return props.data.map(solution => {
            return (
                <TableCell>
                    {solution.output[0]['Y1']}
                </TableCell>
            )
        })
    }


    //Execute Functions
    // const cells = generateCells()
    const bounds = generateBounds()
    console.log(props)
    console.log(bounds)

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                {/*<TableHead>*/}
                {/*    <TableRow>*/}
                {/*        <TableCell className={classes.cell}>Dessert (100g serving)</TableCell>*/}
                {/*        <TableCell className={classes.cell} align="right">Calories</TableCell>*/}
                {/*        <TableCell className={classes.cell} align="right">Fat&nbsp;(g)</TableCell>*/}
                {/*    </TableRow>*/}
                {/*</TableHead>*/}
                <TableBody>
                    <TableRow>
                        {/*{cells}*/}
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}
