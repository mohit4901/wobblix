import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const Success = () => {
    
    useEffect(() => {
        // Trigger confetti on mount
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-[#edece8] min-h-screen flex items-center justify-center px-4 py-20">
            <SEO title="Order Confirmed" description="Thank you for your purchase from Wobblix Clothing." />
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-2xl w-full bg-white border-2 border-black p-10 md:p-16 text-center shadow-[20px_20px_0px_0px_rgba(0,0,0,1)]"
            >
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <h1 className="font-street text-5xl md:text-6xl text-black uppercase leading-tight mb-4">Order Confirmed</h1>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-10">
                    Your Wobblix drip is being prepared. Check your email for details.
                </p>

                <div className="space-y-4">
                    <Link to="/orders">
                        <button className="w-full bg-black text-white py-4 font-black tracking-[0.2em] uppercase hover:bg-brand-red transition-all duration-300">
                            VIEW MY ORDERS
                        </button>
                    </Link>
                    <Link to="/collection">
                        <button className="w-full bg-white text-black border-2 border-black py-4 font-black tracking-[0.2em] uppercase hover:bg-gray-50 transition-all duration-300">
                            CONTINUE SHOPPING
                        </button>
                    </Link>
                </div>

                <div className="mt-12 pt-10 border-t border-gray-100">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">
                        "Your trust is our drip. We'll update you every step of the way."
                    </p>
                </div>
            </motion.div>
        </div>
    )
}

export default Success
