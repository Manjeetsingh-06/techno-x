import React, { useState, useEffect } from 'react';
import { eventService } from '../../services/eventService';
import { useNotifications } from '../../context/NotificationContext';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { LoadingState } from '../../components/common/LoadingState';
import { ConfirmationModal } from '../../components/common/ConfirmationModal';
import { Users, Plus, Trash2, Award } from 'lucide-react';

export const AdminClubsPage = () => {
  const { showSuccess } = useNotifications();
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedClub, setSelectedClub] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [form, setForm] = useState({ name: '', description: '', icon: '⚡', lead: '' });

  const loadClubs = async () => {
    setLoading(true);
    const res = await eventService.getClubs();
    if (res.success) setClubs(res.data);
    setLoading(false);
  };

  useEffect(() => { loadClubs(); }, []);

  const handleCreate = (e) => {
    e.preventDefault();
    const newClub = {
      id: `CLUB-${Date.now().toString().slice(-4)}`,
      name: form.name,
      description: form.description,
      icon: form.icon || '⚡',
      lead: form.lead || 'Student Lead',
      memberCount: 0
    };
    setClubs(prev => [...prev, newClub]);
    showSuccess(`Club "${form.name}" registered successfully!`);
    setIsAddOpen(false);
    setForm({ name: '', description: '', icon: '⚡', lead: '' });
  };

  const handleDelete = () => {
    if (!selectedClub) return;
    setClubs(prev => prev.filter(c => c.id !== selectedClub.id));
    showSuccess(`Club "${selectedClub.name}" removed.`);
    setIsDeleteOpen(false);
    setSelectedClub(null);
  };

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 rounded-3xl border border-blue-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Student Societies & Clubs</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">Official student clubs and technical societies authorized under Techno Group of Institutions.</p>
        </div>
        <Button variant="electric" icon={Plus} onClick={() => setIsAddOpen(true)}>
          Register Club
        </Button>
      </div>

      {loading ? (
        <LoadingState message="Loading societies and clubs..." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {clubs.map(club => (
            <div key={club.id} className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-purple-500/40 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-2xl">
                    {club.icon || '🚀'}
                  </div>
                  <button
                    onClick={() => { setSelectedClub(club); setIsDeleteOpen(true); }}
                    className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="font-bold text-white text-lg mb-1">{club.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{club.description}</p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Student Coordinator</span>
                  <span className="text-slate-200 font-medium">{club.lead || 'Student Council'}</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Active Members</span>
                  <span className="text-sky-400 font-bold font-mono">{club.memberCount || 45}+</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Register New Club" size="sm">
        <form onSubmit={handleCreate} className="space-y-4">
          <Input
            label="Club Name *"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            placeholder="e.g. Google Developer Student Club"
            required
          />
          <Input
            label="Emoji Icon"
            value={form.icon}
            onChange={e => setForm(f => ({ ...f, icon: e.target.value }))}
            placeholder="e.g. 🤖"
          />
          <Input
            label="Student Lead / Coordinator"
            value={form.lead}
            onChange={e => setForm(f => ({ ...f, lead: e.target.value }))}
            placeholder="e.g. Priyanshu Roy"
          />
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Description</label>
            <textarea
              className="w-full bg-slate-900/60 border border-slate-700 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
              rows={3}
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              placeholder="Focus area, mission, and activities..."
            />
          </div>
          <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
            <Button variant="ghost" type="button" onClick={() => setIsAddOpen(false)}>Cancel</Button>
            <Button variant="electric" type="submit">Register Club</Button>
          </div>
        </form>
      </Modal>

      {/* Delete Modal */}
      <ConfirmationModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        title="De-register Club?"
        description={`Are you sure you want to remove "${selectedClub?.name}"?`}
        confirmText="Remove Club"
        confirmVariant="danger"
      />
    </div>
  );
};
