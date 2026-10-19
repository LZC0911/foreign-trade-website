"use client";

import { useEffect, useState } from 'react';
import AdminLayout from '../AdminLayout';
import { Search, ChevronLeft, ChevronRight, Download, Mail, Phone, Building } from 'lucide-react';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  message: string;
  page: string;
  created_at: string;
}

interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, pageSize: 20, total: 0, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const fetchCustomers = async (page = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/customers?page=${page}&pageSize=20`, { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setCustomers(data.customers);
        setPagination(data.pagination);
      } else {
        setError('Failed to load customers');
      }
    } catch {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Company', 'Country', 'Message', 'Page', 'Date'];
    const rows = customers.map((c) => [
      c.name,
      c.email,
      c.phone,
      c.company,
      c.country,
      c.message.replace(/"/g, '""'),
      c.page,
      c.created_at,
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `customers_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading && customers.length === 0) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-[#c9a64a]">Loading customers...</div>
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

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#e8edf5]">Customer Inquiries</h1>
            <p className="text-[#8b95a7] text-sm mt-1">Manage and review customer messages</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={exportCSV}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wider uppercase text-[#c9a64a] border border-[#c9a64a]/30 hover:bg-[#c9a64a]/10 transition-colors"
            >
              <Download size={14} />
              Export CSV
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="card p-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8b95a7]" size={18} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, email, company, or country..."
              className="form-input pl-12"
            />
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="stat-card !p-4">
            <div className="text-[#8b95a7] text-xs uppercase tracking-wider mb-1">Total</div>
            <div className="text-2xl font-bold text-[#e8edf5]">{pagination.total}</div>
          </div>
          <div className="stat-card !p-4">
            <div className="text-[#8b95a7] text-xs uppercase tracking-wider mb-1">Countries</div>
            <div className="text-2xl font-bold text-[#e8edf5]">
              {new Set(customers.map((c) => c.country).filter(Boolean)).size}
            </div>
          </div>
          <div className="stat-card !p-4">
            <div className="text-[#8b95a7] text-xs uppercase tracking-wider mb-1">Companies</div>
            <div className="text-2xl font-bold text-[#e8edf5]">
              {customers.filter((c) => c.company).length}
            </div>
          </div>
          <div className="stat-card !p-4">
            <div className="text-[#8b95a7] text-xs uppercase tracking-wider mb-1">Current Page</div>
            <div className="text-2xl font-bold text-[#e8edf5]">
              {pagination.page} / {pagination.totalPages}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Company</th>
                  <th>Country</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-[#8b95a7]">
                      {searchTerm ? 'No matching customers found' : 'No customers yet'}
                    </td>
                  </tr>
                ) : (
                  filteredCustomers.map((customer) => (
                    <tr key={customer.id}>
                      <td className="text-[#8b95a7] text-sm">#{customer.id}</td>
                      <td className="font-medium">{customer.name}</td>
                      <td className="text-[#4a9eff]">{customer.email}</td>
                      <td>{customer.company || '—'}</td>
                      <td>
                        {customer.country ? (
                          <span className="px-2 py-1 bg-[#c9a64a]/10 text-[#c9a64a] text-xs rounded">
                            {customer.country}
                          </span>
                        ) : (
                          '—'
                        )}
                      </td>
                      <td className="text-[#8b95a7] text-sm">
                        {new Date(customer.created_at).toLocaleDateString()}
                      </td>
                      <td>
                        <button
                          onClick={() => setSelectedCustomer(customer)}
                          className="px-3 py-1 text-xs text-[#c9a64a] border border-[#c9a64a]/30 hover:bg-[#c9a64a]/10 transition-colors"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between p-4 border-t border-[#c9a64a]/10">
              <div className="text-[#8b95a7] text-sm">
                Showing {((pagination.page - 1) * pagination.pageSize) + 1} - {Math.min(pagination.page * pagination.pageSize, pagination.total)} of {pagination.total}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => fetchCustomers(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="p-2 text-[#c9a64a] border border-[#c9a64a]/30 hover:bg-[#c9a64a]/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                  .slice(Math.max(0, pagination.page - 3), Math.max(0, pagination.page - 3) + 5)
                  .map((page) => (
                    <button
                      key={page}
                      onClick={() => fetchCustomers(page)}
                      className={`px-3 py-2 text-sm transition-colors ${
                        pagination.page === page
                          ? 'bg-[#c9a64a] text-[#0a0f1a]'
                          : 'text-[#c9a64a] border border-[#c9a64a]/30 hover:bg-[#c9a64a]/10'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                <button
                  onClick={() => fetchCustomers(pagination.page + 1)}
                  disabled={pagination.page === pagination.totalPages}
                  className="p-2 text-[#c9a64a] border border-[#c9a64a]/30 hover:bg-[#c9a64a]/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Customer Detail Modal */}
        {selectedCustomer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" onClick={() => setSelectedCustomer(null)}>
            <div className="card max-w-2xl w-full max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-[#e8edf5]">{selectedCustomer.name}</h2>
                    <p className="text-[#8b95a7] text-sm">Inquiry #{selectedCustomer.id}</p>
                  </div>
                  <button onClick={() => setSelectedCustomer(null)} className="text-[#8b95a7] hover:text-[#e8edf5] text-2xl">
                    ×
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="text-[#c9a64a]" size={16} />
                      <a href={`mailto:${selectedCustomer.email}`} className="text-[#4a9eff] text-sm">
                        {selectedCustomer.email}
                      </a>
                    </div>
                    {selectedCustomer.phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="text-[#c9a64a]" size={16} />
                        <span className="text-[#e8edf5] text-sm">{selectedCustomer.phone}</span>
                      </div>
                    )}
                    {selectedCustomer.company && (
                      <div className="flex items-center gap-3">
                        <Building className="text-[#c9a64a]" size={16} />
                        <span className="text-[#e8edf5] text-sm">{selectedCustomer.company}</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    {selectedCustomer.country && (
                      <div>
                        <div className="text-[#c9a64a] text-xs uppercase tracking-wider mb-1">Country</div>
                        <div className="text-[#e8edf5]">{selectedCustomer.country}</div>
                      </div>
                    )}
                    <div>
                      <div className="text-[#c9a64a] text-xs uppercase tracking-wider mb-1">Submitted</div>
                      <div className="text-[#e8edf5]">{new Date(selectedCustomer.created_at).toLocaleString()}</div>
                    </div>
                    {selectedCustomer.page && (
                      <div>
                        <div className="text-[#c9a64a] text-xs uppercase tracking-wider mb-1">Source Page</div>
                        <div className="text-[#e8edf5]">{selectedCustomer.page}</div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t border-[#c9a64a]/10 pt-6">
                  <div className="text-[#c9a64a] text-xs uppercase tracking-wider mb-3">Message</div>
                  <p className="text-[#e8edf5] leading-relaxed whitespace-pre-wrap">{selectedCustomer.message}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
