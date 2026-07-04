import React, { type InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
};

export default function Input({ label, ...otherProps }: InputProps) {
    return (
        <div className='grid my-[1rem] gap-[0.5rem] w-full'>
            <label>{label}</label>
            <input className='p-[0.7rem] border border-[#6f6f6f99] rounded' {...otherProps} />
        </div>
    )
}
