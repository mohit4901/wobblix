import axios from 'axios'
import React, { useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Login = ({setToken}) => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(backendUrl + '/api/user/admin',{email,password})
            if (response.data.success) {
                setToken(response.data.token)
            } else {
                toast.error(response.data.message)
            }
             
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

  return (
    <div className='min-h-screen flex items-center justify-center w-full bg-brand-bone'>
        <div className='bg-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] border-2 border-black px-10 py-12 max-w-md w-full'>
            <div className="flex flex-col items-center mb-10">
                <div className="w-10 h-1 bg-brand-red mb-4"></div>
                <h1 className='text-3xl font-street uppercase tracking-[0.2em] text-black'>Admin Panel</h1>
            </div>
            <form onSubmit={onSubmitHandler}>
                <div className='mb-6'>
                    <p className='text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2'>Email Address</p>
                    <input onChange={(e)=>setEmail(e.target.value)} value={email} className='w-full px-4 py-3 border border-gray-200 outline-none focus:border-brand-red transition-all text-sm' type="email" placeholder='admin@wobblix.com' required />
                </div>
                <div className='mb-8'>
                    <p className='text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2'>Password</p>
                    <input onChange={(e)=>setPassword(e.target.value)} value={password} className='w-full px-4 py-3 border border-gray-200 outline-none focus:border-brand-red transition-all text-sm' type="password" placeholder='••••••••' required />
                </div>
                <button className='w-full py-4 text-xs font-bold tracking-[0.3em] uppercase text-white bg-black hover:bg-brand-red transition-all duration-300 shadow-[6px_6px_0px_0px_rgba(230,0,0,1)] hover:shadow-none animate-button-pulse hover:scale-[1.02]' type="submit"> 
                  Secure Login 
                </button>
            </form>
            <p className="mt-8 text-center text-[9px] text-gray-400 tracking-widest font-bold uppercase">Wobblix Enterprise Security</p>
        </div>
    </div>
  )
}

export default Login