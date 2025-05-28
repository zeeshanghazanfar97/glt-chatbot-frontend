import React, { useState } from 'react';
import { ProductType } from '../types';
import { useChat } from '../context/ChatContext';
import { Minus, Plus, ShoppingCart, X } from 'lucide-react';
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
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md 
                bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">{product.title}</h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDetails(false);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              {/* Content */}
              <div className="max-h-[calc(90vh-8rem)] overflow-y-auto">
                <div className="relative aspect-square bg-gray-50">
                  <img 
                    src={product.image_url} 
                    alt={product.title}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute bottom-4 right-4">
                    <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${
                      product.in_stock 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {product.in_stock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {product.description}
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center bg-gray-100 rounded-xl p-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuantityChange(quantity - 1);
                        }}
                        className="w-8 h-8 rounded-lg text-gray-500 flex items-center justify-center
                          hover:bg-white hover:text-pink-500 transition-all disabled:opacity-50"
                        disabled={quantity === 0}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-12 text-center text-sm font-medium text-gray-900">
                        {quantity}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuantityChange(quantity + 1);
                        }}
                        className="w-8 h-8 rounded-lg text-gray-500 flex items-center justify-center
                          hover:bg-white hover:text-pink-500 transition-all disabled:opacity-50"
                        disabled={!product.in_stock}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (quantity === 0) {
                          handleQuantityChange(1);
                        }
                      }}
                      className={`flex-grow flex items-center justify-center gap-2 h-10 px-6 rounded-xl 
                        text-sm font-medium transition-all duration-200 ${
                          quantity > 0
                            ? 'bg-green-500 text-white'
                            : 'bg-gradient-to-r from-pink-400 to-pink-500 text-white hover:from-pink-500 hover:to-pink-600'
                        }`}
                      disabled={!product.in_stock}
                    >
                      {quantity > 0 ? (
                        'Added to Cart'
                      ) : (
                        <>
                          <ShoppingCart size={16} />
                          Add to Cart
                        </>
                      )}
                    </button>
                  </div>
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