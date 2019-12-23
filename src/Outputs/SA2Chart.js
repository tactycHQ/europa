import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper'
import {convert_format} from "../utils/utils"

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
        chartsContainer: {
            display: 'flex',
            backgroundColor: 'yellow',
            flexDirection: 'column'

        },
        tableContainer: {
            display: 'flex',
            flexDirection: 'column',
            // backgroundColor: 'orange',
            marginTop: 'auto',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center'

        },
        table: {
            // display:'flex',
            backgroundColor: '#D7DEE2',
            justifyContent: 'flex-end',
            width: '100%',
            height: '100%',
            margin: 'auto'
        },
        headercell: {
            color: 'blue',
            fontSize: '1.0em',
            fontFamily: 'Questrial'
        },
        cell: {
            // backgroundColor:'red',
            fontSize: '1.0em',
            color: '#4F545A',
            fontFamily: 'Questrial'
        },
        row: {
            // backgroundColor:'green'
        }
    }))

    const classes = useStyles()


    const generateTables = (outAdd) => {

        const tables = props.data.map(tableData => {

            const flexInputs = tableData.inputs
            const bounds = tableData.bounds
            const add1 = flexInputs[0]
            const add2 = flexInputs[1]

            const bounds1 = bounds[0][add1]
            const bounds2 = bounds[1][add2]

            const table = bounds1.map((value1) => {
                const row = bounds2.map(value2 => {


                    const combo = {
                        ...props.currInputVal,
                        [add1]: value1,
                        [add2]: value2
                    }

                    const answer = props.findSolution(combo)[outAdd]

                    const answer_with_format = convert_format('0.0%', answer)

                    return (
                        <TableCell className={classes.cell}>{answer_with_format}</TableCell>
                    )
                })

                return (
                    <TableRow className={classes.row}>
                        <TableCell className={classes.headercell}>
                            {convert_format('0.0%', value1)}
                        </TableCell>
                        {row}
                    </TableRow>
                )
            })

            //header generation
            const header = bounds2.map((val2) => {
                const header_val = convert_format('0.0%', val2)
                return (
                    <TableCell className={classes.headercell}>{header_val}</TableCell>)
            })

            return (
                <Paper className={classes.tableContainer}>
                    <h3>{`${add1} vs. ${add2}`}</h3>
                    <TableRow className={classes.row}>
                        <TableCell className={classes.cell}>
                        </TableCell>
                        {header}
                    </TableRow>
                    {table}
                </Paper>
            )


        })
        return tables
    }


    //Execute Functions
    const tables = generateTables("Annual!D73")


    return (

        tables.map(table => {
            return (
                <div className={classes.chartsContainer}>
                    {table}
                </div>
            )
        })
    )
}
