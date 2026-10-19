import React from 'react';

const StatCard = ({ title, value, subtext, icon: Icon, trend }) => (
    <div className="glass-card p-6 rounded-2xl relative overflow-hidden">
        <div className="flex justify-between items-start mb-4">
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
            </div>
            {Icon && (
                <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                    <Icon size={20} />
                </div>
            )}
        </div>
        <div className="flex items-center gap-2">
            {trend && (
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {trend}
                </span>
            )}
            <span className="text-xs text-gray-400">{subtext}</span>
        </div>
    </div>
);

export default StatCard;
