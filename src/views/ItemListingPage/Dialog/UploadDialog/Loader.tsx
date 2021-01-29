import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const Loader = (fileType: string | undefined) => {
  switch (fileType) {
    case 'glb':
    case 'gltf':
      return new GLTFLoader()
    default:
      return undefined
  }
}

export default Loader
