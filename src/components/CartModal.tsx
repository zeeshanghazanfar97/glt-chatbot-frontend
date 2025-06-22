import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag, CreditCard, Loader } from 'lucide-react';
import { useChat } from '../context/ChatContext';
import authService from '../services/authService';
import axios from 'axios';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { cartItems, updateCartQuantity, products } = useChat();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const cartProducts = Object.entries(cartItems)
    .map(([productId, quantity]) => {
      const product = products.find(p => p.id === parseInt(productId));
      return product ? { ...product, quantity } : null;
    })
    .filter(Boolean);

  const totalAmount = cartProducts.reduce((sum, item) => {
    return sum + (parseFloat(item!.price) * item!.quantity);
  }, 0);

  const handleCheckout = async () => {
    if (cartProducts.length === 0) return;

    setIsCheckingOut(true);
    setCheckoutError(null);

    try {
      const tokens = authService.getTokens();
      if (!tokens?.access) throw new Error('Not authenticated');

      const orderData = {
        products: Object.entries(cartItems).map(([productId, quantity]) => ({
          product_id: parseInt(productId),
          quantity
        }))
      };

      const response = await axios.post(
        'https://api.girlzlovetech.org/api/orders/place/',
        orderData,
        {
          headers: {
            Authorization: `Bearer ${tokens.access}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Clear cart on successful order
      Object.keys(cartItems).forEach(productId => {
        updateCartQuantity(parseInt(productId), 0);
      });

      setCheckoutSuccess(true);
      
      // Auto close after 3 seconds
      setTimeout(() => {
        setCheckoutSuccess(false);
        onClose();
      }, 3000);

    } catch (error: any) {
      console.error('Checkout error:', error);
      setCheckoutError(
        error.response?.data?.detail || 
        error.response?.data?.message || 
        'Failed to place order. Please try again.'
      );
    } finally {
      setIsCheckingOut(false);
    }
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    updateCartQuantity(productId, Math.max(0, newQuantity));
  };

  const clearCart = () => {
    Object.keys(cartItems).forEach(productId => {
      updateCartQuantity(parseInt(productId), 0);
    });
  };

  if (checkoutSuccess) {
    return (
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={onClose}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  ✓
                </motion.div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Order Placed!</h3>
              <p className="text-gray-600 mb-6">
                Your order has been successfully placed. You'll receive a confirmation email shortly.
              </p>
              <button
                onClick={onClose}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all"
              >
                Continue Shopping
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-5 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-6 h-6" />
                  <div>
                    <h3 className="text-xl font-bold">Shopping Cart</h3>
                    <p className="text-white/80 text-sm">
                      {cartProducts.length} {cartProducts.length === 1 ? 'item' : 'items'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto">
              {cartProducts.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag className="w-8 h-8 text-gray-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h4>
                  <p className="text-gray-600 mb-6">Add some products to get started!</p>
                  <button
                    onClick={onClose}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="p-6 space-y-4">
                  {cartProducts.map((item) => (
                    <motion.div
                      key={item!.id}
                      layout
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl"
                    >
                      <img
                        src={item!.image_url}
                        alt={item!.title}
                        className="w-16 h-16 object-cover rounded-xl"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm mb-1">
                          {item!.title}
                        </h4>
                        <p className="text-pink-500 font-bold">${item!.price}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center bg-white rounded-xl border border-gray-200">
                          <button
                            onClick={() => handleQuantityChange(item!.id, item!.quantity - 1)}
                            className="p-2 hover:bg-gray-50 rounded-l-xl transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-3 py-2 font-semibold text-sm min-w-[40px] text-center">
                            {item!.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item!.id, item!.quantity + 1)}
                            className="p-2 hover:bg-gray-50 rounded-r-xl transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          onClick={() => handleQuantityChange(item!.id, 0)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartProducts.length > 0 && (
              <div className="border-t border-gray-100 p-6 bg-white">
                {/* Total */}
                <div className="flex items-center justify-between mb-4 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl">
                  <span className="text-lg font-bold text-gray-900">Total:</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>

                {checkoutError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-red-600 text-sm">{checkoutError}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-2xl font-bold text-lg hover:from-pink-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isCheckingOut ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5" />
                        Checkout Now
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={clearCart}
                    className="w-full bg-gray-100 text-gray-700 py-3 rounded-2xl font-semibold hover:bg-gray-200 transition-all"
                  >
                    Clear Cart
                  </button>
                </div>

                {/* Trust Signals */}
                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500">
                    🔒 Secure checkout • 📦 Free shipping on orders $25+ • 💝 30-day returns
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CartModal;