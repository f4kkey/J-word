import React from 'react'
import { Outlet } from 'react-router-dom'
import FeedHeader from './FeedHeader'

export default function FeedLayout() {
    return (
        <div className='grid min-h-screen grid-rows-[auto_1fr] gap-4'>
            <FeedHeader></FeedHeader>
            <main className='mx-auto w-full max-w-[74rem] p-4'>
                <Outlet />
            </main>
        </div>
    )
}
