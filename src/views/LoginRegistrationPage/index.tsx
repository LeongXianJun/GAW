import React, { useMemo } from 'react'
import { Divider, Grid, Typography, useMediaQuery, useTheme } from '@material-ui/core'

import { AppContainer } from '../Common'
import LoginPart from './LoginPart'
import RegistrationPart from './RegistrationPart'
import { useWidth } from '../../commons'

type Props = unknown

const LoginResgitrationPage: React.FC<Props> = () => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down(`sm`))
  const widthSize = useWidth()

  const target = useMemo(() => Math.min(theme.breakpoints.width(widthSize), theme.breakpoints.width(`md`)), [
    theme,
    widthSize,
  ])
  const size = useMemo(() => (fullScreen ? window.innerWidth * 0.92 : target * 0.46), [widthSize, fullScreen])

  return (
    <AppContainer>
      <Typography variant={`h4`}>{`Welcome to Game Asset World`}</Typography>
      <Typography variant={`h6`}>
        {`Game Asset World (GAW) provides you a platform for game asset sharing with worldwide users.`}
      </Typography>
      <Grid container spacing={3} justify={`center`} style={{ marginTop: 10, marginBottom: 10 }}>
        <LoginPart size={size} />
        <Grid item xs={12} md={1} container justify={`center`}>
          <Divider
            orientation={fullScreen ? 'horizontal' : 'vertical'}
            flexItem={!fullScreen}
            style={{ width: fullScreen ? '100%' : '1px' }}
          />
        </Grid>
        <RegistrationPart size={size} />
      </Grid>
    </AppContainer>
  )
}

export default LoginResgitrationPage
