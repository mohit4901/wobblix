import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const OversizedCollection = () => {
  const { products } = useContext(ShopContext)
  const [oversized, setOversized] = useState([])

  useEffect(() => {
    // Filter for Oversized T-Shirts
    const filtered = products.filter(item => Array.isArray(item.subCategory) ? item.subCategory.includes("Oversized T-Shirts") : item.subCategory === "Oversized T-Shirts")
    // Sort by date descending
    filtered.sort((a, b) => b.date - a.date)
    setOversized(filtered.slice(0, 5))
  }, [products])

  if (oversized.length === 0) return null;

  return (
    <div className="w-full py-20 px-4 sm:px-10 lg:px-16 bg-[#edece8] border-t border-gray-200">
      <div className="text-center mb-14">
        <Title text1="OVERSIZED" text2="DROPS" />
        <p className="w-3/4 m-auto text-xs sm:text-sm text-gray-500 font-bold tracking-widest mt-4 uppercase">
          Comfort meets street style. Premium heavyweight oversized fits.
        </p>
      </div>

      <div className="flex gap-4 px-4 overflow-x-auto no-scrollbar snap-x snap-mandatory sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:overflow-visible sm:gap-6 sm:px-0 max-w-[1600px] mx-auto">
        {oversized.map((item, index) => (
          <div key={index} className="snap-start w-[72vw] sm:w-auto flex-shrink-0 sm:flex-shrink">
            <ProductItem
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
              badge={item.badge || "OVERSIZED"}
              subCategory={item.subCategory}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default OversizedCollection
