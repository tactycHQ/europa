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


function createData(name, calories, fat, carbs, protein) {
    return {name, calories, fat, carbs, protein};
}


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

    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];


    //Execute Functions

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.cell}>Dessert (100g serving)</TableCell>
                        <TableCell className={classes.cell} align="right">Calories</TableCell>
                        <TableCell className={classes.cell} align="right">Fat&nbsp;(g)</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.name}>
                            <TableCell
                                className={classes.cell}
                                component="th"
                                scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell
                                className={classes.cell}
                                align="right"
                            >
                                $2,612
                            </TableCell>
                            <TableCell
                                className={classes.cell}
                                align="right"
                            >
                                $2,612
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
