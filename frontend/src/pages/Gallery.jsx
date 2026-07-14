import React from 'react'
import Title from '../components/Title'
import { galleryImages } from '../assets/assets'

const Gallery = () => {
  return (
    <div className='border-t pt-8'>

      {/* Page Title */}
      <div className='text-2xl text-center mb-10'>
        <Title text1={'OUR'} text2={'GALLERY'} />
        <p className='text-sm text-gray-500 mt-2'>
          A glimpse of our royal collection and boutique style
        </p>
      </div>

      {/* Gallery Grid */}
      <div className='max-w-[1200px] mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-20'>

        {/* G_1 – Reference Image */}
        <div className='overflow-hidden rounded-md'>
          <img
            src={galleryImages.G_1}
            alt="Wobblix Clothing"
            className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
          />
        </div>

        {/*
          Future images:
          <img src={galleryImages.G_2} />
          <img src={galleryImages.G_3} />
        */}

      </div>

    </div>
  )
}

export default Gallery
