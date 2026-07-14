import React from "react";

const AnnouncementBar = () => {
  return (
    <div className="w-full bg-black h-[36px] overflow-hidden flex items-center border-b border-white/10 select-none">
      <div className="w-full overflow-hidden relative">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] cursor-pointer">
          {/* First set */}
          <div className="flex items-center gap-12 pr-12 text-[10px] sm:text-[11px] font-black tracking-[0.2em] uppercase text-white whitespace-nowrap">
            <span>⚡️ USE CODE NEW10 FOR 15% OFF ON YOUR FIRST 5 ORDERS</span>
            <span className="text-brand-red">•</span>
            <span>🚛 FREE SHIPPING ON ALL ORDERS ABOVE ₹2000 // SHIP WORLDWIDE</span>
            <span className="text-brand-red">•</span>
            <span>🔥 BUY 4 GET 5TH FREE! APPLICABLE ON ALL PRODUCTS</span>
            <span className="text-brand-red">•</span>
          </div>
          {/* Second set (duplicate for seamless loop) */}
          <div className="flex items-center gap-12 pr-12 text-[10px] sm:text-[11px] font-black tracking-[0.2em] uppercase text-white whitespace-nowrap">
            <span>⚡️ USE CODE NEW10 FOR 15% OFF ON YOUR FIRST 5 ORDERS</span>
            <span className="text-brand-red">•</span>
            <span>🚛 FREE SHIPPING ON ALL ORDERS ABOVE ₹2000 // SHIP WORLDWIDE</span>
            <span className="text-brand-red">•</span>
            <span>🔥 BUY 4 GET 5TH FREE! APPLICABLE ON ALL PRODUCTS</span>
            <span className="text-brand-red">•</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
