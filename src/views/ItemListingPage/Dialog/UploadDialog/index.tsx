import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
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

const useStyles = makeStyles(() => ({
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
}))

const UploadDialog: React.FC<Props> = ({ open, setClose }) => {
  const classes = useStyles()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [file, setFile] = useState<File>()

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  useEffect(() => {
    if (open === false) {
      setName('')
      setDescription('')
      setTags([])
      setFile(undefined)
    }
  }, [open])

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
        <Grid container spacing={3} style={{ margin: 0 }}>
          <Grid item container direction={`column`} sm={4} spacing={2}>
            <Grid item>
              <TextField value={name} onChange={changeName} label={`Name`} fullWidth variant={`outlined`} autoFocus />
            </Grid>
            <Grid item>
              <TextField
                value={description}
                onChange={changeDescription}
                label={`Description`}
                fullWidth
                variant={`outlined`}
                multiline
                rows={3}
              />
            </Grid>
            <Grid item>
              <FormControl variant={`outlined`} fullWidth>
                <InputLabel id={`multiple-tags-label`}>{`Tags`}</InputLabel>
                <Select
                  labelId={`multiple-tags-label`}
                  value={tags}
                  multiple
                  onChange={changeTags}
                  label={`Tags`}
                  renderValue={selected => (
                    <div className={classes.chips}>
                      {(selected as string[]).map(value => (
                        <Chip key={value} label={value} className={classes.chip} />
                      ))}
                    </div>
                  )}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 48 * 4.5 + 8,
                        width: 250,
                      },
                    },
                    anchorOrigin: {
                      vertical: 'bottom',
                      horizontal: 'left',
                    },
                    transformOrigin: {
                      vertical: 'top',
                      horizontal: 'left',
                    },
                    getContentAnchorEl: null,
                  }}
                >
                  {tagsList}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item sm={8} hidden={!Boolean(file)}>
            {`Preview: ${file?.name}`}
            {file && <AssetPreviewer asset={file} />}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant={`contained`} component={`label`}>
          Select File
          <input type="file" hidden onChange={changeFile} />
        </Button>
        <Button variant={`contained`} color={`primary`} onClick={uploadAsset}>{`Upload`}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default UploadDialog
