import React, {useRef, useEffect, useState} from "react";
import {read, utils} from "@sheet/core";
import {makeStyles} from '@material-ui/core/styles'
import Card from "@material-ui/core/Card";
import {convert_format} from "../utils/utils";
// import ssf from "../utils/fixformats"

export default function Spreadsheet() {
    const useStyles = makeStyles(theme => ({
        sheetContainer: {
            display: 'flex',
            width:'100%',
            height:'95vh',
            justifyContent:'flex-start',
            // alignItems:'center'
        },
        ioselect: {
            display: 'flex',
            position:'fixed',
            // top:25,
            left:0,
            background:'pink',
            minWidth:'20%',
            minHeight:'90vh'
        },
        spreadsheet: {
            display:'flex',
            border: 'solid',
            borderWidth: '1px',
            borderColor: '#D0D3D6',
            background: '#F8F8F7',
            cursor: 'cell',
            margin: '5px',
            width:'100%',
            marginLeft:'20%'
            // height:'100%',
            // marginBottom:'50vh'
            // overflowX:'scroll',
            // borderColor: 'red'
        }
    }))
    const classes = useStyles()
    const sheetEl = useRef(null)
    const [clickedCells, setClickedCell] = useState({})
    const [worksheet, setWorksheet] = useState(null)

    const getOldColor = (newCell) => {
        if (worksheet.hasOwnProperty(newCell) && worksheet[newCell].hasOwnProperty('s') && worksheet[newCell]['s'].hasOwnProperty('fgColor')) {
            return worksheet[newCell].s.fgColor.rgb
        } else {
            return "FFFFFF"
        }

    }


    const onMouseClick = (e) => {
        e.persist()

        let oldColor
        let to_add
        let newCell = e.target.id.replace("sjs-", "")

        if (newCell in clickedCells) {
            to_add = !clickedCells[newCell].to_add
            oldColor = clickedCells[newCell].old_color
        } else {
            to_add = true
            oldColor = getOldColor(newCell)
        }

        if (worksheet.hasOwnProperty(newCell)) {
            setClickedCell({
                ...clickedCells,
                [newCell]: {
                    to_add: to_add,
                    old_color: oldColor
                }
            })
        }
    }

    const createHTML = (ws) => {
        let html = utils.sheet_to_html(ws); // first worksheet HTML
        html = html.replace("border-color:black", "border-color:#F1F2EF")
        html = html.replace("border:1px", "border:1px")
        return html
    }

    const fixFormat = (ws) => {
        Object.keys(ws).forEach(function (address) {
            if (ws[address].hasOwnProperty('z') && ws[address].hasOwnProperty('v')) {
                // ws[address].w = convert_format(ws[address].z, ws[address].v)
                ws[address].w = convert_format(ws[address].z, ws[address].v)
            }
        })
        return ws
    }

    useEffect(() => {

        const api_url = "http://localhost:5000/downloadFile"
        const headers = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                filename: "lpi.xlsx"
            })
        }

        const getFile = async () => {
            fetch(api_url, headers)
                .then(res => res.arrayBuffer())
                .then(ab => {
                    const wb = read(ab, {
                            type: "array",
                            raw: true,
                            cellStyles: true,
                            cellNF: false,
                            cellText: false,
                            showGridLines: false
                        }
                    )
                    let ws = wb.Sheets[wb.SheetNames[0]]
                    ws["!gridlines"] = false;
                    ws = fixFormat(ws)
                    setWorksheet(ws)
                })
        }

        getFile()
    }, [])

    useEffect(() => {
        if (clickedCells && Object.keys(clickedCells).every(cell => worksheet.hasOwnProperty(cell))) {
            for (const cell in clickedCells) {
                if (clickedCells[cell].to_add === true) {
                    worksheet[cell].s.fgColor = {rgb: "FCCA46"}
                } else {
                    worksheet[cell].s.fgColor = {rgb: clickedCells[cell].old_color}
                }
            }
        }
        sheetEl.current.innerHTML = createHTML(worksheet)
    }, [worksheet, clickedCells])


    return (
        <div className={classes.sheetContainer}>
            <Card className={classes.ioselect}>Input Selections</Card>
            <div
                className={classes.spreadsheet}
                ref={sheetEl}
                onMouseUp={(evt) => onMouseClick(evt)}
            />
        </div>
    )
}






