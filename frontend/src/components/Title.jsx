import React from 'react'

const Title = ({text1,text2}) => {
  return (
    <div className='flex sm:inline-flex gap-3 items-center justify-center sm:justify-start mb-6 uppercase animate-fade-in-up text-center'>
      <h2 className='text-black font-street text-3xl sm:text-5xl md:text-6xl tracking-wide'>
        {text1} <span className='text-brand-red'>{text2}</span>
      </h2>
      <div className='hidden sm:block w-12 sm:w-24 h-[4px] sm:h-[6px] bg-brand-red'></div>
    </div>
  )
}

export default Title
