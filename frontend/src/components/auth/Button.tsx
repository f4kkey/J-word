import React, { type ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    outline?: boolean;
};

export default function Button({ outline, children, ...others }: ButtonProps) {
    return (
        <button {...others} className={`my-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#0a66c2] font-bold text-white transition-colors duration-300 hover:enabled:bg-[#004182] disabled:cursor-not-allowed disabled:bg-[#d9d9d9] disabled:text-black [&_svg]:h-6 [&_svg]:w-6 p-4
            ${outline ?
                "border border-black/60 !bg-white !font-normal !text-black" :
                ""}`
        }>
            {children}
        </button>
    )
}
