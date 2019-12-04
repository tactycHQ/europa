import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
            root: {
                display: 'flex'
            },
            sidebar: {
                display:'flex',
                backgroundColor: '#eceff1',
                flexDirection: 'column',
                height: '92vh',
                padding: '10px',
                alignContent:'flex-start'
            },
            buttons: {
                fontSize: '1.0em',
                color: '#546e7a'
            },
            refreshButton: {
                fontSize: '1.0em',
                color: 'white',
                backgroundColor: '#546e7a',

            },
            refreshContainer: {
                display: 'flex',
                justifyContent: "center",
            },
            copyright: {
                textAlign: 'center',
                fontSize: '0.6em',
                color: '#546e7a',
                position: 'absolute',
                bottom: 0,
                padding: '10px'
            }
        }
    )
)


export default function SideBar(props) {
    const classes = useStyles()

    const handleClick = () => {
        props.refresh()
    }

    return (
        <div className={classes.sidebar}>
            <div className={classes.content}>
                <List component="nav" aria-label="main mailbox folders">
                    <ListItem className={classes.buttons} button={true}>
                        Dashboard
                    </ListItem>
                    <ListItem className={classes.buttons} button={true}>
                        Sensitivity Analysis
                    </ListItem>
                    <ListItem className={classes.buttons} button={true}>
                        Scenario Analysis
                    </ListItem>
                    <ListItem className={classes.buttons} button={true}>
                        Dependency Graph
                    </ListItem>
                    <ListItem className={classes.buttons} button={true}>
                        Input Importance
                    </ListItem>
                </List>
            </div>
            <div className={classes.refreshContainer}>
                <Button className={classes.refreshButton} variant="contained" size={"small"} onClick={handleClick}>
                    Refresh
                </Button>
            </div>
            <div className={classes.copyright}>
                Copyright 2019 Epoch One LLC
            </div>
        </div>
    )
}