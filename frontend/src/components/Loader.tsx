import React from 'react'

export default function Loader() {
    return (
        <div className='flex flex-col items-center [&_img]:mx-auto [&_img]:mt-48 [&_img]:h-auto [&_img]:w-40'>
            <img src="/logo.svg" alt="Loading..." />
            <div className='mt-4 h-[0.1rem] w-40 rounded-full bg-white'>
                <div className='h-1 w-16 animate-[slide_1s_infinite_alternate] rounded-full bg-[#0a66c2]'></div>
            </div>
        </div>
    );
}
