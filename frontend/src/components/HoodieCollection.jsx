import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem'

const HoodieCollection = () => {
  const { products } = useContext(ShopContext)
  const [hoodies, setHoodies] = useState([])

  useEffect(() => {
    // Filter for Hoodies
    const filtered = products.filter(item => item.subCategory === "Hoodies")
    // Sort by date descending
    filtered.sort((a, b) => b.date - a.date)
    setHoodies(filtered.slice(0, 5))
  }, [products])

  if (hoodies.length === 0) return null;

  return (
    <div className="w-full py-20 px-4 sm:px-10 lg:px-16 bg-white text-black border-t border-gray-200">
      <div className="text-center mb-14">
        <div className="flex justify-center items-center gap-4">
          <span className="h-[2px] w-12 bg-black hidden sm:block"></span>
          <h2 className="text-3xl font-black tracking-widest uppercase text-black font-street">
            HOODIE <span className="text-gray-500">SEASON</span>
          </h2>
          <span className="h-[2px] w-12 bg-black hidden sm:block"></span>
        </div>
        <p className="w-3/4 m-auto text-xs text-gray-500 font-black tracking-widest mt-4 uppercase">
          HEAVYWEIGHT PREMIUM STREETWEAR HOODIES TO KEEP YOU WARM IN STYLE.
        </p>
      </div>

      <div className="flex gap-4 px-4 overflow-x-auto no-scrollbar snap-x snap-mandatory sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:overflow-visible sm:gap-6 sm:px-0 max-w-[1600px] mx-auto">
        {hoodies.map((item, index) => (
          <div key={index} className="snap-start w-[72vw] sm:w-auto flex-shrink-0 sm:flex-shrink">
            <ProductItem
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
              badge={item.badge || "HEAVYWEIGHT"}
              subCategory={item.subCategory}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default HoodieCollection
