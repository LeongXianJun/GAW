import React, { Suspense, useMemo } from 'react'
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: {
        main: '#00cffa',
      },
      secondary: {
        main: '#ffce38',
      },
      contrastThreshold: 3,
      tonalOffset: 0.2,
    },
  })
)

const pages = [
  {
    page: React.lazy(() => import('./views/ItemListingPage')),
    path: '/ItemListing',
    exact: true,
  },
  {
    page: React.lazy(() => import('./views/LoginRegistrationPage')),
    path: '/LoginRegistration',
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
