import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Barchart from "../../charts/barchart"
// import StackedBar from "./stackedbar";
// import MixBar from "./mixbar";
// import Radial from "./radial";


const useStyles = makeStyles(theme => ({
            root: {
                display:'flex',
                flexDirection:'column',
                flexGrow:1,
                // justifyContent:'flex-start',
                width:'80%'
            },
            OutputText: {
                fontSize: '1em',
                fontFamily: 'Roboto',
                fontWeight: 'bold',
                color:'#607d8b',
                paddingTop: '2%',
                paddingBottom: '25px',
                width: '100%',
                textAlign: 'center'
            },
            charts:{
                display:'flex',
                flexWrap:'wrap',
                justifyContent: 'space-betwen'

            }
        }
    )
)

export default function Output(props) {
    const classes = useStyles()


    return (
        <div className={classes.root}>
            <div className={classes.OutputText}>Outputs</div>
            <div className={classes.charts}>
                <Barchart {...props}/>
                {/*<StackedBar data={outputs}/>*/}
                {/*<MixBar data={outputs}/>*/}
                {/*<Radial data={outputs}/>*/}
                {/*<Barchart data={outputs}/>*/}
                {/*<Barchart data={outputs}/>*/}
                {/*<StackedBar data={outputs}/>*/}
                {/*<MixBar data={outputs}/>*/}
                {/*<Radial data={outputs}/>*/}
                {/*<Barchart data={outputs}/>*/}
            </div>
        </div>

    )
}






