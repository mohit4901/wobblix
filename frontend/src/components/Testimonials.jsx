import React from 'react'
import { assets } from '../assets/assets'
import Title from './Title'

const Testimonials = () => {
  return (
    <div className="w-full py-24 bg-[#fff1f4]">

      {/* Section Title */}
      <div className="text-center mb-16">
        <Title text1="OUR" text2="TESTIMONIALS" />
      </div>

      {/* Testimonials */}
      <div className="max-w-[1200px] mx-auto grid grid-cols-3 gap-10 px-10">

        {/* Card 1 */}
        <div className="bg-white rounded-[28px] p-10 text-center">
          <p className="text-sm text-gray-600 leading-7">
            Absolutely loved the fabric and fitting.  
            The detailing is beautiful and delivery was super quick.
          </p>

          <div className="mt-8 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full overflow-hidden mb-3">
              <img
                src={assets.testimonial_1}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm font-medium text-gray-800">
              Ananya Sharma
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-[28px] p-10 text-center">
          <p className="text-sm text-gray-600 leading-7">
            The designs feel premium and elegant.  
            Perfect for festive and wedding occasions.
          </p>

          <div className="mt-8 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full overflow-hidden mb-3">
              <img
                src={assets.testimonial_2}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm font-medium text-gray-800">
              Riya Mehta
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-[28px] p-10 text-center">
          <p className="text-sm text-gray-600 leading-7">
            Great quality and stunning colors.  
            I received so many compliments wearing this!
          </p>

          <div className="mt-8 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full overflow-hidden mb-3">
              <img
                src={assets.testimonial_3}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm font-medium text-gray-800">
              Neha Kapoor
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Testimonials
