import React, { type ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
export default function AuthBox({ children }: { children: ReactNode }) {
    return (
        <div className='w-full md:p-[1.5rem] md:w-[30rem] md:bg-white md:border md:border-[#e0e0e0] md:rounded-lg md:mx-auto shadow-lg'>
            {children}
        </div>
    )
}
