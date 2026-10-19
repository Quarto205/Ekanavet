import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaShoppingBag, FaColumns, FaRobot, FaPills, FaTruck, FaWallet, FaFileInvoice, FaSearch, FaBell } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const DashboardLayout = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState(location.pathname);

    // Filter links based on role (simple check for now, can be expanded)
    const isEmployee = user?.role === 'employee' || user?.role === 'vet'; // Assuming 'vet' might be treated as employee for now or has separate dashboard

    const customerLinks = [
        { path: '/market', label: 'Wholesale Market', icon: FaShoppingBag },
        { path: '/dashboard', label: 'My Dashboard', icon: FaColumns },
        { path: '/ai-vet', label: 'AI Vet Assistant', icon: FaRobot },
        // { path: '/samples', label: 'Sample Requests', icon: FaPills },
    ];

    const employeeLinks = [
        { path: '/tasks', label: 'My Tasks', icon: FaTruck },
        // { path: '/commissions', label: 'Commissions', icon: FaWallet },
        // { path: '/receipts', label: 'File Receipts', icon: FaFileInvoice },
    ];

    const links = isEmployee ? employeeLinks : customerLinks;

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-gray-900 flex">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col z-20 hidden md:flex">
                <div className="p-6">
                    <Link to="/" className="flex items-center gap-3 mb-1 group">
                        <img src="/logo.png" alt="EkanaVet Logo" className="w-10 h-10 object-contain" />
                        <span className="font-bold text-xl tracking-tight text-gray-800">EkanaVet</span>
                    </Link>
                    {/* Motto Subtitle */}
                    <p className="text-[10px] text-emerald-600 font-semibold tracking-wide uppercase ml-1">Elevate Health • Excel Production</p>
                </div>

                <div className="flex-1 px-4 space-y-2 mt-4">
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-2">
                        {isEmployee ? 'Employee Portal' : 'Clinic Portal'}
                    </div>
                    {links.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${location.pathname === link.path
                                ? 'bg-emerald-50 text-emerald-700'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            <link.icon size={20} />
                            {link.label}
                        </Link>
                    ))}
                </div>

                <div className="p-4 border-t border-gray-100">
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 font-bold text-sm">
                            {user?.full_name?.charAt(0) || 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-gray-900 truncate">{user?.full_name || 'User'}</p>
                            <button onClick={handleLogout} className="text-xs text-red-500 hover:text-red-700 font-medium">Sign Out</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="md:pl-64 flex flex-col min-h-screen w-full">
                {/* Topbar */}
                <div className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 fixed top-0 right-0 left-0 md:left-64 z-10 flex items-center justify-between px-6">
                    <div className="flex items-center gap-4 text-gray-500">
                        <span className="text-sm">Welcome back, <strong>{user?.full_name || 'Partner'}</strong></span>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Search Bar */}
                        <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 border border-transparent focus-within:border-emerald-500 focus-within:bg-white transition-all">
                            <FaSearch size={16} className="text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search medicines..."
                                className="bg-transparent border-none outline-none text-sm ml-2 w-48 text-gray-700 placeholder-gray-400"
                            />
                        </div>

                        <button className="p-2 text-gray-400 hover:text-emerald-600 transition-colors relative">
                            <FaBell size={20} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </button>
                    </div>
                </div>

                {/* Page Content */}
                <main className="flex-1 p-6 mt-16 overflow-y-auto">
                    <div className="max-w-7xl mx-auto space-y-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
