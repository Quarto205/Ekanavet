import React, { useState } from 'react';
import { FaShieldAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error: authError } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const success = await login(email, password);
        if (success) {
            navigate('/');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="glass-panel max-w-md w-full rounded-2xl p-8">
                <div className="text-center mb-8">
                    <div className="inline-flex p-3 rounded-xl bg-emerald-100 text-emerald-600 mb-4">
                        <FaShieldAlt size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">Portal Login</h2>
                    <p className="text-slate-500 mt-2">Access your clinic dashboard</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {authError && (
                        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                            {authError}
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            placeholder="clinic@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary hover:bg-primary-dark text-white py-3.5 rounded-xl font-bold text-lg shadow-lg shadow-emerald-200 transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                <div className="mt-8 text-center space-y-2">
                    <div>
                        <a href="#" className="text-sm font-medium text-primary hover:text-primary-dark">Forgot your password?</a>
                    </div>
                    <div>
                        <span className="text-slate-500 text-sm">Don't have an account? </span>
                        <Link to="/register" className="text-sm font-medium text-primary hover:text-primary-dark">Register here</Link>
                    </div>
                </div>

                {['localhost', '127.0.0.1'].includes(window.location.hostname) && (
                    <div className="mt-6 text-center pt-6 border-t border-slate-100">
                        <Link to="/admin/login" className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-wider">
                            Admin Login
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
