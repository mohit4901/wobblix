import React, { useContext, useEffect, useState } from 'react';
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';

const Profile = () => {
    const { token, navigate, userData, setUserData, setCartItems, setToken } = useContext(ShopContext);

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    const logout = () => {
        localStorage.removeItem('token');
        setToken('');
        setUserData(false);
        setCartItems({});
        navigate('/login');
    };

    if (!userData) {
        return (
            <div className='h-screen flex items-center justify-center bg-[#edece8] flex-col gap-4'>
                <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Loading your drip...</p>
                <button onClick={() => window.location.reload()} className="mt-4 text-[10px] underline uppercase font-bold">Reload if stuck</button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto pt-10 sm:pt-14 min-h-[70vh] px-4 sm:px-10 lg:px-16">
            <div className="text-2xl sm:text-3xl mb-8 border-b pb-4">
                <Title text1={'MY'} text2={'PROFILE'} />
            </div>

            <div className="bg-white border-2 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 sm:p-12 flex flex-col md:flex-row gap-12 items-center md:items-start transition-all duration-300">
                
                {/* Left - Avatar */}
                <div className="flex flex-col items-center gap-5">
                    <div className="w-36 h-36 bg-black rounded-full p-1 shadow-lg">
                        <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-5xl text-black font-extrabold tracking-tighter">
                            {userData.name ? userData.name.charAt(0).toUpperCase() : 'W'}
                        </div>
                    </div>
                    <span className="px-5 py-1.5 bg-black text-white text-[10px] font-black tracking-[0.2em] uppercase">
                        Verified User
                    </span>
                </div>

                {/* Right - Info */}
                <div className="flex-1 w-full space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="space-y-1.5">
                            <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Full Name</label>
                            <p className="text-xl font-bold text-gray-900 border-b-2 border-gray-100 pb-2">{userData.name}</p>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Email Address</label>
                            <p className="text-xl font-bold text-gray-900 border-b-2 border-gray-100 pb-2">{userData.email}</p>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Account ID</label>
                            <p className="text-sm font-bold text-gray-500 border-b-2 border-gray-100 pb-2 truncate">{userData._id}</p>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Member Since</label>
                            <p className="text-xl font-bold text-gray-900 border-b-2 border-gray-100 pb-2">{new Date(userData.createdAt || Date.now()).toLocaleDateString()}</p>
                        </div>
                    </div>

                    <div className="pt-6 flex flex-col sm:flex-row gap-4">
                        <button onClick={() => navigate('/orders')} className="px-8 py-4 bg-black text-white text-sm font-bold tracking-widest uppercase hover:bg-gray-800 transition-all duration-300 w-full sm:w-auto shadow-[4px_4px_0px_0px_rgba(150,150,150,1)] active:shadow-none active:translate-x-1 active:translate-y-1">
                            My Orders
                        </button>
                        <button onClick={logout} className="px-8 py-4 bg-white text-red-600 border-2 border-red-600 text-sm font-bold tracking-widest uppercase hover:bg-red-50 transition-all duration-300 w-full sm:w-auto">
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
