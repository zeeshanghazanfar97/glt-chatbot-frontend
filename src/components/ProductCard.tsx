import React, { useState } from 'react';
import { ProductType } from '../types';
import { useChat } from '../context/ChatContext';
import { Minus, Plus, ShoppingCart, X, Star, Shield, Truck, Heart, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

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

  const ProductModal = () => (
    <AnimatePresence>
      {showDetails && createPortal(
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ backdropFilter: 'blur(8px)' }}
        >
          {/* Full-screen backdrop */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowDetails(false)}
          />
          
          {/* Modal content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 px-6 py-5">
              <button
                onClick={() => setShowDetails(false)}
                className="absolute right-4 top-4 p-2 bg-white/80 hover:bg-white rounded-full transition-all duration-200 shadow-sm hover:shadow-md z-10"
              >
                <X size={18} className="text-gray-600" />
              </button>
              
              <div className="pr-12">
                <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">{product.title}</h3>
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                    ${product.price}
                  </span>
                  <div className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                    product.in_stock 
                      ? 'bg-green-100 text-green-700 border border-green-200' 
                      : 'bg-red-100 text-red-700 border border-red-200'
                  }`}>
                    {product.in_stock ? '✓ In Stock' : '✗ Out of Stock'}
                  </div>
                </div>
              </div>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto">
              {/* Product Image */}
              <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 aspect-square">
                <img 
                  src={product.image_url} 
                  alt={product.title}
                  className={`w-full h-full object-contain transition-opacity duration-500 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                />
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-3 border-pink-300 border-t-pink-600 rounded-full animate-spin"></div>
                  </div>
                )}
                
                {/* Floating rating badge */}
                <div className="absolute top-4 left-4">
                  <div className="bg-white/95 backdrop-blur-sm rounded-full px-3 py-2 shadow-lg border border-white/20">
                    <div className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-semibold text-gray-800">4.8</span>
                      <span className="text-xs text-gray-500">(127)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="p-6 space-y-6">
                {/* Description */}
                <div>
                  <h4 className="font-bold text-gray-900 mb-3 text-lg">About This Product</h4>
                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Key Features */}
                <div>
                  <h4 className="font-bold text-gray-900 mb-3 text-lg">Why You'll Love It</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-100">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <Shield className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-green-800 text-sm">Safe & Tested</div>
                        <div className="text-green-600 text-xs">Dermatologist approved formula</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <Truck className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-blue-800 text-sm">Fast & Discreet</div>
                        <div className="text-blue-600 text-xs">Free shipping, private packaging</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Customer Review */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-5 border border-purple-100">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="font-semibold text-gray-800 text-sm">Verified Purchase</span>
                  </div>
                  <p className="text-gray-700 italic mb-3 leading-relaxed">
                    "Absolutely love this product! Great quality, exactly what I needed. The packaging was discreet and shipping was super fast. Highly recommend!"
                  </p>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Sarah M.</span> • 2 weeks ago
                  </div>
                </div>
              </div>
            </div>

            {/* Fixed footer with actions */}
            <div className="border-t border-gray-100 bg-white p-6">
              <div className="flex items-center gap-4 mb-4">
                {/* Quantity Selector */}
                <div className="flex items-center bg-gray-100 rounded-2xl p-1">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="w-10 h-10 rounded-xl text-gray-500 flex items-center justify-center
                      hover:bg-white hover:text-pink-500 transition-all disabled:opacity-50 disabled:hover:bg-gray-100 disabled:hover:text-gray-500"
                    disabled={quantity === 0}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center font-bold text-gray-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="w-10 h-10 rounded-xl text-gray-500 flex items-center justify-center
                      hover:bg-white hover:text-pink-500 transition-all disabled:opacity-50"
                    disabled={!product.in_stock}
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => {
                    if (quantity === 0) {
                      handleQuantityChange(1);
                    }
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 h-12 px-6 rounded-2xl 
                    font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] ${
                      quantity > 0
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                        : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700'
                    }`}
                  disabled={!product.in_stock}
                >
                  {quantity > 0 ? (
                    <>
                      <Check className="w-5 h-5" />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={18} />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>

              {/* Trust signals */}
              <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  <span>Secure checkout</span>
                </div>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <div className="flex items-center gap-1">
                  <Truck className="w-3 h-3" />
                  <span>Free shipping $25+</span>
                </div>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <div className="flex items-center gap-1">
                  <Heart className="w-3 h-3" />
                  <span>30-day returns</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>,
        document.body
      )}
    </AnimatePresence>
  );

  return (
    <>
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

      <ProductModal />
    </>
  );
};

export default ProductCard;