import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Output from "../SideBarComponents/dashboard/Outputs"
import Input from "../SideBarComponents/dashboard/Inputs";
import Sensitivity from "../SideBarComponents/Sensitivity";
import {Switch, Route} from 'react-router-dom'
import ScenarioAnalysis from "../SideBarComponents/ScenarioAnalysis"
import DependencyGraph from "../SideBarComponents/DependencyGraph"
import ToggleInput from "../MenuBar/ToggleInput"

const useStyles = makeStyles(theme => ({
            root: {
                display: 'flex',
                flexDirection: 'column',
                marginLeft: '13.0%',
                width:'100%',
            },
            menuBar: {
                display:'flex',
                justifyContent:'center',
                marginTop:'6px',
            },
            content: {
                display: 'flex'
            }
        }
    )
)

export default function Content(props) {

    const classes = useStyles()
    const {solutions, outputs, charts, domains, formats, currInputVal, ...other} = props
    const [checked, setChecked] = React.useState(true);

    const handleChange = () => {
        setChecked(prev => !prev);
    }

    return (
        <div className={classes.root}>
            <div className={classes.menuBar}>
                <ToggleInput checked={checked} handleChange={handleChange}/>
            </div>

            <div className={classes.content}>
                <Switch>
                    <Route exact path={["/", "/dashboard"]}>
                        <Output
                            solutions={solutions}
                            currInputVal={currInputVal}
                            outputs={outputs}
                            charts={charts}
                            domains={domains}
                            formats={formats}/>
                        <Input {...other} checked={checked}/>
                    </Route>
                    <Route exact path="/sensitivity">
                        <Output
                            solutions={solutions}
                            currInputVal={currInputVal}
                            outputs={outputs}
                            charts={charts}
                            domains={domains}
                            formats={formats}/>
                        {/*<Sensitivity/>*/}
                    </Route>
                    <Route exact path="/scenario">
                        <ScenarioAnalysis/>
                    </Route>
                    <Route exact path="/dependency">
                        <DependencyGraph/>
                    </Route>
                </Switch>
            </div>

            < /div>
                )
                }


