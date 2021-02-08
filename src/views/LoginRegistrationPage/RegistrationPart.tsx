import React, { useCallback, useMemo, useState } from 'react'
import { Box, Button, Grid, makeStyles, TextField, Typography } from '@material-ui/core'

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

const RegistrationPart: React.FC<Props> = ({ size }) => {
  const styles = useStyles()
  const [state, setState] = useState({
    email: '',
    password: '',
    focus: false,
  })

  const cover = useMemo(() => <Typography>{`Join us`}</Typography>, [])

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
          <Typography variant={`h4`}>{`Create an Account`}</Typography>
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
          {/* add checkbox for the term and condition thing (press the link to open a dialog that contain the term and condition detail) */}
          <Button className={styles['button']} color={`primary`} variant={`contained`}>{`Register`}</Button>
        </Box>
      </HoverBox>
    </Grid>
  )
}

export default RegistrationPart
