import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";
import {makeStyles} from "@material-ui/core";

export function LabelSelector(props) {

    //Styles
    const useStyles = makeStyles(theme => ({
        labelSelectorContainer: {
            display: 'flex',
            justifyContent: 'center'
        },
        selectionContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            maxHeight: '1%',
            marginRight: '10px',
            marginBottom:'10px',
            padding: '0px'
        },
        labelSelectorText: {
            fontFamily: 'Questrial',
            fontSize: '1.0em',
            fontWeight: '800',
            color: '#4B719C',
            marginRight: '10px',
            marginTop:'0px',
            marginBottom:'0px'
        },
        saNote: {
            display: 'flex',
            clear: 'both',
            color: '#4F545A',
            fontFamily: 'Questrial',
            fontWeight: '50',
            marginTop: '0%',
            marginLeft: '7px',
        },
        formControl: {
            minWidth: 200,
            marginRight: '75px',
        },
        caseSelect: {
            // marginTop: '1px',
            fontFamily: 'Questrial',
            textAlign:'center',
            fontSize: '0.9em',
            background: '#F1F2EF',
        },
        caseItem: {
            fontFamily: 'Questrial',
            fontSize: '0.9em',
            background: '#FEFEFD'
        }

    }));
    const classes = useStyles()

    //Custom variables
    const currOutput = props.outputs.find(i => (i.category === props.currCategory))
    const defaultLabelVal = Object.keys(currOutput.labels)[0]
    const defaultCatVal = Object.keys(currOutput.category)[0]
    const outputLabels = Object.entries(currOutput.labels)
    const outputCats = props.outputs.map(output => output.category)

    //Generate list of category items for drop down
    const menuCatItems = outputCats.map(category => {
        return (<MenuItem key={category} classes={{root: classes.caseItem}} value={category}>{category}</MenuItem>)
    })

    //Generate list of labelitems for drop down
    const menuLabelItems = outputLabels.map(combo => {
        const outAdd = combo[0]
        const outLabel = combo[1]
        return (<MenuItem key={outAdd} classes={{root: classes.caseItem}} value={outAdd}>{outLabel}</MenuItem>)
    })

    //Custom Functions to get label and category to show
    const getCurrLabelDisplay = () => {
        let currLabelDisplay
        if (props.currOutputCell === '') {
            currLabelDisplay = defaultLabelVal
        } else {
            currLabelDisplay = props.currOutputCell
        }
        return currLabelDisplay
    }

    const getCurrCatDisplay = () => {
        let currCatDisplay
        if (props.currCategory === '') {
            currCatDisplay = defaultCatVal
        } else {
            currCatDisplay = props.currCategory
        }
        return currCatDisplay
    }

    //Function Execution
    const _currLabelDisplay = getCurrLabelDisplay()
    const _currCatDisplay = getCurrCatDisplay()

    return (
        <div className={classes.labelSelectorContainer}>
            <div className={classes.selectionContainer}>
                <h4 className={classes.labelSelectorText}>Category </h4>
                <FormControl
                    className={classes.formControl}
                    // disableScrollLock={true}
                >
                    <Select
                        classes={{selectMenu: classes.caseSelect}}
                        value={_currCatDisplay}
                        onChange={props.handleOutputCategoryChange}
                        displayEmpty
                        disableUnderline
                        MenuProps={{
                            disableScrollLock: true
                        }}
                    >
                        {menuCatItems}
                    </Select>
                </FormControl>
            </div>
            <div className={classes.selectionContainer}>
                <h4 className={classes.labelSelectorText}>Label </h4>
                <FormControl
                    className={classes.formControl}
                    // disableScrollLock={true}
                >
                    <Select
                        classes={{selectMenu: classes.caseSelect}}
                        value={_currLabelDisplay}
                        onChange={props.handleOutputLabelChange}
                        displayEmpty
                        disableUnderline
                        MenuProps={{
                            disableScrollLock: true
                        }}
                    >
                        {menuLabelItems}
                    </Select>
                </FormControl>
            </div>
        </div>
    )
}


