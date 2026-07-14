import React, { useEffect, useRef } from 'react'
import { assets } from '../assets/assets'
import Title from './Title'

const images = [
  assets.gallery_1,
  assets.gallery_2,
  assets.gallery_3,
  assets.gallery_4,
  assets.gallery_5,
  assets.gallery_6,
]

const Gallery = () => {
  const sliderRef = useRef(null)

  // Auto scroll for mobile
  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return

    let scrollAmount = 0

    const interval = setInterval(() => {
      scrollAmount += 1
      slider.scrollLeft += 1

      // Infinite loop
      if (slider.scrollLeft >= slider.scrollWidth / 2) {
        slider.scrollLeft = 0
        scrollAmount = 0
      }
    }, 20) // smooth + continuous

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full py-16 sm:py-24">

      {/* Section Title */}
      <div className="text-center mb-12 sm:mb-14">
        <Title text1="OUR" text2="GALLERY" />
      </div>

      {/* ───────── DESKTOP GRID ───────── */}
      <div className="hidden md:grid max-w-[1300px] mx-auto grid-cols-3 gap-8 px-6 lg:px-10">
        {images.map((img, i) => (
          <div key={i} className="rounded-[24px] overflow-hidden">
            <img
              src={img}
              alt=""
              className="w-full h-full object-cover hover:scale-105 transition duration-500"
            />
          </div>
        ))}
      </div>

      {/* ───────── MOBILE INFINITE SCROLLER ───────── */}
      <div
        ref={sliderRef}
        className="
          md:hidden
          flex
          gap-6
          overflow-x-scroll
          no-scrollbar
          px-4
        "
      >
        {[...images, ...images].map((img, i) => (
          <div
            key={i}
            className="
              min-w-[260px]
              h-[320px]
              rounded-2xl
              overflow-hidden
              flex-shrink-0
            "
          >
            <img
              src={img}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

    </div>
  )
}

export default Gallery
