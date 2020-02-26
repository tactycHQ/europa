import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button"
import {Card} from "@material-ui/core";

export default function HomePage(props) {

    // Defining Hooks
    const useStyles = makeStyles(theme => ({
        root: {
            display: 'flex',
            width: '100%',
            // height: '100vh',
            flexDirection: 'column',
            // backgroundImage: `url(${Background})`
            // background: 'linear-gradient(#F4F4F4 10%,#FEFEFD)',
            background: 'linear-gradient(#CACDD6 40%, #193946)',
        },
        top: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            position: 'fixed',
            zIndex: '2'
        },
        mainPage: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            // position: 'fixed',
            zIndex: '2'
        },
        logo: {
            display: 'flex',
            fontFamily: 'Questrial',
            justifyContent: 'center',
            fontWeight: '1000',
            minWidth: '6.5%',
            fontSize: '4.0em',
            color: '#486672',
            letterSpacing: '25px',
            marginTop: '8vh',
            marginBottom: '2px',
        },
    }))
    const classes = useStyles()

    return (
        <Paper className={classes.root} square={true}>
            <div className={classes.mainPage}
                 style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <div style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px'
                }}>
                    <h1 className={classes.logo} style={{
                        fontSize: '1em',
                        letterSpacing: '1px',
                        fontWeight: '500',
                        margin: '0px',
                        marginTop: '3px',
                    }}>How does Flexboard work?</h1>
                    <div style={{display:'flex', justifyContent: 'center', alignItems:'center'}}>
                        <Button
                            elevation={50}
                            style={{
                                backgroundColor: '#A5014B',
                                fontFamily: 'Questrial',
                                fontSize: '0.9em',
                                // padding:'5px',
                                width: '200px',
                                color: '#E7F1F6'
                            }}
                            onClick={() => props.loginWithRedirect()}>
                            Secure Log in
                        </Button>
                    </div>
                </div>
                <h6 className={classes.logo}>FLEXBOARD</h6>
                <h1 className={classes.logo} style={{
                    fontSize: '1.5em',
                    letterSpacing: '1px',
                    fontWeight: '100',
                    margin: '0px',
                    marginTop: '5px'
                }}>
                    Powering Enterprise Models to Life
                </h1>
                <Button
                    elevation={50}
                    style={{
                        marginTop: '30px',
                        backgroundColor: '#006E9F',
                        fontFamily: 'Questrial',
                        fontSize: '1em',
                        width: '300px',
                        color: '#E7F1F6'
                    }}>Create an Account</Button>
                <Card elevation={20} style={{display: 'flex', margin: '10px', width: '85%', padding:'0px',justifyContent: 'center'}}>
                    <video id="flexvideo" loop autoPlay muted
                           style={{margin: '10px', width: '75%', opacity: '100%'}}>
                        <source src="flexvideo.mp4" type="video/mp4"/>
                        Your browser does not support the video tag.
                    </video>
                </Card>
            </div>
        </Paper>
    )

}