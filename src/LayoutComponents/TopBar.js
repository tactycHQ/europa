import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';

const useStyles = makeStyles(theme => ({
    root: {
        display:'flex',
        justifyContent: 'space-between',
        alignItems:'center',
        maxHeight: '5vh',
        width:'100%',
        backgroundColor:'#FEFEFD'
    },
    logo:{
        marginLeft:'10px',
        // height:'1%',
        width:'4.5%',
    },
    menuButton: {
        marginLeft:'5px',
        textAlign: 'center',
        color: '#292F36'
    },
    dense: {

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
            {/*<IconButton edge="start" className={classes.menuButton} aria-label="menu">*/}
                <img src="logo.png" alt="logo" className={classes.logo} />
                {/*<HomeTwoToneIcon/>*/}
            {/*</IconButton>*/}
            <div className={classes.modelname}><h5>{props.dashName}</h5></div>
            <IconButton edge="start" className={classes.menuButton} aria-label="menu">
                <MenuIcon/>
            </IconButton>
        </div>
    );
}