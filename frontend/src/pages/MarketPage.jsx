import React, { useState } from 'react';
import StatCard from '../components/dashboard/StatCard';
import { FaShoppingBag, FaPills, FaChartLine } from 'react-icons/fa';

const PRODUCTS = [
    { id: 1, name: "Aidhaem", category: "Blood Builder", price: 350, stock: 850, unit: "500ml Bottle", growth: "+12%" },
    { id: 2, name: "PCD Powder", category: "Critical Care", price: 420, stock: 200, unit: "Box (4x50g Sachets)", growth: "+8%" },
    { id: 3, name: "Rumepower", category: "Gut Health", price: 180, stock: 1500, unit: "Box (6x12.5g Sachets)", growth: "+25%" },
    { id: 4, name: "Ekana Animal Soap", category: "Hygiene", price: 85, stock: 5000, unit: "75g Bar", growth: "+15%" },
    { id: 5, name: "Ekana Poshak", category: "Milk Booster", price: 650, stock: 600, unit: "1L Bottle", growth: "+5%" }
];

const getCategoryColor = (category) => {
    switch (category) {
        case 'Blood Builder': return 'bg-red-100 text-red-700';
        case 'Critical Care': return 'bg-orange-100 text-orange-700';
        case 'Gut Health': return 'bg-yellow-100 text-yellow-700';
        case 'Hygiene': return 'bg-blue-100 text-blue-700';
        case 'Milk Booster': return 'bg-purple-100 text-purple-700';
        default: return 'bg-gray-100 text-gray-800';
    }
};

const MarketPage = () => {
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Market Overview</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Orders" value="12" subtext="Last 30 days" icon={FaShoppingBag} trend="+2" />
                <StatCard title="Samples Requested" value="3" subtext="Processing" icon={FaPills} trend="+1" />
                <StatCard title="Total Spend" value="₹24,000" subtext="FY 2024-25" icon={FaChartLine} />
            </div>

            <div className="glass-panel rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-800">Wholesale Market</h2>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 text-xs font-medium bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-600 transition-colors">Filter</button>
                        <button className="px-3 py-1.5 text-xs font-medium bg-emerald-50 hover:bg-emerald-100 rounded-lg text-emerald-700 transition-colors">Export CSV</button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider">
                                <th className="px-6 py-4 font-medium">Asset Name</th>
                                <th className="px-6 py-4 font-medium">Category</th>
                                <th className="px-6 py-4 font-medium text-right">Wholesale Price</th>
                                <th className="px-6 py-4 font-medium text-right">Available Stock</th>
                                <th className="px-6 py-4 font-medium text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {PRODUCTS.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50/80 transition-colors group cursor-pointer">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xs">
                                                {product.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900 text-sm">{product.name}</p>
                                                <p className="text-xs text-gray-400">{product.unit}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(product.category)}`}>
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <p className="font-medium text-gray-900">₹{product.price}</p>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <p className="font-medium text-gray-900">{product.stock.toLocaleString()}</p>
                                        <p className={`text-xs ${product.growth.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{product.growth} vol</p>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm border border-emerald-200 hover:bg-emerald-50 px-3 py-1 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                                            Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MarketPage;
