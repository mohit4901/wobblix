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
    setLatestProducts(products.slice(0, 5))
  }, [products])



  return (
    <div className="w-full py-20 px-4 sm:px-10 lg:px-16">

      {/* Section Heading */}
      <div className="text-center mb-14">
        <Title text1="OUR" text2="PRODUCTS" />
      </div>

      <div
        ref={scrollRef}
        className="
          flex gap-4 px-4 overflow-x-auto no-scrollbar snap-x snap-mandatory
          sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
          sm:overflow-visible sm:gap-6 sm:px-0
          max-w-[1600px] mx-auto
        "
      >
        {latestProducts.map((item, index) => (
          <div key={index} className="snap-start w-[72vw] sm:w-auto flex-shrink-0 sm:flex-shrink">
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
