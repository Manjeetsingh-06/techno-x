import React, { useState, useEffect } from 'react';
import { eventService } from '../../services/eventService';
import { useNotifications } from '../../context/NotificationContext';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { LoadingState } from '../../components/common/LoadingState';
import { ConfirmationModal } from '../../components/common/ConfirmationModal';
import { Tag, Plus, Trash2, Layers } from 'lucide-react';

export const AdminCategoriesPage = () => {
  const { showSuccess } = useNotifications();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [form, setForm] = useState({ name: '', description: '', icon: '🎯' });

  const loadCategories = async () => {
    setLoading(true);
    const res = await eventService.getCategories();
    if (res.success) setCategories(res.data);
    setLoading(false);
  };

  useEffect(() => { loadCategories(); }, []);

  const handleCreate = (e) => {
    e.preventDefault();
    const newCat = {
      id: `CAT-${Date.now().toString().slice(-4)}`,
      name: form.name,
      description: form.description,
      icon: form.icon || '📌'
    };
    setCategories(prev => [...prev, newCat]);
    showSuccess(`Category "${form.name}" created successfully!`);
    setIsAddOpen(false);
    setForm({ name: '', description: '', icon: '🎯' });
  };

  const handleDelete = () => {
    if (!selectedCategory) return;
    setCategories(prev => prev.filter(c => c.id !== selectedCategory.id));
    showSuccess(`Category "${selectedCategory.name}" removed.`);
    setIsDeleteOpen(false);
    setSelectedCategory(null);
  };

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 rounded-3xl border border-blue-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Event Categories</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">Manage institutional taxonomy and classification criteria for campus events.</p>
        </div>
        <Button variant="electric" icon={Plus} onClick={() => setIsAddOpen(true)}>
          Add Category
        </Button>
      </div>

      {loading ? (
        <LoadingState message="Loading categories..." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map(cat => (
            <div key={cat.id} className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-blue-500/40 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-xl">
                    {cat.icon || '📌'}
                  </div>
                  <button
                    onClick={() => { setSelectedCategory(cat); setIsDeleteOpen(true); }}
                    className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="font-bold text-white text-base mb-1">{cat.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{cat.description || 'Institutional event category.'}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>{cat.id}</span>
                <span className="text-sky-400 font-sans">Active Taxonomy</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Create New Category" size="sm">
        <form onSubmit={handleCreate} className="space-y-4">
          <Input
            label="Category Name *"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            placeholder="e.g. Hackathons"
            required
          />
          <Input
            label="Emoji Icon"
            value={form.icon}
            onChange={e => setForm(f => ({ ...f, icon: e.target.value }))}
            placeholder="e.g. 💻"
          />
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Description</label>
            <textarea
              className="w-full bg-slate-900/60 border border-slate-700 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
              rows={3}
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              placeholder="Brief description of events under this category..."
            />
          </div>
          <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
            <Button variant="ghost" type="button" onClick={() => setIsAddOpen(false)}>Cancel</Button>
            <Button variant="electric" type="submit">Create Category</Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmationModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Delete Category?"
        description={`Are you sure you want to remove "${selectedCategory?.name}"? Existing events with this category will retain their history.`}
        confirmText="Delete Category"
        confirmVariant="danger"
      />
    </div>
  );
};
