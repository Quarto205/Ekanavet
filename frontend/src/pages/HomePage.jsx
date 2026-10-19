import React from 'react';
import { FaArrowRight, FaChevronRight } from 'react-icons/fa';
import heroBg from '../assets/hero_bg.png';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <>
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-primary-dark">
                {/* Abstract Shapes */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[500px] bg-emerald-500/20 blur-[120px] rounded-full mix-blend-overlay"></div>
                    <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-primary/30 blur-[100px] rounded-full mix-blend-multiply"></div>
                    <img src={heroBg} alt="Background" className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay" />
                </div>

                <div className="container mx-auto px-6 max-w-7xl relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md mb-8">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span className="text-emerald-100 text-xs font-medium tracking-wide uppercase">Trusted by 2,000+ Clinics</span>
                    </div>

                    <h2 className="text-5xl lg:text-7xl font-bold text-white tracking-tight leading-tight mb-8">
                        Precision Medicine <br /> for <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-teal-200">Veterinary Excellence</span>
                    </h2>

                    <p className="text-lg text-emerald-100/80 max-w-2xl mx-auto leading-relaxed mb-12">
                        Streamline your clinic's supply chain with our enterprise-grade pharmaceutical platform.
                        Next-day delivery on vaccines, anesthetics, and critical care supplies.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-5">
                        <Link to="/shop" className="bg-white text-primary-dark hover:bg-emerald-50 px-8 py-3.5 rounded-xl font-semibold text-lg transition-all shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-lg hover:-translate-y-1 flex items-center justify-center gap-2">
                            Explore Catalog <FaArrowRight size={14} />
                        </Link>
                        <button className="bg-emerald-900/30 backdrop-blur-sm border border-emerald-500/30 text-white hover:bg-emerald-900/50 px-8 py-3.5 rounded-xl font-semibold text-lg transition-all">
                            Schedule Demo
                        </button>
                    </div>
                </div>
            </section>

            {/* Features / Value Prop Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <h3 className="text-3xl font-bold text-slate-900">Why EkanaVet?</h3>
                        <p className="text-slate-500 mt-4 max-w-2xl mx-auto">We understand the critical nature of veterinary care. Our infrastructure is built for reliability.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            { title: "Cold Chain Integrity", desc: "Temperature-controlled logistics for sensitive vaccines." },
                            { title: "Regulatory Compliance", desc: "Fully licensed distribution adhering to FDA & DEA standards." },
                            { title: "Smart Inventory", desc: " AI-driven restocking to prevent shortages in your clinic." }
                        ].map((feature, idx) => (
                            <div key={idx} className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-100 transition-colors">
                                <h4 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h4>
                                <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomePage;
