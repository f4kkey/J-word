import React, { type ReactNode } from 'react'


export default function Seperator({ children }: { children?: ReactNode }) {
    return (
        <div className='my-4 grid grid-cols-[1fr_auto_1fr] items-center gap-4 before:my-4 before:block before:h-px before:bg-black/15 after:my-4 after:block after:h-px after:bg-black/15'>
            {children}
        </div>
    )
}
