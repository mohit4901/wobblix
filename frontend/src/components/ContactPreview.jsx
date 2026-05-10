import React from 'react'
import { assets } from '../assets/assets'
import Title from './Title'

const ContactPreview = () => {
  return (
    <div className="w-full py-24 bg-brand-bone border-t border-gray-200">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <Title text1="REACH" text2="OUT" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          
          {/* LEFT: MAP & INFO */}
          <div className="space-y-12">
            {/* Map */}
            <div className="relative group grayscale hover:grayscale-0 transition-all duration-700">
              <div className="w-full h-[300px] sm:h-[400px] overflow-hidden border border-gray-200 shadow-xl">
                <iframe
                  title="Wobblix Clothing Location"
                  src="https://www.google.com/maps?q=Wobblix%20Clothing%20Panipat%20Haryana&output=embed"
                  className="w-full h-full border-0"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="absolute -bottom-4 -left-4 w-full h-full border border-brand-red -z-10 group-hover:bottom-0 group-hover:left-0 transition-all"></div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 pt-4">
              <div className="space-y-3">
                <h4 className="text-xs font-bold tracking-widest text-brand-red uppercase">HQ Address</h4>
                <p className="text-sm text-gray-600 font-medium leading-relaxed">
                  Wobblix Clothing <br />
                  Panipat, Haryana, India
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="text-xs font-bold tracking-widest text-brand-red uppercase">Direct Line</h4>
                <p className="text-sm text-gray-600 font-medium">
                  +91 95881 84740 <br />
                  +91 74046 81706
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="text-xs font-bold tracking-widest text-brand-red uppercase">Email Us</h4>
                <p className="text-sm text-gray-600 font-medium break-all uppercase">
                  support@wobblix.com
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="text-xs font-bold tracking-widest text-brand-red uppercase">Working Hours</h4>
                <p className="text-sm text-gray-600 font-medium uppercase">
                  Mon - Sat <br />
                  10:00 AM - 07:00 PM
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: CONTACT FORM */}
          <div className="bg-white border border-gray-200 p-8 sm:p-12 shadow-2xl relative">
            <div className="absolute top-0 right-0 w-2 h-full bg-brand-red"></div>
            <h3 className="text-2xl font-street text-black uppercase mb-8 tracking-tight">Drop a Message</h3>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Your Name</label>
                  <input
                    type="text"
                    placeholder="ENTER NAME"
                    className="w-full bg-gray-50 border-b border-gray-300 px-0 py-3 text-sm outline-none focus:border-brand-red transition-all uppercase placeholder:text-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Email Address</label>
                  <input
                    type="email"
                    placeholder="ENTER EMAIL"
                    className="w-full bg-gray-50 border-b border-gray-300 px-0 py-3 text-sm outline-none focus:border-brand-red transition-all uppercase placeholder:text-gray-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Message</label>
                <textarea
                  placeholder="WHAT'S ON YOUR MIND?"
                  rows="4"
                  className="w-full bg-gray-50 border-b border-gray-300 px-0 py-3 text-sm outline-none focus:border-brand-red transition-all uppercase placeholder:text-gray-300 resize-none"
                ></textarea>
              </div>

              <button
                type="button"
                className="w-full bg-black text-white py-4 text-xs font-bold tracking-[0.3em] uppercase hover:bg-brand-red transition-all duration-300 shadow-[8px_8px_0px_0px_rgba(230,0,0,1)] hover:shadow-none animate-button-pulse hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ContactPreview
