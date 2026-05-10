import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Orders = ({ token }) => {

  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {

    if (!token) return

    try {
      const response = await axios.post(
        backendUrl + '/api/order/list',
        {},
        { headers: { token } }
      )

      if (response.data.success) {
        setOrders(response.data.orders.reverse())
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const statusHandler = async (event, orderId, trackingData = {}) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/order/status',
        { orderId, status: event.target.value, ...trackingData },
        { headers: { token } }
      )

      if (response.data.success) {
        toast.success("Updated Successfully")
        await fetchAllOrders()
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [token])

  return (
    <div>
      <h3 className='text-xl font-semibold mb-4'>Order Page</h3>

      <div>
        {orders.map((order, index) => (
          <div
            key={index}
            className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700 rounded-lg shadow-sm'
          >

            {/* ICON */}
            <img className='w-12' src={assets.parcel_icon} alt="" />

            {/* ORDER ITEMS */}
            <div>
              <div>
                {order.items.map((item, index) => (
                  <div key={index} className='py-1'>

                    <p>
                      {item.name} x {item.quantity}{' '}
                      <span className='font-medium'>({item.size})</span>
                    </p>

                    {/* ✅ NEW: SHOW COLOR */}
                    {item.instruction && (
                      <p className='text-xs text-blue-600'>
                        🎨 Color: {item.instruction}
                      </p>
                    )}

                  </div>
                ))}
              </div>

              {/* USER INFO */}
              <p className='mt-3 mb-2 font-medium'>
                {order.address.firstName + " " + order.address.lastName}
              </p>

              <div>
                <p>{order.address.street},</p>
                <p>
                  {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
                </p>
              </div>

              <p>{order.address.phone}</p>
            </div>

            {/* ORDER DETAILS */}
            <div>
              <p>Items : {order.items.length}</p>
              <p className='mt-3'>Method : {order.paymentMethod}</p>
              <p>Payment : {order.payment ? 'Done' : 'Pending'}</p>
              <p>Date : {new Date(order.date).toLocaleDateString()}</p>
            </div>

            {/* AMOUNT */}
            <p className='text-sm sm:text-[15px] font-semibold'>
              {currency}{order.amount}
            </p>

            {/* STATUS & TRACKING */}
            <div className='flex flex-col gap-3'>
              <select
                onChange={(event) => statusHandler(event, order._id)}
                value={order.status}
                className='p-2 font-semibold border rounded'
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>

              <div className='flex flex-col gap-2 mt-2'>
                <input id={`courier-${order._id}`} type='text' defaultValue={order.courierPartner} placeholder='Courier Partner' className='p-1 border rounded text-xs' />
                <input id={`tracking-${order._id}`} type='text' defaultValue={order.trackingNumber} placeholder='Tracking Number / AWB' className='p-1 border rounded text-xs' />
                <input id={`url-${order._id}`} type='text' defaultValue={order.trackingUrl} placeholder='Tracking URL' className='p-1 border rounded text-xs' />
                <button onClick={() => {
                  const courierPartner = document.getElementById(`courier-${order._id}`).value;
                  const trackingNumber = document.getElementById(`tracking-${order._id}`).value;
                  const trackingUrl = document.getElementById(`url-${order._id}`).value;
                  statusHandler({target: {value: order.status}}, order._id, {courierPartner, trackingNumber, trackingUrl});
                }} className='bg-brand-red hover:bg-black text-white p-1.5 rounded text-xs font-bold uppercase transition-all tracking-widest shadow-md'>Update Tracking</button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
