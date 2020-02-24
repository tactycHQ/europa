import React, {useState, useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import {Card} from "@material-ui/core"
import AddCircleSharpIcon from '@material-ui/icons/AddCircleSharp'
import {Link} from 'react-router-dom'
import {deleteRecord, getRecords, uploadFile} from "./api"
import Spinner from "../UtilityComponents/Spinner"
import IconButton from '@material-ui/core/IconButton'
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp'
import Dialog from "@material-ui/core/Dialog"
import Button from "@material-ui/core/Button"
import Dropzone from "react-dropzone"
import TextField from "@material-ui/core/TextField"
import {Redirect} from 'react-router-dom'
import {useAuth0} from "../react-auth0-spa"
import Slide from '@material-ui/core/Slide'

// import Button from "@material-ui/core/Button"
// import {Switch, Route} from 'react-router-dom'
// import Spreadsheet from "./Spreadsheet"


export default function Home(props) {

    // Defining Hooks
    const useStyles = makeStyles(theme => ({
        root: {
            display: 'flex',
            width: '100%',
            minHeight: '95vh',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: '10px',
            // background: 'red'
            background: 'linear-gradient(#CACDD6 10%, #193946)',
            // backgroundImage: `url(${Background})`
        },
        existingContainer: {
            display: 'flex',
            minWidth: '180px',
            flexDirection: 'column',
            width: '90%',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            background: 'linear-gradient(#F4F4F4 10%,#FEFEFD)',
            padding: '5px',
            margin: '10px'
        },
        existingdash: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            margin: '15px',
            padding: '5px',
            background: '#EBECEC',
            width: '100%',
            // height: '30px',
            cursor: 'pointer',
            "&:hover": {
                background: '#D5DBDD'
            }
        },
        newdashboardpaper: {
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginTop: '5px',
            marginBottom: '5px',
            padding: '5px',
            background: '#AD185B',
            // width: '180px',
            cursor: 'pointer',
            "&:hover": {
                background: '#006E9F',
            }
        },
        dashTitle: {
            fontFamily: 'Questrial',
            fontSize: '0.8em',
            fontWeight: '200',
            color: '#FEFEFD',
            marginLeft: '5px',
            marginTop: '0px',
            marginBottom: '0px',
        },
        selectButton: {
            display: 'flex',
            background: '#006E9F',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#FEFEFD',
            padding: '5px',
            margin: '5px'
        },
        buttonText: {
            fontSize: '0.85em',
            fontWeight: '100',
            fontFamily: 'Questrial',
            margin: '0px'
        },
        saveField: {
            fontSize: '0.85em',
            fontWeight: '100',
            fontFamily: 'Questrial',
            margin: '0px'
        },
        labelField: {
            fontSize: '0.95em',
            fontWeight: '100',
            fontFamily: 'Questrial',
            margin: '0px'
        },
        labelFocused: {
            fontSize: '1.1em',
            fontWeight: '100',
            fontFamily: 'Questrial',
            margin: '0px'
        },
    }))
    const classes = useStyles()
    const [records, setRecords] = useState([])
    const [apiComplete, setApiComplete] = useState(false)
    const [askDelete, setAskDelete] = useState(false)
    const [toDelete, setToDelete] = useState(null)
    const [askNewDash, setAskNewDash] = useState(false)
    const [newFile, setNewFile] = useState(null)
    const [username, setUsername] = useState('')
    const [newDashname, setNewDashname] = useState('')
    const [stage, setStage] = useState('awaitingUpload')
    const {getTokenSilently, user} = useAuth0()

    useEffect(() => {
        const executeGetUserRecords = async () => {
            let token = await getTokenSilently()
            setUsername(user.nickname)
            const userRecords = await getRecords(token)
            setRecords([...userRecords])
            setApiComplete(true)
        }
        executeGetUserRecords()
        // eslint-disable-next-line
    }, [])

    const resetState = () => {
        setAskNewDash(false)
        setAskDelete(false)
        setToDelete(null)
        setNewFile(null)
        setNewDashname('')
        setStage('awaitingUpload')
    }

    const openDash = (dash_id, dash_name) => {
        props.clearState()
        props.setDashid(dash_id)
        props.updateMode('processed')
        props.updateMsg("Opening " + dash_name + " Flexboard")
        props.updateOpen(true)
    }

    const createMyDashboards = () => {

        let recordsEl = (
            <div
                style={{
                    fontFamily: 'Questrial',
                    fontSize: '1.em',
                    fontWeight: '200',
                    color: '#006E9F',
                    marginBottom: '5px'
                }}
            >You have not yet created any dashboards</div>
        )

        if (records.length > 0) {
            recordsEl = records.map(record => {
                return (
                        <div key={record.id}
                            style={{display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                            <Paper className={classes.existingdash}
                                   component={Link} to="/dashboard"
                                   style={{textDecoration: 'none'}}
                                   elevation={3}
                                   onClick={() => openDash(record.id, record.name)}>
                                <h1 className={classes.dashTitle}
                                    style={{
                                        fontWeight: '600',
                                        fontSize: '1.0em',
                                        color: '#4185D3',
                                        textTransform: 'uppercase',
                                        letterSpacing: '2px'
                                    }}>
                                    {record.name}
                                </h1>
                                <h1 className={classes.dashTitle}
                                    style={{fontWeight: '100', fontSize: '0.9em', color: '#292F36'}}>
                                    {record.status}
                                </h1>
                                <h1 className={classes.dashTitle}
                                    style={{fontWeight: '100', fontSize: '0.9em', color: '#292F36'}}>Created by: {record.created_by}</h1>
                                <h1 className={classes.dashTitle}
                                    style={{fontWeight: '100', fontSize: '0.9em', color: '#292F36'}}>Last
                                    Accessed: {record.last_accessed}</h1>
                                <h1 className={classes.dashTitle}
                                    style={{fontWeight: '100', fontSize: '0.9em', color: '#292F36'}}>Shared
                                    By: {record.shared_by}</h1>
                            </Paper>
                            <IconButton onClick={() => askDeleteHandler(record.id)}>
                                <DeleteSharpIcon size="small" style={{
                                    color: '#8A8D91',
                                    marginLeft:'0px'
                                }}/>
                            </IconButton>
                        </div>
                )
            })
        }

        return (
            <>
                <Slide direction="down" in={true} timeout={600} mountOnEnter unmountOnExit>
                    <Paper
                        className={classes.newdashboardpaper}
                        elevation={20}
                        onClick={() => setAskNewDash(true)}
                    >
                        <AddCircleSharpIcon style={{color: '#FEFEFD'}}/>
                        <h1 className={classes.dashTitle} style={{
                            textTransform: 'uppercase',
                            letterSpacing: '2px'
                        }}>
                            Create New Flexboard
                        </h1>
                    </Paper>
                </Slide>
                <Card className={classes.existingContainer} elevation={10}>
                    <h1 className={classes.dashTitle} style={{
                        fontFamily: 'Questrial',
                        fontSize: '1.0em',
                        fontWeight: '500',
                        color: '#A5014B',
                        marginBottom: '10px',
                        textTransform: 'uppercase',
                        letterSpacing: '2px'
                    }}>{username}'s Flexboards</h1>
                    {recordsEl}
                </Card>
            </>
        )
    }

    const askDeleteHandler = (dash_id) => {
        setAskDelete(true)
        setToDelete(dash_id)
    }

    const deleteDashBoard = async (dash_id) => {
        let newRecords = records.filter(record => record.id !== toDelete)
        let token = await getTokenSilently()
        const response = await deleteRecord(dash_id, token)
        if (response === 'OK') {
            setToDelete(null)
            setRecords([...newRecords])
        }
    }

    const confirmDeleteHandler = (update) => {
        if (update === true) {
            deleteDashBoard(toDelete)
            setAskDelete(false)
        } else {
            setToDelete(null)
            setAskDelete(false)
        }
    }

    const selectionCompleteHandler = async () => {
        setStage('pendingUploadCompletion')
        let token = await getTokenSilently()
        const response = await uploadFile(newFile, newDashname, token)
        props.clearState()
        props.setDashid(response.dash_id)
        props.setDashName(newDashname)
        props.updateFilename(response.original_filename)
        props.updateMode("new")
        if (response.message === 'OK') {
            setStage('fileUploaded')
        }
    }

    const newDashSetup = () => {

        //Still in upload phase. OK not clicked yet
        if (askNewDash && stage === 'awaitingUpload') {
            let uploadEl
            let okEl

            //a file has been selected, so disabling UPLOAD FILE button
            if (newFile) {
                let rawfilename = newFile[0].name.toString()
                let filename
                if (rawfilename.length >= 25) {
                    filename = rawfilename.slice(0, 22) + "..."
                } else {
                    filename = rawfilename
                }

                uploadEl = (
                    <Button
                        className={classes.selectButton}
                        style={{backgroundColor: '#3DA32D'}}
                        disabled
                        size="small"
                    >
                        <h3 className={classes.buttonText} style={{color: '#FEFEFD'}}>{filename} selected</h3>
                    </Button>
                )


                //no file has been selected so showing UPLOAD FILE button
            } else {
                uploadEl = (
                    <Dropzone
                        onDrop={(file) => setNewFile(file)}
                        accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    >
                        {({getRootProps, getInputProps}) => (
                            <Button {...getRootProps()}
                                    className={classes.selectButton}
                                    style={{backgroundColor: '#006E9F'}}
                                    size="small"
                            >
                                <input {...getInputProps()} />
                                <h3 className={classes.buttonText}>Upload Excel Model</h3>
                            </Button>
                        )}
                    </Dropzone>
                )
            }

            if (newFile && newDashname !== '') {
                okEl = (<Button
                    className={classes.selectButton}
                    size="small"
                    onClick={() => selectionCompleteHandler()}
                >
                    <h3 className={classes.buttonText}>OK</h3>
                </Button>)
            }


            return (
                <Dialog
                    open={askNewDash}
                    PaperProps={{
                        style:
                            {
                                display: 'flex',
                                width: '300px',
                                height: '200px',
                                padding: '10px',
                                flexDirection: 'column',
                                justifyContent: 'space-evenly'
                            },
                    }}>
                    <TextField
                        required
                        className={classes.saveField}
                        InputLabelProps={{
                            classes: {
                                root: classes.labelField,
                                focused: classes.labelFocused
                            }
                        }}
                        InputProps={{
                            classes: {
                                input: classes.saveField
                            }
                        }}
                        inputProps={{
                            maxLength: 30
                        }}
                        label="Dashboard Name"
                        defaultValue=""
                        size="small"
                        onChange={(e) => setNewDashname(e.target.value)}
                    />
                    {uploadEl}
                    <h3 className={classes.buttonText}><em>Only *.xlsx or *.xls files are supported currently</em>
                    </h3>
                    <div style={{
                        display: 'flex',
                        marginTop: '10%',
                        width: '100%',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                    }}>
                        {okEl}
                        <Button className={classes.selectButton} style={{backgroundColor: '#9DA0A3'}} size="small"
                                onClick={() => resetState()}>
                            <h3 className={classes.buttonText}>Cancel</h3>
                        </Button>
                    </div>
                </Dialog>
            )

            //file has been uploaded, so showing "GO TO I/O" option
        } else if (askNewDash && stage === 'fileUploaded') {


            //loadFile has completed
            if (props.mode === 'pendingIO') {
                return (
                    <Redirect to={{pathname: '/spreadsheet'}}/>
                )

                //loadFile hasn't finished yet
            } else {
                return (
                    <Dialog
                        open={askNewDash}
                        PaperProps={{
                            style:
                                {
                                    display: 'flex',
                                    width: '300px',
                                    height: '200px',
                                    padding: '10px',
                                    flexDirection: 'column',
                                    justifyContent: 'space-evenly'
                                },
                        }}>
                        <div style={{
                            display: 'flex',
                            width: '100%',
                            height: '100%',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            alignItems: 'center'
                        }}>
                            <Spinner/>
                            <h3
                                className={classes.buttonText}
                                style={{color: '#A5014B'}}>Loading spreadsheet for viewing...</h3>
                        </div>
                    </Dialog>
                )
            }
        } else if (askNewDash && stage === 'pendingUploadCompletion') {

            return (
                <Dialog
                    open={askNewDash}
                    PaperProps={{
                        style:
                            {
                                display: 'flex',
                                width: '300px',
                                height: '200px',
                                padding: '10px',
                                flexDirection: 'column',
                                justifyContent: 'space-evenly'
                            },
                    }}>
                    <div style={{
                        display: 'flex',
                        width: '100%',
                        height: '100%',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        alignItems: 'center'
                    }}>
                        <Spinner/>
                        <h3 className={classes.buttonText} style={{color: '#A5014B'}}>Processing file...</h3>
                    </div>
                </Dialog>
            )
        }
    }

    let myDashboards = createMyDashboards()
    let newDashEl = newDashSetup()
    let finalEl

    if (apiComplete) {
        finalEl = (
            <div className={classes.root}>
                {myDashboards}
                <Dialog open={askDelete}
                        PaperProps={{
                            style:
                                {
                                    display: 'flex',
                                    width: '200px',
                                    height: '150px',
                                    padding: '10px',
                                    flexDirection: 'column',
                                    justifyContent: 'space-evenly',
                                    alignItems: 'center'
                                },
                        }}>
                    <div>
                        <h2 style={{
                            fontSize: '0.9em',
                            fontWeight: '100',
                            paddingLeft: '5px',
                            fontFamily: 'Questrial',
                            color: '#292F36',
                            margin: '10px'
                        }}>Delete this dashboard?</h2>
                    </div>
                    <div style={{display: 'flex', width: '100%', justifyContent: 'space-around'}}>
                        <Button className={classes.selectButton} size="small"
                                onClick={() => confirmDeleteHandler(true)}>
                            <h3 className={classes.buttonText}>Yes</h3>
                        </Button>
                        <Button className={classes.selectButton} size="small"
                                onClick={() => confirmDeleteHandler(false)}>
                            <h3 className={classes.buttonText}>No</h3>
                        </Button>
                    </div>
                </Dialog>
                {newDashEl}
            </div>
        )
    } else {
        finalEl = <Spinner/>
    }

    return (
        <>
            {finalEl}
        </>
    )
}


