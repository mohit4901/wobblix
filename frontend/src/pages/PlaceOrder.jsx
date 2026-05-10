import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

    const [method, setMethod] = useState('razorpay');
    const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setFormData(data => ({ ...data, [name]: value }))
    }

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Order Payment',
            description: 'Order Payment',
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                try {
                    const { data } = await axios.post(
                        backendUrl + '/api/order/verifyRazorpay',
                        response,
                        { headers: { token } }
                    )
                    if (data.success) {
                        navigate('/orders')
                        setCartItems({})
                    }
                } catch (error) {
                    console.log(error)
                    toast.error(error)
                }
            }
        }

        const rzp = new window.Razorpay(options)
        rzp.open()
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {

            let orderItems = []

            for (const items in cartItems) {
                for (const item in cartItems[items]) {

                    const itemData = cartItems[items][item]

                    const quantity =
                        typeof itemData === "number" ? itemData : itemData.quantity

                    const instruction =
                        typeof itemData === "object" ? itemData.instruction : ""

                    if (quantity > 0) {

                        const product = products.find(p => p._id === items)

                        if (product) {
                            orderItems.push({
                                productId: product._id,   // ✅ FIXED
                                name: product.name,
                                price: product.price,
                                size: item,
                                quantity: quantity,
                                instruction: instruction
                            })
                        }
                    }
                }
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee
            }

            if (method === 'razorpay') {
                const responseRazorpay = await axios.post(
                    backendUrl + '/api/order/razorpay',
                    orderData,
                    { headers: { token } }
                )

                if (responseRazorpay.data.success) {
                    initPay(responseRazorpay.data.order)
                } else {
                    toast.error("Payment failed")
                }
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t px-4 sm:px-10 lg:px-16'>

            {/* LEFT */}
            <div className='flex flex-col gap-6 w-full sm:max-w-[550px] bg-white p-8 border border-gray-100 shadow-sm'>

                <div className='text-xl sm:text-2xl mb-6'>
                    <Title text1={'DELIVERY'} text2={'INFORMATION'} />
                </div>

                <div className='flex gap-4'>
                    <div className="flex-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 block">First Name</label>
                        <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='w-full border border-gray-200 px-4 py-3 text-sm focus:border-brand-red outline-none bg-brand-bone/10 transition-all' placeholder='Mohit' />
                    </div>
                    <div className="flex-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 block">Last Name</label>
                        <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='w-full border border-gray-200 px-4 py-3 text-sm focus:border-brand-red outline-none bg-brand-bone/10 transition-all' placeholder='Mudgil' />
                    </div>
                </div>

                <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 block">Email Address</label>
                    <input required onChange={onChangeHandler} name='email' value={formData.email} className='w-full border border-gray-200 px-4 py-3 text-sm focus:border-brand-red outline-none bg-brand-bone/10 transition-all' type="email" placeholder='mohit@example.com' />
                </div>

                <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 block">Street Address</label>
                    <input required onChange={onChangeHandler} name='street' value={formData.street} className='w-full border border-gray-200 px-4 py-3 text-sm focus:border-brand-red outline-none bg-brand-bone/10 transition-all' placeholder='House No, Street Name' />
                </div>

                <div className='flex gap-4'>
                    <div className="flex-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 block">City</label>
                        <input required onChange={onChangeHandler} name='city' value={formData.city} className='w-full border border-gray-200 px-4 py-3 text-sm focus:border-brand-red outline-none bg-brand-bone/10 transition-all' placeholder='Panipat' />
                    </div>
                    <div className="flex-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 block">State</label>
                        <input required onChange={onChangeHandler} name='state' value={formData.state} className='w-full border border-gray-200 px-4 py-3 text-sm focus:border-brand-red outline-none bg-brand-bone/10 transition-all' placeholder='Haryana' />
                    </div>
                </div>

                <div className='flex gap-4'>
                    <div className="flex-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 block">Zipcode</label>
                        <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='w-full border border-gray-200 px-4 py-3 text-sm focus:border-brand-red outline-none bg-brand-bone/10 transition-all' type="number" placeholder='132103' />
                    </div>
                    <div className="flex-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 block">Country</label>
                        <input required onChange={onChangeHandler} name='country' value={formData.country} className='w-full border border-gray-200 px-4 py-3 text-sm focus:border-brand-red outline-none bg-brand-bone/10 transition-all' placeholder='India' />
                    </div>
                </div>

                <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 block">Mobile Number</label>
                    <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='w-full border border-gray-200 px-4 py-3 text-sm focus:border-brand-red outline-none bg-brand-bone/10 transition-all' type="tel" placeholder='9876543210' />
                </div>
            </div>

            {/* RIGHT */}
            <div className='mt-8'>

                <CartTotal />

                <div className='mt-12'>
                    <Title text1={'PAYMENT'} text2={'METHOD'} />

                    <div className="space-y-4">
                        <div 
                            onClick={() => setMethod('razorpay')} 
                            className={`flex items-center justify-between border px-6 py-4 cursor-pointer transition-all duration-300 ${method === 'razorpay' ? 'border-brand-red bg-white shadow-[4px_4px_0px_0px_rgba(230,0,0,1)]' : 'border-gray-200 bg-gray-50'}`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-4 h-4 border-2 rounded-full flex items-center justify-center ${method === 'razorpay' ? 'border-brand-red' : 'border-gray-300'}`}>
                                    {method === 'razorpay' && <div className="w-2 h-2 bg-brand-red rounded-full"></div>}
                                </div>
                                <span className="text-xs font-bold tracking-widest uppercase">Secure Checkout</span>
                            </div>
                            <img className='h-5' src={assets.razorpay_logo} alt="Razorpay" />
                        </div>
                    </div>

                    <button 
                        type='submit' 
                        className='w-full bg-black text-white px-16 py-4 mt-10 text-xs font-bold tracking-[0.3em] uppercase hover:bg-brand-red transition-all duration-300 shadow-[8px_8px_0px_0px_rgba(230,0,0,1)] hover:shadow-none animate-button-pulse hover:scale-105'
                    >
                        COMPLETE PURCHASE
                    </button>
                </div>
            </div>

        </form>
    )
}

export default PlaceOrder
