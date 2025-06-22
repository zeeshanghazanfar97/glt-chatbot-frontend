import React, { useState, useEffect } from 'react';
import { ShoppingBag, Package, Loader, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import authService from '../services/authService';
import { ProductType } from '../types';

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const tokens = authService.getTokens();
        if (!tokens?.access) throw new Error('Not authenticated');

        const response = await axios.get('https://api.girlzlovetech.org/api/products/', {
          headers: {
            Authorization: `Bearer ${tokens.access}`,
          },
        });

        setProducts(response.data);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.detail || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex items-center justify-center">
        <div className="flex items-center gap-3 text-pink-500">
          <Loader className="w-6 h-6 animate-spin" />
          <span className="font-medium">Loading products...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header with Back Button */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate('/app')}
              className="p-2 hover:bg-pink-50 rounded-full transition-colors text-pink-500 hover:text-pink-600"
              aria-label="Back to chat"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">Add-On Products</h1>
          </div>
          
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <p className="text-red-600">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/app')}
            className="p-2 hover:bg-pink-50 rounded-full transition-colors text-pink-500 hover:text-pink-600"
            aria-label="Back to chat"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Add-On Products</h1>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-pink-400 to-pink-500 rounded-2xl shadow-lg text-white mb-6">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Curated Product Selection</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our curated selection of high-quality hygiene and wellness products, 
            designed to support your personal care journey.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div 
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-pink-100"
            >
              <div className="aspect-square overflow-hidden bg-gray-50">
                <img 
                  src={product.image_url} 
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 text-lg mb-2">
                  {product.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-pink-500">
                    ${product.price}
                  </span>
                  <button 
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-400 to-pink-500 
                      text-white px-4 py-2 rounded-lg hover:from-pink-500 hover:to-pink-600 
                      transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    <Package className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No products available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;