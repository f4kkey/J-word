import React, { type Dispatch, type SetStateAction } from 'react'
import { useAuth } from '../../context/AuthContextProvider';
import Button from '../auth/Button';
import { Link, useNavigate } from 'react-router-dom';

interface ProfileProps {
    setNavMenu: Dispatch<SetStateAction<boolean>>;
    profileMenu: boolean;
    setProfileMenu: Dispatch<SetStateAction<boolean>>;
}

export default function Profile({ profileMenu, setProfileMenu, setNavMenu }: ProfileProps) {
    const { logout, user } = useAuth()
    const navigate = useNavigate()
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
                    <div>{user?.firstName + " " + user?.lastName?.charAt(0) + "."}</div>
                </div>
            </button>

            {
                profileMenu ? (
                    <div className='absolute right-0 top-20 z-101 w-[18rem] max-w-[calc(100vw-2rem)]rounded-[0.3rem_0_0.3rem_0.3rem] border border-[#e0e0e0] bg-white p-4'>
                        <div className='grid grid-cols-[3rem_1fr] items-center gap-2'>
                            <img className='overflow-hidden h-6 w-6 rounded-full object-cover'
                                src={user?.profilePicture || "/avatar.png"} alt="" />
                            <div>
                                <div className='font-bold text-nowrap'>
                                    {user?.firstName + " " + user?.lastName}
                                </div>
                                <div className='text-sm text-black/60'>
                                    {user?.location}
                                </div>
                            </div>
                        </div>
                        <Button
                            buttonSize='small'
                            outline
                            onClick={() => {
                                setProfileMenu(false)
                                navigate("/profile")
                            }}

                        >
                            View Profile
                        </Button>
                        <div className='mt-2 grid gap-2'>
                            <Link to="/settings" onClick={() => setProfileMenu(false)}>
                                Setting
                            </Link>
                            <Link to='/logout'
                                onClick={(e) => {
                                    e.preventDefault();
                                    logout();
                                }}
                            >
                                Sign out
                            </Link>
                        </div>
                    </div>
                ) : null
            }
        </div >
    )
}
