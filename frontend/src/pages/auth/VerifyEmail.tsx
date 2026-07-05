import React, { useState } from 'react'
import Input from '../../components/auth/Input'
import Button from '../../components/auth/Button'
import Seperator from '../../components/auth/Seperator'
import { Link, useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../lib/axios'
import { useAuth } from '../../context/AuthContextProvider'

export default function VerifyEmail() {

    const [errorMessage, setErrorMessage] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { checkAuth } = useAuth();

    const validateEmail = async (token: string) => {
        setMessage("")
        try {
            const res = await axiosInstance.post(
                "/auth/email/validate",
                null,
                {
                    params: { token }
                }
            )
            if (res.status === 200) {
                await checkAuth();
                // window.location.href = "/";
                setErrorMessage("")
                navigate("/")
            }
            setErrorMessage(res.data)
        } catch (error) {
            console.log(error)
            setErrorMessage("Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    const sendEmailToken = async () => {
        setErrorMessage("")
        try {
            const res = await axiosInstance.get(
                "/auth/email/token"
            )
            if (res.status === 200) {
                setErrorMessage("")
                setMessage("Code sent successfully. Please check your email.")
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

    return (
        <div>
            <h1>Verify your Email</h1>
            <form onSubmit={async (e) => {
                e.preventDefault();
                setIsLoading(true)
                const code = e.currentTarget.code.value;
                await validateEmail(code);
                setIsLoading(false);
            }}>
                <p>Only 1 step left to complete you registration. Verify your email address</p>
                <Input type='text' id='code' label='Verification code' />
                {message && <p className='mb-4 text-green-400'>{message}</p>}
                {errorMessage && <p className='mb-4 text-red-600'>{errorMessage}</p>}

                <Button type='submit' disabled={isLoading}> Validate email</Button>
                <Button type='button' outline disabled={isLoading}
                    onClick={() => {
                        sendEmailToken();
                    }}
                >
                    Send again
                </Button>
            </form>

        </div >
    )
}
