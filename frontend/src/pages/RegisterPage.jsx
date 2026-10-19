import React, { useState } from 'react';
import { FaShieldAlt, FaUser, FaEnvelope, FaLock, FaStethoscope } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        password: '',
        role: 'customer' // Default role
    });
    const { register, error: authError } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const success = await register(formData);
        if (success) {
            navigate('/login'); // Redirect to login after successful registration
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
            <div className="glass-panel max-w-md w-full rounded-2xl p-8">
                <div className="text-center mb-8">
                    <div className="inline-flex p-3 rounded-xl bg-emerald-100 text-emerald-600 mb-4">
                        <FaShieldAlt size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">Create Account</h2>
                    <p className="text-slate-500 mt-2">Join EkanaVet Platform</p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    {authError && (
                        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                            {authError}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaUser className="text-slate-400" />
                            </div>
                            <input
                                type="text"
                                name="full_name"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                                placeholder="John Doe"
                                value={formData.full_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaEnvelope className="text-slate-400" />
                            </div>
                            <input
                                type="email"
                                name="email"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaLock className="text-slate-400" />
                            </div>
                            <input
                                type="password"
                                name="password"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Account Type</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaStethoscope className="text-slate-400" />
                            </div>
                            <select
                                name="role"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all bg-white"
                                value={formData.role}
                                onChange={handleChange}
                            >
                                <option value="customer">Pet Owner / Customer</option>
                                <option value="vet">Veterinarian</option>
                                <option value="receptionist">Receptionist</option>
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl font-bold text-lg shadow-lg shadow-emerald-200 transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <span className="text-slate-500 text-sm">Already have an account? </span>
                    <Link to="/login" className="text-sm font-medium text-emerald-600 hover:text-emerald-700">Sign in instead</Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
