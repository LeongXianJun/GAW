import React, { useCallback, useState } from 'react'
import { Box, makeStyles, Paper, Slide, SlideProps } from '@material-ui/core'

type Props = {
  cover: React.ReactElement
  children: React.ReactElement
  focus: boolean
  direction?: SlideProps['direction']
  size?: number
}

const useStyles = makeStyles(theme => ({
  content: {
    display: 'flex',
  },
  cover: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  children: {
    opacity: 1,
    position: 'relative',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  showed: {
    display: 'flex',
    backgroundColor: 'rgba(202, 204, 206, 0.5)',
  },
  hide: {
    display: 'flex',
    animation: `$fadeHiding 300ms ${theme.transitions.easing.easeInOut}`,
  },
  '@keyframes fadeHiding': {
    from: {
      backgroundColor: 'rgba(202, 204, 206, 0.5)',
    },
    to: {},
  },
}))

const HoverBox: React.FC<Props> = ({ cover: coverContent, children, focus, direction = 'down', size }) => {
  const styles = useStyles()
  const [hovered, setHovered] = useState(false)

  const hovering = useCallback((val: boolean) => () => setHovered(val), [setHovered])

  return (
    <Paper elevation={3} style={{ height: size }} onMouseEnter={hovering(true)} onMouseLeave={hovering(false)}>
      <Box className={styles['cover']} style={{ filter: focus || hovered ? 'blur(2px)' : undefined }}>
        {coverContent}
      </Box>
      <Box
        className={`${styles['children']} ${styles[focus || hovered ? 'showed' : 'hide']}`}
        style={{ top: -(size || 0), marginBottom: -(size || 0) }}
      >
        <Slide direction={direction} in={focus || hovered}>
          {children}
        </Slide>
      </Box>
    </Paper>
  )
}

export default React.memo(HoverBox)
