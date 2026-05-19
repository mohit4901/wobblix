import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

    const [method, setMethod] = useState('razorpay');
    const [loading, setLoading] = useState(false);
    const [couponInput, setCouponInput] = useState("");
    const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products, discount, applyCoupon, couponCode, getB4G1Discount } = useContext(ShopContext);


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
                        setCartItems({})
                        navigate('/order-success')
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
            setLoading(true)


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
                                productId: product._id,
                                name: product.name,
                                price: product.price,
                                image: product.image, // Save image in order

                                size: item,
                                quantity: quantity,
                                instruction: instruction
                            })
                        }
                    }
                }
            }

            const subtotal = getCartAmount();
            const discountAmount = (subtotal * discount) / 100;
            const b4g1Discount = getB4G1Discount ? getB4G1Discount() : 0;
            const finalAmount = subtotal - discountAmount - b4g1Discount + delivery_fee;

            let orderData = {
                address: formData,
                items: orderItems,
                amount: finalAmount,
                couponCode: couponCode
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
        } finally {
            setLoading(false)
        }

    }

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col lg:flex-row justify-between gap-16 pt-14 pb-20 min-h-screen bg-[#edece8] px-4 sm:px-10 lg:px-24'>

            {/* LEFT: DELIVERY INFO */}
            <div className='flex-1 flex flex-col gap-8 bg-white p-10 shadow-sm'>
                <Title text1={'DELIVERY'} text2={'INFO'} />

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className="flex flex-col">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">First Name</label>
                        <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border-b-2 border-gray-100 py-3 text-sm font-bold focus:border-black outline-none transition-all' placeholder='Mohit' />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Last Name</label>
                        <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border-b-2 border-gray-100 py-3 text-sm font-bold focus:border-black outline-none transition-all' placeholder='Mudgil' />
                    </div>
                </div>

                <div className="flex flex-col">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
                    <input required onChange={onChangeHandler} name='email' value={formData.email} className='border-b-2 border-gray-100 py-3 text-sm font-bold focus:border-black outline-none transition-all' type="email" placeholder='mohit@example.com' />
                </div>

                <div className="flex flex-col">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Street Address</label>
                    <input required onChange={onChangeHandler} name='street' value={formData.street} className='border-b-2 border-gray-100 py-3 text-sm font-bold focus:border-black outline-none transition-all' placeholder='House No, Street Name' />
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className="flex flex-col">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">City</label>
                        <input required onChange={onChangeHandler} name='city' value={formData.city} className='border-b-2 border-gray-100 py-3 text-sm font-bold focus:border-black outline-none transition-all' placeholder='Panipat' />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">State</label>
                        <input required onChange={onChangeHandler} name='state' value={formData.state} className='border-b-2 border-gray-100 py-3 text-sm font-bold focus:border-black outline-none transition-all' placeholder='Haryana' />
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className="flex flex-col">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Zipcode</label>
                        <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border-b-2 border-gray-100 py-3 text-sm font-bold focus:border-black outline-none transition-all' type="number" placeholder='132103' />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Country</label>
                        <input required onChange={onChangeHandler} name='country' value={formData.country} className='border-b-2 border-gray-100 py-3 text-sm font-bold focus:border-black outline-none transition-all' placeholder='India' />
                    </div>
                </div>

                <div className="flex flex-col">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Mobile Number</label>
                    <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border-b-2 border-gray-100 py-3 text-sm font-bold focus:border-black outline-none transition-all' type="tel" placeholder='9876543210' />
                </div>
            </div>

            {/* RIGHT: SUMMARY & PAYMENT */}
            <div className='lg:w-[450px] space-y-12'>
                
                <div className="bg-black text-white p-10 shadow-2xl">
                    <CartTotal />
                    
                    {/* COUPON SECTION */}
                    <div className='mt-8 pt-8 border-t border-gray-800'>
                        <p className='text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4'>Promo Code</p>
                        <div className='flex gap-2'>
                            <input 
                                type="text" 
                                value={couponInput}
                                onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                                placeholder='ENTER CODE'
                                className='bg-gray-900 border border-gray-800 text-white px-4 py-3 text-xs font-bold tracking-widest outline-none focus:border-white transition-all flex-1'
                            />
                            <button 
                                type='button'
                                onClick={() => applyCoupon(couponInput)}
                                className='bg-white text-black px-6 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 transition-all'
                            >
                                APPLY
                            </button>
                        </div>
                        {couponCode && (
                            <p className='text-[10px] font-bold text-green-500 mt-3 uppercase tracking-widest'>
                                Code {couponCode} applied successfully!
                            </p>
                        )}
                    </div>
                </div>

                <div className='bg-white p-10 shadow-sm'>
                    <div className="mb-8">
                       <Title text1={'PAYMENT'} text2={'METHOD'} />
                    </div>

                    <div className="space-y-4">
                        <div 
                            onClick={() => setMethod('razorpay')} 
                            className={`flex items-center justify-between border-2 px-6 py-5 cursor-pointer transition-all duration-300 ${method === 'razorpay' ? 'border-black bg-gray-50' : 'border-gray-100 opacity-60'}`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-3 h-3 rounded-full ${method === 'razorpay' ? 'bg-black' : 'bg-gray-200'}`}></div>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Online Payment</span>
                            </div>
                            <img className='h-4' src={assets.razorpay_logo} alt="Razorpay" />
                        </div>
                    </div>

                    <button 
                        type='submit' 
                        disabled={loading}
                        className='w-full bg-black text-white py-5 mt-10 font-black tracking-[0.3em] uppercase hover:bg-brand-red transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-4'
                    >
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                PROCESSING...
                            </>
                        ) : 'COMPLETE ORDER'}
                    </button>

                    
                    <p className="text-[9px] text-center text-gray-400 mt-6 uppercase tracking-widest font-bold italic">
                        Secured by Razorpay Encryption
                    </p>
                </div>
            </div>

        </form>
    )
}

export default PlaceOrder
