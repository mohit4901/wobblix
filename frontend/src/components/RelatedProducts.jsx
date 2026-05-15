import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const RelatedProducts = ({ category, subCategory, currentProductId }) => {
  const { products } = useContext(ShopContext)
  const [related, setRelated] = useState([])

  useEffect(() => {
    if (products.length > 0 && category) {

      // 1️⃣ same category + same subCategory (best match)
      let primaryMatch = products.filter(item =>
        item._id !== currentProductId &&
        item.category === category &&
        subCategory &&
        item.subCategory === subCategory
      )

      // 2️⃣ same category only (fallback)
      let secondaryMatch = products.filter(item =>
        item._id !== currentProductId &&
        item.category === category
      )

      // 3️⃣ merge & remove duplicates
      let combined = [...primaryMatch, ...secondaryMatch]
      const uniqueProducts = Array.from(
        new Map(combined.map(item => [item._id, item])).values()
      )

      setRelated(uniqueProducts.slice(0, 8))
    }
  }, [products, category, subCategory, currentProductId])

  return (
    <div className="my-20 w-full">

      {/* Title */}
      <div className="text-center mb-12">
        <Title text1="RELATED" text2="PRODUCTS" />
      </div>

      {/* MOBILE: Horizontal Scroll */}
      <div className="md:hidden w-full overflow-x-auto pb-4 -mx-4 px-4" style={{ scrollbarWidth: 'none' }}>
        <div className="flex gap-3" style={{ width: 'max-content' }}>
          {related.map((item, index) => (
            <div key={index} className="w-[150px] flex-shrink-0">
              <ProductItem
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image}
              />
            </div>
          ))}
        </div>
      </div>

      {/* DESKTOP: Grid */}
      <div className="hidden md:grid max-w-[1300px] mx-auto grid-cols-3 lg:grid-cols-5 gap-6 px-6">
        {related.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.image}
            badge={item.badge}
          />
        ))}
      </div>

    </div>
  )
}

export default RelatedProducts
