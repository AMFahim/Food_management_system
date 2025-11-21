'use client';
import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Utensils, 
  MessageCircle, 
  BarChart3, 
  TrendingUp, 
  ArrowUp, 
  ArrowDown,
  LayoutDashboard,
  Upload,
  Settings,
  Menu,
  X,
  LogOut,
  User
} from 'lucide-react';

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState({
    userCount: 0,
    foodItemsCount: 0,
    adviceCount: 0,
    consumptionCount: 0
  });
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock data for demonstration
  const mockData = {
    userCount: 1247,
    foodItemsCount: 856,
    adviceCount: 342,
    consumptionCount: 2894
  };

  // Growth percentages for trend indicators
  const trends = {
    userCount: 12.5,
    foodItemsCount: 8.3,
    adviceCount: 15.7,
    consumptionCount: 23.1
  };

  useEffect(() => {
    // Simulate API fetch
    const fetchData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAnalytics(mockData);
      setLoading(false);
    };

    fetchData();
  }, []);

  const StatCard = ({ title, value, icon: Icon, trend, loading }) => (
    <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          {loading ? (
            <div className="h-8 w-20 bg-gray-200 rounded-lg animate-pulse"></div>
          ) : (
            <p className="text-3xl font-bold text-gray-900">{value.toLocaleString()}</p>
          )}
          <div className="flex items-center gap-1 mt-2">
            {trend > 0 ? (
              <ArrowUp className="w-4 h-4 text-green-500" />
            ) : (
              <ArrowDown className="w-4 h-4 text-red-500" />
            )}
            <span className={`text-sm font-medium ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend > 0 ? '+' : ''}{trend}%
            </span>
            <span className="text-sm text-gray-500">from last month</span>
          </div>
        </div>
        <div className="p-3 bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl">
          <Icon className="w-6 h-6 text-emerald-600" />
        </div>
      </div>
    </div>
  );

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: Users, label: 'Users' },
    { icon: Utensils, label: 'Food Items' },
    { icon: MessageCircle, label: 'Advice' },
    { icon: BarChart3, label: 'Consumption' },
    { icon: Upload, label: 'Uploads' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-cyan-50">
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-white shadow-xl border-r border-emerald-100
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Sidebar Header */}
        <div className="p-6 border-b border-emerald-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">HealthTrack</h1>
              <p className="text-sm text-gray-500">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200
                ${item.active 
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                  : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 hover:border hover:border-emerald-100'
                }
              `}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-emerald-100">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-emerald-100 lg:border-none">
          <div className="flex items-center justify-between p-4 lg:p-6">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-emerald-50 transition-colors"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-medium text-gray-900">Admin User</p>
                <p className="text-sm text-gray-500">Administrator</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">A</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Message */}
            <div className="mb-8">
              <p className="text-gray-600">Welcome back! Here's what's happening with your platform today.</p>
            </div>

            {/* Analytics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Total Users"
                value={analytics.userCount}
                icon={Users}
                trend={trends.userCount}
                loading={loading}
              />
              <StatCard
                title="Food Items"
                value={analytics.foodItemsCount}
                icon={Utensils}
                trend={trends.foodItemsCount}
                loading={loading}
              />
              <StatCard
                title="Health Advice"
                value={analytics.adviceCount}
                icon={MessageCircle}
                trend={trends.adviceCount}
                loading={loading}
              />
              <StatCard
                title="Consumption"
                value={analytics.consumptionCount}
                icon={BarChart3}
                trend={trends.consumptionCount}
                loading={loading}
              />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Recent Activity */}
              <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="space-y-4">
                  {[
                    { action: 'New user registration', count: 23, time: '2 hours ago' },
                    { action: 'Food items added', count: 15, time: '5 hours ago' },
                    { action: 'Health advice published', count: 8, time: '1 day ago' },
                    { action: 'Consumption logged', count: 142, time: '2 days ago' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 hover:bg-emerald-50 rounded-lg transition-colors">
                      <div>
                        <p className="font-medium text-gray-900">{item.action}</p>
                        <p className="text-sm text-gray-500">{item.time}</p>
                      </div>
                      <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-sm font-medium">
                        +{item.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Platform Health</h2>
                  <BarChart3 className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="space-y-4">
                  {[
                    { metric: 'Active Users Today', value: '1,042', change: '+5.2%' },
                    { metric: 'New Food Items This Week', value: '89', change: '+12.1%' },
                    { metric: 'Advice Engagement Rate', value: '68%', change: '+8.3%' },
                    { metric: 'Avg. Daily Consumption', value: '324', change: '+15.7%' }
                  ].map((stat, index) => (
                    <div key={index} className="flex items-center justify-between p-3">
                      <span className="text-gray-600">{stat.metric}</span>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{stat.value}</p>
                        <p className="text-sm text-green-600">{stat.change}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* API Integration Status */}
            <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">API Endpoints Status</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 border border-emerald-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Inventory API</p>
                    <p className="text-sm text-gray-500 truncate">https://api.food.anasibnbelal.live/api/inventory/</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-600 font-medium">Live</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border border-emerald-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Food Items API</p>
                    <p className="text-sm text-gray-500 truncate">https://api.food.anasibnbelal.live/api/food-items/</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-600 font-medium">Live</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Note */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                Currently displaying mock data. Real API integration ready for implementation.
              </p>
            </div>
          </div>
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}