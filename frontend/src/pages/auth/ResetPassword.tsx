import React, { useState } from 'react'
import Input from '../../components/Input'
import Button from '../../components/auth/Button'
import Seperator from '../../components/auth/Seperator'
import { Link, useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../lib/axios'

export default function ResetPassword() {

    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const [emailSent, setEmailSent] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");

    const sendPasswordToken = async (email: string) => {
        setErrorMessage("")
        try {
            const res = await axiosInstance.get(
                "/auth/password/reset"
            )
            if (res.status === 200) {
                setErrorMessage("")
                setEmailSent(true)
                return
            }
            setErrorMessage(res.data)
        } catch (error) {
            console.log(error)
            setErrorMessage("Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    const resetPassword = async (email: string, code: string, password: string) => {
        try {
            const res = await axiosInstance.post(
                "/auth/password/reset"
            )
            if (res.status === 200) {
                setErrorMessage("")
                navigate("/auth/login")
            }
            setErrorMessage(res.data)
        } catch (error) {
            console.log(error)
            setErrorMessage("Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <h1>Reset Password</h1>
            {
                !emailSent ?
                    <form onSubmit={async (e) => {
                        e.preventDefault();
                        setIsLoading(true)
                        const email = e.currentTarget.email.value
                        await sendPasswordToken(email)
                        setEmail(email);
                        setIsLoading(false)
                    }}>
                        <p>Enter your email to receive a verification token</p>
                        <Input type='email' id='email' label='Email' />

                        {errorMessage && <p className='mb-4 text-red-600'>{errorMessage}</p>}

                        <Button type='submit'> Next</Button>
                        <Button type='button' outline
                            onClick={() => {
                                navigate("/auth/login")
                            }}>
                            Back
                        </Button>
                    </form> :
                    <form onSubmit={async (e) => {
                        e.preventDefault();
                        setIsLoading(true)
                        const code = e.currentTarget.code.value
                        const password = e.currentTarget.password.value
                        await resetPassword(email, code, password)
                        setIsLoading(false)
                    }}>
                        <p>Enter the verification code has just been sent to your email</p>
                        <Input type='text' id='code' label='Verification code' />
                        <Input type='password' id='password' label='New password' />

                        {errorMessage && <p className='mb-4 text-red-600'>{errorMessage}</p>}

                        <Button type='submit'> Reset password</Button>
                        <Button type='button' outline
                            onClick={() => {
                                setErrorMessage("")
                                setEmailSent(false)
                            }}>
                            Back
                        </Button>
                    </form>
            }

        </div >
    )
}
