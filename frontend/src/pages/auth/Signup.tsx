import React, { useState, type SubmitEvent } from 'react'
import Input from '../../components/Input'
import Button from '../../components/auth/Button'
import Seperator from '../../components/auth/Seperator'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContextProvider'

export default function Signup() {

    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const { signup } = useAuth();
    const navigate = useNavigate();

    const doSignup = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true)
        const email = e.currentTarget.email.value
        const password = e.currentTarget.password.value

        try {
            await signup(email, password);
            navigate("/");
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message)
            } else {
                setErrorMessage("An unknown error occurred")
            }
        }
        finally {
            setIsLoading(false)
        }
    };
    return (
        <div>
            <h1>Sign up for a J** opportunity</h1>
            <p>Don't be scare</p>
            <form onSubmit={doSignup}>
                <Input type='email' id='email' label='Email' onFocus={() => setErrorMessage("")} />
                <Input type='password' id='password' label='Password' onFocus={() => setErrorMessage("")} />

                {errorMessage && <p className='mb-4 text-red-600'>{errorMessage}</p>}

                <Button type='submit' disabled={isLoading}>
                    {isLoading ? "..." : "Create Account"}
                </Button>
            </form>
            <Seperator>Or</Seperator>
            <div className='text-center'>Already on J-word?{" "}
                <Link to="/login" >
                    Sign in
                </Link>
            </div>
        </div >
    )
}
