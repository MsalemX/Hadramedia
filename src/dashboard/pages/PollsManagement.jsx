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
  MinusCircle,
  Image as ImageIcon
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

const PollsManagement = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPoll, setEditingPoll] = useState(null);
  const [saving, setSaving] = useState(false);
  const [mainImageFile, setMainImageFile] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: '',
    main_image: '',
    status: 'نشط'
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
      author: '',
      content: '',
      main_image: '',
      status: 'نشط'
    });
    setMainImageFile(null);
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
      author: poll.author || '',
      content: poll.content || '',
      main_image: poll.main_image || '',
      status: poll.status || 'نشط'
    });
    setMainImageFile(null);
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

  const uploadImage = async (file) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 10)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);

      let finalImageUrl = formData.main_image;
      if (mainImageFile) {
        finalImageUrl = await uploadImage(mainImageFile);
      }
      
      const payload = {
        title: formData.title,
        author: formData.author,
        content: formData.content,
        main_image: finalImageUrl,
        status: formData.status || 'نشط'
      };

      if (editingPoll) {
        const { error } = await supabase
          .from('polls')
          .update(payload)
          .eq('id', editingPoll.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('polls')
          .insert([payload]);

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
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">الكاتب</th>
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
                      <span className="text-sm font-bold text-slate-600">{poll.author || 'غير محدد'}</span>
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
              {/* Title & Author */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest mr-2">عنوان الاستطلاع</label>
                  <input
                    required
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="مثال: نتائج استطلاع حول..."
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/20 transition-all font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest mr-2">الكاتب / المصدر</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="اسم الكاتب..."
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/20 transition-all font-bold"
                  />
                </div>
              </div>

              {/* Main Image */}
              <div className="space-y-4">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest mr-2">الصورة الرئيسية</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={formData.main_image}
                      onChange={(e) => setFormData({ ...formData, main_image: e.target.value })}
                      placeholder="رابط الصورة (اختياري)..."
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-xs focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/20 transition-all font-bold"
                    />
                    <div className="relative group h-24">
                      <div className="absolute inset-0 bg-blue-50 border-2 border-dashed border-blue-100 rounded-2xl flex flex-col items-center justify-center text-blue-400 group-hover:border-blue-300 transition-all">
                        <ImageIcon size={24} className="mb-1" />
                        <span className="text-[10px] font-black">اضغط لرفع صورة من جهازك</span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setMainImageFile(e.target.files[0])}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden h-40 flex items-center justify-center">
                    {mainImageFile || formData.main_image ? (
                      <img
                        src={mainImageFile ? URL.createObjectURL(mainImageFile) : formData.main_image}
                        className="w-full h-full object-cover"
                        alt="Preview"
                      />
                    ) : (
                      <div className="text-slate-300 flex flex-col items-center">
                         <ImageIcon size={32} />
                         <span className="text-[10px] font-bold">معاينة الصورة</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest mr-2">محتوى التقرير</label>
                <textarea
                  required
                  rows={8}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="اكتب تفاصيل الاستطلاع هنا..."
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/20 transition-all font-bold resize-none"
                />
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
