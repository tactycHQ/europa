import React, {useRef, useEffect, useState} from "react";
import {utils} from "@sheet/core";
import {makeStyles} from '@material-ui/core/styles'
import {Card, Button} from "@material-ui/core";
import {Scrollbars} from 'react-custom-scrollbars'
import "./sheetstyles.css"
import {isEmpty} from "../utils/utils";


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
            margin: '2px',
            marginBottom: '0px',
            padding: '8px',
            paddingTop: '2px',
            paddingBottom: '0px',
            fontSize: '0.7em',
            fontFamily: 'Questrial',
            color: '#F4F9E9',
            borderRadius: "5px 5px 0px 0px",
            overflow: 'hidden',
            height: '20px'
        },
        activeSheet: {
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
            borderRadius: "5px 5px 0px 0px",
            overflow: 'hidden',
            height: '20px'
        },
        spreadsheet: {
            display: 'flex',
            border: 'solid',
            marginTop: '35px',
            marginBottom: '22px',
            borderWidth: '1px',
            boxShadow: '5px 5px #C4C6C8',
            borderColor: '#D0D3D6',
            // background: 'yellow',
            cursor: 'cell',
            userSelect: 'none'
        }
    }))
    const classes = useStyles()
    const sheetEl = useRef(null)
    const [highlight, setHighlight] = useState([])


    const MAXINPUTS = 5

    useEffect(() => {
        sheetEl.current.innerHTML = utils.sheet_to_html(props.worksheet)
        // console.log(sheetEl.current.innerHTML)
    }, [props.worksheet, props.selectedCells, props.selectedLabels])

    // useEffect(() => {
    //     if (!isEmpty(highlight)) {
    //         document.getElementById(highlight[0]).style.backgroundColor = 'yellow'
    //     }
    // }, [highlight])


    const onMouseClick = (e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation()

        let newCell = e.target.id.replace("sjs-", "")

        if (props.IO === 'inputs' && props.worksheet.hasOwnProperty(newCell) && !props.worksheet[newCell].hasOwnProperty('f')) {
            if (props.enableClick) {
                if (props.inputs.length < MAXINPUTS) {
                    if (!isEmpty(props.clickedCells)) {
                        document.getElementById("sjs-" + props.clickedCells.raw).style.backgroundColor = "white"
                    }
                    document.getElementById(e.target.id).style.backgroundColor = 'yellow'
                    // setHighlight([e.target.id, document.getElementById(e.target.id).style.backgroundColor])
                    props.addClickedCell(newCell, props.currSheet)
                }
            }

        } else if (props.IO === 'outputs' && props.worksheet.hasOwnProperty(newCell)) {
            if (props.stage === 'labelSelect' || props.stage === 'labelComplete') {
                props.addSelectedLabels(newCell, e.target.innerText, props.currSheet)
            } else {
                props.addSelectedCells(newCell, props.currSheet)
            }
        }
    }

    const onSheetClick = (e, sheet) => {
        props.handleSheetChange(sheet)
    }


    const createSheets = () => {
        let sheetEl = props.sheets.map(sheet => {
            let bg = '#4F545A'
            if (sheet === props.currSheet) {
                bg = '#006E9F'
            }

            return (
                <Button key={sheet} className={classes.sheet} style={{backgroundColor: bg}}
                        onClick={e => onSheetClick(e, sheet)}>{sheet}</Button>)
        })

        return (
            <Scrollbars
                style={{width: 1100, height: 33}}
                autoHide
                renderThumbHorizontal={({style, ...props}) => <div {...props} style={{
                    ...style,
                    backgroundColor: '#A5014B',
                    width: '4px'
                }}/>
                }
            >
                <div style={{display: 'flex'}}>
                    {sheetEl}
                </div>
            </Scrollbars>
        )
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






