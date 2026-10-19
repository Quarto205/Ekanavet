import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../store/cartSlice';
import { useState } from 'react';
import { FaShoppingBag, FaTimes, FaTrash } from 'react-icons/fa';

const Cart = ({ scrolled }) => {
    const cartItems = useSelector(state => state.cart.items);
    const totalQuantity = useSelector(state => state.cart.totalQuantity);
    const totalAmount = useSelector(state => state.cart.totalAmount);
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();

    const toggleCart = () => {
        setIsOpen(!isOpen);
    };

    const removeItemHandler = (id) => {
        dispatch(cartActions.removeFromCart(id));
    };

    const checkoutHandler = () => {
        alert("Proceeding to checkout with total: Rs." + totalAmount.toFixed(2));
    };

    return (
        <div className="relative">
            <button onClick={toggleCart} className={`relative p-2 transition-colors ${scrolled ? 'text-gray-700 hover:text-primary' : 'text-white hover:text-green-100'}`}>
                <FaShoppingBag size={24} />
                {totalQuantity > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                        {totalQuantity}
                    </span>
                )}
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
                    <div className="absolute right-0 mt-6 w-96 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden ring-1 ring-black/5 animate-fade-in-down origin-top-right">
                        <div className="p-5 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-gray-900">Your Cart</h3>
                            <button onClick={toggleCart} className="text-gray-400 hover:text-gray-600">
                                <FaTimes />
                            </button>
                        </div>

                        <div className="p-5">
                            {cartItems.length === 0 ? (
                                <div className="text-center py-8">
                                    <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                                        <FaShoppingBag size={24} />
                                    </div>
                                    <p className="text-gray-500 font-medium">Your cart is empty.</p>
                                    <button onClick={() => setIsOpen(false)} className="mt-4 text-primary text-sm font-semibold hover:underline">Start Shopping</button>
                                </div>
                            ) : (
                                <ul className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                                    {cartItems.map(item => (
                                        <li key={item.id} className="flex justify-between items-start group">
                                            <div>
                                                <h4 className="font-semibold text-gray-800 text-sm mb-1">{item.name}</h4>
                                                <div className="text-xs text-gray-500 bg-gray-100 inline-block px-2 py-1 rounded">
                                                    Rs.{item.price.toFixed(2)} x {item.quantity}
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end space-y-2">
                                                <span className="font-bold text-primary text-sm">Rs.{item.totalPrice.toFixed(2)}</span>
                                                <button
                                                    onClick={() => removeItemHandler(item.id)}
                                                    className="text-gray-300 hover:text-red-500 transition-colors p-1">
                                                    <FaTrash size={12} />
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {cartItems.length > 0 && (
                            <div className="p-5 bg-gray-50 border-t border-gray-100">
                                <div className="flex justify-between font-bold text-lg mb-4 text-gray-900">
                                    <span>Total</span>
                                    <span>Rs.{totalAmount.toFixed(2)}</span>
                                </div>
                                <button
                                    onClick={checkoutHandler}
                                    className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-bold transition shadow-lg shadow-green-200">
                                    Checkout
                                </button>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
