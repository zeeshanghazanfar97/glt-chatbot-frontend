import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { MessageType, ProductType } from '../types';
import { Bot, User, X, Plus, Minus } from 'lucide-react';
import { useChat } from '../context/ChatContext';
import { motion, AnimatePresence } from 'framer-motion';

interface MessageProps {
  message: MessageType;
}

interface ProductModalProps {
  product: ProductType;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { addToCart, cartItems, updateCartQuantity } = useChat();
  const [quantity, setQuantity] = useState(1);

  return (
    <motion.div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-white rounded-2xl max-w-md w-full p-6 relative shadow-xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>
        
        <img
          src={product.image_url}
          alt={product.title}
          className="w-full h-48 object-contain mb-6 rounded-lg bg-pink-50/50 p-4"
        />
        
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.title}</h3>
        <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-pink-500">${product.price}</span>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 rounded-full hover:bg-pink-50 text-pink-500"
            >
              <Minus size={16} />
            </button>
            <span className="font-medium text-gray-800 w-8 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 rounded-full hover:bg-pink-50 text-pink-500"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        <button
          onClick={() => {
            updateCartQuantity(product.id, quantity);
            onClose();
          }}
          className="w-full mt-6 bg-pink-500 text-white px-6 py-2.5 rounded-xl hover:bg-pink-600 
            transition-colors duration-200 font-medium shadow-sm hover:shadow-md
            disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={!product.in_stock}
        >
          {product.in_stock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </motion.div>
    </motion.div>
  );
};

const Message: React.FC<MessageProps> = ({ message }) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
  const { sendMessage } = useChat();
  const isBot = message.sender === 'bot';
  
  return (
    <>
      <div 
        className={`flex ${isBot ? 'justify-start' : 'justify-end'} 
          animate-messageAppear transition-all duration-300`}
      >
        <div 
          className={`flex max-w-[85%] ${isBot ? 'flex-row' : 'flex-row-reverse'} items-end`}
        >
          <div 
            className={`flex items-center justify-center w-8 h-8 rounded-full
              ${isBot ? 'bg-gradient-to-br from-pink-400 to-pink-500 text-white mr-2' : 
                'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 ml-2'}`}
          >
            {isBot ? <Bot size={16} /> : <User size={16} />}
          </div>
          <div 
            className={`rounded-2xl py-3 px-4 shadow-sm
              ${isBot 
                ? 'bg-white text-gray-800 rounded-tl-none prose prose-pink max-w-none' 
                : 'bg-gradient-to-br from-pink-500 to-pink-400 text-white rounded-tr-none'}`}
          >
            {isBot ? (
              <ReactMarkdown className="text-sm leading-relaxed">{message.text}</ReactMarkdown>
            ) : (
              <p className="text-sm">{message.text}</p>
            )}
            
            {message.suggestions && (
              <div className="mt-3 flex flex-wrap gap-2">
                {Object.entries(message.suggestions).map(([key, value]) => (
                  <button 
                    key={key}
                    onClick={() => sendMessage(value)}
                    className={`text-xs px-3 py-1.5 rounded-full font-medium
                      ${isBot 
                        ? 'bg-pink-500 text-white hover:bg-pink-600' 
                        : 'bg-white/20 text-white hover:bg-white/30'} 
                      transition-all duration-200 hover:shadow-md`}
                  >
                    {key}
                  </button>
                ))}
              </div>
            )}
            
            <span className="block text-right text-xs mt-1 opacity-70">
              {message.time}
            </span>
          </div>
        </div>
      </div>

      {message.products && (
        <div className="ml-12 mt-3 flex gap-3 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-pink-200 scrollbar-track-transparent">
          {message.products.map((product) => (
            <div
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="flex-shrink-0 w-52 bg-white rounded-xl p-3 shadow-sm hover:shadow-md 
                transition-all duration-200 cursor-pointer border border-pink-100/50 hover:border-pink-200"
            >
              <div className="bg-pink-50/50 rounded-lg p-2 mb-3">
                <img
                  src={product.image_url}
                  alt={product.title}
                  className="w-full h-28 object-contain"
                />
              </div>
              <h4 className="font-medium text-gray-800 text-sm truncate">{product.title}</h4>
              <div className="flex items-center justify-between mt-2">
                <span className="text-pink-500 font-bold">${product.price}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium
                  ${product.in_stock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {product.in_stock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Message;