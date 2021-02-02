import React from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'

import { ItemListingPage } from './views'
// import logo from './resources/images/logo.svg'
// import './App.css'

const theme = createMuiTheme({})

const App: React.FC = () => {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <ThemeProvider theme={theme}>
      <ItemListingPage />
    </ThemeProvider>
  )
}

export default App
