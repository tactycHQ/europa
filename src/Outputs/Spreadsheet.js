import React, {useRef, useEffect} from "react";
import {utils} from "@sheet/core";
import {makeStyles} from '@material-ui/core/styles'
import {Card, Button} from "@material-ui/core";

// import ssf from "../utils/fixformats"

export default function Spreadsheet(props) {
    const useStyles = makeStyles(theme => ({
        topContainer: {
            display: 'flex',
            width: '100%',
            height: '95vh',
            marginLeft: '20%',
            justifyContent: 'flex-start',
            background: '#FEFEFD'
            // alignItems:'center'
        },
        sheetContainer: {
            display: 'flex',
            position: 'fixed',
            top: 35,
            padding: '2px',
            paddingBottom:'0px',
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
            paddingTop:'2px',
            paddingBottom:'0px',
            fontSize: '0.7em',
            fontFamily: 'Questrial',
            color: '#F4F9E9',
            borderRadius: "5px 5px 0px 0px"
        },
        spreadsheet: {
            display: 'flex',
            border: 'solid',
            marginTop:'22px',
            borderWidth: '1px',
            borderColor: '#D0D3D6',
            background: '#F8F8F7',
            cursor: 'cell',
        }
    }))
    const classes = useStyles()
    const sheetEl = useRef(null)
    const worksheet = props.worksheet


    const onMouseClick = (e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation()

        let newCell = e.target.id.replace("sjs-", "")

        if (worksheet.hasOwnProperty(newCell)) {
            props.addClickedCell(newCell, props.currSheet)
        }
    }

    const onSheetClick = (e, sheet) => {
        props.handleSheetChange(sheet)
    }

    useEffect(() => {
        const createHTML = () => {
            let html = utils.sheet_to_html(worksheet); // first worksheet HTML
            html = html.replace("border-color:black", "border-color:#F1F2EF")
            html = html.replace("border:1px", "border:1px")
            return html
        }

        sheetEl.current.innerHTML = createHTML(worksheet)
    }, [worksheet, props.clickedCells])


    const createSheets = () => {
        return props.sheets.map(sheet => {
            return (<Button key={sheet} className={classes.sheet} onClick={e => onSheetClick(e, sheet)}>{sheet}</Button>)
        })
    }

    const sheets = createSheets()


    return (
        <div className={classes.topContainer}>
            <div
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






