import React, { useCallback, useMemo, useState } from 'react'
import {
  AppBar,
  Avatar,
  Box,
  Container,
  Grid,
  Hidden,
  MenuItem,
  Slide,
  Toolbar,
  Typography,
  useMediaQuery,
  useScrollTrigger,
  useTheme,
} from '@material-ui/core'
import { Link } from 'react-router-dom'

import AppMenu from '../AppMenu'
import DesktopView from './DesktopView'
import MobileView from './MobileView'

import { ReactComponent as Logo } from '../../../resources/images/logo.svg'

const links = [
  {
    path: '/ItemListing',
    label: 'Item Listing',
  },
]

const NavBar: React.FC = () => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'))
  const trigger = useScrollTrigger()

  const [isLogin, setIsLogin] = useState(true)

  const logout = useCallback(() => setIsLogin(false), [setIsLogin])

  const RightContent = useMemo(() => {
    if (isLogin) {
      const Label = () => (
        <Grid container spacing={1} alignItems={`center`}>
          <Hidden xsDown>
            <Grid item>
              <Typography style={{ textTransform: 'none' }}>{`Name`}</Typography>
            </Grid>
          </Hidden>
          <Grid item>
            <Avatar alt={`Name Profile Picture`} style={{ width: 40, height: 40 }} />
          </Grid>
        </Grid>
      )

      return (
        <AppMenu label={<Label />} disabled={fullScreen}>
          <MenuItem onClick={logout}>{`Logout`}</MenuItem>
        </AppMenu>
      )
    } else {
      return <Link to={`/LoginRegistration`}>{`Login / Register`}</Link>
    }
  }, [isLogin, fullScreen])

  return (
    <>
      <Slide in={!trigger}>
        <AppBar>
          <Container>
            <Toolbar disableGutters>
              {fullScreen && <MobileView links={links} isLogin={isLogin} logout={logout} />}
              <Logo width={40} height={40} />
              <Typography variant="h6">{`GAW`}</Typography>
              {!fullScreen && <DesktopView links={links} />}
              <Box style={{ marginLeft: 'auto' }}>{RightContent}</Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Slide>
      <Toolbar />
    </>
  )
}

export default React.memo(NavBar)
