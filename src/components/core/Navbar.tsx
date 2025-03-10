'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { setSignIn, setSignOut } from '@/lib/features/authSlice'
import { apiCall } from '@/utils/apiHelpers'
import { Button } from '../ui/button'

const Navbar = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const auth = useAppSelector((state) => state.authState)

    const keepLogin = async () => {
        try {
        const auth = localStorage.getItem('auth')
        if (auth) {
            const query = encodeURIComponent(`/objectId=${auth}`)
            const response = await apiCall.get(`/accounts?where=${query}`)

            if (response.data.length === 1) {
            dispatch(
                setSignIn({
                id: response.data[0].objectId,
                firstname: response.data[0].firstname,
                lastname: response.data[0].lastname,
                email: response.data[0].email,
                })
            )
            }
        }
        } catch (error) {
        console.log(error)
        }
    }

    useEffect(() => {
        keepLogin()
    }, [])

    const handleSignOut = () => {
        dispatch(setSignOut())
        localStorage.removeItem('auth')
        router.push('/')
    }

    return (
        <>
        {/* Navbar */}
        <nav className="flex justify-between items-center p-4 px-6 bg-gradient-to-r from-indigo-500 to-purple-600 shadow-md fixed top-0 left-0 w-full z-50 h-16">
            <h1 className="text-2xl font-bold text-white">
            <Link href="/">Home</Link>
            </h1>
            <div className="flex items-center space-x-4">
            {auth.email ? (
                <>
                <Button className="bg-white text-indigo-600 px-4 py-2 rounded-lg shadow-md hover:bg-gray-100">
                    <Link href="/dashboard-user">Post</Link>
                </Button>
                <span className="text-gray-200">{auth.email}</span>
                <Button
                    type="button"
                    className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
                    onClick={handleSignOut}
                >
                    Sign out
                </Button>
                </>
            ) : (
                <>
                <Link href="/sign-in">
                    <Button className="bg-white text-indigo-600 px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 cursor-pointer">
                    Sign in
                    </Button>
                </Link>
                <Link href="/sign-up">
                    <Button className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-700 cursor-pointer">
                    Sign Up
                    </Button>
                </Link>
                </>
            )}
            </div>
        </nav>
        </>
    )
}

export default Navbar
