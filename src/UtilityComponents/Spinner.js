import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
        root: {
            display: 'flex',
            position: 'fixed',
            left: '48%',
            bottom:'50%'
        },
        circle: {
            color: '#89023E'
        }
    }))
;

export default function Spinner() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CircularProgress
                classes={{root: classes.circle}}
                thickness={1.0}/>
        </div>
    );
}