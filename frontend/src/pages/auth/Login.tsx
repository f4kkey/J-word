import React, { useState } from 'react'
import Input from '../../components/auth/Input'
import Button from '../../components/auth/Button'
import Seperator from '../../components/auth/Seperator'
import { Link } from 'react-router-dom'

export default function Login() {

    const [errorMessage, setErrorMessage] = useState("");

    return (
        <div>
            <h1>Sign in</h1>
            <p>Keep looking for a J**</p>
            <form>
                <Input type='email' id='email' label='Email' onFocus={() => setErrorMessage("")} />
                <Input
                    type='password'
                    id='password'
                    label='Password'
                    onFocus={() => setErrorMessage("")}
                />

                {errorMessage && <p className='mb-4 text-red-600'>{errorMessage}</p>}

                <Button type='submit'> Sign in</Button>
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
