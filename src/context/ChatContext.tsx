import React, { createContext, useContext, useState, useCallback } from 'react';
import { MessageType, ProductType } from '../types';
import { v4 as uuidv4 } from '../utils/mockUuid';
import { getFormattedTime } from '../utils/dateUtils';
import { sendChatMessage } from '../services/chatService';

interface ChatContextType {
  messages: MessageType[];
  sendMessage: (text: string) => void;
  isTyping: boolean;
  cartItems: Record<number, number>;
  addToCart: (productId: number) => void;
  updateCartQuantity: (productId: number, quantity: number) => void;
  products: ProductType[];
}

const ChatContext = createContext<ChatContextType>({
  messages: [],
  sendMessage: () => {},
  isTyping: false,
  cartItems: {},
  addToCart: () => {},
  updateCartQuantity: () => {},
  products: [],
});

export const useChat = () => useContext(ChatContext);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [cartItems, setCartItems] = useState<Record<number, number>>(() => {
    const saved = localStorage.getItem('cartItems');
    return saved ? JSON.parse(saved) : {};
  });

  const [products, setProducts] = useState<ProductType[]>([]);

  const updateCartQuantity = useCallback((productId: number, quantity: number) => {
    setCartItems(prev => {
      const updated = {
        ...prev,
        [productId]: quantity
      };
      
      // Remove item if quantity is 0
      if (quantity === 0) {
        delete updated[productId];
      }
      
      localStorage.setItem('cartItems', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const addToCart = useCallback((productId: number) => {
    updateCartQuantity(productId, (cartItems[productId] || 0) + 1);
  }, [cartItems, updateCartQuantity]);

  const sendMessage = useCallback(async (text: string) => {
    const newMessage: MessageType = {
      id: uuidv4(),
      text,
      sender: 'user',
      time: getFormattedTime(),
    };
    
    setMessages(prev => [...prev, newMessage]);
    setIsTyping(true);
    
    try {
      const response = await sendChatMessage(text);
      const botMessage: MessageType = {
        id: uuidv4(),
        text: response.text,
        sender: 'bot',
        time: getFormattedTime(),
        products: response.products,
        suggestions: response.suggestions,
      };
      
      // Update products if they are included in the response
      if (response.products) {
        setProducts(prevProducts => {
          const newProducts = [...prevProducts];
          response.products?.forEach(product => {
            const existingProductIndex = newProducts.findIndex(p => p.id === product.id);
            if (existingProductIndex === -1) {
              newProducts.push(product);
            } else {
              newProducts[existingProductIndex] = product;
            }
          });
          return newProducts;
        });
      }
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: MessageType = {
        id: uuidv4(),
        text: "I'm sorry, I couldn't process your message. Please try again.",
        sender: 'bot',
        time: getFormattedTime(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }, []);

  return (
    <ChatContext.Provider value={{ 
      messages, 
      sendMessage, 
      isTyping, 
      cartItems, 
      addToCart,
      updateCartQuantity,
      products
    }}>
      {children}
    </ChatContext.Provider>
  );
};