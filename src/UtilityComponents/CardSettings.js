import React from 'react';
import {makeStyles} from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function CardSettings(props) {

    //Initialization function to set drop down label based on user prefs
    const getSizeLabel = () => {
        if (props.category in props.summaryPrefs && 'size' in props.summaryPrefs[props.category] ){
            return 'Minimize'
        } else {
            return 'Maximize'
        }
    }

    //Styles
    const useStyles = makeStyles(theme => ({
        root: {},
        settings: {
            display: "flex",
            color: '#5C6671'
        },
        settingsMenu: {
            display: "flex",
            backgroundColor: '#FEFEFD',
            color: '#5C6671'
        },
        settingsIcon: {
            color: '#DEE5ED',
            "&:hover": {
                color: "#4B719C"
            }
        },
        settingsList: {},
        menuItem: {
            fontFamily: 'Questrial',
            fontSize: '0.9em'
        },
    }))
    const classes = useStyles()

    //Hooks for anchorEl and list of items in menu
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [item, setItem] = React.useState({
        size: getSizeLabel(),
        visibile: 'Hide'
    });

    //Handlers for events
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (event, type, value) => {
        // console.log(event.currentTarget)
        // const {myValue} = event.currentTarget

        if (type === 'size') {
            if (value === 'Maximize') {
                props.setSummaryPrefs({
                    ...props.summaryPrefs,
                    [props.category]: {size: 'Maximize'}
                })
                setItem({...item, size: 'Minimize'})
            } else {
                props.setSummaryPrefs({...props.summaryPrefs, [props.category]: {size: 'Minimize'}})
                setItem({...item, size: 'Maximize'})
            }
        }

        setAnchorEl(null);
    };


    const handleImgExport = () => {
        props.handleImageExport("summary" + props.category)
        handleClose()
    }

    return (
        <div>
            <IconButton className={classes.settings} aria-controls="simple-menu" aria-haspopup="true"
                        onClick={handleClick} size={"small"}>
                <EditIcon className={classes.settingsIcon}/>
            </IconButton>
            <Menu
                classes={{paper: classes.settingsMenu, list: classes.settingsList}}
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                onChange={handleChange}
                disableScrollLock={true}
            >
                <MenuItem className={classes.menuItem}
                          onClick={(event) => handleChange(event, 'size', item.size)}
                          dense={true}>{item.size}</MenuItem>
                <MenuItem className={classes.menuItem} onClick={() => handleImgExport() } dense={true}>Export Chart</MenuItem>
            </Menu>
        </div>
    );
}