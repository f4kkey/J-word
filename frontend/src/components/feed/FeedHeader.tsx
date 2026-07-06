import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Input from '../Input'
import { useAuth } from '../../context/AuthContextProvider';
import Profile from './Profile';
import { MenuIcon, ContactIcon, HomeIcon, MessageCircleMoreIcon, BellIcon } from 'lucide-react';
export default function FeedHeader() {
    const [navMenu, setNavMenu] = useState(
        window.innerWidth > 1080 ? true : false
    )
    const [profileMenu, setProfileMenu] = useState(false);
    const { user } = useAuth();

    const onClickMenuItem = () => {
        setProfileMenu(false)
        if (window.innerWidth <= 1080) {
            setNavMenu(false)
        }
    }

    useEffect(() => {
        const handleResize = () => {
            setNavMenu(window.innerWidth > 1080 ? true : false)
        }
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <header className='sticky top-0 z-100 border border-[#e0e0e0] bg-white text-sm text-black/60'>
            <div className='relative mx-auto grid w-full max-w-[74rem] grid-cols-[1fr_auto] gap-8 px-4'>
                <div className='grid grid-cols-[auto_1fr] items-center gap-4 min-[1080px]:grid-cols-[auto_0.7fr_0.3fr]'>
                    <NavLink to={"/"}>
                        <img src="/logo.svg" alt="" className='h-12 w-12 text-[#0a66c2]' />
                    </NavLink>
                    <Input placeholder='Search' inputSize={"medium"} />
                </div>
                <div className='flex items-center gap-4 min-[1080px]:gap-8'>
                    <button className='flex flex-col items-center min-[1080px]:hidden [&_img]:h-6 [&_img]:w-6'
                        onClick={() => {
                            setNavMenu((prev) => !prev)
                            setProfileMenu(false)
                        }}
                    >
                        <MenuIcon></MenuIcon>
                        <span>Menu</span>
                    </button>

                    {
                        navMenu ? (
                            <ul className='absolute right-4 top-20 grid w-[min(18rem,100%)] gap-2 rounded border border-[#e0e0e0] bg-white p-4 min-[1080px]:relative min-[1080px]:right-0 min-[1080px]:top-0 min-[1080px]:flex min-[1080px]:w-auto min-[1080px]:items-center min-[1080px]:gap-8 min-[1080px]:border-0 min-[1080px]:bg-transparent min-[1080px]:p-0 [&_a]:flex [&_a]:items-center [&_a]:gap-4 [&_a:hover]:text-black min-[1080px]:[&_a]:flex-col min-[1080px]:[&_a]:gap-0'>
                                <li>
                                    <NavLink
                                        to={"/"}
                                        onClick={onClickMenuItem}
                                        className={({ isActive }) => (isActive ? "text-[#0a66c2]" : "")}
                                    >
                                        <HomeIcon viewBox='0 0 24 24'></HomeIcon>
                                        <span>Home</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to={"/network"}
                                        onClick={onClickMenuItem}
                                        className={({ isActive }) => (isActive ? "text-[#0a66c2]" : "")}
                                    >
                                        <ContactIcon viewBox='0 0 24 24'></ContactIcon>
                                        <span>Network</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to={"/messaging"}
                                        onClick={onClickMenuItem}
                                        className={({ isActive }) => (isActive ? "text-[#0a66c2]" : "")}
                                    >
                                        <MessageCircleMoreIcon viewBox='0 0 24 24'></MessageCircleMoreIcon>
                                        <span>Messaging</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to={"/notifications"}
                                        onClick={onClickMenuItem}
                                        className={({ isActive }) => (isActive ? "text-[#0a66c2]" : "")}
                                    >
                                        <BellIcon viewBox='0 0 24 24'></BellIcon>
                                        <span>Notification</span>
                                    </NavLink>
                                </li>
                            </ul>
                        ) : null
                    }

                    {
                        user ?
                            <Profile
                                setNavMenu={setNavMenu}
                                profileMenu={profileMenu}
                                setProfileMenu={setProfileMenu}
                            /> : null

                    }
                </div>
            </div>
        </header>
    )
}
