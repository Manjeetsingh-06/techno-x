import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { AlertTriangle, Info, CheckCircle2 } from 'lucide-react';

export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  description,
  details = null, // key-value object to display in nice table
  requireReason = false,
  reasonPlaceholder = 'Enter required institutional reason...',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'primary',
  type = 'warning', // warning, info, danger, success
  isLoading = false,
}) => {
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  const handleConfirm = () => {
    if (requireReason && (!reason || reason.trim().length < 5)) {
      setError('Please provide a valid institutional reason (min 5 characters).');
      return;
    }
    setError('');
    onConfirm(reason);
  };

  const icons = {
    warning: <AlertTriangle className="w-8 h-8 text-amber-400" />,
    danger: <AlertTriangle className="w-8 h-8 text-rose-500" />,
    info: <Info className="w-8 h-8 text-blue-400" />,
    success: <CheckCircle2 className="w-8 h-8 text-emerald-400" />,
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="max-w-lg">
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 shrink-0">
            {icons[type]}
          </div>
          <div>
            <p className="text-sm text-slate-200 leading-relaxed">{description}</p>
          </div>
        </div>

        {details && (
          <div className="bg-navy-900/80 rounded-xl p-3.5 border border-slate-800 text-xs space-y-2">
            {Object.entries(details).map(([key, val]) => (
              <div key={key} className="flex justify-between items-center py-0.5 border-b border-slate-800/40 last:border-0">
                <span className="text-slate-400 uppercase font-semibold text-[10px] tracking-wider">{key}</span>
                <span className="text-slate-100 font-medium">{val}</span>
              </div>
            ))}
          </div>
        )}

        {requireReason && (
          <div className="space-y-1.5 pt-1">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Reason / Justification <span className="text-rose-400">*</span>
            </label>
            <textarea
              rows={3}
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
                if (error) setError('');
              }}
              placeholder={reasonPlaceholder}
              className="w-full rounded-lg bg-navy-900/90 text-slate-100 placeholder-slate-500 border border-slate-700/80 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
            />
            {error && <p className="text-xs text-rose-400 font-medium">{error}</p>}
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
          <Button variant="ghost" size="md" onClick={onClose} disabled={isLoading}>
            {cancelText}
          </Button>
          <Button
            variant={confirmVariant}
            size="md"
            onClick={handleConfirm}
            isLoading={isLoading}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
