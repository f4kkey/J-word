import React, { useState, type SubmitEvent } from 'react'
import Input from '../../components/auth/Input'
import Button from '../../components/auth/Button'
import Seperator from '../../components/auth/Seperator'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContextProvider'

export default function Login() {

    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const doLogin = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true)
        const email = e.currentTarget.email.value
        const password = e.currentTarget.password.value

        try {
            await login(email, password);
            const destination = location.state?.from || '/'
            navigate(destination);
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
            <h1>Sign in</h1>
            <p>Keep looking for a J**</p>
            <form onSubmit={doLogin}>
                <Input type='email' id='email' label='Email' onFocus={() => setErrorMessage("")} />
                <Input
                    type='password'
                    id='password'
                    label='Password'
                    onFocus={() => setErrorMessage("")}
                />

                {errorMessage && <p className='mb-4 text-red-600'>{errorMessage}</p>}

                <Button type='submit' disabled={isLoading}>
                    {isLoading ? "..." : "Sign in"}
                </Button>
                <Link to="/password-reset">Forgot Password?</Link>
            </form>
            <Seperator>Or</Seperator>
            <div className='text-center'>You new here?{" "}
                <Link to="/signup" >
                    Make an account
                </Link>
            </div>
        </div >
    )
}
