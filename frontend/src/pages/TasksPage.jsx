import React from 'react';
import StatCard from '../components/dashboard/StatCard';
import { FaTruck, FaWallet, FaMapMarkerAlt, FaCheck, FaFileInvoice } from 'react-icons/fa';

const TASKS = [
    { id: 1, type: "Delivery", location: "Green Valley Farm, Sector 4", status: "Pending", time: "10:30 AM" },
    { id: 2, type: "Meeting", location: "Dr. Sharma Clinic", status: "Done", time: "09:00 AM" },
    { id: 3, type: "Delivery", location: "City Pet Shop", status: "Pending", time: "02:00 PM" }
];

const TasksPage = () => {
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Logistics Dashboard</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Pending Tasks" value="5" subtext="2 High Priority" icon={FaTruck} trend="+1" />
                <StatCard title="Commission Earned" value="₹12,450" subtext="This Month" icon={FaWallet} trend="+15%" />
                <StatCard title="Distance Covered" value="450 km" subtext="Efficiency: High" icon={FaMapMarkerAlt} trend="+5%" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Task List */}
                <div className="glass-panel rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Today's Route</h3>
                    <div className="space-y-4">
                        {TASKS.map(task => (
                            <div key={task.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-emerald-200 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-full ${task.status === 'Done' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                        {task.status === 'Done' ? <FaCheck size={18} /> : <FaTruck size={18} />}
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm text-gray-900">{task.type} @ {task.location}</p>
                                        <p className="text-xs text-gray-400">{task.time}</p>
                                    </div>
                                </div>
                                <button className={`text-xs font-medium px-3 py-1.5 rounded-lg ${task.status === 'Done' ? 'bg-gray-100 text-gray-500 cursor-default' : 'bg-emerald-600 text-white hover:bg-emerald-700'}`}>
                                    {task.status === 'Done' ? 'Completed' : 'Mark Done'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Receipt Upload */}
                <div className="glass-panel rounded-2xl p-6 bg-emerald-900 text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-lg font-bold mb-2">File Expense Receipt</h3>
                        <p className="text-emerald-100 text-sm mb-6">Upload fuel or travel receipts for instant reimbursement processing.</p>

                        <button className="w-full bg-white text-emerald-900 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2">
                            <FaFileInvoice size={18} /> Upload New Receipt
                        </button>
                    </div>
                    {/* Decorative background element */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 rounded-full blur-3xl opacity-20 transform translate-x-10 -translate-y-10"></div>
                </div>
            </div>
        </div>
    );
};

export default TasksPage;
