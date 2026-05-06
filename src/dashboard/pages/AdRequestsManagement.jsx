import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { 
  Mail, 
  Phone, 
  Building2, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Trash2, 
  ExternalLink,
  Search,
  Filter
} from 'lucide-react';

const AdRequestsManagement = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('الكل');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ad_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (err) {
      console.error('Error fetching ad requests:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const { error } = await supabase
        .from('ad_requests')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      setRequests(requests.map(req => req.id === id ? { ...req, status: newStatus } : req));
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const deleteRequest = async (id) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا الطلب؟')) return;
    try {
      const { error } = await supabase
        .from('ad_requests')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setRequests(requests.filter(req => req.id !== id));
    } catch (err) {
      console.error('Error deleting request:', err);
    }
  };

  const filteredRequests = requests.filter(req => {
    const matchesSearch = 
      req.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'الكل' || req.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'مكتمل': return 'bg-green-100 text-green-700 border-green-200';
      case 'قيد المتابعة': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    }
  };

  return (
    <div className="p-8 font-cairo" dir="rtl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-800">طلبات الإعلانات</h1>
          <p className="text-slate-500 font-bold mt-1">إدارة طلبات عروض الأسعار المقدمة من المعلنين</p>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="relative">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="بحث بالاسم، الشركة أو البريد..."
            className="w-full pr-12 pl-4 py-3 bg-white border border-slate-200 rounded-xl font-bold outline-none focus:ring-2 focus:ring-red-600/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="relative">
          <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <select
            className="w-full pr-12 pl-4 py-3 bg-white border border-slate-200 rounded-xl font-bold outline-none appearance-none"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="الكل">جميع الحالات</option>
            <option value="قيد الانتظار">قيد الانتظار</option>
            <option value="قيد المتابعة">قيد المتابعة</option>
            <option value="مكتمل">مكتمل</option>
          </select>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-100 flex items-center justify-center gap-4 text-slate-500 font-black">
          <span className="text-sm">إجمالي الطلبات:</span>
          <span className="text-xl text-red-600">{filteredRequests.length}</span>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredRequests.length > 0 ? filteredRequests.map((req) => (
            <div key={req.id} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col lg:flex-row justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-xl font-black text-slate-800">{req.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-black border ${getStatusColor(req.status)}`}>
                      {req.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-bold text-slate-500 mb-4">
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-slate-400" />
                      {req.email}
                    </div>
                    {req.company && (
                      <div className="flex items-center gap-2">
                        <Building2 size={16} className="text-slate-400" />
                        {req.company}
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-slate-400" />
                      {new Date(req.created_at).toLocaleDateString('ar-YE', { 
                        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                      })}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-slate-400" />
                      النوع: {req.ad_type}
                    </div>
                  </div>

                  {req.details && (
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-slate-600 font-bold mb-4">
                      <p className="text-xs text-slate-400 mb-1">تفاصيل الطلب:</p>
                      {req.details}
                    </div>
                  )}
                </div>

                <div className="flex flex-row lg:flex-col gap-2 justify-end lg:justify-start lg:min-w-[150px]">
                  <select
                    className="flex-1 lg:w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-black outline-none"
                    value={req.status}
                    onChange={(e) => updateStatus(req.id, e.target.value)}
                  >
                    <option value="قيد الانتظار">قيد الانتظار</option>
                    <option value="قيد المتابعة">قيد المتابعة</option>
                    <option value="مكتمل">مكتمل</option>
                  </select>

                  <button
                    onClick={() => deleteRequest(req.id)}
                    className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-colors"
                    title="حذف الطلب"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          )) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
              <p className="text-slate-400 font-bold">لا يوجد طلبات مطابقة للبحث</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdRequestsManagement;
