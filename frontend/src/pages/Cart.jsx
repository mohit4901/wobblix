import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import CartTotal from '../components/CartTotal'

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext)

  const [cartData, setCartData] = useState([])

  useEffect(() => {
    if (products.length > 0) {
      const tempData = []

      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          const itemData = cartItems[productId][size]

          const quantity =
            typeof itemData === 'number' ? itemData : itemData.quantity

          const instruction =
            typeof itemData === 'object' ? itemData.instruction || '' : ''

          if (quantity > 0) {
            tempData.push({
              _id: productId,
              size,
              quantity,
              instruction,
            })
          }
        }
      }

      setCartData(tempData)
    }
  }, [cartItems, products])

  return (
    <div className="border-t pt-14 px-4 sm:px-10 lg:px-16">
      <div className="text-2xl mb-3">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          )

          if (!productData) return null

          return (
            <div key={index} className="py-4 border-b">

              <div className="flex gap-6">
                <img
                  className="w-16"
                  src={productData?.image?.[0]}
                  alt=""
                />

                <div className="w-full">
                  <p>{productData.name}</p>

                  {/* ✅ FIXED INPUT */}
                  <input
                    type="text"
                    placeholder="Enter preferred color"
                    defaultValue={item.instruction || ''}
                    onChange={(e) =>
                      updateQuantity(
                        item._id,
                        item.size,
                        item.quantity,
                        e.target.value
                      )
                    }
                    className="mt-2 border px-2 py-1 w-full"
                  />
                </div>
              </div>

              {/* QUANTITY */}
              <input
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(
                    item._id,
                    item.size,
                    Number(e.target.value),
                    item.instruction
                  )
                }
              />
            </div>
          )
        })}
      </div>

      <button onClick={() => navigate('/place-order')}>
        Checkout
      </button>
    </div>
  )
}

export default Cart
