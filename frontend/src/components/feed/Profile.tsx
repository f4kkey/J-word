import React, { type Dispatch, type SetStateAction } from 'react'
import { useAuth } from '../../context/AuthContextProvider';

interface ProfileProps {
    setNavMenu: Dispatch<SetStateAction<boolean>>;
    profileMenu: boolean;
    setProfileMenu: Dispatch<SetStateAction<boolean>>;
}

export default function Profile({ profileMenu, setProfileMenu, setNavMenu }: ProfileProps) {
    const { logout, user } = useAuth()
    return (
        <div className='relative'>
            <button
                className='flex flex-col items-center border-r border-[#e0e0e0] pr-4'
                onClick={() => {
                    setProfileMenu((prev) => !prev)
                    if (window.innerWidth < 1080) {
                        setNavMenu(false)
                    }
                }}

            >
                <img className='h-6 w-6 rounded-full object-cover'
                    src={user?.profilePicture || "/avatar.png"} alt="" />

                <div>
                    <div>{user?.firstName + " " + user?.lastName.charAt(0) + "."}</div>
                </div>
            </button>

            {
                profileMenu ? (

                ): null
            }
        </div >
    )
}
