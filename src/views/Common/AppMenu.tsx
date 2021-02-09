import React from 'react'
import Button from '@material-ui/core/Button'
import MenuList from '@material-ui/core/MenuList'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'

type Props = {
  children: React.ReactElement | React.ReactElement[]
  label?: React.ReactElement | string
  disabled?: boolean
}

const AppMenu: React.FC<Props> = ({ children, label = 'Click Me!', disabled }) => {
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef<HTMLButtonElement>(null)

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen)
  }

  return (
    <div>
      <Button
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        disabled={disabled}
      >
        {label}
      </Button>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        <Paper>
          <MenuList autoFocusItem={open} id="menu-list-grow">
            {children}
          </MenuList>
        </Paper>
      </Popper>
    </div>
  )
}

export default AppMenu
