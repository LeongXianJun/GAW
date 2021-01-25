import React from 'react'

type Props = {
  asset: File
}

const AssetPreviewer: React.FC<Props> = ({ asset }) => {
  const FileContent = () => {
    const content = asset.slice(0)
    const urlCreator = window.URL || window.webkitURL
    const url = urlCreator.createObjectURL(content)
    return url
  }

  return <>{FileContent()}</>
}

export default React.memo(AssetPreviewer)
