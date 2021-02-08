import React, { useCallback, useMemo, useState } from 'react'
import { Box, Button, Grid, Link, makeStyles, TextField, Typography } from '@material-ui/core'

import HoverBox from './HoverBox'

type Props = {
  size: number
}

const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textField: {
    marginBottom: 15,
  },
  button: {
    marginBottom: 10,
  },
})

const LoginPart: React.FC<Props> = ({ size }) => {
  const styles = useStyles()
  const [state, setState] = useState({
    email: '',
    password: '',
    focus: false,
  })

  const cover = useMemo(() => <Typography>{`Login`}</Typography>, [])

  const changeEmail = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
      setState(prevState => ({ ...prevState, email: e.target.value, focus: true })),
    [setState]
  )

  const changePassword = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
      setState(prevState => ({ ...prevState, password: e.target.value })),
    [setState]
  )

  const focus = useCallback(() => setState(prevState => ({ ...prevState, focus: true })), [setState])

  const blur = useCallback(() => setState(prevState => ({ ...prevState, focus: false })), [setState])

  return (
    <Grid item xs={12} md={5}>
      <HoverBox cover={cover} focus={state.focus} direction={`right`} size={size}>
        <Box className={styles['form']}>
          <Typography variant={`h4`}>{`Sign In`}</Typography>
          <TextField
            className={styles[`textField`]}
            label={`Email Address`}
            onChange={changeEmail}
            onFocus={focus}
            onBlur={blur}
            fullWidth
          />
          <TextField
            className={styles[`textField`]}
            label={`Password`}
            onChange={changePassword}
            onFocus={focus}
            onBlur={blur}
            fullWidth
          />
          <Button className={styles['button']} color={`primary`} variant={`contained`}>{`Login`}</Button>
          <Link color={`textSecondary`} onClick={() => console.log('Redirect to Reset Password Page')}>
            {`Forget your password?`}
          </Link>
        </Box>
      </HoverBox>
    </Grid>
  )
}

export default LoginPart
