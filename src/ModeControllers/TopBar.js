import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import HomeSharpIcon from '@material-ui/icons/HomeSharp'
import {Link} from "react-router-dom";

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
        marginLeft: '10px',
        fontFamily:'Questrial',
        minWidth: '6.5%',
        fontSize:'0.70em',
        color: '#4185D3',
        letterSpacing:'3px'
    },
    modelname: {
        display: 'flex',
        fontSize: '1.1em',
        color: '#292F36',
        fontFamily: 'Questrial',
        textTransform: 'uppercase',
        marginRight:'6%'
    },
    icon: {
        display: 'flex',
        color: '#63655E',
        "&:hover": {
            color: "#4B719C"
        }
    }
}));

export default function DenseAppBar(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <h3 className={classes.logo}>EPOCH ONE</h3>
            <div className={classes.modelname}><h5>{props.dashName}</h5></div>
            <IconButton edge="start" aria-label="menu" component={ Link } to="/home" style={{textDecoration: 'none'}}>
                    <HomeSharpIcon className={classes.icon}/>

            </IconButton>
        </div>
    );
}