import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import {Card} from "@material-ui/core";
import Button from "@material-ui/core/Button"
import {Switch, Route, Redirect} from 'react-router-dom'
import Main from "./Main";
import {useAuth0} from "../react-auth0-spa"


// import Button from "@material-ui/core/Button";
// import {Switch, Route} from 'react-router-dom'
// import Spreadsheet from "./Spreadsheet";


export default function LandingPage() {

    // Defining Hooks
    const useStyles = makeStyles(theme => ({
        root: {
            display: 'flex',
            width: '100%',
            height: '100vh',
            flexDirection: 'column',
            background: 'linear-gradient(#5CA2C1 30%, #B9D7E4)'
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
            position: 'fixed',
            zIndex: '2'
        },
        logo: {
            display: 'flex',
            fontFamily: 'Questrial',
            minWidth: '6.5%',
            fontSize: '3.5em',
            color: 'white',
            letterSpacing: '6px',
            marginTop:'5vh',
            marginBottom:'2px'
        },
    }))
    const classes = useStyles()

    const {isAuthenticated, loginWithRedirect, logout} = useAuth0()

    let mainEl
    if (isAuthenticated) {
        mainEl = (
            <Card className={classes.mainPage}>
                <Redirect to={{pathname: '/home'}}/>
            </Card>
        )
    } else {
        mainEl = (
            <div className={classes.mainPage} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <div style={{display:'flex', width:'100%', justifyContent:'space-between', alignItems:'center', padding:'10px'}}>
                    <h1 className={classes.logo} style={{fontSize:'1em', letterSpacing:'1px', fontWeight:'100', margin:'0px',marginTop:'3px'}}>How does Flexboard Work?</h1>
                    <h1 className={classes.logo} style={{fontSize:'1em', letterSpacing:'1px', fontWeight:'100', margin:'0px', marginTop:'3px'}}>About Us</h1>
                </div>
                <h6 className={classes.logo}>FLEXBOARD</h6>
                <h1 className={classes.logo} style={{fontSize:'1em', letterSpacing:'1px', fontWeight:'100', marginTop:'3px'}}>Bring Excel Models to Life.</h1>
                <Button style={{
                    marginTop:'50px',
                    backgroundColor: '#A5014B',
                    fontFamily:'Questrial',
                    fontSize:'1em',
                    width:'300px',
                    color:'#E7F1F6'
                }} onClick={() => loginWithRedirect()}>Secure Log in</Button>
            </div>
        )
        // mainEl = <Main logout={logout}/>

    }

    return (
        <div>
            <Switch>
                <Route exact path={"/"}>
                    <Paper className={classes.root} square="true">
                        {mainEl}
                    </Paper>
                </Route>
                <Route exact
                       path={"/(home|summary|dashboard|distributions|inputimportance|sensitivity|scenario|spreadsheet)"}>
                    <Main logout={logout}/>
                </Route>
            </Switch>
        </div>
    )
}


