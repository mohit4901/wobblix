import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const OversizedCollection = () => {
  const { products } = useContext(ShopContext)
  const [oversized, setOversized] = useState([])

  useEffect(() => {
    // Filter for Oversized T-Shirts
    const filtered = products.filter(item => item.subCategory === "Oversized T-Shirts")
    // Sort by date descending
    filtered.sort((a, b) => b.date - a.date)
    setOversized(filtered.slice(0, 10))
  }, [products])

  if (oversized.length === 0) return null;

  return (
    <div className="w-full py-20 bg-[#edece8] border-t border-gray-200">
      <div className="text-center mb-14 px-4">
        <Title text1="OVERSIZED" text2="DROPS" />
        <p className="w-3/4 m-auto text-xs sm:text-sm text-gray-500 font-bold tracking-widest mt-4 uppercase">
          Comfort meets street style. Premium heavyweight oversized fits.
        </p>
      </div>

      {/* Infinite Scroll Carousel */}
      <div className="w-full overflow-x-hidden relative py-4">
        <div className="infinite-scroll flex gap-8">
          {/* First Set */}
          {oversized.map((item, index) => (
            <div key={`oversized-first-${item._id}-${index}`} className="w-[280px] flex-shrink-0">
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
          {/* Duplicate Set for Loop */}
          {oversized.map((item, index) => (
            <div key={`oversized-second-${item._id}-${index}`} className="w-[280px] flex-shrink-0">
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
    </div>
  )
}

export default OversizedCollection
