import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        // color: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '48.5vw',
        marginTop: '25vh'
    },
    circle:{
        color:'#006E9F'
    }
}));

export default function Spinner() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CircularProgress classes={{root:classes.circle}} color="primary" thickness={1.0}/>
        </div>
    );
}