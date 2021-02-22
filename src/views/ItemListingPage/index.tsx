import React, { useCallback, useState } from 'react'
import { Button } from '@material-ui/core'

import { AppContainer } from '../Common'
import { UploadDialog } from './Dialog'

type Props = unknown

const ItemListingPage: React.FC<Props> = () => {
  const [uploadOpen, setUploadOpen] = useState(false)

  const toggleUploadDialog = useCallback((value: boolean) => () => setUploadOpen(!value), [])
  const closeDialog = useCallback(() => setUploadOpen(false), [setUploadOpen])

  return (
    <AppContainer>
      <Button color={`primary`} variant={`contained`} onClick={toggleUploadDialog(uploadOpen)}>{`Upload`}</Button>
      <UploadDialog open={uploadOpen} setClose={closeDialog} />
    </AppContainer>
  )
}

export default ItemListingPage
