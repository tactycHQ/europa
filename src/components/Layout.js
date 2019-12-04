import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Content from "./Content";
import TopBar from "./TopBar";
import SideBar from "./SideBar";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  topbar: {
    textAlign: 'center',
  },
  sidebar: {
    textAlign: 'center',
  },
  content: {
    textAlign: 'center',
  },
  footer: {
    textAlign: 'center',
  },
}));

export default function Layout() {
  const classes = useStyles();
  const [outputs, setOutputs] = useState(null)

  useEffect(() => {
    setOutputs(outputs)
  },[outputs])

  const getRefreshOutputsEager =  async () => {
    console.log("Getting API...");
    const api_url = "http://localhost:5000/refreshOutputsEager"
    let dash_id = 5
    const headers = {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({dash_id: dash_id})
    }

    let result = ""
    try {
        const response = await fetch(api_url, headers);
        const response_JSON = await response.json();
        result = JSON.stringify(response_JSON.message)
    } catch (error) {
        result = "Server not responsive"
    }
    setOutputs(result)
}

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <TopBar/>
        </Grid>
        <Grid item xs={2} lg={1}>
          <SideBar refresh={getRefreshOutputsEager}/>
        </Grid>
        <Grid item xs={10} lg={11}>
          <Content data={outputs}/>
        </Grid>
      </Grid>
    </div>
  );
}