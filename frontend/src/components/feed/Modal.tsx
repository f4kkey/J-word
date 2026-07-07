import React, { useState, type Dispatch, type SetStateAction } from 'react'
import Button from '../auth/Button';
import Input from '../Input';

interface IPostingModalProps {
    showModal: boolean;
    content?: string;
    picture?: string;
    setShowModal: Dispatch<SetStateAction<boolean>>;
    onSubmit: (data: FormData) => Promise<void>;
    title: string;
}

export default function Modal({ showModal, content, picture, setShowModal, onSubmit, title }: IPostingModalProps) {
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmitPost = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const content = e.currentTarget.content.value
        const picture = e.currentTarget.picture.value

        if (!content) {
            setErrorMessage("Content is required!")
            setIsLoading(false)
            return
        }
        const formData = new FormData();
        formData.append("content", content);
        if (picture) formData.append("picture", picture);
        try {
            await onSubmit(formData)
            setIsLoading(false)
            setShowModal(false)
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message)
            } else {
                setErrorMessage("An unknown error occurred")
            }
        } finally {
            setIsLoading(false)
            setShowModal(false)
        }
    }

    if (!showModal) return null;
    return (
        <div className={"fixed inset-0 z-9999 flex items-start justify-center bg-black/50"}>
            <div className={"mx-4 my-[4.5rem] w-full max-w-[45rem] rounded border border-[#e0e0e0] bg-white p-4"}>
                <div className={"mb-4 flex items-center justify-between"}>
                    <h3 className={"font-bold"}>{title}</h3>
                    <button className={"grid h-8 w-8 place-items-center rounded-full bg-[#ececec]"} onClick={() => setShowModal(false)}>
                        X
                    </button>
                </div>
                <form onSubmit={handleSubmitPost}>
                    <div>
                        <textarea
                            className='mb-[-1rem] h-60 w-full resize-none rounded border border-[#e0e0e0] p-4'
                            placeholder="What do you want to talk about?"
                            onFocus={() => setErrorMessage("")}
                            onChange={() => setErrorMessage("")}
                            name="content"
                            defaultValue={content}
                        />
                        <Input
                            defaultValue={picture}
                            onFocus={() => setErrorMessage("")}
                            placeholder="Image URL (optional)"
                            name="picture"
                            style={{
                                marginBlock: 0,
                            }}
                        />
                    </div>
                    {errorMessage && <div className={"text-red-600"}>{errorMessage}</div>}
                    <div>
                        <Button buttonSize="medium" type="submit" disabled={isLoading}>
                            Post
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
