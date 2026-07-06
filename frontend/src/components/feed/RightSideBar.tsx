import React from 'react'
import Button from '../auth/Button'

export default function RightSideBar() {
    return (
        <div className='rounded border border-[#e0e0e0] bg-white p-4 [&_h3]:mb-2 [&_h3]:font-bold'>
            <h3>Add to your Connection</h3>
            <div className='grid gap-4'>
                <div className='grid gap-4'>
                    <img src="" alt="" className='h-12 w-12 overflow-hidden rounded-full' />
                    <div>
                        <div className='font-bold'></div>
                        <div className='text-black/60'></div>
                        <Button buttonSize='medium' outline className='!m-0.5 !w-auto'>
                            + Follow
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
