import React, { type InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    inputSize?: "small" | "medium" | "large";
};

const sizeClasses = {
    "small": "p-1 text-xs",
    "medium": "p-2 text-sm",
    "large": "p-4",
} as const;

export default function Input({ label, inputSize = "large", width, ...otherProps }: InputProps) {
    return (
        <div className={`grid my-[1rem] gap-[0.5rem] w-full`}>
            {label ? <label>{label}</label> : null}
            <input className={`p-[0.7rem] border border-[#6f6f6f99] rounded ${sizeClasses[inputSize]}`} {...otherProps}
                style={{
                    width: width ? `${width}px` : "100%",
                }}
            />
        </div>
    )
}
