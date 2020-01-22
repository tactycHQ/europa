import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Button from "@material-ui/core/Button";
import Spreadsheet from "./Spreadsheet";


export default function Home(props) {


    // Defining Hooks
    const useStyles = makeStyles(theme => ({
        root: {
            display: 'flex',
            width: '100%',
            background: '#FEFEFD'
        },
        content: {
            display: 'flex',
            width: '100%'
        },
        menuBar: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '6px',
        }
    }))
    const classes = useStyles()


   const onChange = e => {
    console.log(e.target.files[0])
    // this.setState({
    //   uploadedFile: e.target.files[0]
    // });
  }

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <input
                    // accept="image/*"
                    className={classes.input}
                    style={{display: 'none'}}
                    id="raised-button-file"
                    multiple
                    type="file"
                    onChange={e => onChange(e)}
                />
                <label htmlFor="raised-button-file">
                    <Button variant="raised" component="span" className={classes.button}>
                        Upload
                    </Button>
                </label>
            </div>
            <Spreadsheet/>
        </div>
    )
}


