import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaChartLine, FaUsers, FaBoxOpen, FaCogs, FaSignOutAlt, FaSearch, FaBell } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const AdminDashboardLayout = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    // const [activeTab, setActiveTab] = useState(location.pathname); // Not strictly needed if we use location.pathname directly

    const adminLinks = [
        { path: '/admin/dashboard', label: 'Overview', icon: FaChartLine },
        { path: '/admin/users', label: 'User Management', icon: FaUsers },
        { path: '/admin/products', label: 'Inventory / Products', icon: FaBoxOpen },
        { path: '/admin/settings', label: 'System Settings', icon: FaCogs },
    ];

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    return (
        <div className="min-h-screen bg-slate-100 text-slate-900 flex">
            {/* Sidebar - Darker for Admin */}
            <div className="w-64 bg-slate-900 text-slate-300 h-screen fixed left-0 top-0 flex flex-col z-20 hidden md:flex">
                <div className="p-6">
                    <Link to="/admin/dashboard" className="flex items-center gap-3 mb-1 group">
                        {/* Maybe a white version of logo or just text */}
                        <div className="w-8 h-8 rounded bg-emerald-500 flex items-center justify-center text-white font-bold">E</div>
                        <span className="font-bold text-xl tracking-tight text-white">EkanaAdmin</span>
                    </Link>
                    <p className="text-[10px] text-slate-500 font-semibold tracking-wide uppercase ml-1">Management Console</p>
                </div>

                <div className="flex-1 px-4 space-y-2 mt-4">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 mb-2">
                        Main Menu
                    </div>
                    {adminLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${location.pathname === link.path
                                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20'
                                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                                }`}
                        >
                            <link.icon size={20} />
                            {link.label}
                        </Link>
                    ))}
                </div>

                <div className="p-4 border-t border-slate-800">
                    <div className="bg-slate-800 p-4 rounded-xl flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm">
                            {user?.full_name?.charAt(0) || 'A'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-white truncate">{user?.full_name || 'Admin'}</p>
                            <button onClick={handleLogout} className="text-xs text-red-400 hover:text-red-300 font-medium flex items-center gap-1 mt-1">
                                <FaSignOutAlt size={10} /> Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="md:pl-64 flex flex-col min-h-screen w-full">
                {/* Topbar */}
                <div className="h-16 bg-white border-b border-slate-200 fixed top-0 right-0 left-0 md:left-64 z-10 flex items-center justify-between px-6 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-800">
                        {adminLinks.find(l => l.path === location.pathname)?.label || 'Dashboard'}
                    </h2>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center bg-slate-100 rounded-lg px-4 py-2 border border-transparent focus-within:border-slate-300 focus-within:bg-white transition-all">
                            <FaSearch size={16} className="text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search system..."
                                className="bg-transparent border-none outline-none text-sm ml-2 w-48 text-slate-700 placeholder-slate-400"
                            />
                        </div>
                        <button className="p-2 text-slate-400 hover:text-emerald-600 transition-colors relative">
                            <FaBell size={20} />
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

export default AdminDashboardLayout;
