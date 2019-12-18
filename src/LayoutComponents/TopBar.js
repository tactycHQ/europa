import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';

const useStyles = makeStyles(theme => ({
    root: {
        display:'flex',
        // background: 'radial-gradient(circle, #FEFEFD, #D2DBE6)',
        justifyContent: 'space-between',
        alignItems:'center',
        maxHeight: '5vh',
        width:'100%',
        backgroundColor:'#FEFEFD'
        // borderBottomColor:'#EEF0EB',
        // borderStyle:'solid',
        // borderWidth:'1px',
        // strokeLinecap: 'round'
    },
    menuButton: {
        // marginRight: theme.spacing(2),
        marginLeft:'5px',
        textAlign: 'center',
        color: '#292F36'
    },
    dense: {
        // backgroundColor: '#263238',#37474f
        // maxHeight: '3vh',
    },
    modelname: {
        fontSize: '1.1em',
        color: '#292F36',
        fontFamily: 'Questrial',
        textTransform: 'uppercase'
    }
}));

export default function DenseAppBar(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <IconButton edge="start" className={classes.menuButton} aria-label="menu">
                <MenuIcon/>
            </IconButton>
            <div className={classes.modelname}><h5>{props.dashName}</h5></div>
            <IconButton edge="start" className={classes.menuButton} aria-label="menu">
                <HomeTwoToneIcon/>
            </IconButton>
        </div>
    );
}