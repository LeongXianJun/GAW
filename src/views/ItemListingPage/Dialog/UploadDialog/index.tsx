import React, { useCallback, useMemo, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Grid,
  MenuItem,
  Select,
  TextField,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'

import { tags as tagsOption } from '../../../../commons'
import AssetPreviewer from './AssetPreviewer'

type Props = {
  open: boolean
  setClose: DialogProps['onClose']
}

const UploadDialog: React.FC<Props> = ({ open, setClose }) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [file, setFile] = useState<File>()

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const changeName = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setName(e.target.value)
    },
    [setName]
  )

  const changeDescription = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setDescription(e.target.value)
    },
    [setDescription]
  )

  const changeTags = useCallback(
    (
      event: React.ChangeEvent<{
        name?: string | undefined
        value: unknown | string[]
      }>
    ) => {
      if (Array.isArray(event.target.value)) {
        setTags([...event.target.value])
      }
    },
    [setTags]
  )

  const changeFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFile(e.target.files?.[0])
    },
    [setFile]
  )

  const tagsList = useMemo(
    () =>
      tagsOption.map((t, i) => (
        <MenuItem key={`tag-${i}`} value={t}>
          {t}
        </MenuItem>
      )),
    [tags]
  )

  const uploadAsset = () => null //console.log(name, description, tags, file)

  return (
    <Dialog open={open} onClose={setClose} fullScreen={fullScreen} fullWidth maxWidth={'md'}>
      <DialogTitle>{`Upload a Game Asset`}</DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item sm={4}>
            <TextField value={name} onChange={changeName} label={`Name`} fullWidth autoFocus />
            <TextField
              value={description}
              onChange={changeDescription}
              label={`Description`}
              fullWidth
              multiline
              rows={3}
            />
            <Select value={tags} multiple onChange={changeTags}>
              {tagsList}
            </Select>
            <br />
            {/* <label htmlFor="assetFile">{`Select an asset file:`}</label> */}
            <input type="file" id="assetFile" onChange={changeFile} />
          </Grid>
          <Grid item sm={8} hidden={!Boolean(file)}>
            {`Preview`}
            {file && <AssetPreviewer asset={file} />}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={uploadAsset}>{`Upload`}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default UploadDialog
