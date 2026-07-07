import React, { useState } from 'react'
import Input from '../../components/Input'
import { useAuth } from '../../context/AuthContextProvider';
import Button from '../../components/auth/Button';
import { axiosInstance } from '../../lib/axios';
import { useNavigate } from 'react-router-dom';

export default function UpdateProfile() {
    const { user, setUser } = useAuth()
    const [step, setStep] = useState(0)
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const [data, setData] = useState({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        company: user?.company || "",
        position: user?.position || "",
        location: user?.location || "",
    });

    const onSubmit = async () => {
        if (!data.firstName || !data.lastName) {
            setErrorMessage("Please fill in your first and last name.");
            return;
        }
        if (!data.company || !data.position) {
            setErrorMessage("Please fill in your latest company and position.");
            return;
        }
        if (!data.location) {
            setErrorMessage("Please fill in your location.");
            return;
        }


        try {
            const res = await axiosInstance.put(
                `/auth/profile/${user?.id}`,
                data
            )
            setUser(res.data)
            navigate("/")

        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message)
            } else {
                setErrorMessage("An unknown error occurred")
            }
        }
    };
    return (
        <div>
            <h1>Only one last step</h1>
            <p>Tell us a bit about yourself so we can personalize your experience.</p>
            {step === 0 && (
                <div className={"grid grid-cols-2 gap-4"}>
                    <Input
                        onFocus={() => setErrorMessage("")}
                        required
                        label="First Name"
                        name="firstName"
                        placeholder="Jhon"
                        onChange={(e) => setData((prev) => ({ ...prev, firstName: e.target.value }))}
                        value={data.firstName}
                    ></Input>
                    <Input
                        onFocus={() => setErrorMessage("")}
                        required
                        label="Last Name"
                        name="lastName"
                        placeholder="Doe"
                        onChange={(e) => setData((prev) => ({ ...prev, lastName: e.target.value }))}
                        value={data.lastName}
                    ></Input>
                </div>
            )}
            {step === 1 && (
                <div className={"grid grid-cols-2 gap-4"}>
                    <Input
                        onFocus={() => setErrorMessage("")}
                        label="Latest company"
                        name="company"
                        placeholder="Google"
                        onChange={(e) => setData((prev) => ({ ...prev, company: e.target.value }))}
                        value={data.company}
                    ></Input>
                    <Input
                        onFocus={() => setErrorMessage("")}
                        onChange={(e) => setData((prev) => ({ ...prev, position: e.target.value }))}
                        value={data.position}
                        label="Latest position"
                        name="position"
                        placeholder="Software Engineer"
                    ></Input>
                </div>
            )}
            {step == 2 && (
                <Input
                    onFocus={() => setErrorMessage("")}
                    label="Location"
                    name="location"
                    placeholder="Vietnam or something"
                    value={data.location}
                    onChange={(e) => setData((prev) => ({ ...prev, location: e.target.value }))}
                ></Input>
            )}
            {errorMessage && <p className={"text-sm text-red-600"}>{errorMessage}</p>}
            <div className={"flex justify-end gap-4"}>
                {step > 0 && (
                    <Button outline onClick={() => setStep((prev) => prev - 1)}>
                        Back
                    </Button>
                )}
                {step < 2 && (
                    <Button
                        disabled={
                            (step === 0 && (!data.firstName || !data.lastName)) ||
                            (step === 1 && (!data.company || !data.position))
                        }
                        onClick={() => setStep((prev) => prev + 1)}
                    >
                        Next
                    </Button>
                )}
                {step === 2 && (
                    <Button disabled={!data.location} onClick={onSubmit}>
                        Submit
                    </Button>
                )}
            </div>
        </div>
    )
}
