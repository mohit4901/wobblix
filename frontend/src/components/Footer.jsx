import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="w-full bg-[#0a0a0a] text-white mt-20 sm:mt-24 overflow-hidden border-t border-gray-800">

      {/* ───────────── MOVING TEXT STRIP ───────────── */}
      <div className="w-full bg-[#111] text-gray-400 py-4 overflow-hidden border-b border-gray-800">
        <div className="whitespace-nowrap flex animate-marquee opacity-50">
          <span className="mx-8 font-street text-sm sm:text-lg uppercase tracking-[0.3em]">
            WOBBLIX STUDIOS
          </span>
          <span className="mx-8 font-street text-sm sm:text-lg uppercase tracking-[0.3em]">
            WOBBLIX STUDIOS
          </span>
          <span className="mx-8 font-street text-sm sm:text-lg uppercase tracking-[0.3em]">
            WOBBLIX STUDIOS
          </span>
          <span className="mx-8 font-street text-sm sm:text-lg uppercase tracking-[0.3em]">
            WOBBLIX STUDIOS
          </span>
        </div>
      </div>

      {/* ───────────── MASSIVE TYPOGRAPHY ───────────── */}
      <div className="w-full bg-[#0a0a0a] flex items-center justify-center pt-8 pb-16 px-4">
        <h1 className="text-[15vw] leading-none font-street text-transparent bg-clip-text bg-gradient-to-b from-gray-800 to-[#0a0a0a] select-none text-center">
          WOBBLIX
        </h1>
      </div>

      {/* ───────────── TOP FOOTER ───────────── */}
      <div className="w-full px-4 sm:px-6 md:px-16 py-16 sm:py-20 bg-[#0a0a0a]">
        <div
          className="
            max-w-[1400px] mx-auto
            grid grid-cols-1
            sm:grid-cols-2
            md:grid-cols-4
            gap-12 sm:gap-16
            text-sm
          "
        >

          {/* SHOP */}
          <div className="text-center md:text-left">
            <h3 className="mb-6 sm:mb-8 font-tech text-lg tracking-[0.2em] text-white uppercase drop-shadow-md">
              SHOP
            </h3>
            <ul className="space-y-4 text-gray-400 font-medium tracking-wide">
              <li><Link to="/collection" className="hover:text-white transition-colors duration-300">Trending Now</Link></li>
              <li><Link to="/collection" className="hover:text-white transition-colors duration-300">All Products</Link></li>
              <li><Link to="/collection" className="hover:text-white transition-colors duration-300">Under 1500</Link></li>
            </ul>
          </div>

          {/* INFORMATION */}
          <div className="text-center md:text-left">
            <h3 className="mb-6 sm:mb-8 font-tech text-lg tracking-[0.2em] text-white uppercase drop-shadow-md">
              INFO
            </h3>
            <ul className="space-y-4 text-gray-400 font-medium tracking-wide">
              <li><Link to="/about" className="hover:text-white transition-colors duration-300">Shipping Policy</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors duration-300">Privacy Policy</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors duration-300">Refund Policy</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors duration-300">Terms of Service</Link></li>
            </ul>
          </div>

          {/* CUSTOMER SERVICE */}
          <div className="text-center md:text-left">
            <h3 className="mb-6 sm:mb-8 font-tech text-lg tracking-[0.2em] text-white uppercase drop-shadow-md">
              SUPPORT
            </h3>
            <ul className="space-y-4 text-gray-400 font-medium tracking-wide">
              <li><Link to="/orders" className="hover:text-white transition-colors duration-300">Track Order</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors duration-300">Visit Our Store</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors duration-300">FAQ</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors duration-300">Contact Us</Link></li>
            </ul>
          </div>

          {/* VISIT STORE */}
          <div className="text-center md:text-left">
            <h3 className="mb-6 sm:mb-8 font-tech text-lg tracking-[0.2em] text-white uppercase drop-shadow-md">
              HQ
            </h3>
            <div className="space-y-4 text-gray-400 font-medium leading-relaxed tracking-wide">
              <p className="uppercase">
                Wobblix Clothing <br />
                Panipat, Haryana, India
              </p>
              <p className="text-white hover:text-gray-300 transition-colors duration-300">support@wobblix.com</p>
            </div>
          </div>

        </div>
      </div>
        <div className="text-center pb-8 opacity-60">
          <p className="text-[10px] text-gray-500 tracking-[0.3em] font-bold uppercase">
            MADE WITH <span className="text-brand-red">❤</span> BY MOHIT MUDGIL (WOBBLIX TEAM)
          </p>
        </div>

      {/* ───────────── COPYRIGHT BAR ───────────── */}
      <div className="border-t border-gray-800 bg-black py-6">
        <div className="
          max-w-[1400px] mx-auto
          px-4 sm:px-6
          flex flex-col md:flex-row
          items-center justify-between
          gap-4 sm:gap-6
          text-xs font-medium tracking-widest text-gray-500 uppercase
        ">
          <p>© 2026 WOBBLIX CLOTHING. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6 text-gray-400">
            <span className="hover:text-white transition-colors">Visa</span>
            <span className="hover:text-white transition-colors">Mastercard</span>
            <span className="hover:text-white transition-colors">UPI</span>
            <span className="hover:text-white transition-colors">Razorpay</span>
          </div>
        </div>
      </div>

    </footer>
  )
}

export default Footer
