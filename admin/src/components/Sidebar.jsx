import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen bg-white border-r border-gray-200'>
        <div className='flex flex-col gap-4 pt-8 pl-[15%] text-[13px] font-bold tracking-widest uppercase'>

            <NavLink className={({isActive}) => `flex items-center gap-3 border border-gray-200 border-r-0 px-4 py-3 transition-all ${isActive ? 'bg-brand-bone border-l-4 border-l-brand-red text-brand-red shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`} to="/add">
                <img className='w-5 h-5 opacity-70' src={assets.add_icon} alt="" />
                <p className='hidden md:block'>Add Items</p>
            </NavLink>

            <NavLink className={({isActive}) => `flex items-center gap-3 border border-gray-200 border-r-0 px-4 py-3 transition-all ${isActive ? 'bg-brand-bone border-l-4 border-l-brand-red text-brand-red shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`} to="/list">
                <img className='w-5 h-5 opacity-70' src={assets.order_icon} alt="" />
                <p className='hidden md:block'>List Items</p>
            </NavLink>

            <NavLink className={({isActive}) => `flex items-center gap-3 border border-gray-200 border-r-0 px-4 py-3 transition-all ${isActive ? 'bg-brand-bone border-l-4 border-l-brand-red text-brand-red shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`} to="/orders">
                <img className='w-5 h-5 opacity-70' src={assets.order_icon} alt="" />
                <p className='hidden md:block'>Orders</p>
            </NavLink>

        </div>

    </div>
  )
}

export default Sidebar