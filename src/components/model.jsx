import React from 'react'

const Model = () => {
  return (
    <div><model-viewer
    src="public/mymodel.glb"
    ar
    ar-scale="fixed"
    camera-controls
    touch-action="pan-y"
    alt="A 3D model of an astronaut"
    shadow-intensity="2"
    max-camera-orbit="auto 90deg auto"
    xr-environment
    class="object-cover w-full lg:h-full"
></model-viewer></div>
  )
}

export default Model