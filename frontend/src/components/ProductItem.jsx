import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price, badge }) => {
  const { currency } = useContext(ShopContext)

  return (
    <div className="w-full">
      <Link
        to={`/product/${id}`}
        onClick={() => window.scrollTo(0, 0)}
        className="block h-full"
        aria-label={`View details for ${name}`}
      >
        {/* CARD */}
        <div className="bg-white rounded-none border border-gray-100 hover:shadow-xl transition-all duration-300 h-full flex flex-col group">

          {/* IMAGE AREA */}
          <div className="relative overflow-hidden aspect-[3/4] bg-[#f9f9f9]">

            {/* Wishlist */}
            <div className="absolute top-4 right-4 w-10 h-10 rounded-none bg-white shadow-sm flex items-center justify-center text-black hover:text-red-500 transition-colors cursor-pointer text-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              ♥
            </div>

            {/* Badge / Ribbon */}
            {badge && (
              <div className="absolute top-4 left-0 bg-black text-white text-[10px] font-black px-4 py-2 uppercase tracking-[0.2em] z-10 shadow-lg">
                {badge}
              </div>
            )}

            <img
              src={image[0]}
              alt={`${name} - Wobblix Premium Streetwear`}
              title={`${name} Streetwear`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
          </div>

          {/* CONTENT */}
          <div className="p-5 flex flex-col flex-1">

            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="text-sm font-black uppercase tracking-tight leading-tight text-black line-clamp-2">
                {name}
              </h3>
              <p className="text-sm font-black text-black whitespace-nowrap">
                {currency}{price}
              </p>
            </div>

            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-6">
              Wobblix Studio // Heavyweight
            </p>

            <div className="flex-1"></div>

            <button
              type="button"
              className="
                w-full
                py-4
                bg-black
                text-white
                text-[10px]
                font-black
                tracking-[0.2em]
                uppercase
                hover:bg-brand-red
                transition-all
                duration-300
              "
            >
              ADD TO BAG
            </button>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductItem
