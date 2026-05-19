import React from 'react'
import { Link } from 'react-router-dom'

const B4G1PromoSection = () => {
  return (
    <section className="py-24 bg-transparent text-black relative overflow-hidden px-4 sm:px-10 lg:px-24">
      <div className="max-w-[1300px] mx-auto relative z-10 border-2 border-black bg-white p-10 sm:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        
        {/* LEFT: TEXT CONTENT */}
        <div className="flex-1 space-y-6 text-left max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em]">
            <span>SPECIAL OFFER</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black tracking-tight uppercase leading-none text-black">
            BUY 4, GET 1 <br/>
            <span className="text-red-600">COMPLETELY FREE</span>
          </h2>

          <p className="text-sm sm:text-base text-gray-700 font-bold leading-relaxed">
            Upgrade your rotation. Add any 4 <strong className="text-black underline">Oversized T-Shirts</strong> or <strong className="text-black underline">Tank Tops</strong> to your bag, and the cheapest one is automatically discounted on us. Mix and match as you like.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              to="/collection?subCategory=Oversized T-Shirts"
              className="bg-black text-white px-8 py-4 text-xs font-black uppercase tracking-[0.2em] hover:bg-red-600 transition-all duration-300 shadow-[6px_6px_0px_0px_rgba(230,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
            >
              Shop Oversized
            </Link>
            <Link
              to="/collection?subCategory=Tank Tops"
              className="bg-transparent border-2 border-black text-black px-8 py-4 text-xs font-black uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all duration-300"
            >
              Shop Tanks
            </Link>
          </div>
        </div>

        {/* RIGHT: DECORATIVE / BRAND CARD */}
        <div className="w-full lg:w-[450px] aspect-[4/3] bg-gray-50 border-2 border-black p-8 flex flex-col justify-between relative overflow-hidden group shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-black tracking-widest text-gray-500">// PROMO ID: B4G1_WOBBLIX</span>
            <span className="text-xs font-black uppercase text-red-600 tracking-wider">AUTO-APPLIED</span>
          </div>

          <div className="space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-black/10">
              <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">Oversized T-Shirt</span>
              <span className="text-xs font-black text-black">INCLUDED</span>
            </div>
            <div className="flex items-center justify-between pb-3 border-b border-black/10">
              <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">Tank Top</span>
              <span className="text-xs font-black text-black">INCLUDED</span>
            </div>
            <div className="flex items-center justify-between text-red-600">
              <span className="text-xs font-black uppercase tracking-widest">Hoodies & Others</span>
              <span className="text-xs font-black uppercase tracking-widest text-gray-400">EXCLUDED</span>
            </div>
          </div>

          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Valid Regions</p>
              <p className="text-xs font-black uppercase tracking-wider text-black">Worldwide Shipping</p>
            </div>
            <div className="text-right">
              <p className="text-[28px] font-black leading-none text-black uppercase tracking-tight">FREE</p>
              <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">ON EVERY 4TH ITEM</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default B4G1PromoSection
