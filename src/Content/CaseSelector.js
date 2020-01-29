import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import isEqual from "lodash.isequal";

const useStyles = makeStyles(theme => ({
    formControl: {
        // margin: theme.spacing(1),
        // backgroundColor: 'yellow',
        minWidth: 150
    },
    caseSelect: {
        marginTop: '1px',
        fontFamily: 'Questrial',
        fontSize: '0.8em',
        background: '#F1F2EF',
        padding: '2px',
    },
    caseItem: {
        fontFamily: 'Questrial',
        fontSize: '0.9em',
        background: '#FEFEFD'
    }

}));

export default function CaseSelector(props) {
    const classes = useStyles();

    const getCurrCase = () => {
        return Object.entries(props.cases[0]).reduce((acc, caseInfo) => {
                if (isEqual(caseInfo[1], props.currInputVal)) {
                    acc.currCase = caseInfo[0]
                }
                return acc
            }, {currCase: ''}
        )
    }


    const getAllCases = () => {
        return Object.keys(props.cases[0]).map(_case => {
            return <MenuItem key={_case} classes={{root: classes.caseItem}} value={_case}>{_case}</MenuItem>
        })
    }

    const curr_case = getCurrCase()
    const case_elements = getAllCases()

    return (
        <div>
            <FormControl
                className={classes.formControl}
                //disableScrollLock={true}
            >
                <Select
                    classes={{selectMenu: classes.caseSelect}}
                    value={curr_case.currCase}
                    onChange={props.handleCaseChange}
                    displayEmpty
                    disableUnderline
                    MenuProps={{
                        disableScrollLock: true
                    }}>

                    {case_elements}

                </Select>
            </FormControl>
        </div>
    );
}
