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
        fontFamily: 'Questrial',
        minWidth: '6.5%',
        fontSize: '0.70em',
        color: '#4185D3',
        letterSpacing: '3px'
    },
    modelname: {
        display: 'flex',
        fontSize: '1.1em',
        color: '#292F36',
        fontFamily: 'Questrial',
        textTransform: 'uppercase',
        // marginRight:
        // positon:'fixed'
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

    const homeClick = () => {
        props.clearState()
    }


    return (
        <div className={classes.root}>
            <h3 className={classes.logo}>FLEXBOARD</h3>
            <div className={classes.modelname}><h5>{props.dashName}</h5></div>
            <div style={{display:'flex', padding:'3px'}}>
                <div style={{fontFamily:'Questrial', fontSize:'0.9em', marginRight:'10px', fontWight:'100', color:'#9DA0A3'}}><h5>Log out Anubhav</h5></div>
                <IconButton
                    edge="start"
                    aria-label="menu"
                    component={Link}
                    to="/home"
                    onClick={() => homeClick()}
                    style={{textDecoration: 'none'}}>
                    <HomeSharpIcon className={classes.icon}/>
                </IconButton>
            </div>
        </div>
    );
}