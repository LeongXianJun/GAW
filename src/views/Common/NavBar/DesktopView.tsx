import React, { useMemo } from 'react'
import { Button, Divider } from '@material-ui/core'
import { Link } from 'react-router-dom'

type Props = {
  links: {
    path: string
    label: string
  }[]
}

const DesktopView: React.FC<Props> = ({ links }) => {
  const buttons = useMemo(
    () =>
      links.map(({ path, label }, i) => (
        <Button key={`link-${i}`} color={`inherit`} to={path} component={Link}>
          {label}
        </Button>
      )),
    [links]
  )

  return (
    <>
      <Divider orientation="vertical" flexItem light style={{ marginLeft: 10, marginRight: 10 }} />
      {buttons}
    </>
  )
}

export default React.memo(DesktopView)
