import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div className="px-4 sm:px-10 lg:px-16">
      
      <div className='text-center text-2xl pt-10 border-t'>
          <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-800'>Our HQ</p>
          <p className=' text-gray-600'>Wobblix Clothing <br /> Panipat, Haryana, India</p>
          <p className=' text-gray-600'>Email: support@wobblix.com <br /> Phone: +91 9588184740</p>
          <p className='font-semibold text-xl text-gray-800'>Join The Collective</p>
          <p className=' text-gray-600'>We are always looking for visionary designers and creators.</p>
          <button className='border border-black px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-black hover:text-white transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none'>Work With Us</button>
        </div>
      </div>

      <NewsletterBox/>
    </div>
  )
}

export default Contact
