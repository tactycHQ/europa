import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Content from "./Content";
import TopBar from "./TopBar";
import SideBar from "./SideBar";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    top:{
        display: 'flex',
        position: 'fixed',
        width:'100%',
        height:'6vh',
        zIndex:'1'
    },
    middle:{
        display:'flex',
        marginTop:'6vh',
        marginBottom:'3vh'
    },
    bottom:{
        fontSize:'0.8em',
        fontFamily: 'Roboto',
    }
}));

export default function Layout() {
    const classes = useStyles();


    return (
        <div className={classes.root}>
            <Grid container spacing={0}>
                <Grid className={classes.top} item xs={12} lg={12}>
                    <TopBar/>
                </Grid>
                <Grid item xs={12} lg={12}>
                    <div className={classes.middle}>
                        <SideBar />
                        <Content />
                    </div>
                </Grid>
                <Grid className={classes.bottom} item xs={12} lg={12}>
                    Copyright Information, Epoch One, LLC 2019
                </Grid>
            </Grid>
        </div>
    );
}