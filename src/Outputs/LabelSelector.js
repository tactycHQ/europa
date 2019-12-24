import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";
import {makeStyles} from "@material-ui/core";

export function LabelSelector(props) {

    const useStyles = makeStyles(theme => ({
        labelSelectorContainer: {
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: '5px',
            // padddingTop:0,
            textAlign: 'center',
            // background:'red',
            marginTop:"2%"
        },
        labelSelectorText: {
            fontFamily: 'Questrial',
            fontSize: '1.5em',
            fontWeight: '50',
            color: '#4F545A',
            marginRight: '10px'
        },
        saNote: {
            display: 'flex',
            clear:'both',
            color: '#4F545A',
            fontFamily: 'Questrial',
            fontWeight: '50',
            marginTop: '0%',
            marginLeft: '7px',
            // background: 'yellow'
        },
        formControl: {
            minWidth: 150
        },
        caseSelect: {
            marginTop: '1px',
            fontFamily: 'Questrial',
            fontSize: '1.0em',
            background: '#F1F2EF',
            padding: '2px',
        },
        caseItem: {
            fontFamily: 'Questrial',
            fontSize: '0.9em',
            background: '#FEFEFD'
        }

    }));

    const classes = useStyles()
    const defaultVal = Object.keys(props.outputs.labels)[0]
    let currDisplay = ''
    const getCurrDisplay = () => {
        if (props.currOutputCell === '') {
            currDisplay = defaultVal
        } else {
            currDisplay = props.currOutputCell
        }
        return currDisplay
    }

    const outputLabels = Object.entries(props.outputs.labels)
    const menuItems = outputLabels.map(combo => {
        const outAdd = combo[0]
        const outLabel = combo[1]
        return (<MenuItem key={outAdd} classes={{root: classes.caseItem}} value={outAdd}>{outLabel}</MenuItem>)
    })

    const _currDisplay = getCurrDisplay()

    return (
        <div className={classes.labelSelectorContainer}>
            <h2 className={classes.labelSelectorText}>Sensitivity Analysis for {props.outputs.category}</h2>
            <FormControl
                className={classes.formControl}
                disableScrollLock={true}
            >
                <Select
                    classes={{selectMenu: classes.caseSelect}}
                    // defaultValue='Test'
                    value={_currDisplay}
                    onChange={props.handleOutputLabelChange}
                    displayEmpty
                    disableUnderline
                    MenuProps={{
                        disableScrollLock: true
                    }}
                >

                    {menuItems}
                </Select>
            </FormControl>
        </div>

    )

}

