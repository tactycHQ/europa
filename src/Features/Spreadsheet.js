import React, {useRef, useEffect} from "react";
import {utils} from "@sheet/core";
import {makeStyles} from '@material-ui/core/styles'
import {Card, Button} from "@material-ui/core";
import "./sheetstyles.css"


// import ssf from "../utils/fixformats"

export default function Spreadsheet(props) {
    const useStyles = makeStyles(theme => ({
        topContainer: {
            display: 'flex',
            height: '100',
            marginLeft: '20%',
            justifyContent: 'flex-start',
            background: '#FEFEFD',
            // alignItems:'center'
        },
        sheetContainer: {
            display: 'flex',
            position: 'fixed',
            top: 35,
            padding: '2px',
            paddingBottom: '0px',
            backgroundColor: '#FEFEFD',
            // backgroundColor: 'red',
            width: '100%'
        },
        sheet: {
            display: 'flex',
            background: '#4F545A',
            margin: '2px',
            marginBottom: '0px',
            padding: '8px',
            paddingTop: '2px',
            paddingBottom: '0px',
            fontSize: '0.7em',
            fontFamily: 'Questrial',
            color: '#F4F9E9',
            borderRadius: "5px 5px 0px 0px"
        },
        spreadsheet: {
            display: 'flex',
            border: 'solid',
            marginTop: '22px',
            marginBottom: '22px',
            borderWidth: '1px',
            boxShadow: '5px 10px',
            borderColor: '#D0D3D6',
            // background: 'yellow',
            cursor: 'cell',
            userSelect: 'none'
        }
    }))
    const classes = useStyles()
    const sheetEl = useRef(null)
    useEffect(() => {
        sheetEl.current.innerHTML = utils.sheet_to_html(props.worksheet)
    }, [props.worksheet, props.selectedCells, props.clickedCells, props.selectedLabels])


    const onMouseClick = (e) => {
        if (props.enableClick) {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation()


            if (props.labelSelectMode) {
                props.updateSelectedLabels(e.target.id.replace("sjs-", ""), e.target.innerText, props.currSheet)

            } else {
                let newCell = e.target.id.replace("sjs-", "")
                if (props.worksheet.hasOwnProperty(newCell)) {
                    if (props.IOState === 'inputs') {
                        props.addClickedCell(newCell, props.currSheet)
                    } else {
                        props.addSelectedCells(newCell, props.currSheet)
                    }
                }
            }
        }

    }

    const onSheetClick = (e, sheet) => {
        props.handleSheetChange(sheet)
    }

    const createSheets = () => {
        return props.sheets.map(sheet => {
            return (
                <Button key={sheet} className={classes.sheet} onClick={e => onSheetClick(e, sheet)}>{sheet}</Button>)
        })
    }

    const sheets = createSheets()


    return (
        <div className={classes.topContainer}>
            <Card
                className={classes.spreadsheet}
                ref={sheetEl}
                onClick={(evt) => onMouseClick(evt)}
            />
            <Card className={classes.sheetContainer} elevation={0} square={true}>
                {sheets}
            </Card>
        </div>
    )
}






