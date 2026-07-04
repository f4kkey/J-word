import React, { useState } from 'react'
import Input from '../../components/auth/Input'
import Button from '../../components/auth/Button'
import Seperator from '../../components/auth/Seperator'
import { Link } from 'react-router-dom'

export default function Signup() {

    const [errorMessage, setErrorMessage] = useState("");

    return (
        <div>
            <h1>Sign up for a J** opportunity</h1>
            <p>Don't be scare</p>
            <form>
                <Input type='email' id='email' label='Email' onFocus={() => setErrorMessage("")} />
                <Input type='password' id='password' label='Password' onFocus={() => setErrorMessage("")} />

                {errorMessage && <p className='mb-4 text-red-600'>{errorMessage}</p>}

                <Button type='submit'> Create Account</Button>
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
