import React from 'react'
import {assets} from '../assets/assets'

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-4 px-[4%] justify-between bg-white border-b border-gray-200'>
        <img className='w-28 sm:w-40' src={assets.logo} alt="" />
        <button onClick={()=>setToken('')} className='bg-brand-red text-white px-8 py-2 text-xs font-bold tracking-widest uppercase hover:bg-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none'>Logout</button>
    </div>
  )
}

export default Navbar