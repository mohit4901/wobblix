import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext)

  return (
    <div className="w-full">
      <Link
        to={`/product/${id}`}
        onClick={() => window.scrollTo(0, 0)}
        className="block h-full"
      >
        {/* CARD */}
        <div className="bg-white rounded-[28px] p-4 shadow-md h-full flex flex-col">

          {/* IMAGE AREA */}
          <div className="relative bg-[#f5f5f5] rounded-[20px] h-[180px] sm:h-[220px] flex items-center justify-center">

            {/* Wishlist */}
            <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white shadow flex items-center justify-center text-black hover:text-red-500 transition-colors cursor-pointer text-lg z-10">
              ♥
            </div>

            <img
              src={image[0]}
              alt={name}
              className="max-h-[150px] sm:max-h-[170px] max-w-[85%] object-contain"
            />
          </div>

          {/* CONTENT */}
          <div className="mt-4 flex flex-col flex-1">

            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-semibold leading-snug line-clamp-2">
                {name}
              </h3>

              <div className="flex items-center gap-1 text-sm text-gray-500">
                ★ <span>4.5</span>
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-1 line-clamp-2 uppercase tracking-wider font-medium">
              Heavyweight fit. Engineered for the streets.
            </p>

            <div className="flex-1"></div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-lg font-semibold">
                {currency}{price}
              </p>

              <button
                type="button"
                className="
                  px-5 py-2
                  bg-black
                  text-white
                  text-xs
                  font-bold
                  tracking-widest
                  uppercase
                  hover:bg-gray-800
                  transition
                  shadow-md
                "
              >
                + ADD
              </button>
            </div>

          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductItem
