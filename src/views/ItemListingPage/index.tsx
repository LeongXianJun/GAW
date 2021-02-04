import React, { useState } from 'react'
import { Button, Container } from '@material-ui/core'

import { NavBar } from '../Common'
import { UploadDialog } from './Dialog'

type Props = unknown

const ItemListingPage: React.FC<Props> = () => {
  const [uploadOpen, setUploadOpen] = useState(false)

  const toggleUploadDialog = () => setUploadOpen(!uploadOpen)

  return (
    <>
      <NavBar />
      <Container>
        <Button color={`primary`} variant={`contained`} onClick={toggleUploadDialog}>{`Upload`}</Button>
        <UploadDialog open={uploadOpen} setClose={() => setUploadOpen(false)} />
      </Container>
    </>
  )
}

export default ItemListingPage
