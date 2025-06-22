import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useChat } from '../context/ChatContext';

interface CartIconProps {
  onClick: () => void;
}

const CartIcon: React.FC<CartIconProps> = ({ onClick }) => {
  const { cartItems } = useChat();
  
  const totalItems = Object.values(cartItems).reduce((sum, quantity) => sum + quantity, 0);

  return (
    <button
      onClick={onClick}
      className="relative p-2 hover:bg-white/20 rounded-full transition-colors"
      aria-label="View cart"
    >
      <ShoppingCart size={20} className="text-white" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </button>
  );
};

export default CartIcon;