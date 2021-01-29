import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

import Loader from './Loader'

type Props = {
  asset: File
}

// https://threejsfundamentals.org/threejs/lessons/threejs-load-gltf.html
const AssetPreviewer: React.FC<Props> = ({ asset }) => {
  const fileExtension = asset.name.split('.').pop()

  // file extension validation
  if (!['glb', 'gltf'].includes(fileExtension ?? '')) {
    return <>{`Selected file has invalid file extension.`}</>
  }

  const scene = new THREE.Scene()
  const loader = useMemo(() => Loader(fileExtension), [fileExtension])
  const camera = new THREE.PerspectiveCamera(75, 600 / 400, 0.1, 1000)
  const renderer = new THREE.WebGLRenderer()

  const previewRef = useRef<HTMLDivElement>(null)

  const animate = () => {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }

  const setupLighting = useCallback(() => {
    {
      const skyColor = 0xb1e1ff // light blue
      const groundColor = 0xb97a20 // brownish orange
      const intensity = 1
      const light = new THREE.HemisphereLight(skyColor, groundColor, intensity)
      scene.add(light)
    }

    {
      const color = 0xffffff
      const intensity = 0.8
      const light = new THREE.DirectionalLight(color, intensity)
      light.position.set(100, 100, 100)
      scene.add(light)
      scene.add(light.target)
    }
  }, [scene])

  useEffect(() => {
    previewRef.current?.appendChild(renderer.domElement)
    renderer.setSize(600, 400)
    setupLighting()

    loader?.load(
      URL.createObjectURL(asset.slice(0)),
      gltf => {
        const mesh = gltf.scene.children
        console.log('done: ' + mesh.map(m => m.name).join(','))

        const g = new THREE.Group()
        g.add(...mesh)

        g.position.set(0, 0, 0)

        const boundingBox = new THREE.Box3().setFromObject(g)
        const size = boundingBox.getSize(new THREE.Vector3())

        const min = Math.abs(Math.min(size.x, size.y, size.z) * 2)

        camera.position.set(min, min, min)
        camera.lookAt(g.position)

        scene.add(g)
      },
      undefined,
      err => console.log(err)
    )

    animate()
    return () => {
      previewRef.current?.removeChild(renderer.domElement)
      renderer.clear()
    }
  }, [asset])

  return <div ref={previewRef}></div>
}

export default React.memo(AssetPreviewer)
