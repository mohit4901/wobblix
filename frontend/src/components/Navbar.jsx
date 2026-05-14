import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import AnnouncementBar from './Announcement'

const Navbar = () => {

  const [visible, setVisible] = useState(false)

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
    setUserData
  } = useContext(ShopContext)

  const logout = () => {
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setUserData(false)
    setCartItems({})
  }

  return (
    <div className="w-full">

      {/* Announcement Bar */}

      <AnnouncementBar />

      {/* TOP INFO BAR */}

      <div className="hidden sm:flex justify-between items-center px-6 sm:px-10 lg:px-16 py-2 text-[15px] border-b">
        <p>&nbsp; support@wobblix.com</p>
        <div className="flex items-center gap-4">
          <p> Haryana, India</p>
        </div>
      </div>

      {/* MAIN NAVBAR */}

      <div className="flex bg-[#edece8] items-center justify-between px-4 sm:px-10 lg:px-16 py-2 sm:py-4 font-medium">

        {/* Logo */}
        <Link to="/">
          <img
            src={assets.logo}
            className="w-28 sm:w-40"
            alt="logo"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-10 text-[14px] font-bold tracking-[0.15em] text-black">
          <NavLink to="/" className="hover:text-brand-red transition border-b-2 border-transparent hover:border-brand-red pb-1">HOME</NavLink>
          <NavLink to="/collection" className="hover:text-brand-red transition border-b-2 border-transparent hover:border-brand-red pb-1">SHOP</NavLink>
          <NavLink to="/about" className="hover:text-brand-red transition border-b-2 border-transparent hover:border-brand-red pb-1">ABOUT</NavLink>
        </ul>

        {/* Right Icons */}
        <div className="flex items-center gap-4 sm:gap-5">

          {/* Search */}
          <img
            onClick={() => { setShowSearch(true); navigate('/collection') }}
            src={assets.search_icon}
            className="w-4 sm:w-5 cursor-pointer"
            alt=""
          />

          {/* Profile */}
          <div className="group relative">
            <div 
              onClick={() => token ? null : navigate('/login')}
              className="flex items-center gap-2 cursor-pointer bg-white sm:bg-transparent px-3 py-1.5 sm:p-0 rounded-none border border-black sm:border-none transition-all hover:bg-black hover:text-white sm:hover:bg-transparent sm:hover:text-black group"
            >
              <img
                className="w-4 sm:w-5"
                src={assets.profile_icon}
                alt="Profile"
              />
              <span className="hidden sm:block text-[10px] font-black tracking-widest uppercase">
                {token ? 'ACCOUNT' : 'LOGIN'}
              </span>
            </div>

            {token && (
              <div className="hidden group-hover:block absolute right-0 pt-4 z-50">
                <div className="flex flex-col w-48 bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                  <div className="px-5 py-4 border-b border-gray-100 bg-gray-50">
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Signed in as</p>
                     <p className="text-xs font-bold truncate">My Account</p>
                  </div>
                  <div className="flex flex-col py-2">
                    <p onClick={() => navigate('/profile')} className="px-5 py-3 text-[11px] font-black uppercase tracking-widest cursor-pointer hover:bg-black hover:text-white transition-colors">My Profile</p>
                    <p onClick={() => navigate('/orders')} className="px-5 py-3 text-[11px] font-black uppercase tracking-widest cursor-pointer hover:bg-black hover:text-white transition-colors">Orders</p>
                    <hr className="border-gray-100 mx-2 my-1" />
                    <p onClick={logout} className="px-5 py-3 text-[11px] font-black uppercase tracking-widest cursor-pointer text-brand-red hover:bg-brand-red hover:text-white transition-colors">Logout</p>
                  </div>
                </div>
              </div>
            )}
          </div>


          {/* Cart */}
          <Link to="/cart" className="relative">
            <img
              src={assets.cart_icon}
              className="w-4 sm:w-5 min-w-4"
              alt=""
            />
            <p className="absolute -right-2 -bottom-2 w-[18px] text-center leading-[18px] bg-brand-red font-bold text-white aspect-square rounded-full text-[10px]">
              {getCartCount()}
            </p>
          </Link>

          {/* Mobile Menu Icon */}
          <img
            onClick={() => setVisible(true)}
            src={assets.menu_icon}
            className="w-4 sm:w-5 cursor-pointer sm:hidden"
            alt=""
          />
        </div>
      </div>

      {/* MOBILE SIDEBAR */}

      <div
        className={`absolute top-0 right-0 bottom-0 bg-[#edece8] z-50 overflow-hidden transition-all duration-300 ${
          visible ? 'w-full' : 'w-0'
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-4 cursor-pointer"
          >
            <img
              className="h-4 rotate-180"
              src={assets.dropdown_icon}
              alt=""
            />
            <p>Back</p>
          </div>

          <NavLink onClick={() => setVisible(false)} className="py-3 pl-6 border" to="/">
            HOME
          </NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-3 pl-6 border" to="/collection">
            CATEGORIES
          </NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-3 pl-6 border" to="/about">
            ABOUT
          </NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-3 pl-6 border" to="/contact">
            CONTACT
          </NavLink>
        </div>
      </div>

    </div>
  )
}

export default Navbar
