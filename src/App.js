import React from 'react'
import Layout from "./LayoutComponents/Layout"
import {BrowserRouter} from 'react-router-dom'
import ContextProvider from "./Context";
import CssBaseline from '@material-ui/core/CssBaseline'
import * as V from 'victory'

function App() {
  return (
      <ContextProvider>
        <CssBaseline />
        <BrowserRouter>
          <div className="App" >
            <Layout/>
          </div>
        </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
