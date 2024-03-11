import React from 'react'
import { ColorRing } from 'react-loader-spinner'

const Loader = () => {

  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",margin:"auto",textAlign:"center"}}>
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperClass="color-ring-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />
    </div>
  )
}

export default Loader