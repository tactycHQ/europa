import React from 'react'
import Layout from "./components/layout"
import { MuiThemeProvider } from '@material-ui/core'
import {BrowserRouter} from 'react-router-dom'
import ContextProvider from "./Context";
import { createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

const theme = createMuiTheme({})

function App() {
  return (
      <ContextProvider>
        <CssBaseline />
        <BrowserRouter>
          <MuiThemeProvider theme={theme}>
          <div className="App">
            <Layout/>
          </div>
          </MuiThemeProvider>
        </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
