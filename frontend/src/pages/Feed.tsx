import React from 'react'

export default function Feed() {
    return (
        <div className='grid h-full gap-8 min-[1135px]:grid-cols-[14rem_1fr_20rem] min-[1135px]:items-start'>
            <header className='h-16 flex justify-end items-center gap-4 p-4 rounded-none bg-gray-200'>
                <div>Hello user</div>
                <span>|</span>
                <button>Logout</button>
            </header>
            <main>
                <div className='hidden min-[1135px]:block bg-gray-200'></div>
                <div className='grid h-full grid-rows-[auto_1fr] gap-4 bg-gray-200'>
                    <div></div>
                    <div></div>
                </div>
                <div className='hidden min-[1135px]:block bg-gray-200'></div>
            </main>
        </div>
    )
}
