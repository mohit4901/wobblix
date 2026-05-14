import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'

const VerifyEmail = () => {
    const { navigate, backendUrl, setToken } = useContext(ShopContext);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [email, setEmail] = useState('');

    useEffect(() => {
        const storedEmail = sessionStorage.getItem('verifyEmail');
        if (!storedEmail) {
            navigate('/login');
        } else {
            setEmail(storedEmail);
        }
    }, []);

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        // Focus next input
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const fullOtp = otp.join('');
            const response = await axios.post(backendUrl + '/api/user/verify-email', { email, otp: fullOtp });

            if (response.data.success) {
                toast.success("Account Verified Successfully!");
                setToken(response.data.token);
                localStorage.setItem('token', response.data.token);
                sessionStorage.removeItem('verifyEmail');
                navigate('/');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const resendOtp = async () => {
        try {
            const response = await axios.post(backendUrl + '/api/user/resend-otp', { email });
            if (response.data.success) {
                toast.success("New OTP sent to your email!");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    return (
        <div className="bg-[#edece8] min-h-screen flex items-center justify-center px-4">
            <SEO title="Verify Email" description="Verify your Wobblix account with the 6-digit OTP." />
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full bg-white border-2 border-black p-10 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]"
            >
                <h1 className="font-street text-4xl text-black uppercase mb-4 text-center">Verify Account</h1>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-10 text-center">
                    Enter the 6-digit code sent to <br /> <span className="text-black">{email}</span>
                </p>

                <form onSubmit={onSubmitHandler}>
                    <div className="flex justify-between gap-2 mb-10">
                        {otp.map((data, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                className="w-12 h-14 border-2 border-gray-200 text-center font-bold text-xl focus:border-black outline-none transition-all"
                                value={data}
                                onChange={e => handleChange(e.target, index)}
                                onFocus={e => e.target.select()}
                                required
                            />
                        ))}
                    </div>

                    <button type="submit" className="w-full bg-black text-white py-4 font-black tracking-[0.2em] uppercase hover:bg-brand-red transition-all duration-300 mb-6">
                        VERIFY ACCOUNT
                    </button>

                    <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        Didn't receive code? <span onClick={resendOtp} className="text-black underline cursor-pointer">RESEND OTP</span>
                    </p>
                </form>
            </motion.div>
        </div>
    );
};

export default VerifyEmail;
