import React from 'react'
import { Outlet } from 'react-router-dom'
import AuthBox from './AuthBox'

export default function AuthLayout() {
    return (
        <div className='grid min-h-screen grid-rows-[auto_1fr_auto] [&_a]:font-bold [&_a]:text-[#0a66c2] [&_footer]:border [&_footer]:border-[#e0e0e0] [&_footer]:bg-white [&_footer]:text-xs [&_footer_a]:font-normal [&_footer_a]:text-black/60 [&_footer_img]:h-auto [&_footer_img]:w-16 [&_footer_li]:flex [&_footer_li]:items-center [&_footer_li]:gap-2 [&_footer_ul]:mt-8 [&_footer_ul]:flex [&_footer_ul]:flex-wrap [&_footer_ul]:items-center [&_footer_ul]:gap-4 [&_footer_ul]:p-0 [&_h1]:mb-4 [&_h1]:text-3xl [&_h1]:font-bold [&_header]:border [&_header]:border-[#e0e0e0] [&_header]:bg-white [&_header>div]:py-4 [&_header_a]:block [&_header_a]:w-max [&_main]:grid [&_main]:items-center'>
            <header className='mx-auto w-full max-w-[74rem]'>
                <a href="/">
                    <img src="/logo.svg" alt="" className='w-15' />
                </a>
            </header>
            <main className='mx-auto w-full max-w-[74rem] p-8'>
                <AuthBox>
                    <Outlet />
                </AuthBox>
            </main>
            <footer>
                <ul className='mx-auto w-full max-w-[74rem] p-8'>
                    <li>
                        <img src="/logo.svg" alt="" />
                        <span>© 2026</span>
                    </li>
                    <li>
                        <a href="">Accessiblity</a>
                    </li>
                    <li>
                        <a href="">User Agreement</a>
                    </li>
                    <li>
                        <a href="">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="">Cookie Policy</a>
                    </li>
                    <li>
                        <a href="">Copywright Policy</a>
                    </li>
                    <li>
                        <a href="">Brand Policy</a>
                    </li>
                    <li>
                        <a href="">Guest Controls</a>
                    </li>
                    <li>
                        <a href="">Community Guidelines</a>
                    </li>
                    <li>
                        <a href="">Language</a>
                    </li>
                </ul>
            </footer>
        </div>
    )
}
