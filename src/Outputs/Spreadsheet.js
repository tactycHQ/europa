import React, {useRef, useEffect, useState} from "react";
import {read, utils} from "@sheet/core";
import {makeStyles} from '@material-ui/core/styles'

// import ssf from "../utils/fixformats"

export default function Spreadsheet(props) {
    const useStyles = makeStyles(theme => ({
        sheetContainer: {
            display: 'flex',
            width: '100%',
            height: '95vh',
            marginLeft: '15%',
            justifyContent: 'flex-start',
            background: 'yellow'
            // alignItems:'center'
        },
        spreadsheet: {
            display: 'flex',
            border: 'solid',
            borderWidth: '1px',
            borderColor: '#D0D3D6',
            background: '#F8F8F7',
            cursor: 'cell',
            // margin: '5px',
            // width:'100%',
            // marginLeft: '20%'
            // height:'100%',
            // marginBottom:'50vh'
            // overflowX:'scroll',
            // borderColor: 'red'
        }
    }))
    const classes = useStyles()
    const sheetEl = useRef(null)
    const worksheet = props.worksheet


    const getOldColor = (newCell) => {
        if (worksheet.hasOwnProperty(newCell) && worksheet[newCell].hasOwnProperty('s') && worksheet[newCell]['s'].hasOwnProperty('fgColor')) {
            return worksheet[newCell].s.fgColor.rgb
        } else {
            return "FFFFFF"
        }

    }

    const getValue = (newCell) => {
        if (worksheet.hasOwnProperty(newCell) && worksheet[newCell].hasOwnProperty('v')) {
            return worksheet[newCell].v
        } else {
            return 0
        }
    }

    const getFormat = (newCell) => {
        if (worksheet.hasOwnProperty(newCell) && worksheet[newCell].hasOwnProperty('z')) {
            return worksheet[newCell].z
        } else {
            return 'General'
        }
    }

    const onMouseClick = (e) => {
        e.persist()


        let newCell = e.target.id.replace("sjs-", "")
        let oldColor = getOldColor(newCell)
        let v = getValue(newCell)
        let format = getFormat(newCell)

        // if (props.clickedCells !== {} && props.clickedCells.address === newCell) {
        //     setToFixColor(props.clickedCells)

        if (props.clickedCells.hasOwnProperty('address')) {
            worksheet[props.clickedCells.address].s.fgColor.rgb = props.clickedCells.oldColor
        }

        if (worksheet.hasOwnProperty(newCell)) {
            props.addClickedCell(newCell, oldColor, v, format)
            worksheet[newCell].s.fgColor = {rgb: "FCCA46"}
        }
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


    return (
        <div className={classes.sheetContainer}>
            <div
                className={classes.spreadsheet}
                ref={sheetEl}
                onMouseUp={(evt) => onMouseClick(evt)}
            />
        </div>
    )
}






