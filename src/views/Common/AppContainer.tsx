import React from 'react'
import { Box, Container } from '@material-ui/core'

import NavBar from './NavBar'

type Props = {
  children: React.ReactElement | React.ReactElement[]
}

const AppContainer: React.FC<Props> = ({ children }) => {
  return (
    <>
      <NavBar />
      <Container>
        <Box my={2}>{children}</Box>
      </Container>
    </>
  )
}

export default React.memo(AppContainer)
