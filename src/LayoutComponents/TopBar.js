import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        // marginRight: theme.spacing(2),
        textAlign: 'center',
        color: '#eeeeee'
    },
    dense: {
        display: 'flex',
        background: 'linear-gradient(#263238, #37474f)',
        // backgroundColor: '#263238',#37474f
        justifyContent: 'space-between',
        maxHeight: '4vh'
    },
    modelname: {
        fontSize: '1.3em',
        color: '#eeeeee',
        fontFamily: 'Quicksand',
        textTransform: 'uppercase'
    }
}));

export default function DenseAppBar(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar classes={{dense: classes.dense}} variant="dense">
                    <IconButton edge="start" className={classes.menuButton} aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <div className={classes.modelname}><h5>{props.dashName}</h5></div>
                    <IconButton edge="start" className={classes.menuButton} aria-label="menu">
                        <HomeTwoToneIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
}