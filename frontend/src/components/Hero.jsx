import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { assets } from "../assets/assets"

const slides = [
  {
    img: assets.hero_1,
    title: "PREMIUM OVERSIZED",
    subtitle: "STREETWEAR COLLECTION",
    btn: "SHOP NOW",
  },
  {
    img: assets.hero_2,
    title: "ESSENTIAL TANKS",
    subtitle: "SUMMER DROP",
    btn: "SHOP SALE",
  },
  {
    img: assets.hero_3,
    title: "HOODIES & JOGGERS",
    subtitle: "WINTER COLLECTION",
    btn: "EXPLORE",
  },
]

const Hero = () => {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative w-full overflow-hidden">

      {/* Slider Container */}
      <div
        className="
          w-full
          overflow-hidden
          h-[56vw]
          sm:h-[70vh]
          lg:h-screen
        "
      >
        {/* Slides */}
        <div
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="min-w-full h-full relative"
            >
              {/* Image */}
              <img
                src={slide.img}
                alt={slide.title}
                className="w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30" />

              {/* Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-20 w-full">
                  <div className="max-w-4xl mx-auto text-center md:text-left md:mx-0">
                    <h1 className="font-street text-[clamp(2rem,10vw,8rem)] text-white leading-[0.85] tracking-tight drop-shadow-2xl">
                      {slide.title}
                    </h1>

                    <p className="mt-4 sm:mt-8 text-[clamp(0.6rem,2vw,1.5rem)] font-bold text-white tracking-[0.3em] uppercase bg-black/60 inline-block px-4 py-2 backdrop-blur-md border-l-4 border-brand-red">
                      {slide.subtitle}
                    </p>

                    <div className="flex justify-center md:justify-start">
                      <Link to="/collection">
                        <button className="mt-8 sm:mt-10 px-8 sm:px-12 py-3 sm:py-4 bg-brand-red text-white text-[10px] sm:text-base font-bold tracking-[0.2em] uppercase hover:bg-black transition-all duration-300 border-2 border-transparent hover:border-white animate-button-pulse hover:scale-105">
                          {slide.btn}
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full ${
              current === i ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>

    </section>
  )
}

export default Hero
