import React, { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { ArrowLeft, BarChart3, MessageSquare, Calendar, Users, Settings, Plus, Edit, Trash2, Home, Heart, Scale, Briefcase, GraduationCap, UtensilsCrossed, Languages } from 'lucide-react';

interface AdminProps {
  onClose: () => void;
}

interface Service {
  id: string;
  name: string;
  category: string;
  address: string;
  phone: string;
  hours: string;
  description: string;
  isOpen: boolean;
  distance: number;
}

interface Stats {
  totalUsers: number;
  totalMessages: number;
  totalAppointments: number;
  totalConversations: number;
  totalServices: number;
}

export default function Admin({ onClose }: AdminProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'services' | 'conversations' | 'appointments' | 'users'>('dashboard');
  const [services, setServices] = useState<Service[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalMessages: 0,
    totalAppointments: 0,
    totalConversations: 0,
    totalServices: 0
  });
  const [showAddService, setShowAddService] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  // Form state for adding/editing services
  const [formData, setFormData] = useState({
    name: '',
    category: 'housing',
    address: '',
    phone: '',
    hours: '',
    description: '',
    isOpen: true,
    distance: 0
  });

  const categories = [
    { id: 'housing', label: 'Housing', icon: Home },
    { id: 'healthcare', label: 'Healthcare', icon: Heart },
    { id: 'legal', label: 'Legal', icon: Scale },
    { id: 'employment', label: 'Employment', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'food', label: 'Food', icon: UtensilsCrossed },
    { id: 'language', label: 'Language', icon: Languages }
  ];

  // Load stats and data
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load services
        const servicesSnap = await getDocs(collection(db, 'services'));
        const servicesList: Service[] = [];
        servicesSnap.forEach(doc => {
          servicesList.push({ id: doc.id, ...doc.data() } as Service);
        });
        setServices(servicesList);

        // Load stats
        const messagesSnap = await getDocs(collection(db, 'messages'));
        const appointmentsSnap = await getDocs(collection(db, 'appointments'));
        const conversationsSnap = await getDocs(collection(db, 'conversations'));
        const usersSnap = await getDocs(collection(db, 'users'));

        setStats({
          totalUsers: usersSnap.size,
          totalMessages: messagesSnap.size,
          totalAppointments: appointmentsSnap.size,
          totalConversations: conversationsSnap.size,
          totalServices: servicesList.length
        });

        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingService) {
        // Update existing service
        const serviceRef = doc(db, 'services', editingService.id);
        await updateDoc(serviceRef, {
          ...formData,
          updatedAt: serverTimestamp()
        });
      } else {
        // Add new service
        await addDoc(collection(db, 'services'), {
          ...formData,
          createdAt: serverTimestamp()
        });
      }

      // Reset form
      setFormData({
        name: '',
        category: 'housing',
        address: '',
        phone: '',
        hours: '',
        description: '',
        isOpen: true,
        distance: 0
      });
      setShowAddService(false);
      setEditingService(null);

      // Reload services
      const servicesSnap = await getDocs(collection(db, 'services'));
      const servicesList: Service[] = [];
      servicesSnap.forEach(doc => {
        servicesList.push({ id: doc.id, ...doc.data() } as Service);
      });
      setServices(servicesList);
    } catch (error) {
      console.error('Error saving service:', error);
      alert('Failed to save service');
    }
  };

  // Delete service
  const handleDeleteService = async (serviceId: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      await deleteDoc(doc(db, 'services', serviceId));
      setServices(services.filter(s => s.id !== serviceId));
    } catch (error) {
      console.error('Error deleting service:', error);
      alert('Failed to delete service');
    }
  };

  // Edit service
  const handleEditService = (service: Service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      category: service.category,
      address: service.address,
      phone: service.phone,
      hours: service.hours,
      description: service.description,
      isOpen: service.isOpen,
      distance: service.distance
    });
    setShowAddService(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4" style={{ borderColor: '#2a9df4' }}></div>
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="text-gray-600 hover:bg-gray-100 p-2 rounded-lg">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <Settings className="w-6 h-6" style={{ color: '#2a9df4' }} />
              <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 flex gap-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`pb-3 px-2 border-b-2 transition-all ${
              activeTab === 'dashboard' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'
            }`}
          >
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="font-medium">Dashboard</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`pb-3 px-2 border-b-2 transition-all ${
              activeTab === 'services' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'
            }`}
          >
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span className="font-medium">Services</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('conversations')}
            className={`pb-3 px-2 border-b-2 transition-all ${
              activeTab === 'conversations' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'
            }`}
          >
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span className="font-medium">Messages</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            className={`pb-3 px-2 border-b-2 transition-all ${
              activeTab === 'appointments' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'
            }`}
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="font-medium">Appointments</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`pb-3 px-2 border-b-2 transition-all ${
              activeTab === 'users' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'
            }`}
          >
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="font-medium">Users</span>
            </div>
          </button>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Overview</h2>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{ borderColor: '#2a9df4' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Services</p>
                    <p className="text-3xl font-bold text-gray-800 mt-1">{stats.totalServices}</p>
                  </div>
                  <Settings className="w-12 h-12 text-blue-200" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{ borderColor: '#10b981' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Messages</p>
                    <p className="text-3xl font-bold text-gray-800 mt-1">{stats.totalMessages}</p>
                  </div>
                  <MessageSquare className="w-12 h-12 text-green-200" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{ borderColor: '#f59e0b' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Appointments</p>
                    <p className="text-3xl font-bold text-gray-800 mt-1">{stats.totalAppointments}</p>
                  </div>
                  <Calendar className="w-12 h-12 text-amber-200" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{ borderColor: '#8b5cf6' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Active Conversations</p>
                    <p className="text-3xl font-bold text-gray-800 mt-1">{stats.totalConversations}</p>
                  </div>
                  <MessageSquare className="w-12 h-12 text-purple-200" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{ borderColor: '#ec4899' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Users</p>
                    <p className="text-3xl font-bold text-gray-800 mt-1">{stats.totalUsers}</p>
                  </div>
                  <Users className="w-12 h-12 text-pink-200" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{ borderColor: '#06b6d4' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Engagement Rate</p>
                    <p className="text-3xl font-bold text-gray-800 mt-1">
                      {stats.totalUsers > 0 ? Math.round((stats.totalMessages / stats.totalUsers) * 100) / 100 : 0}
                    </p>
                  </div>
                  <BarChart3 className="w-12 h-12 text-cyan-200" />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button
                  onClick={() => {
                    setActiveTab('services');
                    setShowAddService(true);
                  }}
                  className="p-4 rounded-lg text-white font-medium transition-all hover:opacity-90"
                  style={{ background: '#2a9df4' }}
                >
                  <Plus className="w-5 h-5 mx-auto mb-2" />
                  Add Service
                </button>
                <button
                  onClick={() => setActiveTab('conversations')}
                  className="p-4 rounded-lg bg-green-600 text-white font-medium transition-all hover:opacity-90"
                >
                  <MessageSquare className="w-5 h-5 mx-auto mb-2" />
                  View Messages
                </button>
                <button
                  onClick={() => setActiveTab('appointments')}
                  className="p-4 rounded-lg bg-amber-600 text-white font-medium transition-all hover:opacity-90"
                >
                  <Calendar className="w-5 h-5 mx-auto mb-2" />
                  Appointments
                </button>
                <button
                  onClick={() => setActiveTab('users')}
                  className="p-4 rounded-lg bg-purple-600 text-white font-medium transition-all hover:opacity-90"
                >
                  <Users className="w-5 h-5 mx-auto mb-2" />
                  Manage Users
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Service Management</h2>
              {!showAddService && (
                <button
                  onClick={() => setShowAddService(true)}
                  className="px-4 py-2 rounded-lg text-white font-medium flex items-center gap-2"
                  style={{ background: '#2a9df4' }}
                >
                  <Plus className="w-5 h-5" />
                  Add Service
                </button>
              )}
            </div>

            {/* Add/Edit Service Form */}
            {showAddService && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {editingService ? 'Edit Service' : 'Add New Service'}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Hours</label>
                      <input
                        type="text"
                        value={formData.hours}
                        onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                        placeholder="Mon-Fri: 9AM-5PM"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Distance (miles)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={formData.distance}
                        onChange={(e) => setFormData({ ...formData, distance: parseFloat(e.target.value) })}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex items-center">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.isOpen}
                          onChange={(e) => setFormData({ ...formData, isOpen: e.target.checked })}
                          className="w-4 h-4"
                        />
                        <span className="text-sm font-medium text-gray-700">Currently Open</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-lg text-white font-medium"
                      style={{ background: '#2a9df4' }}
                    >
                      {editingService ? 'Update Service' : 'Add Service'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddService(false);
                        setEditingService(null);
                        setFormData({
                          name: '',
                          category: 'housing',
                          address: '',
                          phone: '',
                          hours: '',
                          description: '',
                          isOpen: true,
                          distance: 0
                        });
                      }}
                      className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Services List */}
            <div className="space-y-4">
              {services.map(service => (
                <div key={service.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">{service.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">{service.category}</p>
                      <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <span>📍 {service.address}</span>
                        <span>📞 {service.phone}</span>
                        <span>🕐 {service.hours}</span>
                        <span>📏 {service.distance} mi</span>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEditService(service)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteService(service.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other tabs placeholder */}
        {activeTab === 'conversations' && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Conversations Monitor</h3>
            <p className="text-gray-400">View and moderate all conversations (Coming in full version)</p>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Appointments Overview</h3>
            <p className="text-gray-400">Manage all appointments (Coming in full version)</p>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">User Management</h3>
            <p className="text-gray-400">View and manage users (Coming in full version)</p>
          </div>
        )}
      </div>
    </div>
  );
}