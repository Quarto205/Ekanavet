import React, { useState } from 'react';
import { FaUserShield } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error: authError } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // We use the same login function, but we'll check the role after login or rely on the backend/routing
        const success = await login(email, password);
        if (success) {
            // Ideally check if user is admin here before redirecting, 
            // but for now we'll redirection to admin dashboard and let the protected route handle the rest
            navigate('/admin/dashboard');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
            <div className="bg-white max-w-md w-full rounded-2xl p-8 shadow-2xl shadow-black/50 border border-slate-700">
                <div className="text-center mb-8">
                    <div className="inline-flex p-3 rounded-xl bg-slate-100 text-slate-800 mb-4 border border-slate-200">
                        <FaUserShield size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">Admin Portal</h2>
                    <p className="text-slate-500 mt-2">Authorized Personnel Only</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {authError && (
                        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                            {authError}
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Admin Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-800 focus:ring-2 focus:ring-slate-800/20 outline-none transition-all"
                            placeholder="admin@ekanavet.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-800 focus:ring-2 focus:ring-slate-800/20 outline-none transition-all"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3.5 rounded-xl font-bold text-lg shadow-lg hover:shadow-slate-900/30 transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Authenticating...' : 'Access Dashboard'}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <a href="/" className="text-sm font-medium text-slate-500 hover:text-slate-800">
                        ← Return to Main Site
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AdminLoginPage;
