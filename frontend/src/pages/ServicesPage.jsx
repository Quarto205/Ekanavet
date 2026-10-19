import React from 'react';

const ServicesPage = () => {
    return (
        <main className="bg-slate-50 min-h-screen py-24">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">Our Services</h1>
                    <p className="text-slate-500 text-lg max-w-2xl mx-auto">Beyond supply, we support your clinic's growth.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-100">
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Inventory Management</h3>
                        <p className="text-slate-500">Automated tracking and restocking suggestions based on your clinic's usage patterns.</p>
                    </div>
                    <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-100">
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Cold Chain logistics</h3>
                        <p className="text-slate-500">Guaranteed temperature integrity for vaccines and biologics from our warehouse to your fridge.</p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ServicesPage;
