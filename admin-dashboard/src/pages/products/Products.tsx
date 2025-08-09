import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye, Upload } from 'lucide-react';

// Mock data
const products = [
  {
    id: '1',
    name: 'Wireless Headphones',
    sku: 'WH001',
    price: 99.99,
    stock: 45,
    category: 'Electronics',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
  },
  {
    id: '2',
    name: 'Cotton T-Shirt',
    sku: 'CT002',
    price: 19.99,
    stock: 120,
    category: 'Clothing',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop',
  },
  {
    id: '3',
    name: 'Coffee Maker',
    sku: 'CM003',
    price: 149.99,
    stock: 0,
    category: 'Home',
    status: 'inactive',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=100&h=100&fit=crop',
  },
];

const statusColors = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-red-100 text-red-800',
  draft: 'bg-yellow-100 text-yellow-800',
};

const Products: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600">Manage your product inventory</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center">
            <Upload className="w-4 h-4 mr-2" />
            Bulk Upload
          </button>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex space-x-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Home">Home</option>
            </select>
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Product</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">SKU</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Price</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Stock</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Category</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Status</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover mr-4"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">{product.name}</h3>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-700">{product.sku}</td>
                  <td className="py-4 px-6 text-gray-700">${product.price}</td>
                  <td className="py-4 px-6">
                    <span className={`font-medium ${product.stock === 0 ? 'text-red-600' : 'text-gray-900'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-700">{product.category}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        statusColors[product.status as keyof typeof statusColors]
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;