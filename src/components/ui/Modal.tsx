import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: 'error' | 'info' | 'success';
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, message, type = 'info' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm font-body dir-rtl">
      <div className="bg-[var(--color-lumi-base)] border-2 border-[var(--color-lumi-secondary)] p-6 rounded-3xl shadow-2xl max-w-sm w-full animate-bloom relative">
        <button 
          onClick={onClose}
          className="absolute top-4 left-4 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="text-center space-y-4">
          <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center text-2xl ${
            type === 'error' ? 'bg-rose-500/20 text-rose-400' : 
            type === 'success' ? 'bg-emerald-500/20 text-emerald-400' : 
            'bg-blue-500/20 text-blue-400'
          }`}>
            {type === 'error' ? '⚠️' : type === 'success' ? '✨' : '💡'}
          </div>
          <h3 className="text-xl font-display font-black text-[var(--color-lumi-primary)]">
            {title}
          </h3>
          <p className="text-sm font-bold text-slate-300">
            {message}
          </p>
          <button
            onClick={onClose}
            className="w-full py-3 mt-2 bg-[var(--color-lumi-secondary)] hover:bg-purple-500 text-white rounded-xl font-black transition-colors"
          >
            حَسَناً
          </button>
        </div>
      </div>
    </div>
  );
};
