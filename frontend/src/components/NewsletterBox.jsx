import React from 'react'

const NewsletterBox = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault();
    }

  return (
    <div className='w-full py-20 bg-brand-bone border-t border-gray-200 px-4 sm:px-10 lg:px-16'>
      <div className='max-w-[1200px] mx-auto text-center'>
        <div className='inline-block mb-4 px-4 py-1 bg-brand-red text-white text-[10px] font-bold tracking-[0.3em] uppercase'>
          The Collective
        </div>
        
        <h2 className='text-3xl sm:text-6xl font-street text-black uppercase tracking-tight leading-none mb-6'>
          TAP IN TO <br />
          <span className='text-brand-red'>EARLY DROPS</span>
        </h2>

        <p className='max-w-xl mx-auto text-gray-500 mb-10 font-medium text-sm sm:text-base leading-relaxed'>
          Join the inner circle. Be the first to secure our limited-run collections, 
          exclusive archives, and VIP access before they hit the street.
        </p>

        <form
          onSubmit={onSubmitHandler}
          className='w-full max-w-[600px] mx-auto flex flex-col sm:flex-row items-center gap-4'
        >
          <div className='flex-1 w-full relative'>
            <input
              className='w-full bg-white border border-gray-300 px-6 py-4 text-sm outline-none focus:border-brand-red transition-all'
              type="email"
              placeholder='YOUR EMAIL ADDRESS'
              required
            />
          </div>
          <button
            type='submit'
            className='w-full sm:w-auto bg-black text-white text-xs px-12 py-4 font-bold tracking-[0.2em] uppercase hover:bg-brand-red transition-all duration-300 shadow-[6px_6px_0px_0px_rgba(230,0,0,1)] hover:shadow-none animate-button-pulse hover:scale-105'
          >
            SUBSCRIBE
          </button>
        </form>
        
        <p className='mt-6 text-[10px] text-gray-400 font-bold tracking-widest uppercase'>
          100% SECURE. NO SPAM. JUST PURE DRIP.
        </p>
      </div>
    </div>
  )
}

export default NewsletterBox
