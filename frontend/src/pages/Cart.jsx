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
          const quantity = typeof itemData === 'number' ? itemData : itemData.quantity
          const instruction = typeof itemData === 'object' ? itemData.instruction || '' : ''
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
    <div className="bg-[#edece8] min-h-screen pt-14 pb-20 px-4 sm:px-10 lg:px-24">
      
      <div className="mb-12">
        <Title text1={'YOUR'} text2={'BAG'} />
      </div>

      <div className="flex flex-col lg:flex-row gap-16">
        
        {/* LEFT: CART ITEMS */}
        <div className="flex-1 space-y-6">
          {cartData.length === 0 ? (
            <div className="py-20 text-center border-2 border-dashed border-gray-300 bg-white/50">
              <p className="text-sm font-black uppercase tracking-widest text-gray-400">Your bag is empty.</p>
              <button onClick={() => navigate('/collection')} className="mt-6 text-xs font-black underline uppercase tracking-[0.2em]">Go Shopping</button>
            </div>
          ) : (
            cartData.map((item, index) => {
              const productData = products.find((product) => product._id === item._id)
              if (!productData) return null
              return (
                <div key={index} className="bg-white p-6 shadow-sm flex flex-col sm:flex-row gap-8 relative group">
                  
                  {/* IMAGE */}
                  <div className="w-full sm:w-32 aspect-square bg-[#f5f5f5] flex-shrink-0">
                    <img className="w-full h-full object-cover" src={productData.image[0]} alt="" />
                  </div>

                  {/* DETAILS */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-black text-lg uppercase tracking-tight text-black">{productData.name}</h3>
                        <p className="font-black text-lg">{currency}{productData.price}</p>
                      </div>
                      
                      <div className="flex items-center gap-6 mt-3">
                         <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Size</span>
                            <span className="text-xs font-black bg-black text-white px-3 py-1 uppercase">{item.size}</span>
                         </div>
                      </div>

                      {/* Instruction / Note */}
                      <div className="mt-6">
                         <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 block">Custom Instruction</span>
                         <input
                           type="text"
                           placeholder="Any special notes?"
                           defaultValue={item.instruction || ''}
                           onBlur={(e) => updateQuantity(item._id, item.size, item.quantity, e.target.value)}
                           className="w-full text-xs font-bold border-b border-gray-200 py-2 outline-none focus:border-black transition-all bg-transparent"
                         />
                      </div>
                    </div>

                    {/* QUANTITY CONTROLS */}
                    <div className="flex items-center justify-between mt-8">
                       <div className="flex items-center border border-black">
                          <button 
                            onClick={() => updateQuantity(item._id, item.size, item.quantity - 1, item.instruction)}
                            className="w-10 h-10 flex items-center justify-center font-black hover:bg-black hover:text-white transition-all border-r border-black"
                          >
                            -
                          </button>
                          <span className="w-12 text-center font-black text-sm">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item._id, item.size, item.quantity + 1, item.instruction)}
                            className="w-10 h-10 flex items-center justify-center font-black hover:bg-black hover:text-white transition-all border-l border-black"
                          >
                            +
                          </button>
                       </div>

                       <button 
                         onClick={() => updateQuantity(item._id, item.size, 0, item.instruction)}
                         className="text-[10px] font-black text-gray-400 hover:text-brand-red uppercase tracking-widest transition-colors"
                       >
                         Remove
                       </button>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* RIGHT: SUMMARY */}
        <div className="lg:w-[400px]">
          <div className="bg-black text-white p-8 sticky top-24 shadow-2xl">
            <CartTotal />
            <button 
              onClick={() => navigate('/place-order')}
              className="w-full bg-brand-red text-white py-5 mt-10 font-black tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all duration-300"
            >
              PROCEED TO CHECKOUT
            </button>
            <p className="text-[9px] text-gray-400 mt-6 text-center uppercase tracking-widest font-bold">
              Shipping & taxes calculated at checkout
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Cart

