import React from 'react'
import { Grid, Paper, Typography } from '@material-ui/core'

type Props = {
  size: number
}

const LoginPart: React.FC<Props> = ({ size }) => {
  return (
    <Grid item xs={12} md={5}>
      <Paper elevation={3} style={{ flex: 1, height: size }}>
        <Typography>{`Login`}</Typography>
      </Paper>
    </Grid>
  )
}

export default LoginPart
