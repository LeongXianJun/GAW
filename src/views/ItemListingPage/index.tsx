import React, { useState } from 'react'
import { Button } from '@material-ui/core'

import { UploadDialog } from './Dialog'

type Props = unknown

const ItemListingPage: React.FC<Props> = () => {
  const [uploadOpen, setUploadOpen] = useState(false)

  const toggleUploadDialog = () => setUploadOpen(!uploadOpen)

  return (
    <>
      <Button onClick={toggleUploadDialog}>{`Upload`}</Button>
      <UploadDialog open={uploadOpen} setClose={() => setUploadOpen(false)} />
    </>
  )
}

export default ItemListingPage
