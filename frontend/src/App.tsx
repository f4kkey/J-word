import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'
import './App.css'
import Feed from './pages/Feed'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import ResetPassword from './pages/auth/ResetPassword'
import VerifyEmail from './pages/auth/VerifyEmail'
import AuthLayout from './components/auth/AuthLayout'
import AuthContextProvider from './context/AuthContextProvider'
import FeedLayout from './components/feed/FeedLayout'

const router = createBrowserRouter([
    {
        element: <AuthContextProvider />,
        children: [
            {
                path: '/',
                element: <FeedLayout />,
                children: [
                    {
                        index: true,
                        element: <Feed />
                    }
                ]
            },
            {
                path: '/',
                element: <AuthLayout />,
                children: [
                    {
                        path: 'login',
                        element: <Login />,
                    },
                    {
                        path: 'signup',
                        element: <Signup />,
                    },
                    {
                        path: 'password-reset',
                        element: <ResetPassword />,
                    },
                    {
                        path: 'verify-email',
                        element: <VerifyEmail />,
                    },
                ]
            }
        ]
    }
])

function App() {
    return (
        <RouterProvider router={router} />
    )
}

export default App