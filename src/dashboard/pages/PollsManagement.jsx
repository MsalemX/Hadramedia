import React, { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  Loader2,
  AlertCircle,
  X,
  BarChart3,
  ToggleLeft,
  ToggleRight,
  MinusCircle
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

const PollsManagement = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPoll, setEditingPoll] = useState(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    options: [{ text: '', votes: 0 }, { text: '', votes: 0 }]
  });

  const fetchPolls = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('polls')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPolls(data || []);
    } catch (err) {
      console.error("Error fetching polls:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  const resetForm = () => {
    setFormData({
      title: '',
      options: [{ text: '', votes: 0 }, { text: '', votes: 0 }]
    });
    setEditingPoll(null);
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (poll) => {
    setEditingPoll(poll);
    setFormData({
      title: poll.title,
      options: poll.options || [{ text: '', votes: 0 }, { text: '', votes: 0 }]
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const addOption = () => {
    setFormData(prev => ({
      ...prev,
      options: [...prev.options, { text: '', votes: 0 }]
    }));
  };

  const removeOption = (index) => {
    if (formData.options.length <= 2) return;
    setFormData(prev => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index)
    }));
  };

  const updateOptionText = (index, text) => {
    setFormData(prev => ({
      ...prev,
      options: prev.options.map((opt, i) => i === index ? { ...opt, text } : opt)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emptyOptions = formData.options.filter(o => !o.text.trim());
    if (emptyOptions.length > 0) {
      alert('يرجى ملء جميع الخيارات أو حذف الفارغة');
      return;
    }

    try {
      setSaving(true);
      const totalVotes = formData.options.reduce((sum, o) => sum + (o.votes || 0), 0);

      if (editingPoll) {
        const { error } = await supabase
          .from('polls')
          .update({
            title: formData.title,
            options: formData.options,
            total_votes: totalVotes
          })
          .eq('id', editingPoll.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('polls')
          .insert([{
            title: formData.title,
            options: formData.options,
            total_votes: 0
          }]);

        if (error) throw error;
      }

      closeModal();
      fetchPolls();
    } catch (err) {
      alert('خطأ أثناء الحفظ: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`هل أنت متأكد من حذف الاستطلاع "${title}"؟`)) {
      try {
        const { error } = await supabase.from('polls').delete().eq('id', id);
        if (error) throw error;
        setPolls(polls.filter(p => p.id !== id));
      } catch (err) {
        alert('خطأ أثناء الحذف: ' + err.message);
      }
    }
  };

  const handleToggleStatus = async (poll) => {
    const newStatus = poll.status === 'نشط' ? 'غير نشط' : 'نشط';
    try {
      const { error } = await supabase
        .from('polls')
        .update({ status: newStatus })
        .eq('id', poll.id);

      if (error) throw error;
      setPolls(polls.map(p => p.id === poll.id ? { ...p, status: newStatus } : p));
    } catch (err) {
      alert('خطأ أثناء تحديث الحالة: ' + err.message);
    }
  };

  const filteredPolls = polls.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getVotePercentage = (option, poll) => {
    if (!poll.total_votes || poll.total_votes === 0) return 0;
    return Math.round((option.votes / poll.total_votes) * 100);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800">إدارة الاستطلاعات</h1>
          <p className="text-slate-400 text-sm font-bold mt-1">الرئيسية {'>'} الاستطلاعات</p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all active:scale-95"
        >
          <Plus size={20} />
          إضافة استطلاع جديد
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
        <div className="relative max-w-md">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="بحث عن استطلاع..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl pr-12 pl-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/20 transition-all font-bold"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden min-h-[400px]">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
          </div>
        ) : filteredPolls.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">العنوان</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">الخيارات</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">إجمالي الأصوات</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">الحالة</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">تاريخ الإنشاء</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredPolls.map((poll) => (
                  <tr key={poll.id} className="hover:bg-gray-50/30 transition-colors group">
                    <td className="px-8 py-5">
                      <span className="text-sm font-black text-slate-700 line-clamp-2 max-w-xs">{poll.title}</span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex flex-col gap-1.5 max-w-[250px]">
                        {(poll.options || []).map((opt, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-50 rounded-lg overflow-hidden h-5 relative">
                              <div
                                className="h-full bg-blue-100 rounded-lg transition-all"
                                style={{ width: `${getVotePercentage(opt, poll)}%` }}
                              />
                              <span className="absolute inset-0 flex items-center px-2 text-[10px] font-black text-slate-600 truncate">
                                {opt.text}
                              </span>
                            </div>
                            <span className="text-[10px] font-black text-slate-400 w-8 text-left shrink-0">
                              {getVotePercentage(opt, poll)}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black">
                        {poll.total_votes || 0} صوت
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black ${
                        poll.status === 'نشط' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                      }`}>
                        {poll.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-slate-400 text-[11px] font-bold">
                      {new Date(poll.created_at).toLocaleDateString('ar-YE')}
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleToggleStatus(poll)}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          title={poll.status === 'نشط' ? 'إيقاف' : 'تفعيل'}
                        >
                          {poll.status === 'نشط' ? <ToggleRight size={16} className="text-green-600" /> : <ToggleLeft size={16} />}
                        </button>
                        <button
                          onClick={() => openEditModal(poll)}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(poll.id, poll.title)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <AlertCircle className="w-12 h-12 text-slate-300" />
            <p className="text-slate-400 font-bold">لا توجد استطلاعات حالياً</p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                  <BarChart3 size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-800">
                    {editingPoll ? 'تعديل الاستطلاع' : 'إضافة استطلاع جديد'}
                  </h3>
                  <p className="text-xs font-bold text-slate-400">
                    {editingPoll ? 'قم بتعديل بيانات الاستطلاع' : 'املأ البيانات أدناه لإضافة استطلاع جديد'}
                  </p>
                </div>
              </div>
              <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-slate-400">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto max-h-[70vh] no-scrollbar">
              {/* Title */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest mr-2">عنوان الاستطلاع</label>
                <input
                  required
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="مثال: ما رأيك في مستوى الخدمات الصحية؟"
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/20 transition-all font-bold"
                />
              </div>

              {/* Options */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest mr-2">الخيارات</label>
                  <button
                    type="button"
                    onClick={addOption}
                    className="text-xs font-black text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
                  >
                    <Plus size={14} />
                    إضافة خيار
                  </button>
                </div>
                <div className="space-y-3">
                  {formData.options.map((option, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="w-8 h-8 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xs font-black shrink-0">
                        {index + 1}
                      </span>
                      <input
                        required
                        type="text"
                        value={option.text}
                        onChange={(e) => updateOptionText(index, e.target.value)}
                        placeholder={`الخيار ${index + 1}...`}
                        className="flex-1 bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/20 transition-all font-bold"
                      />
                      {formData.options.length > 2 && (
                        <button
                          type="button"
                          onClick={() => removeOption(index)}
                          className="p-2 text-slate-300 hover:text-red-500 transition-colors shrink-0"
                        >
                          <MinusCircle size={20} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <button
                disabled={saving}
                type="submit"
                className="w-full bg-[#09264d] hover:bg-blue-900 text-white py-5 rounded-2xl font-black shadow-xl shadow-blue-900/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {saving ? <Loader2 size={24} className="animate-spin" /> : <Plus size={24} />}
                {editingPoll ? 'حفظ التعديلات' : 'إضافة الاستطلاع الآن'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PollsManagement;
