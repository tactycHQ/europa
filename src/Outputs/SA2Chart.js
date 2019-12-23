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


    const generateTables = (outAdd) => {

        const tables = props.data.map(tableData => {

            const flexInputs = tableData.inputs
            const bounds = tableData.bounds
            const add1 = flexInputs[0]
            const add2 = flexInputs[1]

            const bounds1 = bounds[0][add1]
            const bounds2 = bounds[1][add2]
            const combos = tableData.combo
            const solutions = tableData.solutions

            const table = bounds1.map((value1, rowNum) => {
                const row = bounds2.map(value2 => {

                    const idx = combos.findIndex(item => (item[add1] === value1 && item[add2] === value2))
                    const answer = solutions[idx][outAdd]
                    const answer_with_format = convert_format('0.0%', answer)

                    return (
                        <TableCell>{answer_with_format}</TableCell>
                    )
                })

                return (
                    <TableRow>
                        <TableCell>
                            {convert_format('0.0%', value1)}
                        </TableCell>
                        {row}
                    </TableRow>
                )
            })

            const header = bounds2.map((val2) => {
                const header_val=convert_format('0.0%', val2)
                return (
                    <TableCell>{header_val}</TableCell>)
            })



            return (
                <TableContainer comonent={Paper}>
                    <TableRow>
                        <TableCell>
                        </TableCell>
                        {header}
                    </TableRow>
                    {table}
                </TableContainer>
            )


        })
        return tables
    }


    //Execute Functions
    const _tables = generateTables("Annual!D73")
    console.log(_tables)


    return (

        _tables.map(table => {
            return (
                <div>
                    <div>Table</div>
                    <div>{table}</div>
                </div>
            )
        })
    )
}
