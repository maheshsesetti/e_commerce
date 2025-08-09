import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, FolderPlus } from 'lucide-react';

// Mock data
const categories = [
  {
    id: '1',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Electronic devices and gadgets',
    status: 'active',
    productsCount: 45,
    subcategories: [
      { id: '1a', name: 'Smartphones', productsCount: 15 },
      { id: '1b', name: 'Laptops', productsCount: 20 },
      { id: '1c', name: 'Accessories', productsCount: 10 },
    ],
  },
  {
    id: '2',
    name: 'Clothing',
    slug: 'clothing',
    description: 'Fashion and apparel',
    status: 'active',
    productsCount: 120,
    subcategories: [
      { id: '2a', name: 'Men', productsCount: 50 },
      { id: '2b', name: 'Women', productsCount: 60 },
      { id: '2c', name: 'Kids', productsCount: 10 },
    ],
  },
  {
    id: '3',
    name: 'Home & Garden',
    slug: 'home-garden',
    description: 'Home improvement and garden supplies',
    status: 'active',
    productsCount: 35,
    subcategories: [],
  },
];

const statusColors = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-red-100 text-red-800',
};

const Categories: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-600">Organize your products with categories and subcategories</p>
        </div>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Categories List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="divide-y divide-gray-200">
          {categories.map((category) => (
            <div key={category.id}>
              {/* Main Category */}
              <div className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <button
                        onClick={() => toggleCategory(category.id)}
                        className="mr-3 p-1 hover:bg-gray-200 rounded"
                      >
                        <svg
                          className={`w-4 h-4 transition-transform ${
                            expandedCategories.includes(category.id) ? 'rotate-90' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
                        <p className="text-sm text-gray-500">{category.description}</p>
                        <div className="flex items-center mt-1 space-x-4">
                          <span className="text-sm text-gray-500">
                            {category.productsCount} products
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              statusColors[category.status as keyof typeof statusColors]
                            }`}
                          >
                            {category.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                      <FolderPlus className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Subcategories */}
              {expandedCategories.includes(category.id) && category.subcategories.length > 0 && (
                <div className="bg-gray-50 px-6 py-4">
                  <div className="space-y-3">
                    {category.subcategories.map((subcategory) => (
                      <div key={subcategory.id} className="flex items-center justify-between pl-8">
                        <div>
                          <h4 className="font-medium text-gray-800">{subcategory.name}</h4>
                          <span className="text-sm text-gray-500">
                            {subcategory.productsCount} products
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded">
                            <Edit className="w-3 h-3" />
                          </button>
                          <button className="p-1 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;