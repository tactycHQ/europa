import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
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
    const [currCase, setcurrCase] = React.useState('');

    const getCurrCase = () => {
        return Object.entries(props.cases[0]).reduce((acc, caseInfo) => {
                if (isEqual(caseInfo[1], props.currInputVal)) {
                    acc.currCase = caseInfo[0]
                    console.log(caseInfo[0])
                }
                return acc
            }, {currCase: ''}
        )
    }


    const curr_case = getCurrCase()


    return (
        <div>
            <FormControl
                className={classes.formControl}
                disableScrollLock={true}
                // size="small"
                // margin="dense"
                // variant="standard"
                // fullWidth={true}
            >
                <Select
                    classes={{selectMenu: classes.caseSelect}}
                    value={curr_case.currCase}
                    onChange={props.handleCaseChange}
                    displayEmpty
                    disableUnderline
                    MenuProps={{
                        disableScrollLock: true
                    }}

                >
                    <MenuItem classes={{root: classes.caseItem}} value="">..being changed</MenuItem>
                    <MenuItem classes={{root: classes.caseItem}} value={"Low"}>Low</MenuItem>
                    <MenuItem classes={{root: classes.caseItem}} value={"Base"}>Base</MenuItem>
                    <MenuItem classes={{root: classes.caseItem}} value={"High"}>High</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}
