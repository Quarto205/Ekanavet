import React from 'react';
import { FaUsers, FaShoppingCart, FaRupeeSign, FaExclamationCircle } from 'react-icons/fa';

const StatCard = ({ title, value, icon: Icon, color, trend }) => (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start justify-between">
        <div>
            <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
            {trend && <p className={`text-xs font-medium mt-2 ${trend.startsWith('+') ? 'text-emerald-600' : 'text-red-500'}`}>{trend} from last month</p>}
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
            <Icon className="text-white" size={24} />
        </div>
    </div>
);

const AdminOverviewPage = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-800">System Overview</h1>
                <p className="text-slate-500">Welcome back, Admin. Here's what's happening today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Users"
                    value="1,248"
                    icon={FaUsers}
                    color="bg-blue-500"
                    trend="+12%"
                />
                <StatCard
                    title="Active Orders"
                    value="42"
                    icon={FaShoppingCart}
                    color="bg-emerald-500"
                    trend="+5%"
                />
                <StatCard
                    title="Revenue (Monthly)"
                    value="₹4.2L"
                    icon={FaRupeeSign}
                    color="bg-violet-500"
                    trend="+18%"
                />
                <StatCard
                    title="Pending Approvals"
                    value="7"
                    icon={FaExclamationCircle}
                    color="bg-amber-500"
                />
            </div>

            {/* Placeholder for Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-64 flex items-center justify-center">
                    <p className="text-slate-400">Recent Transactions Chart Placeholder</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-64 flex items-center justify-center">
                    <p className="text-slate-400">New User Registrations List Placeholder</p>
                </div>
            </div>
        </div>
    );
};

export default AdminOverviewPage;
