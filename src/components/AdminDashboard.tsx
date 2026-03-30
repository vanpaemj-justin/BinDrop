import { useEffect, useState } from 'react';
import { Order, Package as PackageType } from '../lib/database.types';
import { supabase } from '../lib/supabase';
import { ArrowLeft, Package, Calendar, MapPin, User, Mail, Phone } from 'lucide-react';

interface AdminDashboardProps {
  onBack: () => void;
}

type OrderWithPackage = Order & { packages: PackageType };

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'confirmed', label: 'Confirmed', color: 'bg-blue-100 text-blue-800' },
  { value: 'delivered', label: 'Delivered', color: 'bg-green-100 text-green-800' },
  { value: 'picked_up', label: 'Picked Up', color: 'bg-purple-100 text-purple-800' },
  { value: 'completed', label: 'Completed', color: 'bg-gray-100 text-gray-800' },
  { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800' },
];

export default function AdminDashboard({ onBack }: AdminDashboardProps) {
  const [orders, setOrders] = useState<OrderWithPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<OrderWithPackage | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*, packages(*)')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading orders:', error);
    } else {
      setOrders(data as OrderWithPackage[]);
    }
    setLoading(false);
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', orderId);

    if (error) {
      alert('Error updating order status');
      console.error(error);
    } else {
      loadOrders();
      if (selectedOrder?.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
    }
  };

  const getStatusColor = (status: string) => {
    return STATUS_OPTIONS.find((s) => s.value === status)?.color || 'bg-gray-100 text-gray-800';
  };

  const filteredOrders = filterStatus === 'all'
    ? orders
    : orders.filter((order) => order.status === filterStatus);

  if (selectedOrder) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setSelectedOrder(null)}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Orders</span>
              </button>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(selectedOrder.status)}`}>
                {STATUS_OPTIONS.find((s) => s.value === selectedOrder.status)?.label}
              </span>
            </div>

            <h2 className="text-3xl font-bold mb-8">Order Details</h2>

            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Package className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-lg">Package Information</h3>
                </div>
                <div className="space-y-2 text-gray-700">
                  <p><span className="font-medium">Package:</span> {selectedOrder.packages.name}</p>
                  <p><span className="font-medium">Number of Bins:</span> {selectedOrder.packages.num_totes}</p>
                  <p><span className="font-medium">Price:</span> ${selectedOrder.packages.price}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <h3 className="font-semibold text-lg">Dates</h3>
                </div>
                <div className="space-y-2 text-gray-700">
                  <p><span className="font-medium">Delivery Date:</span> {new Date(selectedOrder.delivery_date).toLocaleDateString()}</p>
                  <p><span className="font-medium">Pickup Date:</span> {new Date(selectedOrder.pickup_date).toLocaleDateString()}</p>
                  <p><span className="font-medium">Order Created:</span> {new Date(selectedOrder.created_at).toLocaleString()}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <User className="w-5 h-5 text-gray-600" />
                  <h3 className="font-semibold text-lg">Customer Information</h3>
                </div>
                <div className="space-y-2 text-gray-700">
                  <p className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{selectedOrder.customer_name}</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <a href={`mailto:${selectedOrder.customer_email}`} className="text-blue-600 hover:underline">
                      {selectedOrder.customer_email}
                    </a>
                  </p>
                  <p className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <a href={`tel:${selectedOrder.customer_phone}`} className="text-blue-600 hover:underline">
                      {selectedOrder.customer_phone}
                    </a>
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <MapPin className="w-5 h-5 text-gray-600" />
                  <h3 className="font-semibold text-lg">Addresses</h3>
                </div>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <p className="font-medium mb-1">Delivery Address:</p>
                    <p className="text-sm whitespace-pre-line">{selectedOrder.delivery_address}</p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Pickup Address:</p>
                    <p className="text-sm whitespace-pre-line">{selectedOrder.pickup_address}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-4">Update Order Status</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {STATUS_OPTIONS.map((status) => (
                    <button
                      key={status.value}
                      onClick={() => updateOrderStatus(selectedOrder.id, status.value)}
                      className={`px-4 py-3 rounded-lg font-medium transition-all ${
                        selectedOrder.status === status.value
                          ? status.color + ' ring-2 ring-offset-2 ring-blue-600'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {status.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Order Management</h2>
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-lg font-medium ${
                filterStatus === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Orders ({orders.length})
            </button>
            {STATUS_OPTIONS.map((status) => (
              <button
                key={status.value}
                onClick={() => setFilterStatus(status.value)}
                className={`px-4 py-2 rounded-lg font-medium ${
                  filterStatus === status.value
                    ? status.color + ' ring-2 ring-offset-2 ring-blue-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status.label} ({orders.filter((o) => o.status === status.value).length})
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-12 text-gray-500">Loading orders...</div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No orders found {filterStatus !== 'all' && `with status "${filterStatus}"`}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Package
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Delivery Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{order.customer_name}</div>
                          <div className="text-sm text-gray-500">{order.customer_email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{order.packages.name}</div>
                        <div className="text-sm text-gray-500">{order.packages.num_totes} bins</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(order.delivery_date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                          {STATUS_OPTIONS.find((s) => s.value === order.status)?.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-blue-600 hover:text-blue-900 font-medium"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
