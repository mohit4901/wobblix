import React from 'react'
import { Link } from 'react-router-dom'

const B4G1PromoSection = () => {
  return (
    <section className="py-24 bg-black text-white relative overflow-hidden px-4 sm:px-10 lg:px-24">
      {/* Background Graphic/Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-[1300px] mx-auto relative z-10 border border-white/10 bg-neutral-900/50 backdrop-blur-md p-10 sm:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-[0_0_50px_rgba(230,0,0,0.05)]">
        
        {/* LEFT: TEXT CONTENT */}
        <div className="flex-1 space-y-6 text-left max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-600 text-[10px] font-black uppercase tracking-[0.2em] animate-pulse">
            <span>Special Deal</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black tracking-tight uppercase leading-none text-white">
            BUY 4, GET 1 <br/>
            <span className="text-red-600">COMPLETELY FREE</span>
          </h2>

          <p className="text-sm sm:text-base text-gray-400 font-medium leading-relaxed">
            Upgrade your rotation. Add any 4 <strong className="text-white">Oversized T-Shirts</strong> or <strong className="text-white">Tank Tops</strong> to your bag, and the cheapest one is automatically discounted on us. Mix and match as you like.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              to="/collection?subCategory=Oversized T-Shirts"
              className="bg-white text-black px-8 py-4 text-xs font-black uppercase tracking-[0.2em] hover:bg-red-600 hover:text-white transition-all duration-300 shadow-[6px_6px_0px_0px_rgba(230,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
            >
              Shop Oversized
            </Link>
            <Link
              to="/collection?subCategory=Tank Tops"
              className="bg-transparent border border-white/20 text-white px-8 py-4 text-xs font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300"
            >
              Shop Tanks
            </Link>
          </div>
        </div>

        {/* RIGHT: DECORATIVE / BRAND CARD */}
        <div className="w-full lg:w-[450px] aspect-[4/3] bg-neutral-950 border border-white/10 p-8 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/20 rounded-full blur-2xl group-hover:scale-150 transition-all duration-700"></div>
          
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono tracking-widest text-gray-500">// PROMO ID: B4G1_WOBBLIX</span>
            <span className="text-xs font-black uppercase text-red-600 tracking-wider">AUTO-APPLIED</span>
          </div>

          <div className="space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Oversized T-Shirt</span>
              <span className="text-xs font-black">INCLUDED</span>
            </div>
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tank Top</span>
              <span className="text-xs font-black">INCLUDED</span>
            </div>
            <div className="flex items-center justify-between text-red-500">
              <span className="text-xs font-black uppercase tracking-widest">Hoodies & Others</span>
              <span className="text-xs font-black uppercase tracking-widest text-gray-500">EXCLUDED</span>
            </div>
          </div>

          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Valid Regions</p>
              <p className="text-xs font-black uppercase tracking-wider text-white">Worldwide Shipping</p>
            </div>
            <div className="text-right">
              <p className="text-[28px] font-black leading-none text-white uppercase tracking-tight">FREE</p>
              <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">ON EVERY 4TH ITEM</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default B4G1PromoSection
