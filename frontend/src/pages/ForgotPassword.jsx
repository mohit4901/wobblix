import React, { useState, useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { ShopContext } from '../context/ShopContext'
import { Eye, EyeOff } from 'lucide-react'

const ForgotPassword = () => {

    const { backendUrl, navigate } = useContext(ShopContext)

    const [step, setStep] = useState(1)

    const [email, setEmail] = useState('')
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const [showPassword, setShowPassword] = useState(false)

    // GET QUESTION
    const getQuestion = async () => {
        try {

            const response = await axios.post(
                backendUrl + '/api/user/security-question',
                { email }
            )

            if (response.data.success) {

                setQuestion(response.data.question)
                setStep(2)

            } else {

                toast.error(response.data.message)

            }

        } catch (error) {

            console.log(error)
            toast.error(error.message)

        }
    }

    // RESET PASSWORD
    const resetPassword = async () => {
        try {

            const response = await axios.post(
                backendUrl + '/api/user/reset-password',
                {
                    email,
                    answer,
                    newPassword
                }
            )

            if (response.data.success) {

                toast.success("Password reset successful")
                navigate('/login')

            } else {

                toast.error(response.data.message)

            }

        } catch (error) {

            console.log(error)
            toast.error(error.message)

        }
    }

    return (
        <div className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-20 gap-4 text-gray-800'>

            <div className='inline-flex items-center gap-2 mb-2'>
                <p className='prata-regular text-3xl'>
                    Forgot Password
                </p>

                <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
            </div>

            {
                step === 1 && (
                    <>
                        <input
                            type="email"
                            placeholder='Enter your email'
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            className='w-full px-3 py-2 border border-gray-800'
                        />

                        <button
                            onClick={getQuestion}
                            className='bg-black text-white px-8 py-2'
                        >
                            Continue
                        </button>
                    </>
                )
            }

            {
                step === 2 && (
                    <>
                        <div className='w-full border border-gray-800 p-3'>
                            {question}
                        </div>

                        <input
                            type="text"
                            placeholder='Security Answer'
                            value={answer}
                            onChange={(e)=>setAnswer(e.target.value)}
                            className='w-full px-3 py-2 border border-gray-800'
                        />

                        <div className='w-full relative'>

                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder='New Password'
                                value={newPassword}
                                onChange={(e)=>setNewPassword(e.target.value)}
                                className='w-full px-3 py-2 border border-gray-800'
                            />

                            <span
                                onClick={()=>setShowPassword(!showPassword)}
                                className='absolute right-3 top-3 cursor-pointer'
                            >
                                {
                                    showPassword
                                    ? <EyeOff size={20}/>
                                    : <Eye size={20}/>
                                }
                            </span>

                        </div>

                        <button
                            onClick={resetPassword}
                            className='bg-black text-white px-8 py-2'
                        >
                            Reset Password
                        </button>
                    </>
                )
            }

        </div>
    )
}

export default ForgotPassword
