import React, {useState, useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'


const useStyles = makeStyles(theme => ({
            root: {
                display: 'flex',
                width: '85%',
                marginLeft: '15%'
            },
        }
    )
)

export default function DependencyGraph(props) {

    return (
        <div>This is a dependency graph page</div>
    )
}


