import React, { useState } from 'react'
import { Button } from '@material-ui/core'

import { AppContainer } from '../Common'
import { UploadDialog } from './Dialog'

type Props = unknown

const ItemListingPage: React.FC<Props> = () => {
  const [uploadOpen, setUploadOpen] = useState(false)

  const toggleUploadDialog = () => setUploadOpen(!uploadOpen)

  return (
    <AppContainer>
      <Button color={`primary`} variant={`contained`} onClick={toggleUploadDialog}>{`Upload`}</Button>
      <UploadDialog open={uploadOpen} setClose={() => setUploadOpen(false)} />
    </AppContainer>
  )
}

export default ItemListingPage
