import React, { useState } from 'react'
import Input from '../../components/auth/Input'
import Button from '../../components/auth/Button'
import Seperator from '../../components/auth/Seperator'
import { Link, useNavigate } from 'react-router-dom'

export default function ResetPassword() {

    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const [emailSent, setEmailSent] = useState(true);
    return (
        <div>
            <h1>Reset Password</h1>
            {
                !emailSent ?
                    <form>
                        <p>Enter your email to receive a verification token</p>
                        <Input type='email' id='email' label='Email' />

                        {errorMessage && <p className='mb-4 text-red-600'>{errorMessage}</p>}

                        <Button type='submit'> Next</Button>
                        <Button type='button' outline
                            onClick={() => {
                                navigate("/login")
                            }}>
                            Back
                        </Button>
                    </form> :
                    <form>
                        <p>Enter the verification code has just been sent to your email</p>
                        <Input type='text' id='code' label='Verification code' />
                        <Input type='password' id='password' label='New password' />

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
