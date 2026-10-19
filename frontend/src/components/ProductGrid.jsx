import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { cartActions } from '../store/cartSlice';
import { FaPlus } from 'react-icons/fa';

const ProductGrid = () => {
    const PRODUCTS = [
        { id: 1, name: "Aidhaem", category: "Blood Builder", wholesale_price: 350, stock_level: 850, unit: "500ml Bottle", description: "Premium iron supplement for cattle. Increases hemoglobin levels rapidly.", image: "/aidhaem.png" },
        { id: 2, name: "PCD Powder", category: "Critical Care", wholesale_price: 420, stock_level: 200, unit: "Box (4x50g Sachets)", description: "Emergency critical care powder for dehydration and weakness.", image: "/pcd.png" },
        { id: 3, name: "Rumepower", category: "Gut Health", wholesale_price: 180, stock_level: 1500, unit: "Box (6x12.5g Sachets)", description: "Restores healthy rumen function and digestion.", image: "/rumepower.png" },
        { id: 4, name: "Ekana Animal Soap", category: "Hygiene", wholesale_price: 85, stock_level: 5000, unit: "75g Bar", description: "Antiseptic soap for maintaining animal hygiene and preventing skin infections.", image: "/soap.png" },
        { id: 5, name: "Ekana Poshak", category: "Milk Booster", wholesale_price: 650, stock_level: 600, unit: "1L Bottle", description: "High calcium formula to boost milk production and quality.", image: "/poshak.png" }
    ];

    const [products, setProducts] = useState(PRODUCTS);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     fetch('http://localhost:8000/api/v1/products')
    //         .then(res => {
    //             if (!res.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             return res.json();
    //         })
    //         .then(data => {
    //             setProducts(data);
    //             setLoading(false);
    //         })
    //         .catch(err => {
    //             console.error("Error fetching products:", err);
    //             setError(err.message);
    //             setLoading(false);
    //         });
    // }, []);

    const addToCartHandler = (product) => {
        dispatch(cartActions.addToCart(product));
    };

    if (loading) return <div className="text-center py-20 text-slate-400 animate-pulse">Loading catalog...</div>;
    if (error) return <div className="text-center py-20 text-rose-500 bg-rose-50 rounded-lg">Unable to load products. please try again.</div>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
                <div key={product.id} className="group flex flex-col bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                    <div className="h-48 bg-slate-50 flex items-center justify-center relative p-6">
                        <div className="w-full h-full bg-white rounded-lg shadow-sm flex items-center justify-center border border-slate-100 group-hover:scale-105 transition-transform duration-500 overflow-hidden">
                            {product.image ? (
                                <img src={product.image} alt={product.name} className="w-full h-full object-contain p-2" />
                            ) : (
                                <div className="text-slate-300 text-4xl font-light">Rx</div>
                            )}
                        </div>
                        <span className="absolute top-4 right-4 bg-white/90 backdrop-blur text-[10px] font-bold px-2 py-1 rounded text-slate-500 border border-slate-200 uppercase tracking-widest">
                            {product.category}
                        </span>
                    </div>

                    <div className="p-5 flex flex-col flex-grow">
                        <div className="mb-auto">
                            <h3 className="text-base font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors">{product.name}</h3>
                            <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 h-8">{product.description}</p>
                        </div>

                        <div className="mt-6 pt-4 border-t border-slate-50 flex justify-between items-center">
                            <div className="flex flex-col">
                                <span className="text-xs text-slate-400 font-medium">Wholesale Price</span>
                                <span className="font-bold text-lg text-slate-900">Rs.{product.wholesale_price}</span>
                            </div>

                            <button
                                onClick={() => addToCartHandler(product)}
                                className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-primary transition-colors shadow-lg shadow-slate-200 hover:shadow-emerald-200 active:scale-95">
                                <FaPlus size={12} />
                            </button>
                        </div>

                        <div className="mt-3 flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full ${product.stock_level > 20 ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
                            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
                                {product.stock_level > 20 ? 'In Stock' : 'Low Stock'}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductGrid;
