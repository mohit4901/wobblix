import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios'

const ORDER_STEPS = [
  'Order Placed',
  'Packing',
  'Shipped',
  'Out for delivery',
  'Delivered'
]

const Orders = () => {

  const { backendUrl, token, currency } = useContext(ShopContext)
  const [orderData, setOrderData] = useState([])
  const [openTracker, setOpenTracker] = useState(null)

  const loadOrderData = async () => {
    try {
      if (!token) return

      const response = await axios.post(
        backendUrl + '/api/order/userorders',
        {},
        { headers: { token } }
      )

      if (response.data.success) {
        let allOrdersItem = []
        response.data.orders.forEach(order => {
          order.items.forEach(item => {
            allOrdersItem.push({
              ...item,
              status: order.status,
              paymentMethod: order.paymentMethod,
              date: order.date,
              orderId: order._id,
              trackingNumber: order.trackingNumber,
              courierPartner: order.courierPartner,
              trackingUrl: order.trackingUrl
            })
          })
        })
        setOrderData(allOrdersItem.reverse())
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [token])

  const getStepIndex = (status) =>
    ORDER_STEPS.indexOf(status)

  return (
    <div className='border-t pt-16 px-4 sm:px-10 lg:px-16'>

      <div className='text-2xl mb-6'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div>
        {orderData.map((item, index) => {
          const currentStep = getStepIndex(item.status)

          return (
            <div
              key={index}
              className='py-4 border-b text-gray-700 flex flex-col gap-4'
            >

              {/* ORDER BASIC INFO */}
              <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                <div className='flex gap-6 text-sm'>
                  <img
                    className='w-16 sm:w-20'
                    src={item.image[0]}
                    alt=""
                  />
                  <div>
                    <p className='font-medium'>{item.name}</p>
                    <p className='mt-1'>
                      {currency}{item.price} × {item.quantity}
                    </p>
                    <p className='mt-1 text-gray-400'>
                      Size: {item.size || 'Free'}
                    </p>
                    <p className='mt-1 text-gray-400'>
                      {new Date(item.date).toDateString()}
                    </p>
                    <p className='mt-1 text-gray-400'>
                      Payment: {item.paymentMethod}
                    </p>
                  </div>
                </div>

                {/* STATUS + BUTTON */}
                <div className='flex items-center justify-between md:w-1/2'>
                  <div className='flex items-center gap-2'>
                    <span className='w-2 h-2 rounded-full bg-green-500'></span>
                    <p className='text-sm font-medium'>{item.status}</p>
                  </div>

                  <button
                    onClick={() =>
                      setOpenTracker(
                        openTracker === index ? null : index
                      )
                    }
                    className='px-6 py-2 bg-black text-white text-[10px] font-bold tracking-widest uppercase hover:bg-brand-red transition-all shadow-[4px_4px_0px_0px_rgba(230,0,0,1)] hover:shadow-none'
                  >
                    {openTracker === index ? 'Close' : 'Track Status'}
                  </button>
                </div>
              </div>

              {/* 🔽 TRACKING PANEL */}
              {openTracker === index && (
                <div className='mt-4 bg-brand-bone/50 border border-gray-100 rounded-sm p-6 animate-fade-in-up'>
                  
                  {/* COURIER INFO */}
                  {item.status === 'Order Placed' ? (
                    <div className="mb-6 p-4 bg-white border-l-4 border-black text-xs font-bold tracking-widest uppercase">
                      🚀 We are preparing your drops. Warehouse team is on it.
                    </div>
                  ) : item.trackingNumber ? (
                    <div className="mb-6 p-5 bg-white border border-gray-200 shadow-sm text-[11px] uppercase tracking-wider">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-gray-400 mb-1">Courier Partner</p>
                          <p className="text-black font-bold">{item.courierPartner || 'Wobblix Express'}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-400 mb-1">Tracking Number</p>
                          <p className="text-black font-bold">{item.trackingNumber}</p>
                        </div>
                      </div>
                      {item.trackingUrl && (
                         <a href={item.trackingUrl} target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-black text-white py-3 font-bold hover:bg-brand-red transition-colors">TRACK ON COURIER SITE</a>
                      )}
                    </div>
                  ) : (
                    <div className="mb-6 p-4 bg-white border-l-4 border-brand-red text-xs font-bold tracking-widest uppercase">
                      📦 Your order is being packed for shipment.
                    </div>
                  )}

                  {/* STEP TRACKER */}
                  <div className='flex flex-col sm:flex-row sm:justify-between gap-6 relative'>
                    {/* Progress Bar Background (Desktop) */}
                    <div className="hidden sm:block absolute top-4 left-0 w-full h-[2px] bg-gray-200 -z-10"></div>
                    
                    {ORDER_STEPS.map((step, i) => (
                      <div
                        key={i}
                        className='flex sm:flex-col items-center gap-3 sm:flex-1'
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-500 ${i <= currentStep ? 'bg-black text-white scale-110 shadow-lg' : 'bg-gray-200 text-gray-500'}`}
                        >
                          {i <= currentStep ? '✓' : i + 1}
                        </div>
                        <p
                          className={`text-[9px] sm:text-[10px] font-bold tracking-widest uppercase text-center ${i <= currentStep ? 'text-black' : 'text-gray-400'}`}
                        >
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )
        })}
      </div>

    </div>
  )
}

export default Orders
