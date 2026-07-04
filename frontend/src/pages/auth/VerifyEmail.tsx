import React, { useState } from 'react'
import Input from '../../components/auth/Input'
import Button from '../../components/auth/Button'
import Seperator from '../../components/auth/Seperator'
import { Link, useNavigate } from 'react-router-dom'

export default function VerifyEmail() {

    const [errorMessage, setErrorMessage] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const [emailSent, setEmailSent] = useState(false);
    return (
        <div>
            <h1>Verify your Email</h1>
            {
                !emailSent ?
                    <form>
                        <p>Only 1 step left to complete you registration. Verify your email address</p>
                        <Input type='text' id='code' label='Verification code' />
                        {message && <p className='mb-4 text-green-400'>{message}</p>}
                        {errorMessage && <p className='mb-4 text-red-600'>{errorMessage}</p>}

                        <Button type='submit'> Validate email</Button>
                        <Button type='button' outline>
                            Send again
                        </Button>
                    </form> :
                    <form>
                        <p>Enter the verification code has just been sent to your email</p>
                        <Input type='text' id='code' label='Verification code' />
                        <Input type='password' id='password' label='New password' />
                        { }
                        {errorMessage && <p className='mb-4 text-red-600'>{errorMessage}</p>}

                        <Button type='submit'> Reset password</Button>
                        <Button type='button' outline
                            onClick={() => {
                                setEmailSent(false)
                                navigate("/login")
                            }}>
                            Back
                        </Button>
                    </form>
            }

        </div >
    )
}
