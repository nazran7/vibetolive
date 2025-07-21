"use client"

import { useState } from "react"
import Link from "next/link"
import { loginUser } from "@/api-gateways/user";
import { toast } from 'react-toastify';
import nookies from "nookies";
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        loginUser(formData,
            (data) => {
                console.log(data)
                toast.success("successfully logged in");
                setIsLoading(false);
                // setFormData({ email: "", password: "" });
                localStorage.setItem('accessToken', data?.tokens?.refresh);
                router.push(`/admin`);
                // nookies.set({res}, 'accessToken', data?.tokens.refresh,{
                //     httpOnly: false,
                //     path: '/',
                // })
            },
            (error) => {
                console.log(error)
                toast.error("Login failed");
                setIsLoading(false);
            }
        );
        
    }

    return (
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg shadow-xl">
            <div className="p-6 space-y-1 text-center border-b border-gray-800">
                <h2 className="text-2xl font-bold text-white">Sign In</h2>
                <p className="text-gray-400">Enter your credentials to access your account</p>
            </div>

            <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-200">
                            Email
                        </label>
                        <div className="relative">
                            <div className="absolute left-3 top-3 text-gray-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                    />
                                </svg>
                            </div>
                            <input
                                value={formData?.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute left-3 top-3 text-gray-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                    />
                                </svg>
                            </div>
                            <input
                                value={formData?.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="w-full pl-10 pr-10 py-2.5 bg-gray-800 border border-gray-700 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-3 text-gray-400 hover:text-gray-200"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                                        />
                                    </svg>
                                ) : (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <input
                                id="remember"
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                            />
                            <label htmlFor="remember" className="text-sm text-gray-300">
                                Remember me
                            </label>
                        </div>
                        <Link href="/auth/forgot-password" className="text-sm text-blue-400 hover:text-blue-300 hover:underline">
                            Forgot password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2.5 px-4 rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center space-x-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Signing in...</span>
                            </div>
                        ) : (
                            "Sign In"
                        )}
                    </button>

                </form>

            </div>
        </div>
    )
}