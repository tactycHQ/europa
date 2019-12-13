import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Barchart from "../../charts/barchart"
// import StackedBar from "./stackedbar";
// import MixBar from "./mixbar";
// import Radial from "./radial";


const useStyles = makeStyles(theme => ({
            root: {
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                // justifyContent:'flex-start',
                width: '80%'
            },
            OutputText: {
                fontSize: '1em',
                fontFamily: 'Roboto',
                fontWeight: 'bold',
                color: '#607d8b',
                paddingTop: '2%',
                paddingBottom: '25px',
                width: '100%',
                textAlign: 'center'
            },
            charts: {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between'

            }
        }
    )
)

export default function Output(props) {
    const classes = useStyles()
    const chartNames = Object.keys(props.charts)
    const generateCharts = () => {
        const data = chartNames.map(name => {
                const chartAddresses = props.charts[name]
                const chartLabels = chartAddresses.map(address => {
                    return props.outputLabels[address]
                })
                return chartLabels
            }
        )
        return data.map(labels => {
                const _sol = labels.map(label => {
                    const sol = props.currSolution.find(solution => solution.name === label)
                    return sol
                })
                return <Barchart key={labels.toString()} currSolution={_sol}/>
            }
        )
    }




    const finalCharts = generateCharts()

    // console.log(props.currSolution)


    return (
        <div className={classes.root}>
            <div className={classes.OutputText}>Outputs</div>
            <div className={classes.charts}>
                {finalCharts}
                {/*<Barchart {...props}/>*/}
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






