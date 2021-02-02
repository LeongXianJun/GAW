import React, { useMemo, useState } from 'react'
import { Avatar, Container, Grid, Hidden, Typography } from '@material-ui/core'
import { Link, NavLink } from 'react-router-dom'

const NavBar: React.FC = () => {
  const [isLogin] = useState(false)

  const RightContent = useMemo(
    () =>
      isLogin ? (
        <Link to={`/LoginRegistration`}>{`Login / Register`}</Link>
      ) : (
        <>
          <Grid item>
            <Hidden xsDown>
              <Typography>{`Name`}</Typography>
            </Hidden>
          </Grid>
          <Grid item>
            <Avatar alt={`Name Profile Picture`} sizes={`20px`} />
          </Grid>
        </>
      ),
    [isLogin]
  )

  return (
    <Container>
      <Grid container spacing={3} style={{ margin: 0 }}>
        <Grid item xs={3} md={2}>
          Logo
        </Grid>
        <Grid item xs>
          <NavLink to={`/ItemListing`}>{`Item Listing`}</NavLink>
        </Grid>
        <Grid item xs={3} md={2} justify="flex-end" container spacing={2} style={{ margin: 0 }}>
          {RightContent}
        </Grid>
      </Grid>
    </Container>
  )
}

export default React.memo(NavBar)
