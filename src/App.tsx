import React, { Suspense, useMemo } from 'react'
import { createMuiTheme, responsiveFontSizes, ThemeProvider, useMediaQuery } from '@material-ui/core'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

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
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const theme = useMemo(
    () =>
      responsiveFontSizes(
        createMuiTheme({
          palette: {
            type: prefersDarkMode ? 'dark' : 'light',
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
      ),
    [prefersDarkMode]
  )

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
