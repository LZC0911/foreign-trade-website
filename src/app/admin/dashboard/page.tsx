"use client";

import { useEffect, useState } from 'react';
import AdminLayout from '../AdminLayout';
import { Users, Eye, Globe, ShoppingCart, TrendingUp, MapPin, ArrowUp, ArrowDown } from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

interface Stats {
  totalVisits: number;
  todayVisits: number;
  totalCustomers: number;
  customersToday: number;
  visitsByCountry: { country: string; count: number }[];
  visitsByPage: { page: string; count: number }[];
  visitsLast7Days: { date: string; count: number }[];
  recentVisits: { id: number; ip: string; country: string; city: string; page: string; created_at: string }[];
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/stats', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats);
      } else {
        setError('Failed to load stats');
      }
    } catch {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-[#c9a64a]">Loading dashboard...</div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="text-red-400 text-center py-12">{error}</div>
      </AdminLayout>
    );
  }

  const countryChartData = {
    labels: stats?.visitsByCountry.map((c) => c.country) || [],
    datasets: [
      {
        label: 'Visits',
        data: stats?.visitsByCountry.map((c) => c.count) || [],
        backgroundColor: '#c9a64a',
        borderColor: '#a8883a',
        borderWidth: 1,
      },
    ],
  };

  const visitsTrendData = {
    labels: stats?.visitsLast7Days.map((d) => new Date(d.date).toLocaleDateString('en-US', { weekday: 'short' })) || [],
    datasets: [
      {
        label: 'Visits',
        data: stats?.visitsLast7Days.map((d) => d.count) || [],
        backgroundColor: 'rgba(74, 158, 255, 0.8)',
        borderColor: '#4a9eff',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { color: '#8b95a7' },
      },
      y: {
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { color: '#8b95a7' },
      },
    },
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Title */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#e8edf5]">Dashboard Overview</h1>
            <p className="text-[#8b95a7] text-sm mt-1">Real-time analytics and insights</p>
          </div>
          <button
            onClick={fetchStats}
            className="px-4 py-2 text-xs font-semibold tracking-wider uppercase text-[#c9a64a] border border-[#c9a64a]/30 hover:bg-[#c9a64a]/10 transition-colors"
          >
            Refresh
          </button>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="stat-card">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[#8b95a7] text-xs tracking-wider uppercase mb-2">Total Visits</div>
                <div className="text-3xl font-bold text-[#e8edf5]">{stats?.totalVisits?.toLocaleString()}</div>
                <div className="flex items-center gap-1 text-xs text-green-400 mt-2">
                  <ArrowUp size={12} />
                  <span>Today: {stats?.todayVisits}</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-[#4a9eff]/10 border border-[#4a9eff]/30 flex items-center justify-center">
                <Eye className="text-[#4a9eff]" size={22} />
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[#8b95a7] text-xs tracking-wider uppercase mb-2">Total Inquiries</div>
                <div className="text-3xl font-bold text-[#e8edf5]">{stats?.totalCustomers?.toLocaleString()}</div>
                <div className="flex items-center gap-1 text-xs text-green-400 mt-2">
                  <ArrowUp size={12} />
                  <span>Today: {stats?.customersToday}</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-[#c9a64a]/10 border border-[#c9a64a]/30 flex items-center justify-center">
                <Users className="text-[#c9a64a]" size={22} />
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[#8b95a7] text-xs tracking-wider uppercase mb-2">Countries</div>
                <div className="text-3xl font-bold text-[#e8edf5]">{stats?.visitsByCountry.length || 0}</div>
                <div className="text-xs text-[#8b95a7] mt-2">Unique locations</div>
              </div>
              <div className="w-12 h-12 bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                <Globe className="text-green-400" size={22} />
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[#8b95a7] text-xs tracking-wider uppercase mb-2">Pages Viewed</div>
                <div className="text-3xl font-bold text-[#e8edf5]">{stats?.visitsByPage.length || 0}</div>
                <div className="text-xs text-[#8b95a7] mt-2">Different pages</div>
              </div>
              <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
                <ShoppingCart className="text-purple-400" size={22} />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Country Chart */}
          <div className="card p-6">
            <h3 className="text-[#c9a64a] text-xs font-semibold tracking-[3px] uppercase mb-4">Top Countries</h3>
            <div className="h-64">
              <Bar data={countryChartData} options={chartOptions} />
            </div>
          </div>

          {/* 7-Day Trend */}
          <div className="card p-6">
            <h3 className="text-[#c9a64a] text-xs font-semibold tracking-[3px] uppercase mb-4">Visits (Last 7 Days)</h3>
            <div className="h-64">
              <Bar data={visitsTrendData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Page Popularity */}
          <div className="card p-6">
            <h3 className="text-[#c9a64a] text-xs font-semibold tracking-[3px] uppercase mb-4">Popular Pages</h3>
            <div className="space-y-3">
              {stats?.visitsByPage.slice(0, 6).map((page, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-[#c9a64a]/10 border border-[#c9a64a]/30 rounded text-[#c9a64a] text-xs flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span className="text-[#e8edf5] text-sm truncate max-w-[200px]">{page.page}</span>
                  </div>
                  <span className="text-[#8b95a7] text-sm">{page.count} views</span>
                </div>
              ))}
            </div>
          </div>

          {/* Country Breakdown */}
          <div className="card p-6">
            <h3 className="text-[#c9a64a] text-xs font-semibold tracking-[3px] uppercase mb-4">Country Breakdown</h3>
            <div className="space-y-3">
              {stats?.visitsByCountry.slice(0, 8).map((country, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[#e8edf5]">{country.country}</span>
                    <span className="text-[#8b95a7]">{country.count}</span>
                  </div>
                  <div className="h-1.5 bg-[#1b2838] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#c9a64a] to-[#e8c76a]"
                      style={{
                        width: `${(country.count / (stats?.visitsByCountry[0]?.count || 1)) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Visits */}
          <div className="card p-6">
            <h3 className="text-[#c9a64a] text-xs font-semibold tracking-[3px] uppercase mb-4">Recent Visits</h3>
            <div className="space-y-3 max-h-80 overflow-auto">
              {stats?.recentVisits.slice(0, 10).map((visit) => (
                <div key={visit.id} className="flex items-start gap-3 p-3 bg-[#0a0f1a]/50 rounded border border-white/5">
                  <MapPin className="text-[#c9a64a] flex-shrink-0 mt-1" size={14} />
                  <div className="flex-1 min-w-0">
                    <div className="text-[#e8edf5] text-sm truncate">{visit.country} — {visit.city}</div>
                    <div className="text-[#8b95a7] text-xs truncate">{visit.page}</div>
                    <div className="text-[#8b95a7] text-xs">{new Date(visit.created_at).toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
