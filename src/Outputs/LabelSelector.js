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
            flexWrap: 'wrap',
            justifyContent: 'center',
            padding: '0px'
        },
        labelContainer: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px'
        },
        labelSelectorText: {
            fontFamily: 'Questrial',
            fontSize: '1.0em',
            fontWeight: '600',
            color: '#006E9F',
            marginRight: '10px',
            marginTop: '0px',
            marginBottom: '0px'
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
            borderStyle: 'solid'
        },
        caseSelect: {
            // marginTop: '1px',
            fontFamily: 'Questrial',
            textAlign: 'center',
            fontSize: '0.8em',
            background: '#F1F2EF',
            // background: 'red',
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
    const createLabelDropDowns = () => {
        if (props.type === 'withLabel') {
            return (
                <div className={classes.selectionContainer}>
                    <div className={classes.labelContainer}>
                        <h4 className={classes.labelSelectorText}>Output Label</h4>
                        <FormControl
                            className={classes.formControl}
                            // disableScrollLock={true}
                        >
                            <Select
                                classes={{selectMenu: classes.caseSelect}}
                                value={props.currOutputCell}
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
    }

        //Function Execution
        const categoryDropDown = createLabelDropDowns()


        return (
            <div className={classes.labelSelectorContainer}>
                <div className={classes.selectionContainer}>
                    <div className={classes.labelContainer}>
                        <h4 className={classes.labelSelectorText}>Output Category</h4>
                        <FormControl
                            className={classes.formControl}
                            color={"secondary"}
                            size="small"
                            // disableScrollLock={true}
                        >
                            <Select
                                classes={{selectMenu: classes.caseSelect}}
                                value={props.currCategory}
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
                    {categoryDropDown}
                </div>
            </div>
        )
    }


