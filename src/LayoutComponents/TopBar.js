import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import HomeSharpIcon from '@material-ui/icons/HomeSharp'
import {NavLink} from "react-router-dom";

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
        marginLeft: '10px',
        width: '4.5%'
    },
    modelname: {
        fontSize: '1.1em',
        color: '#292F36',
        fontFamily: 'Questrial',
        textTransform: 'uppercase'
    },
    icon: {
        color: '#292F36',
        "&:hover": {
            color: "#4B719C"
        }
    }
}));

export default function DenseAppBar(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <img src="logo.png" alt="logo" className={classes.logo}/>
            <div className={classes.modelname}><h5>{props.dashName}</h5></div>
            <IconButton edge="start" aria-label="menu">
                <NavLink to="/home" style={{textDecoration: 'none'}}>
                    <HomeSharpIcon className={classes.icon}/>
                </NavLink>
            </IconButton>
        </div>
    );
}