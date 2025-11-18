'use client';

import { createAdminUser } from '@/api-gateways/user';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function AdminCreateUser() {
    const [form, setForm] = useState({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        phone_number: '',
    });

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        createAdminUser(
            form,
            () => {
                toast.success('Admin user created successfully!');
                setLoading(false);
            },
            (error) => {
                toast.error(`Error: ${error}`);
                setLoading(false);
            }
        );
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-8 bg-base-100 rounded-xl shadow-md border border-base-300">
            <h2 className="text-2xl font-bold text-center mb-6 text-base-content">Create Admin User</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    value={form.first_name}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-base-300 rounded bg-base-100 text-base-content focus:border-primary focus:outline-none"
                />
                <input
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    value={form.last_name}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-base-300 rounded bg-base-100 text-base-content focus:border-primary focus:outline-none"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-base-300 rounded bg-base-100 text-base-content focus:border-primary focus:outline-none"
                />

            
                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-base-300 rounded bg-base-100 text-base-content pr-10 focus:border-primary focus:outline-none"
                    />
                    <span
                        className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-base-content/60 hover:text-base-content"
                        onClick={() => setShowPassword((prev) => !prev)}
                    >
                        {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </span>
                </div>

                <input
                    type="text"
                    name="phone_number"
                    placeholder="Phone Number"
                    value={form.phone_number}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-base-300 rounded bg-base-100 text-base-content focus:border-primary focus:outline-none"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 bg-primary text-primary-content font-semibold rounded hover:bg-primary/90 transition disabled:opacity-50"
                >
                    {loading ? 'Creating...' : 'Create Admin'}
                </button>
            </form>
        </div>
    );
}
