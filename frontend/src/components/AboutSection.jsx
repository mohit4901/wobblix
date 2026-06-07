import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import Title from './Title'

const AboutSection = () => {
  return (
    <div className="w-full py-20 sm:py-32 bg-[#edece8] border-y border-gray-200">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 flex flex-col md:flex-row items-center justify-between gap-12 sm:gap-20">
        
        {/* TEXT CONTENT */}
        <div className="w-full md:w-1/2 text-center md:text-left animate-fade-in-up">
          <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
            <div className="w-8 h-[2px] bg-brand-red"></div>
            <p className="text-brand-red font-bold tracking-[0.2em] text-[10px] sm:text-xs uppercase">The Brand Identity</p>
          </div>
          
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-street text-black mb-6 sm:mb-8 uppercase leading-tight">
            NOT JUST A LABEL <br />
            <span className="text-brand-red">A MOVEMENT.</span>
          </h2>

          <div className="space-y-6 text-gray-600 text-sm sm:text-base leading-relaxed font-medium max-w-lg mx-auto md:mx-0">
            <p>
              Wobblix is the definitive answer to boring fast fashion. We create 
              pieces that command respect—engineered with heavyweight fabrics 
              and silhouettes that define the modern street culture.
            </p>
            <p className="hidden sm:block">
              Born in Haryana, we represent the raw energy of the new Indian 
              generation. Every stitch is a statement of quality and defiance.
            </p>
          <div className="mt-10 flex justify-center md:justify-start">
            <Link to="/about">
              <button className="px-10 py-4 bg-black text-white text-xs font-bold tracking-[0.2em] uppercase hover:bg-brand-red transition-all duration-300 shadow-[6px_6px_0px_0px_rgba(230,0,0,1)] hover:shadow-none animate-button-pulse hover:scale-105">
                Discover The Brand
              </button>
            </Link>
          </div>
        </div>
      </div>

        {/* LOGO IMAGE */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <div className="
            relative
            w-[240px] h-[240px]
            sm:w-[350px] sm:h-[350px]
            bg-white
            flex items-center justify-center
            p-8 sm:p-12
            shadow-[15px_15px_0px_0px_rgba(0,0,0,0.03)]
            border border-gray-100
            animate-float
            hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all duration-700
          ">
            <img
              src={assets.logo}
              alt="Wobblix Logo"
              className="w-full h-auto object-contain drop-shadow-xl"
            />
          </div>
        </div>

      </div>
    </div>
  )
}

export default AboutSection
