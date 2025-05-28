import React, { useState } from 'react';
import { ProductType } from '../types';
import { useChat } from '../context/ChatContext';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductCardProps {
  product: ProductType;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { cartItems, updateCartQuantity } = useChat();
  const [showDetails, setShowDetails] = useState(false);
  const quantity = cartItems[product.id] || 0;

  const handleQuantityChange = (newQuantity: number) => {
    updateCartQuantity(product.id, Math.max(0, newQuantity));
  };

  return (
    <div className="relative">
      <motion.div
        className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer 
          overflow-hidden border border-pink-100"
        whileHover={{ y: -1 }}
        onClick={() => setShowDetails(true)}
      >
        <div className="aspect-square overflow-hidden">
          <img 
            src={product.image_url} 
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-2">
          <h3 className="text-xs font-medium text-gray-900 line-clamp-1">{product.title}</h3>
          <p className="text-xs text-pink-500 font-semibold">${product.price}</p>
        </div>
      </motion.div>

      <AnimatePresence>
        {showDetails && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setShowDetails(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md 
                bg-white rounded-2xl shadow-2xl z-50 overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className="relative">
                <div className="aspect-square">
                  <img 
                    src={product.image_url} 
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDetails(false);
                  }}
                  className="absolute top-4 right-4 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full 
                    flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-bold text-pink-500">${product.price}</span>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    product.in_stock 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {product.in_stock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuantityChange(quantity - 1);
                      }}
                      className="w-7 h-7 rounded-full bg-pink-100 text-pink-500 flex items-center 
                        justify-center hover:bg-pink-200 transition-colors"
                      disabled={quantity === 0}
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-6 text-center text-sm font-medium">{quantity}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuantityChange(quantity + 1);
                      }}
                      className="w-7 h-7 rounded-full bg-pink-100 text-pink-500 flex items-center 
                        justify-center hover:bg-pink-200 transition-colors"
                      disabled={!product.in_stock}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (quantity === 0) {
                        handleQuantityChange(1);
                      }
                    }}
                    className={`flex-grow flex items-center justify-center gap-2 py-2 px-4 rounded-xl 
                      text-sm font-medium transition-all duration-200 ${
                        quantity > 0
                          ? 'bg-green-500 text-white'
                          : 'bg-pink-500 text-white hover:bg-pink-600'
                      }`}
                    disabled={!product.in_stock}
                  >
                    {quantity > 0 ? (
                      <>Added to Cart</>
                    ) : (
                      <>
                        <ShoppingCart size={16} />
                        Add to Cart
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductCard;