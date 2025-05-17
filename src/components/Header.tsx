import React, { useState } from 'react';
import { Heart, LogOut, ShoppingCart, X, Plus, Minus, Menu } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../context/ChatContext';
import { useNavigate } from 'react-router-dom';
import { ProductType } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: Record<number, number>;
  products: ProductType[];
  updateQuantity: (productId: number, quantity: number) => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, cartItems, products, updateQuantity }) => {
  if (!isOpen) return null;

  const cartProducts = products.filter(product => cartItems[product.id]);
  const total = cartProducts.reduce((sum, product) => sum + (parseFloat(product.price) * cartItems[product.id]), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-20 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="bg-white rounded-xl max-w-md w-full p-6 relative max-h-[80vh] overflow-y-auto"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Cart</h2>
            
            {cartProducts.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart size={48} className="mx-auto mb-4 text-gray-300" />
                <p className="text-gray-600">Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {cartProducts.map(product => (
                    <div key={product.id} className="flex items-start gap-4 border-b border-gray-100 pb-4">
                      <img
                        src={product.image_url}
                        alt={product.title}
                        className="w-20 h-20 object-contain rounded-lg bg-gray-50"
                      />
                      <div className="flex-grow">
                        <h3 className="font-medium text-gray-800">{product.title}</h3>
                        <p className="text-sm text-gray-500 mb-2">{product.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-pink-500 font-bold">${product.price}</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(product.id, Math.max(0, cartItems[product.id] - 1))}
                              className="p-1 rounded-full hover:bg-pink-50 text-pink-500"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="w-8 text-center font-medium">{cartItems[product.id]}</span>
                            <button
                              onClick={() => updateQuantity(product.id, cartItems[product.id] + 1)}
                              className="p-1 rounded-full hover:bg-pink-50 text-pink-500"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span className="text-pink-500">${total.toFixed(2)}</span>
                  </div>
                  <button
                    className="w-full mt-4 bg-pink-500 text-white py-3 px-4 rounded-lg hover:bg-pink-600 
                      transition-colors duration-200 font-medium"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { theme } = useTheme();
  const { logout } = useAuth();
  const { cartItems, updateCartQuantity, products } = useChat();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const totalItems = Object.values(cartItems).reduce((sum, quantity) => sum + quantity, 0);

  return (
    <header className="bg-gradient-to-r from-pink-500 to-pink-400 text-white p-4 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-white/20 rounded-full transition-colors lg:hidden"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <Heart className="text-white" size={24} fill="white" />
            <h1 className="text-xl font-bold">Girlz Love Tech</h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-xs bg-white/20 rounded-full px-3 py-1">
            Your Personal Guide
          </div>
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-pink-500 text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          <button
            onClick={handleLogout}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
      <p className="text-xs mt-2 text-pink-100">
        Ask me about wellness, tech, or future careers!
      </p>

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        products={products}
        updateQuantity={updateCartQuantity}
      />
    </header>
  );
};

export default Header;