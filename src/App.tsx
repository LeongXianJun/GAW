import React, { Suspense, useMemo } from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

const theme = createMuiTheme({})

const pages = [
  {
    page: React.lazy(() => import('./views/ItemListingPage')),
    path: '/ItemListing',
    exact: true,
  },
]

const App: React.FC = () => {
  const views = useMemo(
    () =>
      pages.map(({ page: Page, path, ...others }) => (
        <Route key={`view-${path}`} path={path} render={() => <Page />} {...others} />
      )),
    []
  )

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Suspense fallback={<div>{`Loading`}</div>}>{views}</Suspense>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
