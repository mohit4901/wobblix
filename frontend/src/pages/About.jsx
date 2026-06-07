import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div className="px-4 sm:px-10 lg:px-16">

      {/* ───── ABOUT HEADER ───── */}
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1="ABOUT" text2="WOBBLIX" />
      </div>

      {/* ───── INTRO ───── */}
      <div className="my-10 flex flex-col md:flex-row gap-16 px-4">
        <img
          className="w-full md:max-w-[450px] rounded-2xl shadow-xl object-cover"
          src={assets.about_img}
          alt="about wobblix"
        />

        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-700 text-base leading-relaxed">
          <p>
            <b className="text-black text-xl tracking-wide">WOBBLIX CLOTHING</b> isn't just another fashion brand. We are a disruptive, premium streetwear collective engineered for the modern Gen-Z culture. Born out of the desire to break the matrix of boring fast fashion, Wobblix delivers extreme quality, hyper-responsive fits, and aesthetics that command attention.
          </p>

          <p>
            We built this platform to be the <span className="font-bold text-brand-red">Amazon of Streetwear</span>—a god-tier e-commerce experience offering unparalleled UI speed, lightning-fast deliveries, and secure 1-click checkouts. Our infrastructure is designed to handle 10k+ concurrent shoppers during our exclusive drops without breaking a sweat.
          </p>

          <p>
            From our ultra-heavyweight oversized tees to precision-stitched hoodies, every drop is an event. Welcome to the top 1% of Indian streetwear. Welcome to Wobblix.
          </p>
        </div>
      </div>

      {/* ───── WHY CHOOSE US ───── */}
      <div className="text-xl py-4">
        <Title text1="THE" text2="WOBBLIX ADVANTAGE" />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20 gap-6 px-4">
        <div className="border border-gray-200 shadow-sm rounded-xl px-10 md:px-12 py-10 flex flex-col gap-4 hover:shadow-lg transition-all duration-300">
          <b className="text-lg">God-Level Quality</b>
          <p className="text-gray-600">
            280+ GSM French Terry cottons, puff-prints that survive 100+ washes, and silhouettes engineered for the perfect drape. No compromises.
          </p>
        </div>

        <div className="border border-gray-200 shadow-sm rounded-xl px-10 md:px-12 py-10 flex flex-col gap-4 hover:shadow-lg transition-all duration-300">
          <b className="text-lg">Hyper-Fast Logistics</b>
          <p className="text-gray-600">
            Automated API-driven tracking, priority dispatch, and real-time dashboard updates so you always know exactly where your drip is.
          </p>
        </div>

        <div className="border border-gray-200 shadow-sm rounded-xl px-10 md:px-12 py-10 flex flex-col gap-4 hover:shadow-lg transition-all duration-300">
          <b className="text-lg">Bulletproof Payments</b>
          <p className="text-gray-600">
            Server-to-server Razorpay webhooks guarantee that your orders are securely processed instantly. 100% encrypted and fail-safe.
          </p>
        </div>
      </div>

      {/* ───── HELP & SUPPORT ───── */}
      <div className="text-xl py-10 border-t pt-16">
        <Title text1="HQ &" text2="CONTACT" />
      </div>

      <div className="max-w-[900px] mx-auto px-4 text-sm text-gray-600 space-y-10 mb-20">

        {/* VISIT STORE */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
          <b className="text-gray-800 block mb-2 text-lg">Wobblix Headquarters</b>
          <p>
            Wobblix Clothing <br />
            Panipat, Haryana, India
          </p>
        </div>

        {/* CONTACT */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
          <b className="text-gray-800 block mb-2 text-lg">Hit Us Up</b>
          <p>Email: support@wobblix.com</p>
          <p>Phone: +91 9588184740, +91 7404681706</p>
        </div>

      </div>

      <NewsletterBox />

    </div>
  )
}

export default About


