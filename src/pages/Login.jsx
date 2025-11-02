import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/slices/authSlice';
import { addLog } from '../store/slices/logSlice';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);
    const [form, setForm] = useState({ email: '', password: '' });
    const [showPass, setShowPass] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await dispatch(loginUser(form));
        if (res.meta.requestStatus === 'fulfilled') {
            dispatch(
                addLog({
                    message: `User logged in as ${res.payload.role.toUpperCase()}`,
                    timestamp: new Date().toISOString(),
                })
            );
            navigate('/app');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white animate-fadeIn">
            <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md border border-gray-100">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Debt Collection Dashboard
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Email</label>
                        <input
                            type="email"
                            required
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-100"
                            placeholder="admin@demo.com / agent@demo.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Password</label>
                        <div className="relative">
                            <input
                                type={showPass ? 'text' : 'password'}
                                required
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-100"
                                placeholder="Enter password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPass(!showPass)}
                                className="absolute right-3 top-2 text-gray-400 hover:text-gray-600"
                            >
                                {showPass ? '🙈' : '👁️'}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm text-center">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition ${loading && 'opacity-70 cursor-not-allowed'
                            }`}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <p className="text-xs text-center text-gray-400 mt-4">
                    Try <strong>admin@demo.com / admin</strong> or <strong>agent@demo.com / agent</strong>
                </p>
            </div>
        </div>
    );
}