import React from 'react';
import ProductGrid from '../components/ProductGrid';

const ShopPage = () => {
    return (
        <main className="bg-slate-50 min-h-screen py-24">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl font-bold text-slate-900 mb-2">Professional Supply</h1>
                        <p className="text-slate-500 text-lg">Browse our full catalog of pharmaceutical grade supplies.</p>
                    </div>

                    <div className="flex gap-4 overflow-x-auto pb-2">
                        {['All Categories', 'Vaccines', 'Surgery', 'Nutrition', 'Lab'].map((cat, idx) => (
                            <button
                                key={cat}
                                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${idx === 0 ? 'bg-primary text-white shadow-lg shadow-emerald-200' : 'bg-white border border-slate-200 text-slate-600 hover:border-primary hover:text-primary'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <ProductGrid />
            </div>
        </main>
    );
};

export default ShopPage;
