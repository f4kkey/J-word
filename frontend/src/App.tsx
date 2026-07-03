import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'
import './App.css'
import Feed from './pages/feed'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import ResetPassword from './pages/auth/ResetPassword'
import VerifyEmail from './pages/auth/VerifyEmail'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Feed />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/signup',
        element: <Signup />,
    },
    {
        path: '/password-reset',
        element: <ResetPassword />,
    },
    {
        path: '/verify-email',
        element: <VerifyEmail />,
    },
])

function App() {
    return (
        <RouterProvider router={router} />
    )
}

export default App