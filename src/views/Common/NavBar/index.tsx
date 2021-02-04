import React, { useMemo, useState } from 'react'
import {
  AppBar,
  Avatar,
  Box,
  Container,
  Grid,
  Hidden,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import { Link } from 'react-router-dom'

import DesktopView from './DesktopView'
import MobileView from './MobileView'

const links = [
  {
    path: '/ItemListing',
    label: 'Item Listing',
  },
]

const NavBar: React.FC = () => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'))

  const [isLogin] = useState(false)

  const RightContent = useMemo(() => {
    if (isLogin) {
      return <Link to={`/LoginRegistration`}>{`Login / Register`}</Link>
    } else {
      return (
        <Box style={{ marginLeft: 'auto' }}>
          <Grid container spacing={1} alignItems={`center`}>
            <Hidden xsDown>
              <Grid item>
                <Typography>{`Name`}</Typography>
              </Grid>
            </Hidden>
            <Grid item>
              <Avatar alt={`Name Profile Picture`} style={{ width: 40, height: 40 }} />
            </Grid>
          </Grid>
        </Box>
      )
    }
  }, [isLogin])

  return (
    <AppBar position="static" style={{ marginBottom: 20 }}>
      <Container>
        <Toolbar disableGutters>
          {fullScreen ? <MobileView links={links} /> : <DesktopView links={links} />}
          {RightContent}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default React.memo(NavBar)
