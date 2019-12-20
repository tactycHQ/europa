import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        color: '#F4F9E9',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '44.5vw',
        marginTop: '25vh'
    },
    loadingText: {
        fontFamily: 'Questrial',
        fontSize: '1.3em',
        color: '#4B719C'
    }
}));

export default function Spinner() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CircularProgress color="primary"/>
            <h5 className={classes.loadingText}>Loading Dashboard</h5>
        </div>
    );
}