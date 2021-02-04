import React, { useMemo } from 'react'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

import { ReactComponent as Logo } from '../../../resources/images/logo.svg'

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
      <Logo width={40} height={40} />
      {buttons}
    </>
  )
}

export default React.memo(DesktopView)
