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
    setCartItems
  } = useContext(ShopContext)

  const logout = () => {
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
  }

  return (
    <div className="w-full">

      {/* 🔹 Announcement Bar */}
      <AnnouncementBar />

      {/* 🔹 TOP INFO BAR (Desktop only) */}
      <div className="hidden sm:flex justify-between items-center px-6 sm:px-10 lg:px-16 py-2 text-[15px] border-b">
        <p>&nbsp; support@wobblix.com</p>
        <div className="flex items-center gap-4">
          <p> Haryana, India</p>
        </div>
      </div>

      {/* 🔹 MAIN NAVBAR */}
      <div className="flex bg-[#edece8] items-center justify-between px-4 sm:px-10 lg:px-16 py-2 sm:py-4 font-medium">

        {/* Logo */}
        <Link to="/">
          <img
            src={assets.logo}
            className="w-28 sm:w-40 animate-slow-pulse"
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
            <img
              onClick={() => token ? null : navigate('/login')}
              className="w-4 sm:w-5 cursor-pointer"
              src={assets.profile_icon}
              alt=""
            />
            {token && (
              <div className="hidden group-hover:block absolute right-0 pt-4">
                <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-white border text-sm">
                  <p onClick={() => navigate('/profile')} className="cursor-pointer hover:text-brand-red transition">My Profile</p>
                  <p
                    onClick={() => navigate('/orders')}
                    className="cursor-pointer hover:text-brand-red transition"
                  >
                    Orders
                  </p>
                  <p
                    onClick={logout}
                    className="cursor-pointer hover:text-brand-red transition"
                  >
                    Logout
                  </p>
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

      {/* 🔹 MOBILE SIDEBAR */}
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
