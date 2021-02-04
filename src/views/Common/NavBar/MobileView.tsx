import React, { useCallback, useMemo, useState } from 'react'
import { Drawer, IconButton, Link, MenuItem } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu'

type Props = {
  links: {
    path: string
    label: string
  }[]
}

const MobileView: React.FC<Props> = ({ links }) => {
  const [drawerToggle, setDrawerToggle] = useState(false)

  const setToggle = useCallback(
    (value: boolean) => () => {
      setDrawerToggle(value)
    },
    [setDrawerToggle]
  )

  const choices = useMemo(
    () =>
      links.map(({ path, label }, i) => (
        <Link
          key={`choice-${i}`}
          {...{
            component: RouterLink,
            to: path,
            color: 'inherit',
            style: { textDecoration: 'none' },
          }}
        >
          <MenuItem>{label}</MenuItem>
        </Link>
      )),
    [links]
  )

  return (
    <>
      <IconButton
        edge={`start`}
        color={`inherit`}
        onClick={setToggle(true)}
        {...{
          'aria-label': `menu`,
          'aria-haspopup': 'true',
        }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        {...{
          anchor: 'left',
          open: drawerToggle,
          onClose: setToggle(false),
        }}
      >
        {choices}
      </Drawer>
    </>
  )
}

export default React.memo(MobileView)
