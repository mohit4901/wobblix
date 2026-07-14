import React, { useContext, useEffect, useRef, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'
import { Link } from 'react-router-dom'

const LatestCollection = () => {
  const { products } = useContext(ShopContext)
  const [latestProducts, setLatestProducts] = useState([])
  const scrollRef = useRef(null)

  useEffect(() => {
    setLatestProducts(products.slice(0, 10))
  }, [products])

  return (
    <div className="w-full py-20">

      {/* Section Heading */}
      <div className="text-center mb-14 px-4">
        <Title text1="OUR" text2="PRODUCTS" />
      </div>

      {/* Infinite Scroll Carousel */}
      <div className="w-full overflow-x-hidden relative py-4">
        <div className="infinite-scroll flex gap-8">
          {/* First Set */}
          {latestProducts.map((item, index) => (
            <div key={`latest-first-${item._id}-${index}`} className="w-[280px] flex-shrink-0">
              <ProductItem
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
                badge={item.badge}
                subCategory={item.subCategory}
              />
            </div>
          ))}
          {/* Duplicate Set for Loop */}
          {latestProducts.map((item, index) => (
            <div key={`latest-second-${item._id}-${index}`} className="w-[280px] flex-shrink-0">
              <ProductItem
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
                badge={item.badge}
                subCategory={item.subCategory}
              />
            </div>
          ))}
        </div>
      </div>

      {/* VIEW ALL BUTTON */}
      <div className="flex justify-center mt-14">
        <Link to="/collection">
          <button
            className="
              px-16 py-5
              bg-black
              text-white
              text-xs
              font-bold
              tracking-[0.3em]
              uppercase
              hover:bg-brand-red
              transition-all
              duration-300
              shadow-[8px_8px_0px_0px_rgba(230,0,0,1)]
              hover:shadow-none
              animate-button-pulse
              hover:scale-105
            "
          >
            VIEW ALL DROPS
          </button>
        </Link>
      </div>

    </div>
  )
}

export default LatestCollection
