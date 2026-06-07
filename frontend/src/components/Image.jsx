import React from 'react'
import { assets } from '../assets/assets'

const HeroBanner = () => {
  return (
    <div className="w-full overflow-hidden bg-[#8b0036]">
      <img
        src={assets.mm1}
        alt="Wedding Collection Banner"
        className="
          w-full
          h-auto
          object-contain
        "
      />
    </div>
  )
}

export default HeroBanner
