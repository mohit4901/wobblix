import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

const CartTotal = () => {

    const {currency,delivery_fee,getCartAmount, discount} = useContext(ShopContext);

    const subtotal = getCartAmount();
    const discountAmount = (subtotal * discount) / 100;
    const total = subtotal > 0 ? (subtotal - discountAmount + delivery_fee) : 0;

  return (
    <div className='w-full'>
      <div className='mb-8 pb-4 border-b border-gray-800'>
         <h2 className="text-xl font-black uppercase tracking-widest text-white">Summary</h2>
      </div>

      <div className='flex flex-col gap-4 text-xs font-bold uppercase tracking-widest'>
            <div className='flex justify-between items-center'>
                <p className="text-gray-400">Subtotal</p>
                <p>{currency} {subtotal}.00</p>
            </div>
            {discount > 0 && (
                <div className='flex justify-between items-center text-green-500'>
                    <p>Discount ({discount}%)</p>
                    <p>- {currency} {discountAmount}.00</p>
                </div>
            )}
            <div className='flex justify-between items-center'>
                <p className="text-gray-400">Shipping Fee</p>
                <p>{currency} {delivery_fee}.00</p>
            </div>
            <div className='pt-6 mt-2 border-t border-gray-800 flex justify-between items-center text-lg'>
                <p className="text-white font-black">Total</p>
                <p className="text-white font-black">
                   {currency} {total}.00
                </p>
            </div>
      </div>
    </div>
  )
}

export default CartTotal

