import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Button from "@material-ui/core/Button";
import HomeSharpIcon from '@material-ui/icons/HomeSharp'
import {Link} from "react-router-dom"
import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp'
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import {useAuth0} from "../react-auth0-spa";


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxHeight: '5vh',
        width: '100%',
        backgroundColor: '#FEFEFD'
    },
    logo: {
        display: 'flex',
        marginLeft: '5px',
        fontFamily: 'Questrial',
        minWidth: '6.5%',
        fontSize: '0.70em',
        color: '#4185D3',
        letterSpacing: '3px'
    },
    modelname: {
        display: 'flex',
        position:'fixed',
        left:'45%',
        fontSize: '1.1em',
        color: '#292F36',
        fontFamily: 'Questrial',
        textTransform: 'uppercase',
        // marginRight: '10%',
        cursor: 'pointer'
        // positon:'fixed'
    },
    icon: {
        display: 'flex',
        color: '#63655E',
        "&:hover": {
            color: "#4B719C"
        }
    },
    renameField: {
        fontSize: '1.0em',
        fontWeight: '100',
        fontFamily: 'Questrial',
        margin: '0px',
        width: '100%'
    },
    labelField: {
        fontSize: '1.0em',
        fontWeight: '100',
        fontFamily: 'Questrial',
        margin: '0px'
    },
    labelFocused: {
        fontSize: '1.1em',
        fontWeight: '100',
        fontFamily: 'Questrial',
        margin: '0px'
    }
}));

export default function DenseAppBar(props) {
    const classes = useStyles()
    const [askRename, setAskRename] = useState(false)
    const [newName, setNewname] = useState('')
    const {user} = useAuth0()

    useEffect(() => {
        if (props.mode === 'loaded') {
            props.saveDash()
        }
        // eslint-disable-next-line
    }, [props.dashName])


    const homeClick = () => {
        props.clearState()
    }

    const handleRename = () => {
        if (newName === '') {
            props.updateMsg("Not a valid name")
            props.updateOpen(true)
        } else {
            props.updateDashname(newName)
            setAskRename(false)
        }
    }


    return (
        <div className={classes.root}>
            <h3 className={classes.logo}>FLEXBOARD</h3>
            <Tooltip title="Click to Rename" enterDelay={500}>
                <div className={classes.modelname} onClick={() => setAskRename(true)}><h5>{props.dashName}</h5></div>
            </Tooltip>
            <div style={{display: 'flex', padding: '3px'}}>
                <h6 style={{
                    fontSize: '0.75em',
                    color: '#292F36',
                    fontWeight: '200',
                    opacity:'85%',
                    fontFamily: 'Questrial',
                    marginRight: '10px',
                    marginTop: '20px',
                    marginBottom: '0px',
                    textTransform: 'uppercase'
                }}>Logged in as {user.nickname}</h6>
                <Tooltip title="Home / Manage Flexboards" enterDelay={500}>
                    <IconButton
                        edge="start"
                        aria-label="menu"
                        component={Link}
                        to="/home"
                        onClick={() => homeClick()}
                        style={{textDecoration: 'none'}}>
                        <HomeSharpIcon className={classes.icon}/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Logout" enterDelay={500}>
                    <IconButton
                        edge="start"
                        aria-label="menu"
                        component={Link}
                        to="/home"
                        onClick={() => props.logout()}
                        style={{textDecoration: 'none'}}>
                        <ExitToAppSharpIcon className={classes.icon}/>
                    </IconButton>
                </Tooltip>
            </div>
            <Dialog
                open={askRename}
                PaperProps={{
                    style:
                        {
                            display: 'flex',
                            width: '300px',
                            height: '200px',
                            padding: '10px',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'space-evenly'
                        },
                }}>
                <h3 style={{
                    fontSize: '1.0em',
                    color: '#A5014B',
                    fontWeight: '400',
                    fontFamily: 'Questrial',
                    margin: '0px'
                }}>Rename Flexboard
                </h3>
                <TextField
                    required
                    className={classes.renameField}
                    InputLabelProps={{
                        classes: {
                            root: classes.labelField,
                            focused: classes.labelFocused
                        }
                    }}
                    InputProps={{
                        classes: {
                            input: classes.renameField
                        }
                    }}
                    inputProps={{
                        maxLength: 30
                    }}
                    label="Dashboard Name"
                    defaultValue={props.dashName}
                    size="small"
                    onBlur={(e) => setNewname(e.target.value)}
                />

                <div style={{
                    display: 'flex',
                    marginTop: '10%',
                    width: '100%',
                    justifyContent: 'space-around',
                    alignItems: 'center'
                }}>
                    <Button style={{
                        display: 'flex',
                        background: '#006E9F',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: '#FEFEFD',
                        padding: '5px',
                        margin: '5px'
                    }} size="small"
                            onClick={() => handleRename()}
                    >
                        <h3 style={{
                            fontSize: '0.85em',
                            fontWeight: '100',
                            fontFamily: 'Questrial',
                            margin: '0px'
                        }}>OK</h3>
                    </Button>
                    <Button style={{
                        display: 'flex',
                        background: '#9DA0A3',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: '#FEFEFD',
                        padding: '5px',
                        margin: '5px'
                    }} size="small"
                            onClick={() => setAskRename(false)}
                    >
                        <h3 style={{
                            fontSize: '0.85em',
                            fontWeight: '100',
                            fontFamily: 'Questrial',
                            margin: '0px'
                        }}>CANCEL</h3>
                    </Button>
                </div>
            </Dialog>
        </div>
    );
}