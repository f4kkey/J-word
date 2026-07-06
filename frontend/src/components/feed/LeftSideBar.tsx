import React from 'react'
import { useAuth } from '../../context/AuthContextProvider'

export default function LeftSideBar() {
    const { user } = useAuth()
    return (
        <div className='rounded border border-[#e0e0e0] bg-white p-4 text-center'>
            <div className='-m-4 h-28 [&_img]:h-full [&_img]:w-full [&_img]:object-cover'>
                <img src="" alt="" />
            </div>
            <div className='relative z-[2] mx-auto -mt-12 h-24 w-24 overflow-hidden rounded-full border-2 border-black [&_img]:h-full [&_img]:w-full [&_img]:object-cover'>
                <img src={user?.profilePicture || "/avatar.png"} alt="" />
            </div>

            <div className='font-bold'>{user?.firstName + " " + user?.lastName}</div>
            <div className='border-b border-[#e0e0e0] pb-2 text-sm'>{user?.location}</div>
            <div className='mt-4 text-left text-xs text-black/60'>
                <div className='mt-1 flex w-full items-center justify-between'>
                    <div>Profile viewers</div>
                    <div className='font-bold'>1,234</div>
                </div>
                <div className='mt-1 flex w-full items-center justify-between'>
                    <div>
                        Connections
                    </div>
                    <div className='font-bold'>
                        4,567
                    </div>
                </div>
            </div>
        </div>
    )
}
