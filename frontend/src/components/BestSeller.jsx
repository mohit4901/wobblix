import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {

    const {products} = useContext(ShopContext);
    const [bestSeller,setBestSeller] = useState([]);

    useEffect(()=>{
        const bestProduct = products.filter((item)=>(item.bestseller));
        setBestSeller(bestProduct.slice(0,5))
    },[products])

  return (
    <div className='w-full py-20 px-4 sm:px-10 lg:px-16 border-t-2 border-brand-red bg-brand-bone'>
      <div className='text-center mb-14'>
        <Title text1={'LATEST'} text2={'DROPS'}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-500 font-medium tracking-wide mt-4 uppercase'>
          The most hyped pieces right now. Don't sleep on these.
        </p>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6'>
        {
            bestSeller.map((item,index)=>(
                <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
            ))
        }
      </div>
    </div>
  )
}

export default BestSeller
