import React, { useState } from 'react';
import { FaRobot, FaChevronRight } from 'react-icons/fa';

const AiVetPage = () => {
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">AI Vet Assistant</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Get instant product recommendations and dosage advice.
                    </p>
                </div>
            </div>

            <div className="glass-panel rounded-2xl p-8 text-center h-96 flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-4">
                    <FaRobot size={32} />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Ekana AI Assistant</h2>
                <p className="text-gray-500 max-w-md mt-2 mb-6">Describe the animal's symptoms to receive product recommendations and dosage advice.</p>
                <div className="w-full max-w-xl relative">
                    <input type="text" placeholder="e.g. Cow has fever and low appetite..." className="w-full p-4 pr-12 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all" />
                    <button className="absolute right-2 top-2 p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                        <FaChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AiVetPage;
