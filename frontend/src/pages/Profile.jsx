import React, { useContext, useEffect, useState } from 'react';
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';

const Profile = () => {
    const { token, navigate } = useContext(ShopContext);
    const [userData] = useState({
        name: 'Wobblix VIP',
        email: 'user@wobblix.com',
        phone: '+91 9588184740',
        joined: 'Today'
    });

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="max-w-4xl mx-auto pt-10 sm:pt-14 min-h-[70vh] px-4 sm:px-10 lg:px-16">
            <div className="text-2xl sm:text-3xl mb-8 border-b pb-4">
                <Title text1={'MY'} text2={'PROFILE'} />
            </div>

            <div className="bg-white border border-gray-100 shadow-xl rounded-[2rem] p-8 sm:p-12 flex flex-col md:flex-row gap-12 items-center md:items-start transition-all duration-300 hover:shadow-2xl">
                
                {/* Left - Avatar */}
                <div className="flex flex-col items-center gap-5">
                    <div className="w-36 h-36 bg-gradient-to-br from-[#b64400] to-black rounded-full p-1 shadow-lg">
                        <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-5xl text-black font-extrabold tracking-tighter">
                            W
                        </div>
                    </div>
                    <span className="px-5 py-1.5 bg-green-50 border border-green-200 text-green-700 text-[10px] font-black tracking-[0.2em] rounded-full uppercase">
                        Verified Drip
                    </span>
                </div>

                {/* Right - Info */}
                <div className="flex-1 w-full space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="space-y-1.5">
                            <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Full Name</label>
                            <p className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">{userData.name}</p>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Email Address</label>
                            <p className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">{userData.email}</p>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Phone Number</label>
                            <p className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">{userData.phone}</p>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Member Since</label>
                            <p className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">{userData.joined}</p>
                        </div>
                    </div>

                    <div className="pt-6 flex flex-col sm:flex-row gap-4">
                        <button onClick={() => navigate('/orders')} className="px-8 py-4 bg-black text-white text-sm font-bold tracking-widest uppercase rounded-xl hover:bg-gray-800 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto shadow-md">
                            Track Orders
                        </button>
                        <button onClick={logout} className="px-8 py-4 bg-white text-red-600 border border-red-100 text-sm font-bold tracking-widest uppercase rounded-xl hover:bg-red-50 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto">
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
