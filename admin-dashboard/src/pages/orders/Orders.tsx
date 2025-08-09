import React, { useState } from 'react';
import { Search, Filter, Eye, Edit, RefreshCw } from 'lucide-react';

// Mock data
const orders = [
  {
    id: '#1234',
    customer: 'John Doe',
    email: 'john@example.com',
    total: 129.99,
    items: 3,
    status: 'completed',
    paymentStatus: 'paid',
    date: '2024-01-15',
  },
  {
    id: '#1235',
    customer: 'Jane Smith',
    email: 'jane@example.com',
    total: 79.50,
    items: 2,
    status: 'processing',
    paymentStatus: 'paid',
    date: '2024-01-15',
  },
  {
    id: '#1236',
    customer: 'Bob Johnson',
    email: 'bob@example.com',
    total: 199.99,
    items: 1,
    status: 'shipped',
    paymentStatus: 'paid',
    date: '2024-01-14',
  },
];

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  completed: 'bg-green-100 text-green-800',
};

const paymentStatusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  paid: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-800',
  refunded: 'bg-gray-100 text-gray-800',
};

const Orders: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600">Manage customer orders and track status</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex space-x-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Order ID</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Customer</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Items</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Total</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Status</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Payment</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Date</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6 font-medium text-gray-900">{order.id}</td>
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-medium text-gray-900">{order.customer}</div>
                      <div className="text-sm text-gray-500">{order.email}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-700">{order.items} items</td>
                  <td className="py-4 px-6 font-medium text-gray-900">${order.total}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        statusColors[order.status as keyof typeof statusColors]
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        paymentStatusColors[order.paymentStatus as keyof typeof paymentStatusColors]
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-700">{order.date}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg">
                        <RefreshCw className="w-4 h-4" />
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

export default Orders;