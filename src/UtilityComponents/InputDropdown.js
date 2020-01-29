import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";
import {makeStyles} from "@material-ui/core";

export function InputDropdown(props) {

    //Styles
    const useStyles = makeStyles(theme => ({
        labelSelectorContainer: {
            display: 'flex',
            // paddingLeft:'5%',
            // paddingRight:'5%',
            justifyContent: 'center',
            // background:'yellow'
        },
        selectionContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            // maxwidth:'30%',
            justifyContent: 'space-between',
            padding: '0px',
            // background:'blue'
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
            marginRight: '50px',
            borderStyle: 'solid'
        },
        caseSelect: {
            // marginTop: '1px',
            fontFamily: 'Questrial',
            textAlign: 'center',
            fontSize: '0.8em',
            background: '#F1F2EF',
        },
        caseItem: {
            fontFamily: 'Questrial',
            fontSize: '0.9em',
            background: '#FEFEFD',
        }

    }));
    const classes = useStyles()

    //Custom variables

    const inputAdds = Object.keys(props.inputLabelMap)

    //Generate list of category items for drop down
    const menuItems = inputAdds.map(inAdd => {
        return (<MenuItem key={inAdd} classes={{root: classes.caseItem}}
                          value={inAdd}>{props.inputLabelMap[inAdd]}</MenuItem>)
    })



    //Generate list of labelitems for drop down
    // const menuLabelItems = outputLabels.map(combo => {
    //     const outAdd = combo[0]
    //     const outLabel = combo[1]
    //     return (<MenuItem key={outAdd} classes={{root: classes.caseItem}} value={outAdd}>{outLabel}</MenuItem>)
    // })

    //Custom Functions to get label and category to show

    //Function Execution
    // const in1DropDown = createInput1DropDowns()


    return (
        <div className={classes.labelSelectorContainer}>
            <div className={classes.selectionContainer}>
                <div className={classes.labelContainer}>
                    <h4 className={classes.labelSelectorText}>Input 1</h4>
                    <FormControl
                        className={classes.formControl}
                        color={"secondary"}
                        size="small"
                    >
                        <Select
                            classes={{selectMenu: classes.caseSelect}}
                            value={props.input1}
                            onChange={props.handleInput1Change}
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
            </div>
            <div className={classes.selectionContainer}>
                <div className={classes.labelContainer}>
                    <h4 className={classes.labelSelectorText}>Input 2</h4>
                    <FormControl
                        className={classes.formControl}
                        // disableScrollLock={true}
                    >
                        <Select
                            classes={{selectMenu: classes.caseSelect}}
                            value={props.input2}
                            onChange={props.handleInput2Change}
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
            </div>
        </div>
    )
}


