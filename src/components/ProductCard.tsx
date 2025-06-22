import React, { useState } from 'react';
import { ProductType } from '../types';
import { useChat } from '../context/ChatContext';
import { Minus, Plus, ShoppingCart, X, Star, Shield, Truck, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductCardProps {
  product: ProductType;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { cartItems, updateCartQuantity } = useChat();
  const [showDetails, setShowDetails] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
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
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-lg 
                bg-white rounded-3xl shadow-2xl z-50 overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="relative bg-gradient-to-r from-pink-50 to-purple-50 px-6 py-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDetails(false);
                  }}
                  className="absolute right-4 top-4 p-2 hover:bg-white/80 rounded-full transition-colors z-10 shadow-sm"
                >
                  <X size={20} className="text-gray-600" />
                </button>
                
                <div className="pr-12">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{product.title}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-pink-500">${product.price}</span>
                    <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                      product.in_stock 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {product.in_stock ? 'In Stock' : 'Out of Stock'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                {/* Product Image */}
                <div className="relative bg-gray-50 aspect-square">
                  <img 
                    src={product.image_url} 
                    alt={product.title}
                    className={`w-full h-full object-contain transition-opacity duration-300 ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => setImageLoaded(true)}
                  />
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-pink-300 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  
                  {/* Floating badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-xs font-medium text-gray-700">4.8</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-6 space-y-6">
                  {/* Description */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                      <Shield className="w-5 h-5 text-green-500" />
                      <div>
                        <div className="text-xs font-medium text-green-700">Safe & Tested</div>
                        <div className="text-xs text-green-600">Quality assured</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                      <Truck className="w-5 h-5 text-blue-500" />
                      <div>
                        <div className="text-xs font-medium text-blue-700">Fast Delivery</div>
                        <div className="text-xs text-blue-600">2-3 business days</div>
                      </div>
                    </div>
                  </div>

                  {/* Reviews Preview */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">Customer Reviews</h4>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                        <span className="text-sm text-gray-600 ml-1">(127)</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 italic">
                      "Great quality product, exactly what I needed. Fast shipping and excellent packaging!"
                    </p>
                    <div className="text-xs text-gray-500 mt-2">- Sarah M., Verified Purchase</div>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="border-t border-gray-100 p-6 bg-white">
                <div className="flex items-center gap-4">
                  {/* Quantity Selector */}
                  <div className="flex items-center bg-gray-100 rounded-xl p-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuantityChange(quantity - 1);
                      }}
                      className="w-10 h-10 rounded-lg text-gray-500 flex items-center justify-center
                        hover:bg-white hover:text-pink-500 transition-all disabled:opacity-50 disabled:hover:bg-gray-100 disabled:hover:text-gray-500"
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
                      className="w-10 h-10 rounded-lg text-gray-500 flex items-center justify-center
                        hover:bg-white hover:text-pink-500 transition-all disabled:opacity-50"
                      disabled={!product.in_stock}
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (quantity === 0) {
                        handleQuantityChange(1);
                      }
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 h-12 px-6 rounded-xl 
                      text-sm font-semibold transition-all duration-200 shadow-sm ${
                        quantity > 0
                          ? 'bg-green-500 text-white hover:bg-green-600'
                          : 'bg-gradient-to-r from-pink-400 to-pink-500 text-white hover:from-pink-500 hover:to-pink-600 hover:shadow-md'
                      }`}
                    disabled={!product.in_stock}
                  >
                    {quantity > 0 ? (
                      <>
                        <Heart className="w-4 h-4" />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={16} />
                        Add to Cart
                      </>
                    )}
                  </button>
                </div>

                {/* Additional Info */}
                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500">
                    Free shipping on orders over $25 • 30-day return policy
                  </p>
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