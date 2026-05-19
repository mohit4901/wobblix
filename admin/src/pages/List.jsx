import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const List = ({ token }) => {
  const navigate = useNavigate()
  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setList(response.data.products.reverse())
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/product/remove',
        { id },
        { headers: { token } }
      )

      if (response.data.success) {
        toast.success(response.data.message)
        fetchList()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <>
      <p className='mb-2 font-medium text-lg text-black'>All Products List</p>

      <div className='flex flex-col gap-2'>

        {/* ------- Table Header ---------- */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_2fr_1fr_1.5fr] items-center py-2 px-3 border bg-gray-100 text-sm font-semibold text-gray-700'>
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span className='text-center'>Actions</span>
        </div>

        {/* ------- Product Rows ---------- */}
        {list.map((item, index) => (
          <div
            key={index}
            className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_2fr_1fr_1.5fr] items-center gap-2 py-2 px-3 border text-sm bg-white hover:bg-slate-50 transition-all'
          >
            <img className='w-12 h-12 object-cover border' src={item.image[0]} alt="" />

            <p className='font-medium text-gray-900'>{item.name}</p>

            {/* Category + SubCategory + Colour */}
            <div className='text-xs leading-4 capitalize text-gray-600'>
              <p className='font-medium'>{item.category}</p>

              {item.subCategory && (
                <p className='text-gray-500'>
                  {item.subCategory}
                </p>
              )}

              {item.colour && (
                <p className='text-gray-400'>
                  {item.colour}
                </p>
              )}
            </div>

            <p className='font-semibold text-black'>{currency}{item.price}</p>

            <div className='flex justify-end md:justify-center items-center gap-4 text-xs font-semibold'>
              <button
                onClick={() => navigate(`/edit/${item._id}`)}
                className='text-blue-600 hover:text-blue-800 bg-blue-50 px-2.5 py-1 rounded transition-all cursor-pointer'
              >
                Edit
              </button>
              <button
                onClick={() => {
                  if (window.confirm("Are you sure you want to delete this product?")) {
                    removeProduct(item._id);
                  }
                }}
                className='text-red-600 hover:text-red-800 bg-red-50 px-2.5 py-1 rounded transition-all cursor-pointer'
              >
                Delete
              </button>
            </div>
          </div>
        ))}

      </div>
    </>
  )
}

export default List

