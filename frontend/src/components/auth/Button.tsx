import React, { type ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    outline?: boolean;
    buttonSize: "small" | "medium" | "large";
};

const sizeClasses = {
    "small": "p-1 text-xs",
    "medium": "p-2 text-sm",
    "large": "p-4",
}

export default function Button({ outline, children, buttonSize = "large", ...others }: ButtonProps) {
    return (
        <button {...others} className={`my-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#0a66c2] font-bold text-white transition-colors duration-300 hover:enabled:bg-[#004182] disabled:cursor-not-allowed disabled:bg-[#d9d9d9] disabled:text-black [&_svg]:h-6 [&_svg]:w-6
            ${outline ?
                "border border-black/60 !bg-white !font-normal !text-black" :
                ""}
            ${sizeClasses[buttonSize]}
                `
        }>
            {children}
        </button>
    )
}
